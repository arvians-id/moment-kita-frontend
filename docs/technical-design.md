# Technical Design Document — Digital Wedding Invitation Platform — MVP v1.1

**Engineering Review Revised Edition — MVP v1.1**  
**Date:** 21 September 2026

> Source: approved Technical Design v1.1 with the repeated-section instance support adjustment.

# **Daftar Isi**

| **Bagian 1 sampai 19**                | **Bagian 20 sampai 38**             | **Bagian 39 sampai Lampiran**                     |
| ------------------------------------- | ----------------------------------- | ------------------------------------------------- |
| 1 Document Overview                   | 20 Invitation Lifecycle             | 39 Audit Logging                                  |
| 2 Scope                               | 21 Package Entitlement and Quota    | 40 REST API Design                                |
| 3 Source of Truth and Assumptions     | 22 Transaction Design               | 41 Validation and Error Model                     |
| 4 Technical Goals                     | 23 Template Engine Architecture     | 42 Security                                       |
| 5 Non Goals                           | 24 Template Manifest Specification  | 43 Caching and Performance                        |
| 6 Architecture Principles             | 25 Template Versioning              | 44 Observability                                  |
| 7 High Level System Architecture      | 26 Invitation Content Model         | 45 Deployment Architecture                        |
| 8 Domain and Hostname Architecture    | 27 Builder and Preview Architecture | 46 CI CD and Database Migration                   |
| 9 Frontend Architecture               | 28 Version History                  | 47 Testing Strategy                               |
| 10 Backend Architecture               | 29 Media Architecture               | 48 Critical Sequence Diagrams                     |
| 11 Module Boundaries                  | 30 Guest Management                 | 49 Failure Scenarios                              |
| 12 Authentication Architecture        | 31 Personalized Guest Link          | 50 Architecture Decision Records                  |
| 13 Authorization and Access Control   | 32 RSVP Architecture                | 51 MVP vs Future Architecture                     |
| 14 Customer and Admin Ownership Model | 33 Wishes                           | 52 Risks and Mitigations                          |
| 15 Admin Managed Invitation Flow      | 34 Digital Gift                     | 53 Technical Open Items and TBDs                  |
| 16 Database Architecture              | 35 Wedding Event Model              | 54 Engineering Dependency Map                     |
| 17 Domain Model                       | 36 Notification Architecture        | 55 Technical Definition of Done                   |
| 18 ERD                                | 37 Background Job Architecture      | A Architecture Review Checklist                   |
| 19 Core Table Design                  | 38 Analytics                        | B Remaining Technical TBDs                        |
|                                       |                                     | C Risks Requiring Attention Before Implementation |
|                                       |                                     | D Items to Verify During Implementation Planning  |
|                                       |                                     | E Engineering Review Resolution Matrix            |
|                                       |                                     | F Remaining Technical TBDs v1.1                   |
|                                       |                                     | G Ready for Implementation Planning Assessment    |

# **1 Document Overview**

Dokumen ini menetapkan desain teknis implementation-ready untuk Digital Wedding Invitation SaaS MVP v1.1. Arsitektur yang telah disetujui tetap menggunakan satu frontend Next.js dan satu backend Go berbentuk modular monolith, PostgreSQL sebagai source of truth, object storage melalui adapter, serta worker terpisah dengan PostgreSQL-backed job queue.

Edisi ini menutup tujuh temuan Engineering Review tanpa memperluas scope produk: authenticated application traffic memakai same-origin BFF, ownership assignment menjadi deterministik, expiration dan extension diperjelas, personalized guest token memakai fragment exchange, slug lama ditombstone, quota disederhanakan, dan urutan release template dibedakan berdasarkan kompatibilitas schema.

| **Metadata**        | **Nilai**                                                              |
| ------------------- | ---------------------------------------------------------------------- |
| Status              | Ready for Second Engineering Review                                    |
| Edition             | Engineering Review Revised Edition — MVP v1.1                          |
| Product phase       | MVP v1.1 atau Phase 1                                                  |
| Primary source      | Product Requirements Document Digital Wedding Invitation Platform v1.0 |
| Override source     | Master Prompt v1.0 dan Engineering Review Revision Prompt v1.1         |
| Frontend repository | `wedding-platform-frontend`                                            |
| Backend repository  | `wedding-platform-backend`                                             |
| API base path       | `/api/v1`                                                              |
| Primary language    | Bahasa Indonesia dengan technical identifiers dalam English            |

## **1.1 Revision History**

| **Version** | **Edition**                        | **Summary**                                                                                                                                                                                                                                     |
| ----------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| v1.0        | Initial Engineering Review Edition | Initial implementation-ready technical design.                                                                                                                                                                                                  |
| v1.1        | Engineering Review Revised Edition | Revised authentication/BFF architecture; deterministic ownership assignment; corrected expiration and extension lifecycle; hardened guest-token transport; slug tombstone/history; simplified quota state; schema-aware template release order. |

**Kesimpulan arsitektur.** MVP tetap menggunakan two-repository architecture, modular monolith, hybrid relational plus JSONB model, immutable quota ledger, pinned template versions, explicit Save, first-publish expiration, dan role-bound authentication sessions. Customer dan Admin memakai host-only cookie pada host aplikasinya sendiri dan authenticated API calls melewati same-origin BFF. Tidak ada kebutuhan Redis, message broker, microservices, atau Kubernetes pada MVP.

# **2 Scope**

## **2.1 In scope**

- Marketing site, katalog template, pricing, printed-product catalog, FAQ, dan CTA WhatsApp.
- Customer SaaS: authentication, dashboard, draft, editor, Save, finalize, publish, guest, RSVP, wishes, gift, notification, dan history.
- Public invitation di `webwedding.com/{slug}` dengan personalized guest token.
- Admin application untuk users, customer profiles, package, transaction, quota, invitation, extension, assignment, template metadata, dan audit.
- Manual payment and activation, digital package, extension, serta simple printed transaction record.
- Media image, audio, dan browser-compatible video.
- PostgreSQL-backed asynchronous jobs, analytics integration, security, observability, CI/CD, dan deployment design.

## **2.2 Printed-product boundary**

Printed invitation hanya mencakup catalog/detail, WhatsApp CTA, dan manual transaction record. Printed tidak berbagi inventory, production, checkout, shipping, atau lifecycle dengan digital invitation. Shared elements terbatas pada brand, public site, customer/contact reference, transaction shell, dan Admin reporting.

# **3 Source of Truth and Assumptions**

Urutan precedence adalah: keputusan locked pada master prompt, kemudian PRD, kemudian recommendation pada dokumen ini. Recommendation dapat diubah saat Engineering Review tanpa mengubah product rules.

| **Item**                   | **Keputusan**                                                                                                                   |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Cancellation and quota     | Cancellation tidak otomatis mengembalikan quota. Refund hanya melalui explicit Admin adjustment yang memiliki reason dan audit. |
| Edit after finalize        | Customer boleh mengedit content yang didukung template. Slug dan template tetap terkunci bagi Customer.                         |
| Draft retention            | Recommendation: draft tidak dihapus otomatis pada MVP; monitoring storage digunakan sebelum retention policy ditambahkan.       |
| Version history            | Simpan 10 recent customer-restorable versions.                                                                                  |
| Anyone-link RSVP edit      | Berikan opaque edit token satu kali; token hash disimpan. URL fragment direkomendasikan agar token tidak masuk server logs.     |
| Expiration start           | First Publish. Unpublish tidak menghentikan timer.                                                                              |
| Cancellation state         | `CANCELLED` terminal bagi Customer. Recovery oleh Admin tidak termasuk MVP.                                                     |
| Extension after expiration | Extension mengubah `EXPIRED` menjadi `FINALIZED`; publish kembali tetap explicit.                                               |
| Package configuration      | Nama, harga, quota, duration, dan eligibility tetap configurable.                                                               |
| Production providers       | Hosting, object storage, CDN, dan email provider masih TBD melalui adapter/configuration.                                       |

**Recommendation CustomerProfile.** Gunakan aggregate `customer_profiles` sebagai business/customer principal. Row dapat terhubung ke `users` atau tetap tanpa user untuk admin-managed service. Ini menghindari polymorphic foreign key berulang pada transaction, entitlement, dan quota, sekaligus memastikan contact record tidak otomatis menjadi authentication user.

# **4 Technical Goals**

1.  Menjaga business invariants secara transactional, khususnya finalize, quota, first publish, extension, assignment, dan transaction confirmation.
2.  Memberi batas domain yang jelas tanpa biaya operasional microservices.
3.  Menjamin published invitation tetap kompatibel dengan pinned template version.
4.  Mengisolasi Customer dan Admin pada page, session audience, dan backend authorization.
5.  Menyediakan public read model yang mudah dicache dan tidak mengambil data internal.
6.  Memungkinkan provider switching untuk storage, email, analytics, dan error monitoring.
7.  Menjaga desain mudah dipahami dan dapat dioperasikan oleh tim kecil.

# **5 Non Goals**

MVP tidak mencakup microservices, Kubernetes, Redis requirement, Kafka, RabbitMQ, WebSocket notifications, arbitrary page builder, AI invitation generator, scheduled publish, custom domain, reseller, collaboration, QR check-in, offline scanner, online printed checkout, inventory, production workflow, shipping engine, payment gateway, advanced video transcoding, atau complex event streaming.

# **6 Architecture Principles**

| **Principle**                | **Application**                                                                          |
| ---------------------------- | ---------------------------------------------------------------------------------------- |
| MVP first                    | Infrastruktur minimum: frontend, API, worker, PostgreSQL, storage, email.                |
| Strong boundaries            | Domain package tidak mengakses handler atau adapter domain lain secara langsung.         |
| Transaction ownership        | Use case service yang memulai business operation memiliki database transaction boundary. |
| Ledger and audit             | Financial/quota events append-oriented; sensitive Admin action audited.                  |
| Idempotency by risk          | Idempotency keys hanya untuk operation dengan duplicate side effect.                     |
| Pinned compatibility         | Invitation menyimpan template key, version, manifest checksum, dan entitlement snapshot. |
| Provider abstraction         | Domain bergantung pada interfaces, bukan SendGrid/S3/PostHog SDK.                        |
| Defense in depth             | Frontend guard adalah UX; API authorization tetap authoritative.                         |
| Cache-ready reads            | Public invitation memakai dedicated view model dan stable cache key.                     |
| Backward-compatible delivery | Database migration dan API evolution mengikuti expand-migrate-contract.                  |

# **7 High Level System Architecture**

<img src="media/rId30.png" style="width:5.83333in;height:3.30582in" alt="System context and same-origin BFF architecture" />

System context and same-origin BFF architecture

Frontend melayani empat experiences dari satu codebase. Untuk Customer dan Admin, browser hanya memanggil API pada origin yang sama: `app.webwedding.com/api/v1/*` atau `admin.webwedding.com/api/v1/*`. Next.js reverse proxy/BFF meneruskan request ke Go API origin. Dengan model ini, Server Components dan middleware menerima host-only session cookie sebelum render, sementara cookie Customer dan Admin tetap terisolasi.

Go API tetap menjadi authoritative security boundary untuk authentication, role, ownership, state transition, CSRF, dan validation. BFF bukan tempat business rule. BFF hanya memetakan host ke audience, meneruskan method, path, body, request ID, CSRF header, dan cookie yang sesuai; menghapus untrusted forwarding headers; serta meneruskan `Set-Cookie` tanpa atribut `Domain` agar browser mengikat cookie ke host aplikasi.

Worker menjalankan email, media, cleanup, import/export, expiration, digest, dan aggregation. PostgreSQL menyimpan domain data dan jobs. Object storage menjadi private origin; delivery public menggunakan stable CDN/public delivery URL, bukan public bucket write access.

