import {
  BookOpenText,
  CalendarDays,
  Gift,
  Images,
  Info,
  MessageSquareHeart,
  Quote,
  Radio,
  ShieldAlert,
  UserCheck,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { CommercialPackageList } from "@/components/admin/templates/commercial-package-list";
import { RegisterVersionAction } from "@/components/admin/templates/register-version-action";
import {
  adminTemplateDateFormat,
} from "@/components/admin/templates/template-detail-formatters";
import { InvitationStatusBadge } from "@/components/customer/invitation-status-badge";
import type {
  AdminCapabilitySupport,
  AdminTemplateCapability,
  AdminTemplateDetailData,
  AdminTemplateVersionStatus,
} from "@/types";

function SectionHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-[9px] font-semibold tracking-[0.16em] text-secondary uppercase">
          {eyebrow}
        </p>
        <h2 className="mt-1 font-serif text-[28px]">{title}</h2>
        <p className="mt-2 max-w-2xl text-[11px] leading-5 text-on-surface-variant">
          {description}
        </p>
      </div>
      {action}
    </div>
  );
}

function Panel({ children }: { children: ReactNode }) {
  return (
    <section
      role="tabpanel"
      className="border border-border bg-surface-lowest p-5 shadow-sm sm:p-7"
    >
      {children}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Overview                                                            */
/* ------------------------------------------------------------------ */

export function TemplateOverviewSection({
  data,
}: {
  data: AdminTemplateDetailData;
}) {
  const { template, createdAt, capabilities } = data;
  const supported = capabilities.filter(
    (capability) => capability.support !== "unavailable",
  );

  return (
    <Panel>
      <SectionHeader
        eyebrow="Architecture Overview"
        title="Template metadata"
        description="Operational metadata for this registered template. Renderer implementation stays developer-controlled."
      />

      <blockquote className="mt-6 border-l-2 border-secondary bg-surface-low p-5 font-serif text-[16px] leading-7 italic">
        “{template.description}”
      </blockquote>

      <dl className="mt-6 grid gap-3 sm:grid-cols-2">
        {[
          ["Template Name", template.name],
          ["Category", template.styleLabel],
          ["Created Date", adminTemplateDateFormat.format(new Date(createdAt))],
          ["Current / Active Version", template.activeVersion],
          ["Enabled Status", template.enabled ? "Enabled" : "Disabled"],
          ["Featured Status", template.featured ? "Featured" : "Standard"],
        ].map(([label, value]) => (
          <div key={label} className="bg-surface-low p-4">
            <dt className="text-[8px] font-semibold tracking-[0.13em] text-on-surface-variant uppercase">
              {label}
            </dt>
            <dd className="mt-1.5 text-[12px] font-semibold">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6">
        <p className="text-[8px] font-semibold tracking-[0.13em] text-secondary uppercase">
          Supported Sections — {supported.length} of {capabilities.length} modules
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {supported.map((capability) => (
            <span
              key={capability.type}
              className="inline-flex items-center gap-1.5 bg-surface-container px-2.5 py-1 text-[9px]"
            >
              {capability.label}
              {capability.support === "optional" ? (
                <span className="text-on-surface-variant">(optional)</span>
              ) : null}
            </span>
          ))}
        </div>
        <p className="mt-3 text-[10px] leading-5 text-on-surface-variant">
          Full detail, including unavailable modules, is on the Capabilities
          tab.
        </p>
      </div>
    </Panel>
  );
}

/* ------------------------------------------------------------------ */
/* Versions                                                             */
/* ------------------------------------------------------------------ */

const versionStatusTone: Record<AdminTemplateVersionStatus, string> = {
  active: "bg-emerald-50 text-emerald-800",
  available: "bg-surface-container text-on-surface",
  draft: "bg-champagne/60 text-espresso",
  disabled: "bg-surface-container text-on-surface-variant",
};

const versionStatusLabel: Record<AdminTemplateVersionStatus, string> = {
  active: "Active",
  available: "Available",
  draft: "Draft",
  disabled: "Disabled",
};

export function TemplateVersionsSection({
  data,
}: {
  data: AdminTemplateDetailData;
}) {
  return (
    <Panel>
      <SectionHeader
        eyebrow="Version Registry"
        title="Version history"
        description="Registered builds for this template. Registration records a developer handoff only — it never uploads source or edits the manifest."
        action={<RegisterVersionAction />}
      />

      <div className="mt-5 flex gap-3 border border-border bg-surface-low p-4 text-on-surface-variant">
        <ShieldAlert
          aria-hidden
          size={17}
          className="mt-0.5 shrink-0 text-secondary"
        />
        <p className="text-[10px] leading-5">
          Invitations are pinned to the exact template version selected at
          creation time. Registering or enabling a new version never migrates
          an existing invitation — a template version can only be changed
          through an explicit, per-invitation override.
        </p>
      </div>

      <div className="mt-5 space-y-2">
        {data.versions.map((version) => (
          <article
            key={version.version}
            className="flex flex-col gap-3 border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-3">
              <span
                className={`inline-flex shrink-0 items-center px-2 py-1 text-[8px] font-semibold tracking-[0.1em] uppercase ${versionStatusTone[version.status]}`}
              >
                {versionStatusLabel[version.status]}
              </span>
              <div>
                <p className="text-[11px] font-semibold">{version.version}</p>
                <p className="mt-1 text-[10px] text-on-surface-variant">
                  {version.note}
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-4 text-[9px] text-on-surface-variant">
              <span>
                Registered{" "}
                {adminTemplateDateFormat.format(new Date(version.registeredAt))}
              </span>
              <span>{version.usageCount} suites</span>
              <a
                href={data.template.imageUrl}
                target="_blank"
                rel="noreferrer"
                className="border border-border px-2.5 py-1.5 font-semibold tracking-[0.08em] uppercase hover:bg-surface-low"
              >
                Preview
              </a>
            </div>
          </article>
        ))}
      </div>
    </Panel>
  );
}

/* ------------------------------------------------------------------ */
/* Capabilities                                                        */
/* ------------------------------------------------------------------ */

const capabilityIcon: Record<AdminTemplateCapability["type"], LucideIcon> = {
  couple: UserCheck,
  events: CalendarDays,
  gallery: Images,
  loveStory: BookOpenText,
  quote: Quote,
  rsvp: UserCheck,
  wishes: MessageSquareHeart,
  digitalGift: Gift,
  livestream: Radio,
  closing: Info,
};

const supportTone: Record<AdminCapabilitySupport, string> = {
  supported: "bg-emerald-50 text-emerald-800",
  optional: "bg-champagne/60 text-espresso",
  unavailable: "bg-surface-container text-on-surface-variant",
};

const supportLabel: Record<AdminCapabilitySupport, string> = {
  supported: "Supported",
  optional: "Optional",
  unavailable: "Unavailable",
};

export function TemplateCapabilitiesSection({
  data,
}: {
  data: AdminTemplateDetailData;
}) {
  return (
    <Panel>
      <SectionHeader
        eyebrow="Content Modules"
        title="Supported capabilities"
        description="Content modules this template's manifest exposes to the Invitation Editor. This is a metadata summary, not the raw manifest."
      />
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {data.capabilities.map((capability) => {
          const Icon = capabilityIcon[capability.type];
          return (
            <article key={capability.type} className="bg-surface-low p-4">
              <div className="flex items-start justify-between gap-2">
                <Icon aria-hidden size={16} className="text-secondary" />
                <span
                  className={`inline-flex shrink-0 items-center px-2 py-0.5 text-[8px] font-semibold tracking-[0.1em] uppercase ${supportTone[capability.support]}`}
                >
                  {supportLabel[capability.support]}
                </span>
              </div>
              <h3 className="mt-3 text-[12px] font-semibold">
                {capability.label}
              </h3>
              <p className="mt-1.5 text-[10px] leading-4 text-on-surface-variant">
                {capability.note}
              </p>
            </article>
          );
        })}
      </div>
    </Panel>
  );
}

/* ------------------------------------------------------------------ */
/* Usage                                                                */
/* ------------------------------------------------------------------ */

export function TemplateUsageSection({
  data,
}: {
  data: AdminTemplateDetailData;
}) {
  const { usage } = data;
  const maxMonthly = Math.max(...usage.monthlyUsage.map((m) => m.count), 1);

  return (
    <Panel>
      <SectionHeader
        eyebrow="Adoption"
        title="Usage"
        description="Operational usage for this template. This is a summary, not a full analytics dashboard."
      />

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <article className="bg-surface-low p-4">
          <p className="text-[8px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
            Total Invitations Using Template
          </p>
          <p className="mt-2 font-serif text-[28px]">
            {usage.totalInvitations}
          </p>
        </article>
        <article className="bg-surface-low p-4">
          <p className="text-[8px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
            Published (in sample)
          </p>
          <p className="mt-2 font-serif text-[28px]">
            {usage.publishedInvitations}
          </p>
        </article>
        <article className="bg-surface-low p-4">
          <p className="text-[8px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
            Draft (in sample)
          </p>
          <p className="mt-2 font-serif text-[28px]">
            {usage.draftInvitations}
          </p>
        </article>
      </div>

      <div className="mt-6 bg-surface-container p-5">
        <p className="text-[9px] font-semibold tracking-[0.13em] text-secondary uppercase">
          Monthly Usage
        </p>
        <div className="mt-4 flex h-28 items-end gap-3">
          {usage.monthlyUsage.map((month) => (
            <div key={month.label} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex h-full w-full items-end">
                <div
                  className="w-full bg-secondary"
                  style={{
                    height: `${Math.max(6, Math.round((month.count / maxMonthly) * 100))}%`,
                  }}
                />
              </div>
              <span className="text-[8px] font-semibold tracking-[0.08em] text-on-surface-variant uppercase">
                {month.label}
              </span>
              <span className="text-[9px] font-semibold">{month.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-[9px] font-semibold tracking-[0.13em] text-secondary uppercase">
          Recent Invitations
        </p>
        <p className="mt-1 text-[10px] leading-5 text-on-surface-variant">
          Showing a curated sample of the most recent invitations on this
          template. Totals above reflect the full registry, not just this
          sample.
        </p>
        <div className="mt-4 space-y-2">
          {usage.recentInvitations.length ? (
            usage.recentInvitations.map((invitation) => (
              <Link
                key={invitation.id}
                href={`/admin/invitations/${invitation.id}`}
                prefetch={false}
                className="flex flex-col gap-2 border border-border p-4 transition-colors hover:bg-surface-low sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <InvitationStatusBadge status={invitation.status} />
                  <div className="min-w-0">
                    <p className="truncate text-[11px] font-semibold">
                      {invitation.coupleLabel}
                    </p>
                    <p className="truncate text-[9px] text-on-surface-variant">
                      {invitation.customer.name} · v{invitation.templateVersion}
                    </p>
                  </div>
                </div>
                <span className="shrink-0 text-[9px] text-on-surface-variant">
                  {adminTemplateDateFormat.format(new Date(invitation.createdAt))}
                </span>
              </Link>
            ))
          ) : (
            <p className="bg-surface-low p-5 text-[11px] text-on-surface-variant">
              No invitations currently use this template.
            </p>
          )}
        </div>
      </div>
    </Panel>
  );
}

/* ------------------------------------------------------------------ */
/* Commercial Settings                                                 */
/* ------------------------------------------------------------------ */

export function TemplateCommercialSection({
  data,
}: {
  data: AdminTemplateDetailData;
}) {
  return (
    <Panel>
      <SectionHeader
        eyebrow="Commercial Entitlement"
        title="Commercial settings"
        description={
          data.commercial.availableToAllPackages
            ? "This template is available to all commercial packages."
            : "This template is available to selected commercial packages only."
        }
      />
      <div className="mt-6">
        <CommercialPackageList packages={data.commercial.packages} />
      </div>
    </Panel>
  );
}
