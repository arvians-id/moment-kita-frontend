import { mockPackages } from "@/data/mocks/packages";
import { mockTemplateCatalog } from "@/data/mocks/template-catalog";
import type { Package } from "@/types";

/**
 * Package registry for this mock environment.
 *
 * Seeded from the canonical `mockPackages` fixture, with template access
 * derived once here from the same tier heuristic Template List used to
 * compute inline — so nothing visually changes on first load. Packages &
 * Quota, Template Detail's Commercial Settings, Create Invitation, and
 * Transaction Detail's package resolution all read through `listPackages`/
 * `findPackage`, so they can never disagree about the same package.
 *
 * `createPackage`/`updatePackage` exist as the intended write path once
 * real persistence is connected. This project builds with
 * `output: "export"` (a static export with no request-time server), which
 * rules out Server Actions and any other per-request mutation — so nothing
 * currently calls them, and Package Editor's Save is a local-only preview
 * like every other mock mutation in this Admin app. They are kept here,
 * documented, rather than deleted, as the seam a real backend would use.
 */

function defaultTemplateAccess(
  pkg: Package,
): Pick<Package, "templateAccessMode" | "selectedTemplateKeys"> {
  if (pkg.name === "Prestige") {
    return { templateAccessMode: "all", selectedTemplateKeys: [] };
  }
  if (pkg.name === "Signature") {
    return {
      templateAccessMode: "selected",
      selectedTemplateKeys: mockTemplateCatalog
        .filter((template) => template.tier === "signature")
        .map((template) => template.key),
    };
  }
  return { templateAccessMode: "selected", selectedTemplateKeys: [] };
}

function clone(pkg: Package): Package {
  return {
    ...pkg,
    features: [...pkg.features],
    selectedTemplateKeys: pkg.selectedTemplateKeys
      ? [...pkg.selectedTemplateKeys]
      : [],
  };
}

let store: Package[] = mockPackages.map((pkg) => ({
  ...pkg,
  ...defaultTemplateAccess(pkg),
}));

export function listPackages(): Package[] {
  return store.map(clone);
}

export function findPackage(id: string): Package | null {
  const found = store.find((pkg) => pkg.id === id);
  return found ? clone(found) : null;
}

function slugify(name: string): string {
  return (
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-+|-+$)/g, "") || "package"
  );
}

function uniqueId(base: string): string {
  let id = base;
  let suffix = 2;
  while (store.some((pkg) => pkg.id === id)) {
    id = `${base}-${suffix}`;
    suffix += 1;
  }
  return id;
}

export function createPackage(input: Omit<Package, "id">): Package {
  const record: Package = { ...input, id: uniqueId(slugify(input.name)) };
  store = [...store, record];
  return clone(record);
}

export function updatePackage(
  id: string,
  input: Omit<Package, "id">,
): Package | null {
  let saved: Package | null = null;
  store = store.map((pkg) => {
    if (pkg.id !== id) return pkg;
    saved = { ...input, id };
    return saved;
  });
  return saved ? clone(saved) : null;
}
