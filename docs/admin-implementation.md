# Admin CMS Implementation

## Status

### Completed
- Admin App Foundation
- Admin Dashboard
- Customer List
- Customer Detail
- Invitation List
- Invitation Detail
- Create Invitation
- Invitation Editor
- Template List
- Template Detail
- Transactions
- Transaction Detail
- Packages & Quota
- Package Editor
- Printed Orders
- Printed Order Detail
- Notifications
- Settings

### Next
- Final Admin QA / Integration Pass

---

## Canonical Admin Navigation

MOMENT KITA ADMIN

OVERVIEW
- Dashboard

MANAGEMENT
- Customers
- Invitations
- Templates

COMMERCE
- Transactions
- Packages & Quota
- Printed Orders

OPERATIONS
- Notifications

SYSTEM
- Settings

This is the source of truth. It matches the sidebar shown in nearly every
`design-references/admin/**` file almost exactly, with one deliberate
exception: **Audit Logs is excluded.**

19 of the 20 Admin design references render an identical, "complete"
sidebar that also includes an `Audit Logs` item under OPERATIONS (the one
exception, `login-portal`, correctly shows no sidebar at all — it is a
pre-auth screen). That near-unanimous consistency across the reference set
is a real signal, but it directly contradicts the explicitly approved MVP
scope: Audit Logs UI is not required for MVP and must not be added unless
a product document explicitly requires the page. `technical-design.md`
defines an `audit_logs` table and an admin API endpoint
(`GET /admin/audit-logs`, §40.4) as a backend capability, but nowhere
requires a dedicated Admin *page/sidebar item* for it. Per product/design
conflict priority (Product & Technical Design outranks design references),
Audit Logs stays out of the canonical sidebar. Treat every reference's
`Audit Logs` sidebar row as visual noise to ignore, not a page to build.

The per-invitation "Audit & Logs" tab seen inside `invitation-detail` is a
different thing — a contextual activity log scoped to one invitation — and
is retained as the `Activity` tab described below. It is not the global
Audit Logs page.

---

## Route Map

- `/admin` → Dashboard
- `/admin/login` → Admin login (outside the Admin shell/layout)

- `/admin/customers` → Customer List
- `/admin/customers/[id]` → Customer Detail

- `/admin/invitations` → Invitation List
- `/admin/invitations/new` → Create Invitation
- `/admin/invitations/[id]` → Invitation Detail (Overview tab)
- `/admin/invitations/[id]/edit` → Invitation Editor (Studio Editor)
- `/admin/invitations/[id]/content` → Content tab
- `/admin/invitations/[id]/guests` → Guests tab
- `/admin/invitations/[id]/rsvp` → RSVP tab
- `/admin/invitations/[id]/wishes` → Wishes tab
- `/admin/invitations/[id]/gift` → Digital Gift tab
- `/admin/invitations/[id]/versions` → Version History tab
- `/admin/invitations/[id]/activity` → Activity tab (contextual, invitation-scoped log)

- `/admin/templates` → Template List
- `/admin/templates/[id]` → Template Detail (Overview tab)
- `/admin/templates/[id]/versions` → Versions tab
- `/admin/templates/[id]/capabilities` → Capabilities tab
- `/admin/templates/[id]/usage` → Usage tab
- `/admin/templates/[id]/commercial` → Commercial Settings tab

- `/admin/transactions` → Transaction List
- `/admin/transactions/[id]` → Transaction Detail

- `/admin/packages` → Packages & Quota Management
- `/admin/packages/new` → Package Editor (create)
- `/admin/packages/[id]/edit` → Package Editor (edit)

- `/admin/printed-orders` → Printed Orders
- `/admin/printed-orders/[id]` → Printed Order Detail

- `/admin/notifications` → Notifications
- `/admin/settings` → Settings

`/admin` is the Dashboard directly (no `/admin/dashboard` redirect). This
is a deliberate, minor divergence from the Customer app's
`/app/dashboard` pattern, matching the root-index-as-dashboard convention
already used by nearly every Admin design reference and the direction
given for this task.

