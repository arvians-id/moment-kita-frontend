# Frontend Implementation Status

## Current Focus

Public / Marketing Website only.

Backend, Customer App, Admin App, and actual Wedding Invitation
Template implementation are currently deferred.

## Approved Pages

The following pages are visually approved and should not be redesigned:

- `/` — Home
- `/faq`
- `/login`
- `/register`
- `/contact`
- `/pricing`
- `/features`
- `/how-it-works`
- `/digital`
- `/printed`

## Pending / Correction Needed

- `/about`

## Visual References

Marketing references are stored under:

`design-references/marketing/`

Each page may contain a `code.html` used as the approved visual reference.

Reference HTML is NOT production architecture.

Convert it into clean Next.js / React / TypeScript while preserving
visual fidelity.

## Important Rules

- One page per focused task.
- Do not redesign approved pages.
- Reuse existing Header/Footer and established design system.
- Do not make runtime code depend on `design-references`.
- Use Server Components by default.
- Client Components only for actual interaction.
- Backend-dependent public data currently uses mock/service abstractions.
- Do not implement backend functionality.
- Do not implement actual invitation renderer yet.

## Current Workflow

For each page:

1. Inspect current implementation.
2. Read its complete reference `code.html`.
3. Compare both.
4. Correct visual mismatches.
5. Preserve approved shared components.
6. Run lint.
7. Run typecheck.
8. Run production build.
9. Stop after that page.