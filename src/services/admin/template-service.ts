import { mockTemplateUsage } from "@/data/mocks/admin";
import { listPackages } from "@/data/mocks/admin-packages-store";
import { mockTemplateCatalog } from "@/data/mocks/template-catalog";
import { getAdminInvitationList } from "@/services/admin/invitation-service";
import type {
  AdminCapabilitySupport,
  AdminTemplateCapability,
  AdminTemplateCommercial,
  AdminTemplateDetailData,
  AdminTemplateListData,
  AdminTemplateListItem,
  AdminTemplateMonthlyUsage,
  AdminTemplateUsage,
  AdminTemplateVersion,
  InvitationBuilderSectionType,
} from "@/types";

const disabledTemplateKeys = new Set([
  "lhotel-particulier",
  "elysian-linen-pearl",
]);

const usageKeyByDashboardName: Record<string, string> = {
  "Château de Chantilly": "chateau-de-chantilly",
  Botanique: "botanique-vivace",
  Kyoto: "kyoto-monochrome",
  Velvet: "tuscan-terracotta",
  "Minimalist Modern": "aura-blanche",
};

/**
 * Admin metadata projection over the canonical marketing template catalog.
 * Template definitions stay developer-owned; this layer adds only operational
 * availability, prominence, usage, and package-access metadata.
 */
export async function getAdminTemplateList(): Promise<AdminTemplateListData> {
  const usageByKey = new Map<string, number>();
  mockTemplateUsage.forEach((entry) => {
    const key = usageKeyByDashboardName[entry.templateName];
    if (key) usageByKey.set(key, entry.suiteCount);
  });

  const packages = listPackages();
  const templates = mockTemplateCatalog.map((template) => ({
    ...template,
    activeVersion: "v1.0",
    enabled: !disabledTemplateKeys.has(template.key),
    featured: template.popularity >= 90,
    usageCount: usageByKey.get(template.key) ?? 0,
    packageAccess: packages
      .filter(
        (pkg) =>
          pkg.templateAccessMode === "all" ||
          (pkg.selectedTemplateKeys ?? []).includes(template.key),
      )
      .map((pkg) => pkg.name),
  }));

  return {
    templates,
    summary: {
      totalTemplates: templates.length,
      activeTemplates: templates.filter((template) => template.enabled).length,
      featuredTemplates: templates.filter((template) => template.featured)
        .length,
      totalUsage: templates.reduce(
        (total, template) => total + template.usageCount,
        0,
      ),
    },
    categories: Array.from(
      new Set(templates.map((template) => template.styleLabel)),
    ).sort((left, right) => left.localeCompare(right)),
  };
}

export async function getAdminTemplateKeys(): Promise<string[]> {
  const { templates } = await getAdminTemplateList();
  return templates.map((template) => template.key);
}

/*
 * Template Detail derivation.
 *
 * There is no separate template-detail mock table: every field below is
 * derived from the exact `AdminTemplateListItem` the Template List already
 * renders (plus the shared Package and Invitation registries), so the List
 * and Detail pages can never quietly disagree about the same template. The
 * derivation is deterministic (seeded by the template key), not random, so
 * a given template always renders the same dossier.
 */

const TODAY = new Date("2026-09-23T00:00:00+07:00");
const MONTH_LABELS = ["May", "Jun", "Jul", "Aug", "Sep"] as const;
const MONTH_WEIGHTS = [0.12, 0.15, 0.18, 0.24, 0.31] as const;