Guests, RSVP, Wishes, Digital Gift, Versions, and Activity are modeled as
child routes of the invitation, mirroring the existing Customer CMS route
map (`docs/customer-implementation.md`) rather than as client-side tab
state, for architectural consistency between the two CMS surfaces.

---

## Active Navigation Rules

- `/admin` → Dashboard
- `/admin/customers`, `/admin/customers/[id]` → Customers
- `/admin/invitations`, `/admin/invitations/new`, `/admin/invitations/[id]/*` → Invitations
- `/admin/templates/*` → Templates
- `/admin/transactions/*` → Transactions
- `/admin/packages/*` → Packages & Quota
- `/admin/printed-orders/*` → Printed Orders
- `/admin/notifications` → Notifications
- `/admin/settings` → Settings
- `/admin/login` → no sidebar item active (rendered outside the Admin shell)

---

## Contextual / Non-Sidebar Flows

These stay as child routes, drawers, or modals inside their parent page.
They must never become global sidebar items:

- Create Invitation (`/admin/invitations/new`)
- Add Customer / Edit Customer (modal or drawer on Customers)
- Adjust Quota (modal from Customer Detail or Packages & Quota)
- Confirm Payment (action on Transaction Detail)
- Change Slug / Change Template (actions on Invitation Detail)
- Extend Invitation (action on Invitation Detail)
- Publish / Unpublish (action on Invitation Detail)
- Cancel Invitation (action on Invitation Detail)
- Add / Edit Package (`/admin/packages/new`, `/admin/packages/[id]/edit`)
- Transaction Detail (`/admin/transactions/[id]`, reached only from the Transactions list)
- Printed Order Detail (`/admin/printed-orders/[id]`, reached only from the Printed Orders list)

Guest, RSVP, Wishes, and Digital Gift management for Admin stay inside the
invitation context (`/admin/invitations/[id]/*` tabs above). They are never
global Admin sidebar items, regardless of what any design reference shows.

---

## Design Reference Rules

`design-references/admin/**` is visual reference material only. Use it for
layout, spacing, typography, cards, tables, forms, colors, and interaction
patterns. It is never the source of truth for canonical navigation, routes,
or application architecture.

Priority when a reference conflicts with something else:

1. Product / Technical Design (`docs/technical-design.md`)
2. This document (`docs/admin-implementation.md`)
3. Existing production architecture
4. Approved screenshot (`screen.png`)
5. `code.html`

### Design reference → page map

| Reference folder | Page | Route |
| --- | --- | --- |
| `dashboard` | Dashboard | `/admin` |
| `login-portal` | Admin login | `/admin/login` |
| `customer-management` | Customer List | `/admin/customers` |
| `customer-detail` | Customer Detail | `/admin/customers/[id]` |
| `invitation-management` | Invitation List | `/admin/invitations` |
| `create-invitation` | Create Invitation | `/admin/invitations/new` |
| `invitation-detail` | Invitation Detail (Overview + tab shell) | `/admin/invitations/[id]` |
| `invitation-editor` | Invitation Editor | `/admin/invitations/[id]/edit` |
| `rsvp-management` | Guests / RSVP tab content | `/admin/invitations/[id]/guests`, `/rsvp` |
| `wishes-blessings-moderation` | Wishes tab content | `/admin/invitations/[id]/wishes` |
| `template-management` | Template List | `/admin/templates` |
| `template-detail` | Template Detail | `/admin/templates/[id]` |
| `transaction-revenue-settlements` | Transaction List | `/admin/transactions` |
| `transaction-detail` | Transaction Detail | `/admin/transactions/[id]` |
| `quota-management` | Packages & Quota Management | `/admin/packages` |
| `package-editor` | Package Editor | `/admin/packages/new`, `/admin/packages/[id]/edit` |
| `printed-order` | Printed Orders | `/admin/printed-orders` |
| `order-detail` | Printed Order Detail | `/admin/printed-orders/[id]` |
| `notification` | Notifications | `/admin/notifications` |
| `settings` | Settings | `/admin/settings` |

