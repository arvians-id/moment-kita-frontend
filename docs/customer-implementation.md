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

---

## Final QA / Integration Pass

> **Update 2026-09-24:** the cross-app integration pass in
> `docs/frontend-integration-qa.md` supersedes the "Not changed" items below
> where they overlap: the guest-type duplication remains, the Customer builder
> now has an unsaved-changes guard, status badges are shared with Admin, and
> RSVP access mode is a single shared type.

**Date:** 2026-09-23
**Status:** Pass complete. All 14 planned Customer routes compile, lint, typecheck, and build cleanly. Customer CMS is confirmed feature-complete as one coherent product.

### What was audited
Navigation/sidebar architecture, WeddingSwitcher behaviour, routing between every listed flow, cross-page data consistency for the same invitation, type duplication, shared UI components, visual consistency, responsive behaviour (desktop/tablet/mobile), interaction QA, and the documented product rules (draft/finalize/publish/quota, version history limits, digital gift limits, guest token handling, guest import duplicates, RSVP access modes, wishes moderation).

### Issues found and fixed
- **Data consistency (same invitation, contradictory numbers):** Dashboard vs. Invitation Overview showed different adult/child RSVP breakdowns for Raka & Ayu (`attendingAdults` typo); Dashboard/My Invitations/Overview claimed "42 wishes" while the actual Wishes Management guestbook only ever had 7 entries; the paid Signature Package transaction's own receipt said "Total 2 Available" while the entitlement summary everywhere else said 4; a guest-import notification claimed "125 guests, 3 review items" with no relation to the actual 10-row/5-issue import fixture; a notification and an activity-feed entry both credited "Dimas Prasetyo" with a confirmed RSVP although his own guest record is still Pending. All of these were corrected at the mock/service layer, and the Invitation Overview page's guest summary now imports the Dashboard's summary object directly instead of keeping a hand-duplicated copy, so the two can no longer drift apart.
- **RSVP Management numbers reading as "unrelated totals":** its header stats are correctly derived from the guest directory, but that directory only models 7 of the invitation's 128 guests with no disclosure (unlike the Guest Directory page, which already discloses its sample size). Added the same "showing a curated sample, full totals live on the Guest Directory" disclosure used on the Guests page.
- **Dead buttons / stale copy:** the Finalized-status "Publish invitation" control (on both the invitation card grid and the Overview status banner) was an inert, disabled element even though Publish is a fully working action in the Invitation Builder — both now link into the builder. The Create Invitation success dialog's "Start Editing" button only displayed a stale notice claiming "the Invitation Builder is intentionally not part of this task," which is no longer true; it now opens the Invitation Builder directly.
- **Product-rule copy bug:** two places said "Publish to assign your remaining quota," contradicting the documented rule that quota is committed at Finalize, not Publish. Copy corrected in both spots.

### Shared components/data cleaned up
`invitation-detail.ts`'s per-invitation guest summary for the primary invitation now spreads the Dashboard's `mockGuestSummary` instead of maintaining a separate hand-typed copy of the same numbers.

### Not changed (known, non-blocking limitations)
- Two structurally different "invitation guest" type shapes exist (`InvitationGuestEntry`/`GuestRsvpStatus` used by the Overview page's recent-guests preview vs. `InvitationGuest`/`GuestAttendanceStatus` used by Guest Management/RSVP/Wishes). They were not merged in this pass — doing so touches several pages for a cosmetic/consistency gain only and was judged out of scope for a QA pass.
- A visual-consistency sweep found real but purely cosmetic drift across the app: three separate status-badge implementations with different shapes, at least two competing page-header layouts, inconsistent card border-radius/shadow values, and inconsistent dialog overlay opacity. None of this affects functionality, product rules, or data correctness, and fixing it would mean designing a shared component library — explicitly out of scope for this QA pass ("do not build a large generic design system during this QA pass"). Left as a candidate for a dedicated follow-up pass.
- The shared `Button` primitive in `src/components/ui/button.tsx` has no consumers inside the Customer CMS; every page hand-rolls its own button markup. Not consolidated in this pass for the same reason as above.
