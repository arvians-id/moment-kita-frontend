import { createMockInvitationVersions } from "@/data/mocks/version-history";
import { getInvitationBuilder } from "@/services/customer/invitation-builder-service";
import type {
  InvitationBuilderContent,
  InvitationVersion,
  VersionHistoryData,
} from "@/types";

export const VERSION_HISTORY_LIMIT = 10;

function cloneContent(
  content: InvitationBuilderContent,
): InvitationBuilderContent {
  return JSON.parse(JSON.stringify(content)) as InvitationBuilderContent;
}

function cloneVersion(version: InvitationVersion): InvitationVersion {
  return {
    ...version,
    content: cloneContent(version.content),
    sections: version.sections.map((section) => ({ ...section })),
  };
}

/**
 * Returns one invitation's recent explicit saves. Only content and section
 * visibility are versioned; lifecycle, template, slug, quota, and guest data
 * remain owned by their existing domains.
 */
export async function getVersionHistory(
  invitationId: string,
): Promise<VersionHistoryData | null> {
  const builder = await getInvitationBuilder(invitationId);
  if (!builder) return null;

  const versions = createMockInvitationVersions(
    invitationId,
    builder.content,
    builder.sections,
  )
    .sort((a, b) => b.versionNumber - a.versionNumber)
    .slice(0, VERSION_HISTORY_LIMIT)
    .map(cloneVersion);

  return {
    invitation: builder.invitation,
    versions,
  };
}