No reference exists yet for the Digital Gift, Version History, or Activity
tabs on Invitation Detail. When implementing those, adapt the already
approved Customer CMS patterns (`design-references/customer/digital-gift-management`,
`design-references/customer/version-history`) rather than inventing a new
visual language, and reuse the Admin shell/chrome from `invitation-detail`.

### Known reference conflicts

- **Audit Logs sidebar item:** present in 19/20 references, excluded from
  the canonical navigation. See "Canonical Admin Navigation" above.
- **Guests vs. RSVP split:** the `invitation-detail` tab shell lists
  `Guests` and `RSVP & Attendance` as two separate tabs, but the only
  full-page design built for that area (`rsvp-management`) merges both
  into one "Guests & RSVP Operations" page. Canonical behavior keeps them
  as two tabs/routes (consistent with the Customer CMS's own
  Guests/RSVP split); split that single design's content across both
  routes during implementation instead of building one combined page.
- **Printed Orders vs. Transactions data model:** `technical-design.md`
  only models "printed" as a transaction `type` (`PRINTED`) on the shared
  `transactions` table — there is no dedicated `printed_orders` table or
  production-tracking schema. The `printed-order` and `order-detail`
  references, however, depict a full production-tracking workflow (press
  line, plate engraving stage, swatch approval, artisan notes) well beyond
  a financial record. The page stays in scope per the approved Admin
  scope, backed by mock data for now (same pattern as Customer CMS); the
  underlying data model is an open backend question, not a frontend IA
  question — see "Unresolved questions" in the audit response.

---

## Shared Admin Architecture

Every reference (except `login-portal`) renders the identical shell: a
fixed sidebar with the five canonical groups, a topbar with breadcrumb +
search + date range + notification bell + a persistent "Create Invitation"
quick action + profile menu, and a page header with kicker + title +
description + primary actions. Build this once and reuse it everywhere,
mirroring the Customer CMS's existing foundation
(`src/components/customer/layout`):

- `AdminLayout`
- `AdminSidebar`
- `AdminTopbar`
- `AdminMobileNav`
- `AdminPageHeader`
- Admin navigation config (single source of truth for the sidebar tree and active-route matching)

Do not implement these yet. Do not create page-specific Admin sidebars —
every Admin page must consume the one shared layout/navigation system.

---

## Implementation Workflow

Implement one Admin page at a time, in the order below (see Status). For
every page:

1. Read this document.
2. Inspect any already-implemented Admin pages for established shared patterns.
3. Read only the relevant `design-references/admin/**` folder (`code.html` + `screen.png`).
4. Implement the page using the shared Admin foundation — never a page-specific layout.
5. Do not modify previously approved Admin pages unless necessary.
6. Do not modify approved Customer CMS or marketing pages.
7. Verify desktop, tablet, and mobile.
8. Run lint, typecheck, and build.
9. Review and approve before starting the next page.

Recommended page order:

1. Admin Foundation + Dashboard
2. Customer List
3. Customer Detail
4. Invitation List
5. Invitation Detail
6. Create Invitation
7. Invitation Editor
8. Template List
9. Template Detail
10. Transactions
11. Transaction Detail
12. Packages & Quota
13. Package Editor
14. Printed Orders
15. Printed Order Detail
16. Notifications
17. Settings
18. Final Admin QA

---

## Model / Task Scope Notes

- Audit Logs UI is explicitly out of scope for MVP. Do not add it to the
  sidebar or build a dedicated page for it unless a product document is
  updated to require it.
- Guest/RSVP/Wishes/Gift management for Admin lives only inside the
  invitation context. Never promote them to global sidebar items.
- This document was produced by an information-architecture audit only.
  No Admin pages, components, or backend APIs were implemented as part of
  producing it.