Repository dirilis independen. Compatibility dijaga melalui versioned REST API, additive schema changes, template manifest `schemaVersion`, renderer build compatibility, dan deployment order eksplisit. Frontend tidak boleh bergantung pada field backend yang belum tersedia; backend mempertahankan existing `/api/v1` contract selama rollout.

# **8 Domain and Hostname Architecture**

<img src="media/rId34.png" style="width:5.83333in;height:3.30582in" alt="Domain host and same-origin BFF architecture" />

Domain host and same-origin BFF architecture

| **Host**               | **Responsibility**                                                            | **Authenticated browser path and cookie**                  |
| ---------------------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `webwedding.com`       | Marketing and public invitation                                               | Public `/api/v1/public/*`; no Customer/Admin cookie        |
| `app.webwedding.com`   | Customer login, UI, SSR, and BFF                                              | `/api/v1/*`; host-only Customer cookies                    |
| `admin.webwedding.com` | Admin login, UI, SSR, and BFF                                                 | `/api/v1/*`; host-only Admin cookies                       |
| `api.webwedding.com`   | Go backend origin and service health; not normal authenticated browser target | Internal/proxy traffic; browser credentialed CORS disabled |

Conceptual routing is `Browser -> app/admin same-origin /api/v1/* -> reverse proxy/BFF -> Go API`. The proxy maps `app` only to CUSTOMER auth routes and `admin` only to ADMIN auth routes. It overwrites, rather than trusts, audience and forwarding headers. The Go API accepts proxied authenticated traffic only from configured proxy ingress/private network or an equivalent authenticated upstream channel, validates the mapped audience again, and remains independently protected if called directly.

DNS uses A/AAAA or CNAME as required by the provider. A wildcard certificate does not cover the apex, so managed TLS must cover both apex and wildcard/SAN hosts. HSTS is enabled only after every production host is HTTPS-ready. Unknown hosts return 404.

Slug normalization uses Unicode trim, lowercase ASCII, collapsed repeated hyphens, and `^[a-z0-9]+(?:-[a-z0-9]+)*$`; recommended length is 3 to 80. Availability checks and the write transaction must test current `invitations`, `reserved_slugs`, and `invitation_slug_history`. A slug that has ever belonged to an invitation is unavailable to every other invitation. Changing a slug does not redirect the old value in MVP; it returns inactive/404 and can never resolve to another wedding.

# **9 Frontend Architecture**

## **9.1 Technology responsibilities**

| **Technology**  | **Responsibility**                                                                                                   |
| --------------- | -------------------------------------------------------------------------------------------------------------------- |
| Next.js         | Host routing, SSR/SSG, Server Components, middleware, same-origin BFF/reverse proxy, metadata, and public rendering. |
| React           | Interactive editor, preview, forms, dashboard state, and invitation interactions.                                    |
| TypeScript      | Static contract and component safety.                                                                                |
| Tailwind CSS    | Layout and design tokens; template styling remains isolated.                                                         |
| shadcn/ui       | Dashboard/Admin primitives; does not impose template visuals.                                                        |
| Motion          | Default component and invitation animation.                                                                          |
| React Hook Form | Efficient local form state and explicit Save.                                                                        |
| Zod             | Client validation and API boundary parsing; backend remains authoritative.                                           |
| TanStack Query  | Client cache, mutation state, invalidation, and polling media/job status.                                            |

## **9.2 Rendering and authentication boundaries**

- Marketing uses SSG/ISR where stable. Public invitation SSR receives only anonymous public data; fragment-based guest personalization starts after hydration.
- Customer/Admin middleware reads the incoming host-only access cookie, verifies signature, expiry, and exact audience with the public key, then applies redirect or cross-role 404 behavior. This is UX/security-in-depth.
- Server Components call the same-origin BFF and forward only the current request’s cookie. `GET /users/me` or the requested protected API remains the authoritative backend check.
- If the access token expired but refresh remains valid, middleware routes through an audience-specific same-origin refresh handler and returns to a validated relative path. The handler rotates tokens and redirects.
- Editor remains a Client Component because form and preview share local state. Public RSVP, wishes, audio, gallery, and countdown are client islands.

## **9.3 BFF forwarding contract**

The BFF preserves method, path under `/api/v1`, query excluding blocked credential fields, body, `Content-Type`, `Idempotency-Key`, `If-Match`, `X-CSRF-Token`, and request ID. It applies strict body/time limits, strips client-supplied `Forwarded`, `X-Forwarded-*`, audience, identity, and cookie headers, then injects trusted host/audience metadata. Response status, safe headers, and audience-appropriate `Set-Cookie` are relayed. Business errors are not translated.

## **9.4 Recommended project tree**

    src/
      app/
        (marketing)/
        (public-invitation)/[slug]/
        (customer)/app/
        (admin)/admin/
        api/v1/[...path]/route.ts   # same-origin BFF
        _auth/refresh/route.ts
      domains/
        auth/ invitation/ template/ guest/ rsvp/ wish/ gift/ media/
        package/ transaction/ notification/ admin/
      templates/
        registry.ts
        elegant-01/v1/
          manifest.json renderer.tsx sections/
      components/
        ui/ marketing/ dashboard/ editor/
      lib/
        api/ auth/ bff/ analytics/ hostname/ validation/
      middleware.ts

Middleware uses an exact hostname allowlist and internal rewrite, never substring matching. Static marketing routes win before dynamic `/{slug}`; the dynamic route executes only after reserved and historical slug checks.

# **10 Backend Architecture**

Go dengan `net/http` dan Chi dipilih karena API membutuhkan idiomatic middleware, compatibility dengan standard library, predictable allocation, dan ekosistem instrumentation. Fiber benchmark tidak menjadi alasan kuat ketika bottleneck utama adalah database, storage, email, dan media. REST dipilih karena resource/action domain jelas dan operasional lebih sederhana daripada GraphQL.

`cmd/api` dan `cmd/worker` dibangun dari repository yang sama tetapi berjalan sebagai process/container terpisah. Keduanya memakai application services dan adapters yang sama. API tidak memproses media atau email provider call yang mahal di request path.

## **10.1 Recommended project tree**

    cmd/
      api/main.go
      worker/main.go
    internal/
      auth/ user/ customer/ package/ entitlement/ quota/ transaction/
      template/ invitation/ guest/ rsvp/ wish/ gift/ media/
      notification/ analytics/ audit/ admin/ job/
        handler/ service/ repository/ model/ dto/ validation/ errors/
      platform/
        config/ httpx/ middleware/ database/ clock/ idempotency/
        storage/ email/ analytics/ observability/
    migrations/
    tests/integration/

## **10.2 Dependency direction**

Handler bergantung pada application service; service bergantung pada domain repository/interface; infrastructure mengimplementasikan interface. Model domain tidak mengimpor HTTP, GORM, provider SDK, atau domain handler lain. Cross-domain calls dilakukan melalui narrow service interface atau orchestration service, bukan mengakses table repository domain lain secara bebas.

# **11 Module Boundaries**

| **Module**   | **Owns**                                                | **Key dependencies**          |
| ------------ | ------------------------------------------------------- | ----------------------------- |
| auth         | credentials, sessions, verification, reset, OAuth state | user, email job               |
| customer     | customer profile and explicit user linkage              | user, audit                   |
| package      | configurable commercial offer                           | audit                         |
| transaction  | manual commercial record and status                     | package, customer, audit      |
| entitlement  | purchased/admin grant snapshot                          | transaction, package          |
| quota        | entitlement remaining counters and append-only ledger   | entitlement, audit            |
| template     | catalog metadata and immutable versions/manifests       | admin audit                   |
| invitation   | lifecycle, content, versions, ownership                 | quota, template, media        |
| guest        | guest identity and import/export                        | invitation, job               |
| rsvp         | current response plus immutable history                 | guest, invitation             |
| wish         | submission and moderation                               | invitation, guest/rsvp        |
| gift         | public display-only account/address                     | invitation                    |
| media        | metadata, references, processing state                  | storage, job                  |
| notification | web notification and email intent                       | job, email                    |
| analytics    | typed event abstraction                                 | PostHog adapter               |
| audit        | immutable operational/security trail                    | all sensitive admin use cases |
| job          | claim, retry, execution registry                        | database, adapters            |

Tidak ada module yang dipisahkan menjadi service pada MVP. Media processing, email, analytics, dan public read path adalah candidate extraction hanya setelah load, deploy cadence, atau failure isolation membuktikan kebutuhan.

# **12 Authentication Architecture**

## **12.1 Session and cookie model**

- Access token: asymmetric JWT, recommended lifetime 10 minutes, claims `sub`, `sid`, `role`, `aud`, `iss`, `exp`, and token version.
- Refresh token: opaque 256-bit random value, hash-only in database and rotated on every refresh. Recommended lifetime is 30 days for Customer and 12 hours with inactivity control for Admin.
- Customer cookies are `Secure`, `HttpOnly`, `SameSite=Lax`, have no `Domain` attribute, and are therefore host-only to `app.webwedding.com`. Their audience is `CUSTOMER`.
- Admin cookies use distinct names, the same secure attributes, no `Domain`, and are host-only to `admin.webwedding.com`. Their audience is `ADMIN`.
- A wildcard `.webwedding.com` auth cookie is prohibited. Sensitive tokens are never stored in `localStorage`.

## **12.2 Login, refresh, logout, and SSR**

Customer login is posted to `app.webwedding.com/api/v1/auth/customer/login`; Admin login is posted to the equivalent Admin same-origin path. The BFF forwards to Go, and a successful response relays host-only cookies. The Go service verifies active status, email verification policy, required role, password, audience, and token version.

Refresh is always initiated on the current application origin. It rotates the refresh token family, returns new audience-bound cookies, and detects reuse. Logout revokes the current refresh session and expires only cookies for that host/audience. Password change, account deactivation, or reuse detection can revoke all relevant sessions.

Next.js middleware can decide pre-render navigation from the access token, but does not grant data access. Server Components fetch protected data through the same-origin BFF; the Go API revalidates the session and authorization. Missing session redirects to the correct login. A Customer token on Admin or an Admin token on Customer is treated as cross-role and renders 404.

## **12.3 CSRF and origin controls**

Same-origin routing reduces CORS exposure but does not replace CSRF protection. Mutations require a session-bound synchronizer token delivered by the auth/session bootstrap and returned in `X-CSRF-Token`. The API also validates exact `Origin` and, where present, `Referer` host. Login and OAuth state are protected against login CSRF. `SameSite=Lax` is defense-in-depth, not the sole control.

The browser does not normally call `api.webwedding.com` with credentials. Credentialed CORS is disabled there for Customer/Admin application traffic. Public endpoints may be exposed without credentials only when explicitly allowlisted; otherwise public UI also uses an apex same-origin proxy.

## **12.4 Google OAuth**

Customer OAuth starts and returns through `https://app.webwedding.com/api/v1/auth/google/callback`. State binds the exact audience, host, nonce, PKCE verifier, and validated relative return path. The BFF forwards the callback to Go; Go validates provider response and creates/links only a CUSTOMER account after policy checks. Google OAuth never creates ADMIN. Admin authentication remains on the Admin host with its approved credential flow.

## **12.5 Backend origin trust**

The proxy and backend communicate over TLS/private ingress where available. The edge blocks normal public access to internal authenticated routes or, where the API origin must remain reachable, requires authenticated proxy metadata and rejects browser cookies from untrusted origins. The proxy removes all client-supplied identity/audience headers. Go derives identity from validated session material, enforces audience, role, ownership, and state independently, and never trusts a frontend route guard.

