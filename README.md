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

`npm run build` creates the static export in `out/`. Serve that directory with
any static file server to inspect the production output locally.

## GitHub Pages deployment

The workflow in `.github/workflows/deploy-pages.yml` deploys pushes to `main`
and also supports manual runs. It builds with the `/moment-kita-frontend` base
path and publishes `out/` to:

<https://arvians-id.github.io/moment-kita-frontend/>

In GitHub, set **Settings → Pages → Build and deployment → Source** to
**GitHub Actions** once. No custom domain or deployment secret is required.

Local development remains available at <http://localhost:3000/> without a base
path. To reproduce the Pages build locally, run:

```bash
NEXT_PUBLIC_BASE_PATH=/moment-kita-frontend \
NEXT_PUBLIC_APP_URL=https://arvians-id.github.io/moment-kita-frontend \
npm run build
```

GitHub Pages is a frontend-only preview. The current mock-backed marketing,
Customer, and Admin screens are exported, including the known invitation IDs
and the `raka-ayu` public invitation. Unknown dynamic IDs/slugs return 404.
Request-time authentication, host/subdomain separation, the future BFF/API,
and other server-dependent behavior are intentionally unavailable there.

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
