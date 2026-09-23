# Frontend Project Instructions

- `docs/technical-design.md` is the architectural source of truth.
- The current development focus is the public/marketing frontend.
- The single Next.js application has four long-term boundaries: marketing, customer, admin, and invitation templates/renderers.
- Do not implement future domains unless explicitly requested, and do not redesign the architecture without an explicit request.
- Backend-dependent public data must use `services/public` backed by `data/mocks` until real API integration is requested.
- `design-references` contains read-only visual references, not production code. Never import from it or copy raw reference HTML directly into the production architecture.
- When implementing referenced pages later, preserve the intended visual result while rewriting the implementation cleanly in Next.js, React, and TypeScript.
- Prefer Server Components. Use Client Components only when interaction requires them.
- Reuse existing patterns and avoid premature abstractions.

## Customer CMS

Before implementing Customer CMS pages, read:

`docs/customer-implementation.md`

Customer navigation defined there is canonical.

Some files under `design-references/customer/**` contain outdated or incomplete
sidebars. Treat design references as visual references only.

Reuse the shared Customer layout/navigation. Do not create a separate sidebar
per page.

Implement Customer CMS pages one focused page at a time.

## Admin CMS

Before implementing Admin CMS pages, read:

`docs/admin-implementation.md`

The navigation defined there is canonical.

Some design references under `design-references/admin/**` contain
outdated or incomplete sidebars — most notably an `Audit Logs` item that
is explicitly excluded from the canonical navigation. Treat design
references as visual references only.

Reuse one shared Admin layout/navigation. Do not create page-specific
Admin sidebars.

Implement Admin CMS pages one focused page at a time.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
