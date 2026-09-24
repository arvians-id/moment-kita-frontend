import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { publicConfig } from "@/lib/config";
import type {
  ActivityEntry,
  CustomerInvitation,
  EntitlementSummary,
} from "@/types";

const shortDate = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Jakarta",
});

export function InvitationPlanAndChangelog({
  invitation,
  entitlement,
  activity,
}: {
  invitation: CustomerInvitation;
  entitlement: EntitlementSummary;
  activity: ActivityEntry[];
}) {
  const host = publicConfig.publicHost;

  const specs: { label: string; value: string; highlight?: boolean }[] = [
    {
      label: "Invitation address",
      value:
        invitation.status === "published"
          ? `${host}/${invitation.slug}`
          : "Assigned on publish",
      highlight: invitation.status === "published",
    },
    { label: "RSVP quota", value: "Unlimited responses" },
    { label: "Audio guestbook", value: "Included", highlight: true },
    {
      label: "Cloud hosting",
      value: invitation.expiresAt
        ? `Active until ${shortDate.format(new Date(invitation.expiresAt))}`
        : "Starts at first publish",
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="flex flex-col justify-between gap-4 bg-surface-lowest p-6 shadow-sm">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
            Tier entitlements
          </span>
          <h2 className="font-serif text-[19px] leading-7 font-semibold">
            {entitlement.packageName}
          </h2>
        </div>

        <dl className="flex flex-col gap-2.5 text-[13px] leading-5">
          {specs.map((spec) => (
            <div
              key={spec.label}
              className="flex items-center justify-between gap-3 py-1"
            >
              <dt className="text-on-surface-variant">{spec.label}</dt>
              <dd
                className={`truncate text-right font-medium ${spec.highlight ? "text-secondary" : ""}`}
              >
                {spec.value}
              </dd>
            </div>
          ))}
        </dl>

        <span
          aria-disabled="true"
          className="mt-2 inline-flex h-8 w-full cursor-not-allowed items-center justify-center gap-1.5 bg-surface-container px-3 text-[11px] font-semibold tracking-[0.12em] uppercase opacity-90"
        >
          <ArrowUpRight aria-hidden size={14} />
          Manage plan &amp; add-ons
        </span>
      </div>

      <div className="flex flex-col justify-between gap-4 bg-surface-lowest p-6 shadow-sm">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
            Changelog
          </span>
          <h2 className="font-serif text-[19px] leading-7 font-semibold">
            Recent workspace events
          </h2>
        </div>

        {activity.length > 0 ? (
          <ul className="flex flex-col gap-3">
            {activity.map((entry, index) => (
              <li key={entry.id} className="flex items-start gap-2.5">
                <span
                  aria-hidden
                  className={`mt-1.5 size-2 shrink-0 rounded-full ${index === 0 ? "bg-secondary" : "bg-on-surface-variant/35"}`}
                />
                <div className="flex min-w-0 flex-col">
                  <span className="text-[13px] leading-5 font-medium">
                    {entry.message}
                  </span>
                  <span className="text-[12px] text-on-surface-variant">
                    {entry.occurredAt}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[13px] leading-relaxed text-on-surface-variant">
            No workspace events recorded yet.
          </p>
        )}

        <Link
          href={`/app/invitations/${invitation.id}/versions`}
          className="pt-2 text-center text-[12px] font-semibold tracking-[0.12em] text-secondary uppercase transition-colors hover:text-on-surface"
        >
          View complete audit log
        </Link>
      </div>
    </section>
  );
}
