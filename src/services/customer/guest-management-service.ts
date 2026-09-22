import { mockCustomerInvitations } from "@/data/mocks/customer";
import { mockGuestManagementByInvitation } from "@/data/mocks/guest-management";
import {
  mockGuestImportFile,
  mockGuestImportRows,
} from "@/data/mocks/guest-import";
import type {
  CustomerInvitation,
  GuestImportData,
  GuestManagementData,
  InvitationGuest,
} from "@/types";

function cloneInvitation(source: CustomerInvitation): CustomerInvitation {
  return {
    ...source,
    metrics: source.metrics ? { ...source.metrics } : undefined,
    progress: source.progress ? { ...source.progress } : undefined,
    archive: source.archive ? { ...source.archive } : undefined,
  };
}

/**
 * Returns a safe, editable import preview without exposing parser internals or
 * guest security tokens. Real file parsing will live behind this same boundary.
 */
export async function getGuestImportData(
  invitationId: string,
): Promise<GuestImportData | null> {
  const management = await getGuestManagement(invitationId);
  if (!management) return null;

  const rows = mockGuestImportRows.map((row) => ({ ...row }));
  const duplicates = rows.flatMap((row) => {
    if (!row.duplicateGuestId) return [];
    const existingGuest = management.guests.find(
      (guest) => guest.id === row.duplicateGuestId,
    );
    if (!existingGuest) return [];

    return [
      {
        id: `duplicate_${row.id}`,
        rowId: row.id,
        existingGuest: cloneGuest(existingGuest),
        decision: null,
      },
    ];
  });

  return {
    invitation: management.invitation,
    groups: management.groups,
    preview: {
      ...mockGuestImportFile,
      rowCount: rows.length,
      rows,
      duplicates,
    },
  };
}

function cloneGuest(source: InvitationGuest): InvitationGuest {
  return { ...source };
}

/**
 * Request-facing guest directory read. The page depends on this contract, not
 * the mock source, so a later BFF integration can replace the implementation.
 */
export async function getGuestManagement(
  invitationId: string,
): Promise<GuestManagementData | null> {
  const invitation = mockCustomerInvitations.find(
    (item) => item.id === invitationId,
  );
  if (!invitation) return null;

  const record = mockGuestManagementByInvitation[invitationId];
  const guests = (record?.guests ?? []).map(cloneGuest);
  const groups = Array.from(new Set(guests.map((guest) => guest.group))).sort(
    (a, b) => a.localeCompare(b),
  );

  return {
    invitation: cloneInvitation(invitation),
    summary: record
      ? { ...record.summary }
      : {
          totalGuests: invitation.guestCount,
          invitationEntries: invitation.guestCount,
          confirmedPax: invitation.confirmedCount,
          pendingResponses: Math.max(
            invitation.guestCount - invitation.confirmedCount,
            0,
          ),
          dispatchedEntries: 0,
        },
    guests,
    groups,
  };
}