## **12.6 Password security**

Use Argon2id with starting parameters `memory=64 MiB`, `iterations=3`, `parallelism=2`, 16-byte salt, and 32-byte output; benchmark on the chosen production container. Store algorithm and parameters with the hash and rehash after successful login when policy strengthens. Reset tokens are random, single-use, short-lived, and hash-only.

# **13 Authorization and Access Control**

| **Case**                       | **Page/BFF behavior**                                                   | **Go API behavior**                                                                                      |
| ------------------------------ | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Unauthenticated protected page | Redirect to audience-specific login with validated relative return path | `401 AUTH_REQUIRED`                                                                                      |
| Expired access, valid refresh  | Same-origin refresh handler rotates and retries/redirects once          | Refresh endpoint rotates family                                                                          |
| CUSTOMER opens Admin           | 404; Customer cookie is not present on Admin host                       | `404 RESOURCE_NOT_FOUND` for resources; optional `403 ROLE_FORBIDDEN` only for explicit auth diagnostics |
| ADMIN opens Customer app       | 404; Admin cookie is not present on Customer host                       | Same concealment policy                                                                                  |
| Wrong owner                    | 404                                                                     | ownership-scoped query returns `404 RESOURCE_NOT_FOUND`                                                  |
| Deactivated user               | Login blocked; local audience cookies cleared                           | `401 ACCOUNT_INACTIVE`                                                                                   |

The BFF maps host to expected audience but cannot authorize a resource. Every protected repository query includes customer ownership scope, rather than fetching and hiding afterward. Admin routes require ADMIN role; sensitive operations require reason, request ID, idempotency where defined, and audit. Direct access to the API origin remains subject to the same token, audience, role, owner, CSRF/origin, and state checks.

# **14 Customer and Admin Ownership Model**

`customer_profiles` is the commercial and ownership principal. It stores name, email, phone, notes, and optional `user_id`. A registered Customer has at most one linked profile; an admin-managed contact has `user_id = NULL`. Invitation references exactly one customer profile and never belongs to the Admin operator.

Assignment is explicit, Admin-only, requires an active verified CUSTOMER, reason, and `Idempotency-Key`, and is audited. Email is search input only; there is no silent email claim.

**Case A - target user has no CustomerProfile.** The service locks the source profile and target user, verifies the user still has no profile, and sets the existing admin-managed `customer_profiles.user_id` to that user. No second profile is created. Invitations, transactions, entitlements, quota history, contact data, and audit history remain attached to the same profile.

**Case B - target user already has a CustomerProfile.** MVP uses **Assign Invitation Only**. The target user’s existing profile survives. In one transaction, the service locks the invitation, source profile, target profile, and idempotency record; changes only the selected invitation’s `customer_profile_id`; records an append-only `invitation_assignments` row; and writes audit. The invitation entitlement snapshot remains attached to the invitation. Historical transactions, source entitlements, unconsumed quota, and quota ledger entries remain on the source profile. They are not rewritten, combined, or transferred. Customer-facing APIs do not expose source-profile commercial records through the moved invitation.

Full commercial-profile merge is outside MVP. If business later requires it, it must be a separately reviewed Admin workflow with preview, explicit confirmation, ledger-preserving transfer entries, and rollback plan.

<img src="media/rId55.png" style="width:5.83333in;height:3.61875in" alt="Deterministic ownership assignment cases" />

Deterministic ownership assignment cases

# **15 Admin Managed Invitation Flow**

Admin-managed and self-service invitations use the same tables, validators, renderer, lifecycle, quota, entitlement, and BFF/API contracts. `management_mode` records `SELF_SERVICE` or `ADMIN_MANAGED` only for workflow/reporting.

<img src="media/rId59.png" style="width:5.83333in;height:3.61875in" alt="Admin managed invitation flow with deterministic assignment" />

Admin managed invitation flow with deterministic assignment

Admin can create, edit, save, finalize, publish, unpublish, extend, change slug, change template, cancel, assign, and manage transaction/package/quota. Overrides to finalized slug/template require reason and audit. Slug override also closes the current slug-history row and inserts the new unique history row transactionally.

When access is granted, Case A links the existing managed profile to the verified account. Case B uses Assign Invitation Only and does not merge commercial balances. Customer later sees the same invitation state, content, history, and entitlement snapshot, but not unrelated source-profile transactions or quota.

# **16 Database Architecture**

PostgreSQL is the single transactional source of truth. GORM v2 is used for query mapping and repositories, while production schema changes use explicit Goose SQL migrations. Use UTC `timestamptz`; wedding event timezone remains an IANA string such as `Asia/Jakarta`.

Internal PK/FK uses `BIGINT GENERATED BY DEFAULT AS IDENTITY`. Externally exposed resources use UUID `public_id UUID NOT NULL DEFAULT gen_random_uuid()` with unique indexes. UUID v4 is chosen for broad support and non-predictability; internal joins remain compact. API never exposes sequential IDs.

Relational data is used when uniqueness, filtering, reporting, lifecycle, or independent updates matter. Template-driven visual content is JSONB. Guest, RSVP, wishes, gift accounts, events, media, transaction, ledger, audit, and jobs are not embedded in invitation JSONB.

Soft delete is selective: users, customer profiles, invitations, guests, packages, and media metadata use `deleted_at` where recovery/legal retention is useful. Transactions, quota ledger, entitlement snapshots, audit logs, RSVP history, and invitation versions are immutable/retained and not soft-deleted. Current RSVP and notification can be statused rather than deleted.

# **17 Domain Model**

Major aggregates are CustomerProfile, Package/Entitlement, Entitlement/QuotaLedger, Invitation, TemplateVersion, Guest/RSVP, MediaAsset, Transaction, Notification, AuditLog, and BackgroundJob.

Aggregate invariants:

- Invitation always has one customer profile and one pinned template version.
- A current or historical slug can belong to only one invitation for its lifetime.
- Finalize creates exactly one quota debit and one entitlement snapshot per invitation.
- Current RSVP is unique per guest in guest-list mode or per public RSVP identity in anyone-link mode.
- Media may be deleted only when no current/version reference exists and grace period has elapsed.
- Template version cannot be changed after it is used except through an explicit upgrade/override flow.

# **18 ERD**

<img src="media/rId65.png" style="width:5.83333in;height:3.32411in" alt="Core domain ERD" />

Core domain ERD

Additional supporting entities include `auth_sessions`, `email_verifications`, `password_resets`, `invitation_assignments`, `invitation_slug_history`, `media_usages`, `reserved_slugs`, `wedding_events`, `gift_accounts`, `idempotency_records`, and `notification_preferences`. `quota_accounts` is not required for MVP.

# **19 Core Table Design**

## **19.1 Identity and commercial tables**

| **Table**           | **Important columns and types**                                                                                                                                                                                     | **Constraints and indexes**                                                                     | **Deletion**                                                     |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `users`             | `id BIGINT PK`, `public_id UUID UQ`, `email CITEXT`, `password_hash TEXT NULL`, `role`, `status`, `email_verified_at`, `token_version`, timestamps                                                                  | UQ normalized email; CHECK role/status                                                          | Soft delete; credentials retained per policy                     |
| `customer_profiles` | `id`, `public_id`, `user_id BIGINT NULL`, `name`, `email CITEXT`, `phone`, `notes`, timestamps                                                                                                                      | Partial UQ `user_id` when non-null; email/phone indexes                                         | Soft delete; linkage is explicit                                 |
| `packages`          | `id`, `public_id`, `key`, `name`, `price`, `currency`, `quota`, `active_duration_days`, `eligibility JSONB`, `status`                                                                                               | UQ key; positive checks                                                                         | Disable; snapshots remain                                        |
| `transactions`      | `id`, `public_id`, `customer_profile_id`, `type`, `status`, `package_id NULL`, `invitation_id NULL`, amount fields, `commercial_snapshot JSONB`, `paid_at`, `created_by_admin_id`, timestamps                       | External-reference UQ where supplied; status/type indexes                                       | Status transition only                                           |
| `entitlements`      | `id`, `public_id`, `customer_profile_id`, `source_type`, `transaction_id NULL`, `package_id NULL`, `quota_granted`, `quota_remaining`, `active_duration_days`, `eligibility_snapshot JSONB`, `status`, `granted_at` | CHECK `0 <= quota_remaining <= quota_granted`; customer/status/FIFO index; locked on allocation | Terms retained; `quota_remaining` is authoritative current quota |
| `quota_ledger`      | `id`, `public_id`, `customer_profile_id`, `entitlement_id`, `delta`, `reason_code`, `reference_type`, `reference_public_id`, `actor_user_id`, `reason`, `created_at`                                                | UQ `(reason_code, reference_public_id, entitlement_id)` as applicable; customer/date index      | Append-only; no `balance_after` counter                          |

MVP has no authoritative `quota_accounts.balance`. Current global quota is `SUM(quota_remaining)` over active entitlements. The ledger is immutable history; it is not destructively rewritten. A future materialized cache may be added only as optional and rebuildable, never required for correctness.

## **19.2 Template and invitation tables**

| **Table**                          | **Important columns and types**                                                                                                                                                                                        | **Constraints and indexes**                                      | **Deletion**                                         |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------- |
| `templates`                        | `id`, `public_id`, `template_key`, `name`, `category`, `status`, `commercial_metadata JSONB`                                                                                                                           | UQ template key; status/category indexes                         | Disable used templates                               |
| `template_versions`                | `id`, `public_id`, `template_id`, `version`, `schema_version`, `manifest JSONB`, `manifest_checksum`, `renderer_build_id`, `status`, `released_at`                                                                     | UQ template/version; immutable after use                         | Retain while referenced                              |
| `invitations`                      | `id`, `public_id`, `customer_profile_id`, `template_version_id`, `slug CITEXT`, `state`, `management_mode`, `content JSONB`, hashes and modes, `active_started_at`, `expires_at`, lifecycle timestamps, `lock_version` | Partial UQ current lower slug; customer/state/expires indexes    | Soft delete only where policy permits                |
| `invitation_slug_history`          | `id`, `invitation_id`, `slug CITEXT`, `used_from`, `used_until NULL`, `created_by`, `reason`, `created_at`                                                                                                             | Permanent UQ lower slug; index invitation/time; normalized CHECK | Never deleted; old slugs are tombstones              |
| `invitation_assignments`           | `id`, `public_id`, `invitation_id`, `source_customer_profile_id`, `target_customer_profile_id`, `mode`, `actor_user_id`, `reason`, `idempotency_key_hash`, `created_at`                                                | UQ invitation/idempotency operation; indexes source/target/date  | Append-only                                          |
| `invitation_entitlement_snapshots` | `invitation_id PK/FK`, `entitlement_id`, `package_key`, `active_duration_days`, `eligibility JSONB`, `snapshot JSONB`, `created_at`                                                                                    | One per finalized invitation                                     | Immutable                                            |
| `invitation_versions`              | `id`, `public_id`, `invitation_id`, `sequence`, `content JSONB`, `content_hash`, `template_version_id`, `created_by`, `restored_from_id`, `created_at`                                                                 | UQ invitation/sequence                                           | Prune beyond 10 after media reference reconciliation |
| `reserved_slugs`                   | `slug CITEXT PK`, `source`, `hard_reserved`, timestamps                                                                                                                                                                | Normalized CHECK                                                 | Hard rows cannot be removed                          |

Creating an invitation inserts its initial slug-history row in the same transaction. Admin slug override closes the active row (`used_until=now`), updates `invitations.slug`, and inserts the new permanent history row. Availability checks cover current, reserved, and historical values; database unique constraints remain the final arbiter.

## **19.3 Guest and content support tables**

