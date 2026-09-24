# Frontend Integration QA

**Date:** 2026-09-24
**Scope:** Full stabilization pass across Public/Marketing, Customer CMS and Admin CMS before backend integration. No new product features were added and no approved page was redesigned.

## Result

| Area | Status |
| --- | --- |
| Public / Marketing | PASS. Known gaps below (reset-password, template-specific renderers). |
| Customer CMS | PASS |
| Admin CMS | PASS, except the documented `/admin/login` route was never built (see limitations). |
| Shared data consistency | PASS after the fixes listed below. |
| Responsive | PASS. 63 representative routes at 1280 / 768 / 390 px showed no viewport overflow. |
| Accessibility (basic) | PASS with fixes. Not a WCAG certification. |
| `npm run lint` | PASS (0 errors, 0 warnings) |
| `npm run typecheck` | PASS |
| `npm run build` | PASS (316 static pages). Also passes with the GitHub Pages `NEXT_PUBLIC_BASE_PATH` and `NEXT_PUBLIC_APP_URL` set. |
| Tests | None exist in the project (no runner configured). |
| `npm run format:check` | Already failing before this pass on files this pass did not touch (`package-service.ts`, `template-service.ts`). Not part of CI; left as is. |

Runtime: representative Public, Customer and Admin routes were loaded in dev mode with no console errors, React warnings or hydration warnings. The only failed requests were the two intentional 404s (unknown public slug, unknown customer invitation ID).

## Route inventory

Implemented routes match the canonical maps in `customer-implementation.md` and `admin-implementation.md`.

- **Public:** `/`, `/templates`, `/templates/[key]`, `/pricing`, `/features`, `/how-it-works`, `/digital`, `/printed`, `/about`, `/contact`, `/faq`, `/login`, `/register`, `/forgot-password`, `/[slug]` (public invitation).
- **Customer:** all 14 routes in the Customer route map.
- **Admin:** all routes in the Admin route map except `/admin/login`.

## Issues found and fixed

**Cross-area bugs**
- Slug reservation was per-app, so a Customer could claim a slug owned by an Admin-managed invitation, or a system path such as `admin`, `app` or `pricing` that `/[slug]` would shadow. Both create flows and the Admin slug-change dialog now use one platform-wide `getReservedSlugs()` (`data/mocks/reserved-slugs.ts`).
- The public invitation mock was a single hand-typed record with a different event date than the Customer app and no status. It is now derived from the Customer and Admin fixtures: only `published` invitations render, `expired` ones show an "invitation ended" page, and draft/finalized/cancelled ones have no public address. It carries no customer, quota or transaction data.
- Two invitations shared the slug `sarah-liam` (Customer finalized, Admin published). The Customer one is now `sarah-liam-bali`.
- Dashboard greetings (Customer and Admin) were computed in Server Components on a static export, so they froze at build time in the build machine's timezone. They now use a client `TimeGreeting`.
- Public URL display was hardcoded as `momentkita.id/` in 13 places while others used `publicConfig.appUrl`. All now go through `publicConfig.publicHost`.

**Shared template / builder behavior**
- The quote editor fell back to the first quote when a section instance had no matching content, so editing the "closing quote" could silently overwrite the opening quote (reachable by restoring an old version). Section instances now match by ID only. The old-version fixture also hides the orphaned quote section.
- RSVP access mode used two vocabularies (`guest_list | link` in the builder, `guest_list_only | anyone_with_link` in RSVP management) and the two contradicted each other for the same invitation. There is now one `RsvpAccessMode` type and consistent fixture values.
- The Customer builder had no unsaved-changes guard while the Admin editor did. It now has a `beforeunload` guard and a "Leave the Builder?" confirmation on the back link.
- The preview rendered an `<h1>` inside the editor pages, giving them multiple `<h1>`s. It is now an `<h2>`.