function stableSeed(key: string): number {
  return Array.from(key).reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function daysAgoIso(days: number): string {
  const date = new Date(TODAY);
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

function nextVersionLabel(version: string): string {
  const match = /^v(\d+)\.(\d+)$/.exec(version);
  if (!match) return `${version}-next`;
  const [, major, minor] = match;
  return `v${major}.${Number(minor) + 1}`;
}

interface CapabilityDefinition {
  type: InvitationBuilderSectionType;
  label: string;
  /** Foundational sections every registered template must support. */
  alwaysSupported?: boolean;
}

const CAPABILITY_DEFINITIONS: readonly CapabilityDefinition[] = [
  { type: "events", label: "Events" },
  { type: "gallery", label: "Gallery" },
  { type: "loveStory", label: "Love Story" },
  { type: "quote", label: "Quotes" },
  { type: "rsvp", label: "RSVP", alwaysSupported: true },
  { type: "wishes", label: "Wishes", alwaysSupported: true },
  { type: "digitalGift", label: "Digital Gift" },
  { type: "livestream", label: "Livestream" },
];

const CAPABILITY_NOTES: Partial<
  Record<InvitationBuilderSectionType, Partial<Record<AdminCapabilitySupport, string>>>
> = {
  events: {
    supported: "Multi-session itinerary with venue, time, and rundown details.",
    optional: "A single ceremony session only; additional sessions are not composed.",
  },
  gallery: {
    supported: "Photo gallery with a responsive lightbox presentation.",
    optional: "A compact gallery only; large sets are not optimized.",
  },
  loveStory: {
    supported: "A timeline of milestones leading to the wedding day.",
    optional: "A short-form story block rather than a full timeline.",
  },
  quote: {
    supported: "Opening and closing editorial quotes.",
    optional: "A single quote placement only.",
  },
  rsvp: { supported: "Guest List and Anyone-With-Link RSVP modes." },
  wishes: { supported: "Guestbook messages with Admin moderation." },
  digitalGift: {
    supported: "Bank transfer and e-wallet gift destinations.",
    optional: "Display-only, limited to a single destination.",
  },
  livestream: {
    supported: "Embedded YouTube, Zoom, or Vimeo Live with countdown.",
    optional: "A link-out to an external stream only.",
  },
};

function buildCapabilities(
  template: AdminTemplateListItem,
): AdminTemplateCapability[] {
  const seed = stableSeed(template.key);

  return CAPABILITY_DEFINITIONS.map((definition, index) => {
    let support: AdminCapabilitySupport = "supported";
    if (!definition.alwaysSupported) {
      const bucket = (seed + index * 3) % 5;
      // The bespoke tier is the atelier's full-service offering: no gaps.
      if (bucket === 4 && template.tier !== "bespoke") support = "unavailable";
      else if (bucket >= 2) support = "optional";
    }

    return {
      type: definition.type,
      label: definition.label,
      support,
      note:
        CAPABILITY_NOTES[definition.type]?.[support] ??
        "Not available in this template's manifest.",
    };
  });
}

function buildVersions(
  template: AdminTemplateListItem,
  createdAt: string,
): AdminTemplateVersion[] {
  const versions: AdminTemplateVersion[] = [
    {
      version: template.activeVersion,
      status: "active",
      registeredAt: createdAt,
      usageCount: template.usageCount,
      note: "Current production release. New invitations pin to this exact version.",
    },
  ];

  const seed = stableSeed(template.key);
  if (template.featured || seed % 3 === 0) {
    versions.unshift({
      version: nextVersionLabel(template.activeVersion),
      status: "draft",
      registeredAt: daysAgoIso(2 + (seed % 5)),
      usageCount: 0,
      note: "Staged for pilot review. Not yet enabled for new invitation selection.",
    });
  }
  if (seed % 4 === 0) {
    versions.push({
      version: "v0.9",
      status: "disabled",
      registeredAt: daysAgoIso(220 + (seed % 90)),
      usageCount: 0,
      note: "Superseded by the current release. Any invitations still pinned to it remain unaffected.",
    });
  }

  return versions;
}

function buildMonthlyUsage(
  template: AdminTemplateListItem,
): AdminTemplateMonthlyUsage[] {
  const total = template.usageCount;
  let allocated = 0;

  return MONTH_WEIGHTS.map((weight, index) => {
    const isLast = index === MONTH_WEIGHTS.length - 1;
    const count = isLast
      ? Math.max(0, total - allocated)
      : Math.round(total * weight);
    if (!isLast) allocated += count;
    return { label: MONTH_LABELS[index], count };
  });
}

async function buildUsage(
  template: AdminTemplateListItem,
): Promise<AdminTemplateUsage> {
  const { invitations } = await getAdminInvitationList();
  const recentInvitations = invitations
    .filter((invitation) => invitation.templateName === template.name)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 6);

  return {
    totalInvitations: template.usageCount,
    publishedInvitations: recentInvitations.filter(
      (invitation) => invitation.status === "published",
    ).length,
    draftInvitations: recentInvitations.filter(
      (invitation) => invitation.status === "draft",
    ).length,
    monthlyUsage: buildMonthlyUsage(template),
    recentInvitations,
  };
}

function buildCommercial(
  template: AdminTemplateListItem,
): AdminTemplateCommercial {
  const packages = listPackages().map((pkg) => ({
    packageId: pkg.id,
    packageName: pkg.name,
    available: template.packageAccess.includes(pkg.name),
    price: pkg.price,
    description: pkg.description,
  }));

  return {
    availableToAllPackages: packages.every((entry) => entry.available),
    packages,
  };
}

/**
 * One template's Admin dossier: metadata, version registry, capability
 * summary, usage, and commercial-access projections built on the exact
 * `AdminTemplateListItem` the Template List renders, so the two pages can
 * never disagree about the same template.
 */
export async function getAdminTemplateDetail(
  key: string,
): Promise<AdminTemplateDetailData | null> {
  const { templates } = await getAdminTemplateList();
  const template = templates.find((item) => item.key === key);
  if (!template) return null;

  const seed = stableSeed(template.key);
  const createdAt = daysAgoIso(260 + (seed % 500));
  const usage = await buildUsage(template);

  return {
    template,
    createdAt,
    versions: buildVersions(template, createdAt),
    capabilities: buildCapabilities(template),
    usage,
    commercial: buildCommercial(template),
  };
}
