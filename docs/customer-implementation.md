# Customer CMS Implementation

## Status

**All planned Customer CMS pages are implemented.**

### Completed
- Customer App Foundation
- Customer Dashboard
- My Invitations
- Guest Management
- Guest Import
- RSVP Management
- Wishes Management
- Digital Gift Management
- Version History
- Invitation Detail
- Create Invitation
- Invitation Builder
- Transactions
- Notifications
- Settings

---

## Canonical Customer Navigation

OVERVIEW
- Dashboard

WEDDING
- My Invitations

CURRENT WEDDING
- Wedding Switcher
- Overview
- Edit Invitation
- Guests
- RSVP
- Wishes
- Digital Gift
- Version History

ACCOUNT
- Transactions
- Notifications
- Settings

The navigation above is the source of truth.

Some design references contain older, incomplete, or missing sidebars.
Do not reproduce those sidebars.

All Customer pages must reuse the shared Customer App layout and navigation.

---

## Route Map

- `/app/dashboard` → Dashboard
- `/app/invitations` → My Invitations
- `/app/invitations/new` → Create Invitation
- `/app/invitations/[id]` → Invitation Overview
- `/app/invitations/[id]/edit` → Invitation Builder
- `/app/invitations/[id]/guests` → Guests
- `/app/invitations/[id]/guests/import` → Guest Import
- `/app/invitations/[id]/rsvp` → RSVP
- `/app/invitations/[id]/wishes` → Wishes
- `/app/invitations/[id]/gift` → Digital Gift
- `/app/invitations/[id]/versions` → Version History
- `/app/transactions` → Transactions
- `/app/notifications` → Notifications
- `/app/settings` → Settings

Child flows such as Create Invitation, Guest Import, Add/Edit Guest,
Transaction Detail, Finalize, and Publish are not standalone sidebar items.

---

## Design Reference Rules

`design-references/customer/**` is visual reference material only.

Use references for:
- layout
- visual hierarchy
- spacing
- typography
- cards
- colors
- interaction patterns

Do not use references as the source of truth for:
- navigation architecture
- route structure
- application architecture

Never:
- import design-reference files at runtime
- use iframe
- use dangerouslySetInnerHTML to render reference HTML
- copy outdated sidebar implementations

Priority when references conflict:

1. Product / Technical Design
2. This Customer Implementation document
3. Existing production implementation patterns
4. Approved screenshot
5. `code.html`

---

## Frontend Architecture

Reuse the existing shared foundation.

Do not create page-specific copies of:

- CustomerLayout
- CustomerSidebar
- CustomerTopbar
- CustomerMobileNav
- WeddingSwitcher
- customer navigation configuration

Pages should use:

Page
→ Customer service
→ Mock data

Backend integration will later replace the mock/service implementation
without rewriting page components.

---

## Implementation Workflow

Implement one customer page at a time.

For every page:

1. Read this document.
2. Inspect the existing implemented Customer pages.
3. Read only the relevant design reference.
4. Implement the page using existing shared patterns.
5. Do not modify previously approved pages unless necessary.
6. Verify desktop, tablet, and mobile.
7. Run lint, typecheck, and build.
8. Review and approve before starting the next page.