| **Table**        | **Important columns and types**                                                                                                                    | **Constraints and indexes**                            | **Deletion**                            |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | --------------------------------------- |
| `guests`         | `id`, `public_id`, `invitation_id`, `name`, `normalized_name`, `max_pax`, `token_hash BYTEA`, `token_version`, `manual_status`, timestamps         | UQ token hash; invitation/name index; pax CHECK        | Soft delete invalidates token           |
| `rsvps`          | `id`, `public_id`, `invitation_id`, `guest_id NULL`, `mode`, `name`, `attendance`, `pax`, `message`, `edit_token_hash NULL`, `version`, timestamps | UQ active guest; UQ edit hash; invitation/status index | Statused, not destructive               |
| `rsvp_history`   | `id`, `rsvp_id`, `version`, `snapshot JSONB`, `actor_type`, `actor_id NULL`, `created_at`                                                          | UQ RSVP/version                                        | Append-only                             |
| `wishes`         | `id`, `public_id`, `invitation_id`, `guest_id NULL`, `rsvp_id NULL`, `display_name`, `body`, `status`, timestamps                                  | invitation/status/date indexes; length CHECK           | Hide/soft delete with moderation record |
| `gift_accounts`  | `id`, `public_id`, `invitation_id`, type/provider/account fields, `display_order`, `is_visible`                                                    | Max two enforced transactionally                       | Soft delete                             |
| `wedding_events` | `id`, `public_id`, `invitation_id`, `event_key`, title/time/timezone/location/link fields, `rundown JSONB`, `display_order`                        | UQ invitation/event key; time checks                   | Soft delete                             |

Raw guest and RSVP edit tokens are never stored. Short-lived exchanged guest-context sessions may be represented in signed/encrypted cookies or a hash-only session table if revocation beyond the guest token is required.

## **19.4 Media, operational, and async tables**

| **Table**             | **Important columns and types**                                                                                           | **Constraints and indexes**                          | **Deletion**                         |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------ |
| `media_assets`        | identifiers, owner, kind/status, storage key, MIME/size/checksum/dimensions/duration, variants, `orphaned_at`, timestamps | UQ storage key/checksum as appropriate; status index | Grace cleanup after zero references  |
| `media_usages`        | asset, reference type/id, field path, created at                                                                          | UQ asset/reference/field                             | Delete only when reference is pruned |
| `notifications`       | public ID, user, type, payload, read/create times                                                                         | user/read/date index                                 | Retention-configurable               |
| `audit_logs`          | actor, action, target, before/after, reason, request ID, created at                                                       | actor/target/date indexes                            | Append-only, restricted              |
| `background_jobs`     | public ID, type/payload, status/attempt/lease times, error, dedupe key                                                    | status/available and dedupe indexes                  | Retain failures; completed retention |
| `idempotency_records` | scope, key hash, actor, request hash, status, stored response, expiry                                                     | UQ scope/actor/key                                   | Expire by policy                     |

# **20 Invitation Lifecycle**

<img src="media/rId74.png" style="width:5.83333in;height:3.30582in" alt="Corrected invitation lifecycle and extension state machine" />

Corrected invitation lifecycle and extension state machine

| **From**                        | **Action or condition**   | **To**        | **Guard and effects**                                                                             |
| ------------------------------- | ------------------------- | ------------- | ------------------------------------------------------------------------------------------------- |
| DRAFT                           | Finalize                  | FINALIZED     | Valid content; consume one eligible entitlement unit; snapshot terms; lock Customer slug/template |
| DRAFT                           | Cancel                    | CANCELLED     | No quota impact                                                                                   |
| FINALIZED, never published      | Publish first time        | PUBLISHED     | Set `active_started_at=now`; set `expires_at=now+snapshot duration`                               |
| FINALIZED, previously published | Publish again             | PUBLISHED     | Retain future `expires_at`; reject when already due/expired                                       |
| PUBLISHED                       | Unpublish                 | FINALIZED     | Timer continues; `active_started_at` and `expires_at` unchanged                                   |
| FINALIZED or PUBLISHED          | Expiration predicate true | EXPIRED       | `active_started_at IS NOT NULL AND expires_at <= now()`                                           |
| PUBLISHED                       | Extend                    | PUBLISHED     | Extend expiry; remains public; no republish                                                       |
| FINALIZED, previously published | Extend                    | FINALIZED     | Extend expiry; remains unpublished                                                                |
| EXPIRED                         | Extend                    | FINALIZED     | New expiry; explicit Publish required                                                             |
| FINALIZED, never published      | Extend                    | no transition | Reject `409 INVALID_EXTENSION_STATE`; timer has not started                                       |
| FINALIZED/PUBLISHED/EXPIRED     | Cancel                    | CANCELLED     | No automatic quota return                                                                         |

Expiration applies even after Unpublish. The worker executes:

    UPDATE invitations
    SET state = 'EXPIRED', updated_at = now()
    WHERE active_started_at IS NOT NULL
      AND expires_at <= now()
      AND state IN ('FINALIZED', 'PUBLISHED');

The update is batched and idempotent. Public read independently requires `state='PUBLISHED' AND expires_at > now()`, so worker delay never exposes an expired invitation. Invalid transitions return `409 INVALID_STATE_TRANSITION` with current state and allowed actions.

Extension uses `new_expires_at = max(now, existing_expires_at) + extension_duration` inside a row-locked transaction. The idempotency record, extension transaction reference, and unique audit/reference key prevent a retry from extending twice.

# **21 Package Entitlement and Quota Design**

Manual transaction confirmation creates an immutable entitlement snapshot, sets `quota_granted` and `quota_remaining`, and appends a grant ledger row in one transaction. Package edits never mutate prior entitlement terms.

`entitlements.quota_remaining` is the sole authoritative current quota. Global remaining quota is `SUM(quota_remaining)` for active entitlements. `quota_ledger` is append-only history and carries no authoritative `balance_after`. `quota_accounts` and scheduled counter reconciliation are not required for MVP.

Finalize performs, in one database transaction:

1.  Lock the invitation and idempotency record; require `DRAFT`.
2.  Select eligible active entitlement rows for the owner in FIFO order by `granted_at, id`, with `quota_remaining > 0`, and lock the selected row using `FOR UPDATE`.
3.  Revalidate template/package eligibility and decrement exactly one row with a guarded update.
4.  Append one ledger debit with unique finalize reference.
5.  Create the invitation entitlement snapshot and set `FINALIZED`.
6.  Commit the notification job/outbox intent in the same transaction.

Concurrent finalize calls serialize on invitation/entitlement locks. A duplicate idempotency key returns the stored result. A different concurrent key loses the `DRAFT` guard or unique debit reference and cannot consume a second unit.

Positive Admin adjustment creates an `ADMIN_GRANT` entitlement with explicit duration and eligibility, plus ledger and audit rows. Negative adjustment locks eligible entitlement rows and decrements available units without going below zero; it appends compensating ledger entries and never rewrites history. Cancellation does not credit quota automatically.

# **22 Transaction Design**

States are `PENDING`, `PAID`, `CANCELLED`, and `REFUNDED`.

| **From**  | **To**    | **Rule**                                                                      |
| --------- | --------- | ----------------------------------------------------------------------------- |
| PENDING   | PAID      | Admin confirms payment; transactionally grant entitlement/quota or extension  |
| PENDING   | CANCELLED | No grant                                                                      |
| PAID      | REFUNDED  | Record commercial refund; quota is not automatically reversed if already used |
| CANCELLED | PENDING   | Not allowed; create new transaction                                           |

MVP uses one commercial purpose per transaction: `DIGITAL_PACKAGE`, `EXTENSION`, or `PRINTED`. `transaction_items` is intentionally omitted to avoid an ecommerce engine. `commercial_snapshot` stores package name, amount, quota, duration, and eligibility at confirmation. Confirmation is idempotent through unique grant reference and idempotency record.

# **23 Template Engine Architecture**

<img src="media/rId80.png" style="width:5.83333in;height:3.30582in" alt="Template architecture and schema compatibility contract" />

Template architecture and schema compatibility contract

Each template has a stable `templateKey` and immutable integer version. Backend stores the exact manifest, checksum, `schemaVersion`, and renderer build ID; frontend maintains a lazy renderer registry keyed by `templateKey@version`. Invitation pins the version, so a later release never silently changes existing output.

The backend owns the allowlist of supported manifest schema versions and rejects unknown versions. Supporting a new template version under an already-supported schema needs no validator rollout. Introducing a new schema requires backend validator compatibility before frontend registration can rely on it. Old schema validators and renderers remain available while pinned invitations reference them.

Standard section types remain opening, couple, event, gallery, love_story, quote, rsvp, wish, gift, and closing. Each manifest entry represents a section instance: id MUST be unique within one template version, while type identifies the reusable section definition. Singleton sections may use id equal to type (for example rsvp), while repeatable presentation sections may appear multiple times with the same type but different ids (for example quote-opening and quote-closing, both type=quote). Whether a type is repeatable is defined by its section capability; domain feature sections such as rsvp, wish, and gift remain singleton unless explicitly designed otherwise. Custom types use a template namespace. Unknown/custom draft data remains in orphanedSections during an explicit template switch.

# **24 Template Manifest Specification**

Manifest is JSON-compatible, versioned, developer-controlled, and backend-validated.

    {
      "schemaVersion": 1,
      "templateKey": "elegant-01",
      "version": 2,
      "rendererKey": "elegant-01@2",
      "capabilities": {"supportsRundown": false},
      "sections": [
        {
          "id": "gallery",
          "type": "gallery",
          "order": 40,
          "canHide": true,
          "fields": [
            {"key": "images", "type": "images", "required": false, "max": 5}
          ]
        }
      ]
    }

Required field metadata includes key, type, label key, required flag, constraints, default, and capabilities. Backend rejects unsupported or unknown schemaVersion, duplicate section instance ids, duplicate field keys within the same section instance, unsupported field type, invalid constraint, renderer mismatch, checksum mismatch, or any attempt to replace an existing (templateKey, version) with different bytes. Multiple section instances may share the same type only when that section type is declared repeatable.

The JSON Schema is versioned in both repositories. Backend exposes supported schema versions, for example `{supportedSchemaVersions:[1,2]}`. Frontend CI validates locally and checks target-environment compatibility. Removal of old schema support is prohibited while a non-deleted invitation pins a template version using that schema.

# **25 Template Versioning**

<img src="media/rId85.png" style="width:5.83333in;height:3.62041in" alt="Template release order for same and new manifest schema" />

Template release order for same and new manifest schema

**Case A - same supported manifest schema.** Frontend renderer implementation and CI complete first; deploy the renderer build; register/sync the manifest; backend validates the already-supported schema, checksum, and build ID; then Admin enables the template version.

**Case B - new manifest schema.** Deploy backend validator support for the new `schemaVersion` while retaining old support; deploy the frontend renderer; register the new manifest; backend validates schema/checksum/build; then Admin enables it. Registration before validator support returns `422 UNSUPPORTED_MANIFEST_SCHEMA` and performs no mutation.

Template status remains `DRAFT`, `AVAILABLE`, or `DISABLED`. Disabling stops new selection but never breaks pinned invitations. Explicit upgrade performs a dry-run compatibility check, creates migrated candidate content, and commits version/content together only after confirmation. Migration is a pure versioned function. Automatic global upgrade is outside MVP.

