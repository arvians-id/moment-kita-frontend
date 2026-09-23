import { mockPackages } from "@/data/mocks/packages";
import type { CustomerTransaction } from "@/types";

/**
 * Reuse the real Signature package price rather than a hand-typed duplicate,
 * so the transaction ledger and the marketing pricing page never drift apart.
 */
const signaturePackage = mockPackages.find((item) => item.id === "signature")!;

const IDR = "IDR" as const;

export const mockCustomerTransactions: readonly CustomerTransaction[] = [
  {
    id: "txn_01",
    reference: "TRX-240922-001",
    purpose: "package",
    productName: "Signature Package",
    description:
      "4 invitations, unlimited RSVPs, custom vanity slug & concierge",
    status: "paid",
    amount: {
      subtotal: 449_550,
      tax: 49_450,
      surcharge: 0,
      total: signaturePackage.price,
      currency: IDR,
    },
    relatedInvitationId: "inv_01",
    payment: {
      method: "BCA Virtual Account",
      channelBadge: "Auto-Settled",
      accountReference: "8271 0029 4819 2201",
      bankReferenceNumber: "BCA-WS-992104-ATELIER",
      verifiedAt: "2026-09-22T15:42:00+07:00",
    },
    createdAt: "2026-09-22T15:38:00+07:00",
    paidAt: "2026-09-22T15:42:00+07:00",
    invoiceNumber: "INV-MK-2026-8819",
    entitlementsGranted: [
      "4x Digital Invitation Quota (Total 4 Available)",
      "365 Days Active Production Cloud Hosting",
      "Unlimited WhatsApp RSVPs & Guestbook",
      "Music Background & Interactive Vinyl Animation",
    ],
  },
  {
    id: "txn_02",
    reference: "TRX-240920-008",
    purpose: "extension",
    productName: "Validity Extension (+180 Days)",
    description: "Extended live hosting period for destination reception",
    status: "paid",
    amount: {
      subtotal: 89_190,
      tax: 9_810,
      surcharge: 0,
      total: 99_000,
      currency: IDR,
    },
    relatedInvitationId: "inv_01",
    payment: {
      method: "BCA Virtual Account",
      channelBadge: "Auto-Settled",
      accountReference: "8271 0029 4819 2201",
      bankReferenceNumber: "BCA-WS-991876-ATELIER",
      verifiedAt: "2026-09-20T11:20:00+07:00",
    },
    createdAt: "2026-09-20T11:14:00+07:00",
    paidAt: "2026-09-20T11:20:00+07:00",
    invoiceNumber: "INV-MK-2026-8790",
    entitlementsGranted: ["+180 Days Active Hosting"],
    extension: {
      previousExpiresAt: "2026-08-25T23:59:00+07:00",
      extendedUntil: "2027-02-20T23:59:00+07:00",
    },
  },
  {
    id: "txn_03",
    reference: "TRX-240918-003",
    purpose: "quotaAddon",
    productName: "Additional Invitation Quota (+1)",
    description:
      "Secondary intimate reception for extended family in Yogyakarta",
    status: "pending",
    amount: {
      subtotal: 89_190,
      tax: 9_810,
      surcharge: 0,
      total: 99_000,
      currency: IDR,
    },
    relatedInvitationId: null,
    payment: {
      method: "Bank Transfer — Manual Verification",
      accountReference: "8271 0029 4819 2201",
    },
    createdAt: "2026-09-18T19:15:00+07:00",
    entitlementsGranted: [],
  },
  {
    id: "txn_04",
    reference: "TRX-240905-014",
    purpose: "quotaAddon",
    productName: "Additional Invitation Quota (+1)",
    description: "Reserved slot for a second celebration, not proceeded with",
    status: "cancelled",
    amount: {
      subtotal: 89_190,
      tax: 9_810,
      surcharge: 0,
      total: 99_000,
      currency: IDR,
    },
    relatedInvitationId: null,
    payment: {
      method: "Bank Transfer — Manual Verification",
    },
    createdAt: "2026-09-05T09:02:00+07:00",
    entitlementsGranted: [],
  },
  {
    id: "txn_05",
    reference: "TRX-240812-019",
    purpose: "extension",
    productName: "Validity Extension (+90 Days)",
    description: "Hosting extension refunded after date change",
    status: "refunded",
    amount: {
      subtotal: 44_595,
      tax: 4_905,
      surcharge: 0,
      total: 49_500,
      currency: IDR,
    },
    relatedInvitationId: "inv_01",
    payment: {
      method: "BCA Virtual Account",
      channelBadge: "Refunded",
      accountReference: "8271 0029 4819 2201",
      bankReferenceNumber: "BCA-WS-988215-ATELIER",
      verifiedAt: "2026-08-12T10:05:00+07:00",
    },
    createdAt: "2026-08-12T09:58:00+07:00",
    paidAt: "2026-08-12T10:05:00+07:00",
    invoiceNumber: "INV-MK-2026-8611",
    entitlementsGranted: [],
  },
];
