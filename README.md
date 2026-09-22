# Moment Kita Frontend

Frontend foundation for Moment Kita, a wedding invitation platform. FE-0 covers the public marketing site, catalog foundations, template-preview route, and anonymous public invitation route. Backend integration is intentionally mocked in this phase.

## Prerequisites

- Node.js 20.9 or newer
- npm 11 or newer

## Local development

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The mock invitation is available at `/raka-ayu`.

## Validation

```bash
npm run lint
npm run typecheck
npm run build
npm run format:check
```

Run the production build locally with `npm start` after `npm run build`.

## Structure

```text
src/
  app/
    (marketing)/             # Public marketing and catalog routes
    (public-invitation)/     # Anonymous /[slug] route
  components/
    marketing/               # Public-site layout and composition
    shared/                  # Truly cross-boundary components
    ui/                      # shadcn/ui primitives
  data/mocks/                # Temporary public data fixtures
  lib/                       # Configuration and shared utilities
  services/public/           # Replaceable public data boundary
  templates/                 # Version-pinned lazy renderer registry
  types/                     # Minimal public contracts
design-references/           # Read-only visual references; never runtime code
```

## Data and templates

Pages read data through functions in `src/services/public`; they do not import mock fixtures directly. These service implementations currently return data from `src/data/mocks` and can later be replaced with calls to the approved public API without rewriting page components.

Template renderers are registered lazily by immutable keys such as `elegant-01@1` in `src/templates/registry.ts`. A final renderer is intentionally not part of FE-0.

TanStack Query is available for future interactive client-side data, but static Server Component data is not wrapped in a query provider. React Hook Form and Zod are available for future validated forms. No real API, authentication, dashboard, admin, or backend code is included.

## Architecture source of truth

Implementation decisions must remain aligned with [`docs/technical-design.md`](docs/technical-design.md) and [`AGENTS.md`](AGENTS.md).

Visual references belong in [`design-references`](design-references/README.md). They must be reimplemented within the production architecture rather than imported or copied directly.