# **26 Invitation Content Model**

    {
      "contractVersion": 1,
      "template": {"key": "elegant-01", "version": 2},
      "sections": {
        "opening": {"enabled": true, "data": {"greeting": "..."}},
        "quote-opening": {"enabled": true, "data": {"text": "...", "author": "..."}},
        "gallery": {"enabled": true, "data": {"mediaIds": ["uuid"]}},
        "quote-closing": {"enabled": true, "data": {"text": "...", "author": "..."}}
      },
      "orphanedSections": {
        "manga_episode": {"sourceTemplate": "manga-01@1", "data": {}}
      },
      "sectionOrder": ["opening", "quote-opening", "couple", "event", "gallery", "quote-closing", "rsvp", "closing"]
    }

Keys di sections dan nilai di sectionOrder adalah section instance ids, bukan section type; karena itu satu template dapat memiliki beberapa instance dengan type yang sama tanpa collision data. sectionOrder disimpan pada Phase 1 tetapi Customer tidak dapat mengubahnya; nilai berasal dari manifest. Ini membuat Phase 2 reorder menjadi perubahan capability, bukan redesign. Hidden section mempertahankan data. Save memvalidasi content terhadap pinned manifest, verifies referenced media ownership/readiness, computes canonical content hash, dan hanya membuat version baru ketika hash berubah.

# **27 Builder and Preview Architecture**

Initial content dan manifest di-load dari backend. React Hook Form menjadi source of local editing state; form dan `TemplateRenderer(mode="preview")` membaca state yang sama. Typing hanya mengubah local state. Explicit Save mengirim satu normalized payload dengan `If-Match` atau `lockVersion` untuk mencegah lost update. Conflict menghasilkan `409 VERSION_CONFLICT` dan pilihan reload/copy changes.

Shared renderer digunakan oleh preview dan public path. Preview disables submission, external payment-like actions, and uncontrolled navigation. Expensive renderer is dynamically imported; template registry maps exact version so browser tidak memuat seluruh template bundle.

# **28 Version History**

Setiap successful explicit Save membuat snapshot bila `content_hash` berbeda. Sistem menyimpan 10 recent restorable versions per invitation. Pruning dilakukan setelah transaction commit dan menjaga media usages. Restore membuat new current version dengan `restored_from_id`; versions sesudah target tidak dihapus.

Version history adalah customer recovery feature dan menyimpan content snapshot. Audit log adalah operational/security record dan menyimpan actor/action/reason/before/after. Customer tidak memperoleh raw Admin audit.

# **29 Media Architecture**

`StorageProvider` menyediakan `Put`, `Open`, `Delete`, `Head`, dan `GetDeliveryURL`. Adapter MVP adalah `LocalStorage` untuk development dan `S3CompatibleStorage` untuk production candidate. Domain hanya menyimpan opaque storage key.

Production bucket/origin private. Upload memakai short-lived authorization ke temporary private key atau API streaming untuk deployment sederhana. Worker validates bytes, MIME sniffing, size, image dimensions, and codec. Public delivery uses a stable CDN/origin URL mapped only to processed safe objects; write permission never public. Authorization protects upload and management, while published media is intentionally cacheable.

## **29.1 Images**

Max 10 MB. Decode actual image, reject decompression bomb/dangerous dimensions, strip EXIF/GPS, correct orientation, and generate WebP thumbnail about 320 px, medium 960 px, and large 1600 px. Recommendation: retain original privately while referenced by the latest 10 versions to enable recovery/reprocessing; delete when no references and retention permits.

## **29.2 Audio and video**

Audio max 15 MB; accept validated MP3/M4A/OGG subset based on tested browsers. Playback begins only after Open Invitation user gesture and fails gracefully when autoplay blocked. Video max 50 MB; accept browser-compatible MP4 H.264/AAC and WebM profiles. No transcoding; unsupported codec is rejected with actionable message. High demand triggers migration to dedicated media service.

## **29.3 Replacement and cleanup**

<img src="media/rId94.png" style="width:5.83333in;height:3.61875in" alt="Image upload and processing" />

Image upload and processing

`media_usages` records current content and each retained invitation version reference. Replaced asset becomes orphan candidate only when current usage is removed. Cleanup after seven days rechecks zero usages under transaction before deletion. Provider delete is idempotent; failed delete retries without losing metadata.

# **30 Guest Management**

Guest supports name, max pax, token hash/version, manual status, and soft delete. Personalized token is 256-bit random, base64url encoded, hash-only in DB, revocable, and regenerated explicitly. Display name query parameter is presentation only.

Import flow is upload, parse, preview, validation, duplicate detection, selection of Skip or Update, then confirm. Duplicate recommendation is normalized exact name plus optional normalized phone/email when supplied; ambiguous rows remain visible for user choice. No fuzzy automatic merge. Imports up to recommendation 1,000 rows may run synchronously; larger import uses a job. Confirm request has import batch ID and idempotency key. Invalid rows do not partially mutate unless user explicitly confirms valid-only import; result reports per-row outcome.

# **31 Personalized Guest Link**

Canonical personalized format is `/raka-ayu?to=widdy#t=<opaque-token>`. The fragment is not sent in the initial HTTP request. `to` is presentation only and must never be trusted for identity. The token is 256-bit random, base64url encoded, hash-only in the database, invitation-bound, revocable, and never replaced with a predictable guest ID.

Exchange flow:

1.  Browser receives anonymous SSR/public invitation.
2.  Client code reads `#t` after hydration and posts the raw value in the JSON body to `/api/v1/public/invitations/{slug}/guest-context`.
3.  API hashes and constant-time compares the token, validates invitation and guest state, and returns only name, max pax, and current RSVP.
4.  API may mint a short-lived HttpOnly, Secure, SameSite=Lax guest-context cookie scoped to the invitation public API path; raw guest token is not returned or persisted client-side.
5.  Client immediately uses `history.replaceState` to remove the fragment and keeps non-sensitive context in memory.

The SSR limitation is intentional: personalized greeting/RSVP state appears after hydration, while the anonymous invitation remains renderable and cacheable. Access/proxy/application logs must not record request bodies, cookies, authorization values, fragments, or full invitation URLs. Set `Referrer-Policy: strict-origin` or stricter. Regeneration increments token version and replaces the stored hash; prior links fail.

# **32 RSVP Architecture**

<img src="media/rId101.png" style="width:5.83333in;height:3.62707in" alt="Fragment token exchange and public RSVP flow" />

Fragment token exchange and public RSVP flow

Guest List Only uses the exchanged guest context, enforces `pax <= max_pax`, and upserts one current RSVP per guest. The friendly `to` query never selects a guest. If token exchange fails, the page stays anonymous and guest-only submission remains unavailable without leaking whether a guest exists.

Anyone With Link validates name, attendance, and pax; creates current RSVP plus a random edit-token hash; and returns the raw edit token once. The edit token also uses a fragment such as `#rsvp-edit=<token>`, is posted in a JSON exchange/update body or protected header, and is removed from visible history after use. Owner updates use the authenticated application API.

Every mutation locks current RSVP or uses optimistic `version`, updates the current row, and appends `rsvp_history` in the same transaction. Client idempotency prevents duplicate history. Export remains synchronous for small datasets and job-based for larger datasets.

# **33 Wishes**

Wish body is plain text with Unicode/emoji, normalized line endings, length recommendation 1 to 1,000 characters, output-encoded by React, and never interpreted as HTML. `PUBLISH_IMMEDIATELY` creates visible status; `REQUIRE_APPROVAL` creates pending. Owner/Admin can approve, hide, or delete with authorization.

Identity is guest token, RSVP identity/edit token, or required display name depending RSVP mode. Rate limiting is applied per invitation, endpoint, guest token, and privacy-preserving IP HMAC. CAPTCHA is not shown by default; adaptive CAPTCHA remains future.

# **34 Digital Gift**

Gift is display only. `gift_accounts` supports BANK and EWALLET with maximum two visible financial destinations, transactionally checked under invitation lock. Optional physical address is stored separately in invitation gift settings or dedicated address row. Public response returns only configured display data. Platform never processes transfer, QR payment, or confirmation.

# **35 Wedding Event Model**

Wedding events are relational because timezone, ordering, validation, and future check-in/event reporting have independent behavior. Store instants as UTC `timestamptz` and IANA timezone string. `event_key` remains stable per invitation. End must be after start. Maps and livestream URLs use scheme/host validation; embed is generated from trusted mapping rules rather than arbitrary HTML.

# **36 Notification Architecture**

Web notifications are database rows loaded on dashboard refresh; WebSocket is unnecessary. Email intents are jobs. Required events include package activated, quota granted, finalized, published, expiration approaching, and expired. RSVP/wish digest preferences support `WEB_ONLY`, `DAILY_DIGEST`, or `DISABLED_EMAIL` while critical lifecycle emails cannot be fully disabled where operationally required.

`EmailProvider` has Mailpit development and SendGrid candidate adapters. Typed templates receive safe structured data. Provider message key prevents duplicate sends where supported.

<img src="media/rId108.png" style="width:5.83333in;height:3.61875in" alt="Asynchronous email delivery" />

Asynchronous email delivery

# **37 Background Job Architecture**

<img src="media/rId112.png" style="width:5.83333in;height:3.61875in" alt="Database backed worker" />

Database backed worker

Worker claims due jobs in short transactions using `FOR UPDATE SKIP LOCKED`, marks PROCESSING with lease/worker ID, commits, then executes. Completion updates status. Retryable error uses exponential backoff with jitter; non-retryable error or max attempts becomes FAILED. A reaper returns stale PROCESSING jobs to PENDING after lease expiry.

Delivery is at-least-once; handler idempotency is mandatory. Email uses logical message key, media uses asset/version, import uses batch ID, expiration uses invitation/expiry, and cleanup verifies references again. Payload stores public identifiers and version, not secrets. Future queue migration replaces job adapter and dispatcher, not domain service contracts.

# **38 Analytics**

Marketing uses Google Analytics and Search Console. Product uses `Analytics.Track(ctx, Event)` with PostHog as recommendation. Events include registration, template preview/select, draft create/save, package activation, quota grant, finalize, publish/unpublish/expire, guest import, RSVP, wish, and extension.

Invitation view counts are eventually consistent. Unique view uses a privacy-conscious anonymous visitor ID plus short retention HMAC of IP/user-agent where permitted, never raw IP as sole identifier. Analytics failure must not fail customer business operations.

# **39 Audit Logging**

Audit rows are append-only and include actor, action, target, UTC timestamp, before, after, reason, request ID, and optional source IP HMAC. Mandatory actions include quota adjustment, transaction status, package edit, slug/template override, cancel, extension, assignment, user deactivation, and Admin invitation modification.

Ownership assignment audit records source profile, target profile/user, selected mode (`LINK_SOURCE_PROFILE` or `ASSIGN_INVITATION_ONLY`), invitation, idempotency reference, and reason. Slug override records old/new slug and the created tombstone/history rows. Quota audit references immutable entitlement and ledger rows; no audit operation rewrites a ledger.

Before/after data is field-filtered: never password hashes, raw refresh or guest tokens, cookies, CSRF values, full account secrets, or provider credentials. Access is ADMIN-only and may itself be logged for sensitive views.

# **40 REST API Design**

All endpoints use `/api/v1`. In browser examples, the base is the current same-origin application host; the BFF forwards the unchanged API path to Go. `api.webwedding.com` remains the backend origin, not the normal authenticated browser target. Public IDs are UUIDs, lists use cursor pagination, and mutations use JSON except uploads/imports.

## **40.1 Auth and session routes**

