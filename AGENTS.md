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