**Data consistency**
- Template names: Customer, Admin and Public fixtures used three naming schemes (`Kyoto`, `Velvet`, `Eternal Elegance`, ...). All now use the names from the canonical template catalog (`template-catalog.ts`).
- Package quota: the Signature package grants 1 invitation, but the Customer transaction and a notification claimed "4 invitations". Copy now says 1, and the Customer entitlement note explains that the other 3 quotas were granted by the concierge team.
- Admin customer quota: `granted - remaining` now equals the number of quota-consuming invitations for every fixture customer (Julianne 4/5, Arthur 2/3, Beatrice 9/10). Melina (payment pending) has no granted quota. Sophia's cancelled invitation keeps its consumed quota, so she is now "No Quota".
- The extension transaction's "extended until" date now matches the invitation expiry (20 Feb 2027).

**Lifecycle copy**
- "Pause Public Guest Access" (Unpublish) implied pausing the active period. It now reads "Take the Invitation Offline" and states that quota is not returned and the active period is not paused.
- The quota banner said quota is committed "when you finalize and publish". Quota is committed at Finalize only.

**Consistency / hygiene**
- Admin Customer Detail used its own invitation and transaction status colors. It now uses the shared `InvitationStatusBadge` and `TransactionStatusBadge`.
- 24 copies of the same IDR / number `Intl.NumberFormat` were replaced by `lib/format.ts`. Output is unchanged.
- One `toLocaleDateString("en-GB")` (viewer timezone) in the Admin privileged dialog now uses `Asia/Jakarta` like every other date.
- Five hand-rolled modals had no Escape handling (Admin create-draft discard and success, Package Editor and Admin Editor discard, Customer create success). They now use a small `useEscapeKey` hook.

## Verified without changes

- Navigation: Customer, Admin and Public layouts stay separate; no Customer nav in Admin or the reverse; no design-reference sidebar (Audit Logs) in the runtime.
- Design references: nothing imports, iframes or renders raw HTML from `design-references`; no CDN scripts.
- Auth frontend: no `localStorage`, `sessionStorage`, `document.cookie` or bearer-token code anywhere. Login, register and forgot-password are preview-only forms.
- Host boundary: there is no hostname logic in the frontend; a single Next app serves all areas locally, and `robots: noindex` is set on Admin and public invitations.
- Lifecycle: Draft consumes no quota; Finalize consumes 1 and locks slug/template; Publish is separate and starts the duration; Unpublish and Cancel do not refund.
- Version history: snapshots only on explicit Save, 10 kept, restore creates a new version, no autosave.
- Digital gift: two-account maximum enforced.
- All 30 hand-rolled `role="dialog"` elements have an accessible name and `aria-modal`; no clickable `div`/`span`; icon-only buttons are labelled; every `<Image>` has `alt`.

## Known frontend limitations

- **No template-specific renderer.** `templateRegistry` is empty, the public `/[slug]` page is a foundation placeholder, and the shared builder preview is one generic layout regardless of template. Template-switch orphaning and per-template section manifests cannot be verified until renderers exist.
- **Two template datasets on the Public site.** `/templates` uses the 16-entry catalog while `/templates/[key]` and the home gallery use four legacy entries (`elegant-01`, ...). Changing them alters approved pages, so it was left. Customer, Admin and the public invitation all use the catalog.
- **`/admin/login` is not built** although listed in the Admin route map, so the Admin sign-out control is a disabled stub. Building it needs a route-group restructure so it sits outside the Admin shell.
- **No reset-password route.** Forgot Password is preview-only.
- **Customer and Admin fixtures are separate populations** ("Widdy" does not exist in the Admin customer list). Summary counts in Admin (e.g. 277 invitations) describe a larger mocked population than the listed sample rows.
- Wish moderation is a boolean in the builder and a two-value enum in Wishes management. They agree today; the backend contract should pick one.
- `@tanstack/react-query`, `react-hook-form` and `zod` are installed but unused. They are the technical-design choices for backend integration, so they were kept.
- Static export means mutations are local-only previews; pages and `next/image` are compatible with the GitHub Pages `basePath` build.

## Intentionally deferred to the backend

Authentication and HttpOnly-cookie sessions, persistence of every Save/Finalize/Publish action, payment confirmation, uploads, notification delivery, expiry calculation, and slug uniqueness enforcement. The frontend must keep treating all of these as backend-owned.