| **Same-origin method and path**       | **Host/audience**    | **Purpose**                           | **Important controls**                                            |
| ------------------------------------- | -------------------- | ------------------------------------- | ----------------------------------------------------------------- |
| `POST /api/v1/auth/customer/register` | app / public         | Register Customer                     | normalized email idempotency window                               |
| `POST /api/v1/auth/customer/login`    | app / CUSTOMER       | Login                                 | host/audience binding; host-only Customer cookies; CSRF bootstrap |
| `POST /api/v1/auth/admin/login`       | admin / ADMIN        | Login                                 | ADMIN role required; host-only Admin cookies                      |
| `POST /api/v1/auth/refresh`           | current app audience | Rotate token family                   | reuse detection; exact host/audience                              |
| `POST /api/v1/auth/logout`            | current app audience | Revoke current session                | expires current host cookies; state-idempotent                    |
| `GET /api/v1/auth/session`            | current app audience | SSR/client session and CSRF bootstrap | minimal identity; backend-authoritative                           |
| `GET /api/v1/auth/google/start`       | app / CUSTOMER       | Start OAuth                           | PKCE, nonce, state binds host/audience/return path                |
| `GET /api/v1/auth/google/callback`    | app / CUSTOMER       | Complete OAuth                        | exact callback; never creates ADMIN                               |
| `POST /api/v1/auth/email/verify`      | app / public token   | Verify email                          | single-use token                                                  |
| `POST /api/v1/auth/password/forgot`   | audience login host  | Request reset                         | generic response                                                  |
| `POST /api/v1/auth/password/reset`    | audience login host  | Reset                                 | revoke sessions                                                   |
| `GET/PATCH /api/v1/users/me`          | Customer/Admin       | Read/update own profile               | audience, CSRF on PATCH                                           |

## **40.2 Templates and invitations**

| **Method and path**                                   | **Auth**              | **Purpose and major behavior**                                     | **Errors/idempotency**                         |
| ----------------------------------------------------- | --------------------- | ------------------------------------------------------------------ | ---------------------------------------------- |
| `GET /templates`                                      | Public                | Enabled summaries                                                  | cacheable                                      |
| `GET /templates/{key}/versions/{version}`             | Public                | Exact manifest/preview metadata                                    | 404 unavailable                                |
| `POST /invitations`                                   | Customer              | Create draft and initial permanent slug-history row                | `SLUG_TAKEN`; idempotency recommended          |
| `GET /invitations`                                    | Customer              | Owner-scoped summaries                                             | cursor                                         |
| `GET /invitations/{id}`                               | Owner/Admin           | Editor aggregate                                                   | 404 concealment                                |
| `PATCH /invitations/{id}/content`                     | Owner/Admin           | Explicit Save and version                                          | `If-Match`; Admin reason if override           |
| `POST /invitations/{id}/template-change/check`        | Owner/Admin           | Compatibility dry run                                              | warnings/token                                 |
| `POST /invitations/{id}/template-change`              | Owner/Admin           | Confirmed change/override                                          | incompatibility; reason where sensitive        |
| `POST /invitations/{id}/finalize`                     | Owner/Admin           | Lock eligible entitlement, decrement one, ledger debit, snapshot   | Idempotency-Key required                       |
| `POST /invitations/{id}/publish`                      | Owner/Admin           | First or repeat publish                                            | preserves timer; idempotency required          |
| `POST /invitations/{id}/unpublish`                    | Owner/Admin           | PUBLISHED to FINALIZED                                             | timer unchanged                                |
| `POST /invitations/{id}/cancel`                       | Owner/Admin           | Cancel                                                             | no quota return; Admin reason                  |
| `GET /invitations/{id}/versions`                      | Owner/Admin           | Recent 10 versions                                                 | cursor/recent                                  |
| `POST /invitations/{id}/versions/{versionId}/restore` | Owner/Admin           | New current version                                                | lockVersion                                    |
| `GET /public/invitations/{slug}`                      | Public                | Anonymous public view model                                        | requires PUBLISHED and future expiry           |
| `POST /public/invitations/{slug}/guest-context`       | Public token exchange | Token in JSON body; return minimal context and short guest session | no-store; rate limit; invalid token is generic |

## **40.3 Media, guests, RSVP, wishes, and gifts**

| **Method and path**                                        | **Auth**                 | **Purpose**                   | **Errors/idempotency**       |
| ---------------------------------------------------------- | ------------------------ | ----------------------------- | ---------------------------- |
| `POST /media/uploads`                                      | Owner/Admin              | Start validated upload        | eligibility/limits           |
| `POST /media/uploads/{id}/complete`                        | Owner/Admin              | Complete and process          | idempotent upload ID         |
| `GET/DELETE /media/{id}`                                   | Owner/Admin              | Status or safe delete         | reference conflict           |
| `GET/POST /invitations/{id}/guests`                        | Owner/Admin              | List/create guest             | duplicate validation         |
| `PATCH/DELETE /invitations/{id}/guests/{guestId}`          | Owner/Admin              | Update/delete guest           | delete invalidates token     |
| `POST /invitations/{id}/guests/{guestId}/regenerate-token` | Owner/Admin              | Issue new fragment URL        | idempotency recommended      |
| `POST /invitations/{id}/guest-imports/preview`             | Owner/Admin              | Validate CSV/XLSX             | no mutation                  |
| `POST /invitations/{id}/guest-imports/{batchId}/confirm`   | Owner/Admin              | Confirm import                | Idempotency-Key required     |
| `GET /invitations/{id}/guest-export`                       | Owner/Admin              | Export                        | file or job                  |
| `GET/PATCH /invitations/{id}/rsvps...`                     | Owner/Admin              | Current RSVP/report/update    | optimistic version           |
| `POST /public/invitations/{slug}/rsvps`                    | Guest context or public  | Submit Guest List/Anyone mode | pax, rate limit, idempotency |
| `PATCH /public/invitations/{slug}/rsvps/current`           | Guest context/edit token | Update                        | invalid token/version        |
| `GET/POST /public/invitations/{slug}/wishes`               | Public identity          | Visible list/submit           | rate limit; plain text       |
| `GET/PATCH /invitations/{id}/wishes`                       | Owner/Admin              | Moderation                    | audit Admin override         |
| `GET/PUT /invitations/{id}/gifts`                          | Owner/Admin              | Max two accounts/address      | transactional limit          |

## **40.4 Commercial and Admin**

| **Method and path**                                   | **Auth**             | **Purpose and transaction rule**                                         | **Errors/idempotency**                                     |
| ----------------------------------------------------- | -------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------- |
| `GET /packages`                                       | Public               | Enabled package data                                                     | cacheable                                                  |
| `GET /quota`                                          | Customer             | `SUM(active entitlements.quota_remaining)` plus ledger page              | no `quota_accounts` dependency                             |
| `GET /notifications`; `POST /notifications/{id}/read` | Owner                | Web notifications                                                        | cursor/state-idempotent                                    |
| `POST /admin/transactions`                            | Admin                | Create PENDING commercial record                                         | idempotency recommended                                    |
| `POST /admin/transactions/{id}/confirm`               | Admin                | PAID plus entitlement grant or extension                                 | Idempotency-Key required                                   |
| `POST /admin/quota-adjustments`                       | Admin                | Create grant or guarded entitlement reductions plus ledger/audit         | Idempotency-Key required                                   |
| `POST /admin/invitations`                             | Admin                | Managed draft and slug history                                           | idempotency recommended                                    |
| `POST /admin/invitations/{id}/assign`                 | Admin                | `targetUserId`, reason; service selects Case A or Assign Invitation Only | Idempotency-Key required                                   |
| `POST /admin/invitations/{id}/extend`                 | Admin                | Apply state-specific extension formula                                   | Idempotency-Key required; reject never-published FINALIZED |
| `POST /admin/invitations/{id}/override-slug`          | Admin                | Close old history, insert new tombstone/current row                      | reason; collision across current/reserved/history          |
| `POST /admin/invitations/{id}/override-template`      | Admin                | Checked migration/override                                               | reason; compatibility failure                              |
| `POST /admin/template-versions/register`              | Release credential   | Manifest/checksum/build                                                  | unsupported schema rejected; duplicate mismatch conflict   |
| `PATCH /admin/templates/{id}`                         | Admin                | Commercial metadata/status                                               | cannot edit manifest bytes                                 |
| `PATCH /admin/users/{id}/status`                      | Admin                | Activate/deactivate                                                      | revoke sessions                                            |
| `GET /admin/audit-logs`                               | Admin                | Restricted audit                                                         | logged where needed                                        |
| `POST /analytics/events`                              | Public/authenticated | Allowlisted typed events                                                 | best effort; rate limited                                  |

Admin assignment response includes `assignmentMode`, source/target profile public IDs, invitation owner, and unchanged-commercial-data summary. Extension response includes prior/new state and expiry. No endpoint silently performs a commercial-profile merge.

# **41 Validation and Error Model**

    {
      "error": {
        "code": "QUOTA_EXHAUSTED",
        "message": "Kuota invitation tidak tersedia.",
        "fieldErrors": [],
        "metadata": {"allowedAction": "CONTACT_ADMIN"},
        "requestId": "req_..."
      }
    }

| **HTTP** | **Error examples**                                                                                                  | **Meaning**                                            |
| -------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| 400      | `INVALID_REQUEST`, `INVALID_MEDIA`                                                                                  | malformed or unsafe request                            |
| 401      | `AUTH_REQUIRED`, `SESSION_EXPIRED`, `ACCOUNT_INACTIVE`                                                              | no valid session                                       |
| 404      | `RESOURCE_NOT_FOUND`                                                                                                | absent or deliberately concealed unauthorized resource |
| 409      | `SLUG_TAKEN`, `INVALID_STATE_TRANSITION`, `INVALID_EXTENSION_STATE`, `VERSION_CONFLICT`, `DUPLICATE_OPERATION`      | valid syntax but conflicting state                     |
| 422      | `VALIDATION_FAILED`, `QUOTA_EXHAUSTED`, `RSVP_PAX_EXCEEDED`, `TEMPLATE_INCOMPATIBLE`, `UNSUPPORTED_MANIFEST_SCHEMA` | business/field validation                              |
| 429      | `RATE_LIMITED`                                                                                                      | retry after safe duration                              |
| 500      | `INTERNAL_ERROR`                                                                                                    | no internal detail leaked                              |
| 503      | `DEPENDENCY_UNAVAILABLE`                                                                                            | temporary storage/provider/database issue              |

Frontend Zod improves feedback; backend repeats all validation and owns business rules. GORM parameterization prevents SQL injection; raw SQL uses bind parameters only.

# **42 Security**

| **Area**         | **Control**                                                                                                                               |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Authentication   | Same-origin BFF, short JWT access token, rotating hash-only refresh token, family revocation, verified email.                             |
| Cookie isolation | Distinct Secure/HttpOnly host-only Customer and Admin cookies; exact audience; wildcard auth cookie prohibited.                           |
| Backend trust    | Proxy strips untrusted forwarding/identity headers; authenticated/private upstream; Go independently validates session and authorization. |
| Authorization    | Role middleware, owner-scoped repository queries, state guard, and cross-role concealment.                                                |
| CSRF             | Same-origin requests, synchronizer token header, exact Origin/Referer validation, SameSite=Lax defense-in-depth.                          |
| CORS             | No credentialed Customer/Admin CORS to API origin; explicit non-credentialed public allowlist only when required.                         |
| XSS              | Plain-text wishes, React escaping, no arbitrary HTML, strict template-specific CSP.                                                       |
| Upload           | MIME sniff, decoder validation, body/dimension limits, random keys, EXIF/GPS strip.                                                       |
| Object access    | Private origin, signed upload, stable processed delivery path, no public write.                                                           |
| Slug safety      | Permanent history/tombstone plus reserved/current checks; old slug never reassigned.                                                      |
| Guest token      | 256-bit opaque, hash-only, fragment transport, JSON-body exchange, minimal context, immediate fragment removal.                           |
| Logging/privacy  | Never log bodies/tokens/cookies/full URLs/account numbers; strict referrer policy and PII scrubbing.                                      |
| Rate limit       | Per-instance limiter initially plus edge limit where available; public abuse key uses privacy-preserving IP HMAC.                         |
| Admin action     | Role, reason, idempotency, audit; re-auth may be added for highest-risk operations.                                                       |
| Secrets          | Environment/secret manager, never repository/logs; documented rotation.                                                                   |
| Headers          | HSTS, CSP, Referrer-Policy, X-Content-Type-Options, frame-ancestors, Permissions-Policy.                                                  |
| Request safety   | JSON/body limits, timeouts, decompression limits, embed URL allowlist.                                                                    |
| Dependencies     | Lock files, vulnerability scanning, controlled upgrades, SBOM where available.                                                            |

