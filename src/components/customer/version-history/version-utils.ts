import type { InvitationBuilderContent, InvitationVersion } from "@/types";

const versionDateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Jakarta",
});

export function formatVersionDate(savedAt: string): string {
  return `${versionDateFormatter.format(new Date(savedAt))} WIB`;
}

export function cloneVersionContent(
  content: InvitationBuilderContent,
): InvitationBuilderContent {
  return JSON.parse(JSON.stringify(content)) as InvitationBuilderContent;
}

export function createRestoredVersion(
  source: InvitationVersion,
  versionNumber: number,
): InvitationVersion {
  return {
    versionNumber,
    savedAt: new Date().toISOString(),
    summary: `Restored from Version ${source.versionNumber}`,
    content: cloneVersionContent(source.content),
    sections: source.sections.map((section) => ({ ...section })),
    isCurrent: true,
    restoredFromVersion: source.versionNumber,
  };
}