User deactivation blocks login, revokes sessions, and prevents dashboard access. Published invitation remains public until unpublished, expired, or cancelled; deactivation does not silently destroy a paid event. Admin may operationally unpublish with audit.

# **43 Caching and Performance**

Public read endpoint returns a purpose-built view model using slug indexed lookup, state/expiry check, pinned template metadata, content, visible events/gifts, and optional minimal guest personalization. Dashboard, audit, transaction, and entire guest list are never joined.

Anonymous public response can use short CDN/application TTL and ETag based on invitation `public_revision`. Anonymous SSR remains cacheable. Guest-context exchange and personalized responses are `private, no-store`; the fragment itself never reaches the server. Publish, unpublish, save, moderation, and expiry increment revision and issue cache purge when provider supports it. Without CDN, correctness remains database-backed.

| **Bottleneck**     | **MVP**                              | **Scaling path**                        |
| ------------------ | ------------------------------------ | --------------------------------------- |
| Public reads       | Indexed query and compact view model | CDN/edge cache, read replica if proven  |
| Images             | Processed WebP variants              | CDN and dedicated image service         |
| Template bundle    | Dynamic import exact renderer        | route-level prefetch and bundle budgets |
| Large media        | limits and no transcoding            | dedicated video provider                |
| Bulk import/export | DB job beyond threshold              | dedicated queue/storage-generated files |
| Email              | worker retries/digest                | provider webhooks and external queue    |
| Analytics          | best effort async provider           | batching/warehouse only when needed     |

# **44 Observability**

Structured JSON logs contain timestamp, level, service, environment, request ID, trace/correlation ID, user public ID when safe, route template, latency, status, error code, and job ID. Never log raw tokens, passwords, account numbers, full guest links, or media credentials.

Metrics cover request rate/latency/error, DB pool and slow query, transaction rollback, quota/finalize conflict, job depth/age/failure, email result, media failure/duration, and public read latency. Sentry or equivalent captures exceptions with PII scrubbing. MVP alerting may be dashboard/manual, but failed job count and API error spikes require notification.

# **45 Deployment Architecture**

<img src="media/rId127.png" style="width:5.83333in;height:3.30582in" alt="Provider agnostic deployment with same-origin BFF" />

Provider agnostic deployment with same-origin BFF

Images/containers remain `frontend`, `api`, `worker`, and one-shot `migrate`. The edge routes apex/app/admin to Next.js and routes the API origin to Go. Authenticated browser calls terminate on app/admin and pass through the Next.js BFF to the backend over private/authenticated ingress. The API origin exposes health/service access and remains protected if public routing is unavoidable.

PostgreSQL, object storage, email, analytics, and error monitoring may be managed services. No Kubernetes. API and worker may share image/build context but use distinct commands and resource limits. Proxy and API timeouts, body limits, trusted proxy CIDRs/identity, and forwarding-header overwrite must be configured consistently.

Local development uses Docker Compose with PostgreSQL, API, worker, Next.js, Mailpit, and filesystem storage. Local host aliases reproduce apex/app/admin and BFF cookie scope. Production configuration comes from environment/secret manager. Staging is environment configuration, not a code branch.

# **46 CI CD and Database Migration**

Each repository runs lint, unit/integration tests, build, dependency/security scan recommendation, and artifact generation. Backend CI runs PostgreSQL and Goose migrations from empty plus previous baseline. Frontend CI validates all manifests, renderer registry, BFF host/audience mapping, and cookie attributes.

Normal production flow is build/test, backup/readiness, one migration job, API/worker rollout, smoke tests, and frontend rollout subject to compatibility:

- For an existing supported manifest schema: frontend renderer deploy -\> renderer health check -\> manifest registration/checksum validation -\> Admin enablement.
- For a new manifest schema: backend deploy with new validator while keeping old support -\> frontend renderer deploy -\> manifest registration/checksum validation -\> Admin enablement.

CI must fail registration against an environment that does not advertise the required `schemaVersion`. Backend must reject unknown schema at runtime. Pinned old template versions are included in renderer smoke tests.

Migrations follow expand-migrate-contract. Multiple app instances never run migrations on startup. Failure stops rollout while the prior compatible application remains. Destructive migration requires backup and a documented rollback/runbook.

# **47 Testing Strategy**

Backend unit tests cover state guards, validators, FIFO entitlement selection, extension formula/state matrix, template schema compatibility, slug-history availability, ownership case selection, and idempotency. Repository integration tests use real PostgreSQL for row locks, unique constraints, guarded decrement, GORM mapping, and `SKIP LOCKED`. API tests cover exact audience, ownership, BFF-origin trust, CSRF, and error contracts.

Frontend tests cover host routing, Customer/Admin cookie isolation, middleware redirect/404 behavior, SSR session loading, fragment token exchange/removal, manifest/form validation, renderer smoke tests, and Playwright E2E. Visual regression is recommended per template/version.

Mandatory scenarios include:

- double/concurrent finalize consumes exactly one entitlement unit;
- Customer/Admin cross-role pages return 404 and cookies never cross hosts;
- direct API-origin credential attempt does not bypass proxy or backend auth;
- Case A links the existing managed profile without duplicating it;
- Case B moves only the invitation and leaves source quota/transactions intact;
- PUBLISHED and unpublished FINALIZED invitations expire when due;
- extension in PUBLISHED, previously-published FINALIZED, EXPIRED, and never-published FINALIZED follows the defined matrix;
- expired public read is inactive even before the worker runs;
- current/reserved/historical slug collisions fail and old slug never resolves to another invitation;
- raw personalized token is absent from server request URL/log/referrer and invalid/revoked exchange returns a generic result;
- unsupported manifest schema fails before mutation, while pinned old schema continues to render;
- media replacement/history, job crash/retry, RSVP pax/idempotency, and transaction confirmation retry remain safe.

# **48 Critical Sequence Diagrams**

This section groups revised critical flows. The same-origin authenticated request and SSR behavior are shown below; assignment, RSVP, and template release appear in their owning sections.

<img src="media/rId133.png" style="width:5.83333in;height:3.61875in" alt="Same-origin login SSR and authenticated request sequence" />

Same-origin login SSR and authenticated request sequence

## **48.1 Finalize and quota**

<img src="media/rId136.png" style="width:5.83333in;height:3.61875in" alt="Atomic finalize using entitlement remaining as source of correctness" />

Atomic finalize using entitlement remaining as source of correctness

## **48.2 First publish expiration and extension**

<img src="media/rId140.png" style="width:5.83333in;height:3.61875in" alt="First publish expiration and state-specific extension" />

First publish expiration and state-specific extension

## **48.3 Other required flows**

- Ownership Case A/B: Figure in Section 14.
- Fragment guest-token exchange and both RSVP modes: Figure in Section 32.
- Template schema-aware release order: Figure in Section 25.
- Image processing: Figure in Section 29.
- Async email: Figure in Section 36.
- Background worker: Figure in Section 37.

# **49 Failure Scenarios**

| **Scenario**                          | **Consistency and retry behavior**                                                               | **User outcome / observability**                       |
| ------------------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------ |
| BFF unavailable or upstream timeout   | No domain mutation unless Go committed; safe retry with same idempotency key                     | 503; request/upstream latency and error metric         |
| Forged audience/forwarding header     | BFF overwrites; Go rejects untrusted origin or audience mismatch                                 | 401/404; security event without token data             |
| Expired access, valid refresh         | Same-origin handler rotates once; token-family reuse revokes family                              | Return to validated path or login                      |
| DB error during finalize              | Whole transaction rolls back; entitlement remaining, ledger, snapshot, and state unchanged       | Retry same key; rollback metric                        |
| Double finalize                       | Invitation/entitlement locks, guarded state, unique ledger reference, idempotency                | Stored success or conflict; never double debit         |
| Assignment Case A race                | Unique `customer_profiles.user_id` and locks prevent duplicate profile linkage                   | Retry or explicit conflict; audit attempt              |
| Assignment Case B interrupted         | Invitation owner and assignment/audit commit atomically; commercial rows untouched               | Retry same key returns same assignment                 |
| Unpublished invitation reaches expiry | Worker predicate includes FINALIZED with active timer; public read is already inactive           | State eventually EXPIRED; expiry-lag metric            |
| Extend request retried                | Idempotency and unique commercial/audit reference preserve one duration addition                 | Same stored expiry/state                               |
| Extend never-published FINALIZED      | Reject before mutation                                                                           | `409 INVALID_EXTENSION_STATE`                          |
| Worker crash mid-expiration batch     | Lease expires; predicate/state update is idempotent                                              | Delayed state label only; public remains protected     |
| Personalized fragment JS disabled     | Anonymous invitation loads; no token reaches server; personalization/guest-only RSVP unavailable | Graceful explanation, no identity leak                 |
| Invalid/revoked guest token           | Constant-time hash validation; generic result; no guest existence detail                         | Anonymous view remains; rate-limit metric              |
| Slug override collision               | Transaction checks current, reserved, history; unique history constraint wins races              | `409 SLUG_TAKEN`; old slug unchanged                   |
| Old slug requested                    | History is not a redirect target in MVP                                                          | 404/inactive; never another wedding                    |
| Unsupported manifest schema           | Registration rejected before insert/enable                                                       | `422 UNSUPPORTED_MANIFEST_SCHEMA`; compatibility alert |
| Renderer deployment missing           | Registration/build health check blocks enablement                                                | Template remains unavailable                           |
| Media/storage/email/job failures      | Existing retry/idempotency behavior remains; no unsafe domain rollback                           | Clear delayed/failed status and dependency metrics     |
| Migration failure                     | Stop rollout; do not start incompatible app                                                      | Prior compatible version remains; deployment alert     |

# **50 Architecture Decision Records**

| **Decision and choice**                                          | **Rationale and alternatives**                                                                        | **Trade-off / revisit trigger**                                                 |
| ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Next.js over plain SPA                                           | SEO/SSR/SSG and application UI in one repository                                                      | Framework complexity; revisit with independent frontend cadences                |
| Same-origin BFF for authenticated apps                           | Makes host-only cookies visible to SSR/middleware and isolates Customer/Admin; avoids wildcard cookie | Proxy code/configuration; revisit only with a different secure session topology |
| Go remains authoritative                                         | BFF is transport boundary, not business authorization                                                 | Duplicate lightweight audience checks are intentional                           |
| Chi and modular monolith                                         | Idiomatic `net/http`, one transactional DB, small team                                                | Enforce module discipline; extract only after measured need                     |
| PostgreSQL, GORM v2, Goose                                       | Integrity, JSONB, locking, productive mapping, explicit schema ownership                              | ORM/query awareness                                                             |
| BIGINT plus UUID                                                 | Efficient joins and non-predictable public identity                                                   | Dual identifiers                                                                |
| Hybrid relational plus JSONB                                     | Flexible template content without hiding operational entities                                         | Strong manifest/content validator required                                      |
| PostgreSQL-backed jobs; no Redis/broker/Kubernetes               | Lowest MVP operational burden                                                                         | Revisit on measured throughput or isolation pressure                            |
| `CustomerProfile` ownership with Assign Invitation Only          | Deterministic transfer without accidental commercial/quota merge                                      | Full commercial merge is outside MVP                                            |
| Entitlement remaining is quota source of correctness             | Eliminates synchronized account balance and ledger balance counters                                   | Aggregate read cost; optional rebuildable cache only if measured                |
| Permanent slug history/tombstone                                 | Prevents old distributed link from resolving to another couple                                        | Slugs are not reusable; storage growth is small                                 |
| Fragment plus token exchange                                     | Raw guest token stays out of initial request/log/referrer                                             | Personalization occurs after hydration                                          |
| Schema-aware template release order                              | New validator must precede new schema; same schema stays frontend-first                               | Cross-repository release coordination                                           |
| Pinned immutable template version                                | Preserves invitation output                                                                           | Maintain old renderers/schemas while referenced                                 |
| Explicit Save and 10-version history                             | Matches product rule and controls writes                                                              | Unsaved-change UX required                                                      |
| First-publish expiration with state-independent expiry predicate | Unpublish does not pause duration and cannot evade expiration                                         | Background job plus read-time guard                                             |
| Separate subdomains and role-bound sessions                      | Clear experience and role boundary                                                                    | Host routing/BFF configuration                                                  |
| Two repositories                                                 | Independent frontend/backend delivery                                                                 | Contract compatibility checks required                                          |

# **51 MVP vs Future Architecture**

Phase 2 can enable `sectionOrder` editing, add QR check-in tables/module, strengthen CDN caching, add custom-domain mapping/certificate workflow, richer media processing, and staging. Existing public IDs, event model, guest identity, manifest capabilities, and storage adapter support these without implementing them now.

Phase 3 may add RESELLER role, workspace/account hierarchy, dedicated queue, horizontal API/worker scaling, and selective service extraction. Extraction candidates are media, notification, and public rendering only after measurable operational boundaries appear.

# **52 Risks and Mitigations**

| **Risk**                                     | **Mitigation**                                                              | **Owner/checkpoint**            |
| -------------------------------------------- | --------------------------------------------------------------------------- | ------------------------------- |
| Template variation expands editor complexity | standard IDs, manifest schema, renderer contract, template review checklist | Engineering before each release |
| Cross-repo manifest drift                    | schema version, checksum, CI compatibility and release registration         | CI/CD                           |
| Manual payment error                         | idempotent confirmation, audit, transaction snapshot, reconciliation        | Admin SOP                       |
| Unlimited drafts/storage                     | per-file limits, monitoring, soft limits configurable later                 | Product/Operations              |
| Public spam                                  | layered rate limit, token identity, plain text, adaptive CAPTCHA future     | Security/Product                |
| Public bank details/privacy                  | owner confirmation, noindex, scoped public response, audit Admin access     | Product/Legal                   |
| Slug override breaks links                   | permanent slug history prevents reassignment; old slug returns 404/inactive | Operations                      |
| Old renderer maintenance                     | pinned bundles, version inventory, explicit upgrade tools                   | Frontend Engineering            |
| Job table growth                             | indexes, retention/archive, backlog metrics                                 | Backend Engineering             |
| Single production environment                | migration discipline, backup, smoke test, fast rollback                     | DevOps                          |

# **53 Technical Open Items and TBDs**

The following are configuration or operational choices, not architecture blockers:

- Exact package names, prices, quota, durations, and template eligibility.
- Production hosting provider and whether trusted proxy ingress uses private networking, mTLS, or an equivalent provider-authenticated mechanism.
- Production object storage provider, CDN, email provider, analytics/error provider, and alert destination.
- Production domain if different from conceptual `webwedding.com`.
- Exact import async threshold and retention for audit/jobs/notifications.
- Draft cleanup and legal/privacy retention/consent wording.
- Allowed audio/video MIME and codec matrix after browser tests.
- Numeric rate-limit thresholds after baseline traffic.
- Whether package upgrade adds duration automatically; current design requires explicit extension.

# **54 Engineering Dependency Map**

1.  **Foundation:** repositories, configuration, Docker, PostgreSQL, migrations, logging, request ID, error model.
2.  **Auth and identity:** users, customer profiles, role-bound sessions, verification/reset, authorization middleware.
3.  **Commercial core:** package, transaction, entitlement/quota remaining, ledger, audit, idempotency.
4.  **Template engine:** manifest schema, registry, release contract, renderer registry.
5.  **Invitation core:** draft, content, slug, lifecycle, entitlement snapshot, versions.
6.  **Builder and media:** dynamic form, shared preview, storage adapter, processing jobs, usages.
7.  **Publish path:** public view model, first-publish expiry, noindex, expiration job/cache seam.
8.  **Guest and RSVP:** guest tokens, import/export, both RSVP modes/history.
9.  **Wishes, gift, events:** moderation, display-only financial data, timezone events.
10. **Admin operations:** admin-managed invitation, overrides, assignment, extension, and slug-history operations.
11. **Notifications and analytics:** DB notifications, email jobs/digest, PostHog/GA.
12. **Hardening:** E2E, concurrency tests, observability, security headers, backup/rollback, load checks.

This is a dependency order, not an implementation task backlog.

# **55 Technical Definition of Done**

Technical Design is successfully implemented when:

- Both repositories build/deploy independently with compatible `/api/v1`.
- Customer/Admin browsers use same-origin BFF paths; cookies are Secure, HttpOnly, host-only, audience-bound, and absent from the other role host.
- SSR/middleware can identify the local audience before render, while backend authorization remains authoritative and direct API access cannot bypass it.
- Unauthenticated pages redirect correctly; cross-role pages and wrong-owner resources return 404 as specified.
- Case A assignment links the existing profile without duplication; Case B moves only the invitation and preserves source transactions, entitlements, remaining quota, ledger, and audit.
- Concurrent finalize decrements exactly one eligible entitlement unit, creates one immutable debit and one invitation snapshot, and needs no `quota_accounts` counter.
- First publish and all four extension cases pass deterministic clock/state tests. FINALIZED previously-published invitations expire when due.
- Public read always requires PUBLISHED and future expiry even if the worker is delayed.
- Every assigned slug has permanent history; old/reserved/current collisions fail and an old slug never resolves to another invitation.
- Personalized guest tokens use fragments and exchange; raw tokens are absent from initial requests, logs, referrers, and storage; both RSVP modes work.
- Unsupported manifest schema is rejected. Same-schema and new-schema release sequences pass CI, and pinned old versions continue to render.
- Explicit Save, 10-version restore, and media usage retention remain safe.
- Worker retries/crashes produce no harmful duplicates; critical logs, metrics, migrations, backups, rollback, and security headers are verified.

# **A Architecture Review Checklist**

- [ ] Product rules and prompt overrides are represented without contradiction.
- [ ] Same-origin BFF, host-only role cookies, SSR, audience, CSRF, and backend-origin trust are approved.
- [ ] CustomerProfile model supports registered and non-account customers.
- [ ] Entitlement remaining as quota source of correctness and immutable ledger are accepted.
- [ ] Finalize and publish transaction boundaries are accepted.
- [ ] Same-schema and new-schema template release orders are feasible in chosen CI/CD.
- [ ] JSONB content and relational boundaries are accepted.
- [ ] Media provider/delivery model works with selected production host.
- [ ] Public privacy, guest tokens, rate limiting, and noindex defaults are accepted.
- [ ] Migration, backup, rollback, and job failure runbooks have owners.

# **B Remaining Technical TBDs**

The remaining true TBDs are listed in Section 53. Each needs an owner and decision deadline during Implementation Planning. None reopens the approved BFF, ownership, lifecycle, quota, slug-history, guest-token, or template compatibility decisions.

# **C Risks Requiring Attention Before Implementation**

Highest-priority pre-implementation risks are template contract drift, production proxy/cookie misconfiguration, production media delivery cost, manual Admin SOP errors, and privacy treatment of public bank/venue/guest information. These should be validated with small vertical spikes before broad feature construction.

# **D Items to Verify During Implementation Planning**

- Convert the dependency map into vertical slices with acceptance criteria and migration ownership.
- Choose the first two or three template versions and validate manifest coverage.
- Confirm package examples so entitlement allocation and extension tests use realistic data.
- Select production provider candidates and confirm required adapter capabilities.
- Define local/production secrets, backup, restore, and incident ownership.
- Define API contract generation approach and cross-repository compatibility test.

# **E Engineering Review Resolution Matrix**

| **Issue ID** | **Previous Problem**                                                                                           | **Resolution**                                                                                                                                  | **Sections Updated**               | **Status** |
| ------------ | -------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- | ---------- |
| TD-001       | API-host cookie was invisible to app/admin SSR and middleware.                                                 | Adopted same-origin BFF, host-only audience cookies, exact host routing, CSRF/origin checks, and independently protected backend origin.        | 7, 8, 9, 12, 13, 40, 42, 45-50, 55 | RESOLVED   |
| TD-002       | Ownership assignment had no deterministic merge rule.                                                          | Case A links the existing managed profile; Case B uses Assign Invitation Only with append-only assignment/audit and no quota/commercial merge.  | 14-19, 39, 40, 47-50, 55           | RESOLVED   |
| TD-003       | Unpublished FINALIZED invitations could pass expiry without reaching EXPIRED; extension cases were incomplete. | Expiry predicate covers FINALIZED/PUBLISHED with active timer; public read guard remains independent; four extension cases are explicit.        | 20, 37, 40, 47-50, 55              | RESOLVED   |
| TD-004       | Personalized guest token in query could leak through logs, history, analytics, and referrer.                   | Token moved to fragment, exchanged in JSON body for minimal short-lived guest context, then removed from history; SSR limitation documented.    | 30-32, 40, 42-43, 47-49, 55        | RESOLVED   |
| TD-005       | Old slug could later be assigned to another wedding.                                                           | Added permanent `invitation_slug_history`; current/reserved/history are checked transactionally; no MVP redirect.                               | 8, 16-20, 40-42, 47, 49-50, 52, 55 | RESOLVED   |
| TD-006       | Three quota counters created synchronization complexity.                                                       | Removed authoritative `quota_accounts` and `balance_after`; `entitlements.quota_remaining` is current truth and ledger is immutable history.    | 11, 17-19, 21, 40, 47-50, 54-55    | RESOLVED   |
| TD-007       | Template release order did not distinguish same schema from a new schema.                                      | Defined Case A frontend-first flow and Case B backend-validator-first flow; unknown schema is rejected and pinned old schema remains supported. | 23-25, 40, 46-50, 55               | RESOLVED   |

# **F Remaining Technical TBDs v1.1**

- Final production hosting provider and trusted proxy-ingress mechanism.
- Final object storage provider and CDN.
- Final production email provider and alert destination.
- Final package commercial values: names, prices, quota, duration, and eligibility.
- Production domain if different from the conceptual hostnames.
- Operational retention values, media codec matrix, and rate-limit numbers.

These are provider, configuration, commercial, or policy choices. None is a critical architecture contradiction.

# **G Ready for Implementation Planning Assessment**

**READY.** No Critical architecture contradiction remains. Authentication is implementable through same-origin BFF with isolated Customer/Admin sessions and authoritative Go authorization. Ownership, quota, lifecycle, slug history, guest-token transport, and schema relationships are deterministic. Template registration has an enforceable release contract for both existing and new manifest schema versions. Remaining TBDs can be assigned during Implementation Planning without changing the approved architecture.
