import { mockPackages } from "@/data/mocks/packages";
import type {
  AdminCustomer,
  AdminCustomerActivity,
  AdminCustomerDetailData,
  AdminCustomerInvitation,
  AdminCustomerQuotaEntry,
  AdminCustomerSummary,
  AdminCustomerTransaction,
  InvitationStatus,
} from "@/types";

/**
 * Representative directory rows. The summary describes the full mocked
 * customer population while this array is the current paginated slice.
 */
export const mockAdminCustomerSummary: AdminCustomerSummary = {
  totalCustomers: 342,
  registeredAccounts: 276,
  managedCustomers: 66,
  paidCustomers: 311,
  addedThisMonth: 27,
};

export const mockAdminCustomers: readonly AdminCustomer[] = [
  {
    id: "cus_ayu_prameswari",
    name: "Ayu Prameswari",
    initials: "AP",
    email: "ayu.prameswari@example.com",
    whatsapp: "+62 812-8472-1093",
    accountType: "registered",
    linkedUserId: "usr_ayu_prameswari",
    invitationCount: 2,
    quotaGranted: 5,
    quotaRemaining: 3,
    totalSpending: 25_900_000,
    paymentStatus: "paid",
    status: "active",
    joinedAt: "2026-02-14T09:18:00+07:00",
  },
  {
    id: "cus_julianne_moreau",
    name: "Julianne Moreau",
    initials: "JM",
    email: null,
    whatsapp: "+33 6 49 20 11 85",
    accountType: "managed",
    linkedUserId: null,
    invitationCount: 1,
    quotaGranted: 5,
    quotaRemaining: 4,
    totalSpending: 26_730_000,
    paymentStatus: "paid",
    status: "active",
    joinedAt: "2026-03-02T13:44:00+07:00",
    notes: "Concierge-led stationery and digital suite.",
  },
  {
    id: "cus_sarah_jenkins",
    name: "Sarah Jenkins",
    initials: "SJ",
    email: "sarah.jenkins@example.com",
    whatsapp: "+1 555 890 4412",
    accountType: "registered",
    linkedUserId: "usr_sarah_jenkins",
    invitationCount: 1,
    quotaGranted: 1,
    quotaRemaining: 0,
    totalSpending: 800_000,
    paymentStatus: "paid",
    status: "no_quota",
    joinedAt: "2026-04-19T08:10:00+07:00",
  },
  {
    id: "cus_melina_kertanegara",
    name: "Melina Kertanegara",
    initials: "MK",
    email: "melina.dayson@example.com",
    whatsapp: "+62 811-923-4410",
    accountType: "managed",
    linkedUserId: null,
    invitationCount: 1,
    quotaGranted: 0,
    quotaRemaining: 0,
    totalSpending: 13_400_000,
    paymentStatus: "pending",
    status: "pending_payment",
    joinedAt: "2026-05-11T16:42:00+07:00",
    notes: "Manual transfer awaiting confirmation.",
  },
  {
    id: "cus_arthur_pendelton",
    name: "Arthur Pendelton",
    initials: "AP",
    email: "arthur.pendelton@example.co.uk",
    whatsapp: "+44 7700 900142",
    accountType: "registered",
    linkedUserId: "usr_arthur_pendelton",
    invitationCount: 2,
    quotaGranted: 3,
    quotaRemaining: 2,
    totalSpending: 19_850_000,
    paymentStatus: "paid",
    status: "active",
    joinedAt: "2026-06-03T11:30:00+07:00",
  },
  {
    id: "cus_chloe_dsouza",
    name: "Chloe D'Souza",
    initials: "CD",
    email: "chloe.dsouza@example.com",
    whatsapp: "+1 415 670 2219",
    accountType: "registered",
    linkedUserId: "usr_chloe_dsouza",
    invitationCount: 2,
    quotaGranted: 2,
    quotaRemaining: 0,
    totalSpending: 1_600_000,
    paymentStatus: "paid",
    status: "no_quota",
    joinedAt: "2026-07-07T10:05:00+07:00",
  },
  {
    id: "cus_beatrice_vane",
    name: "Beatrice Vane",
    initials: "BV",
    email: null,
    whatsapp: "+62 813-8820-9941",
    accountType: "managed",
    linkedUserId: null,
    invitationCount: 2,
    quotaGranted: 10,
    quotaRemaining: 9,
    totalSpending: 39_690_000,
    paymentStatus: "paid",
    status: "active",
    joinedAt: "2026-08-16T14:22:00+07:00",
    notes: "Studio desk is the primary correspondence channel.",
  },
  {
    id: "cus_sophia_lauren",
    name: "Sophia Lauren",
    initials: "SL",
    email: "sophia.lauren@example.com",
    whatsapp: "+1 212 555 0199",
    accountType: "registered",
    linkedUserId: "usr_sophia_lauren",
    invitationCount: 1,
    quotaGranted: 1,
    quotaRemaining: 0,
    totalSpending: 800_000,
    paymentStatus: "paid",
    status: "no_quota",
    joinedAt: "2026-09-09T09:55:00+07:00",
  },
];

interface InvitationSeed {
  slug: string;
  coupleLabel: string;
  status: InvitationStatus;
  eventDate: string;
  venue: string;
  templateName: string;
  publishedAt: string | null;
  expiresAt: string | null;
}

const invitationSeeds: Record<string, readonly InvitationSeed[]> = {
  cus_ayu_prameswari: [
    {
      slug: "ayu-dimas-bali",
      coupleLabel: "Ayu & Dimas — Bali Cliff Wedding",
      status: "published",
      eventDate: "2026-12-28T15:00:00+08:00",
      venue: "The Cliffside Vows, Uluwatu",
      templateName: "Château de Chantilly",
      publishedAt: "2026-09-12T10:30:00+07:00",
      expiresAt: "2027-03-28T23:59:00+07:00",
    },
    {
      slug: "ayu-dimas-akad",
      coupleLabel: "Ayu & Dimas — Jakarta Akad",
      status: "finalized",
      eventDate: "2026-11-15T09:00:00+07:00",
      venue: "The Dharmawangsa, Jakarta",
      templateName: "Kyoto Monochrome",
      publishedAt: null,
      expiresAt: null,
    },
  ],
  cus_julianne_moreau: [
    {
      slug: "marc-julianne",
      coupleLabel: "Marc & Julianne",
      status: "published",
      eventDate: "2026-06-14T16:00:00+02:00",
      venue: "Domaine de Fontenille, Provence",
      templateName: "Botanique Vivace",
      publishedAt: "2026-03-22T09:15:00+07:00",
      expiresAt: "2026-09-30T23:59:00+07:00",
    },
  ],
  cus_sarah_jenkins: [
    {
      slug: "sarah-liam",
      coupleLabel: "Sarah & Liam",
      status: "published",
      eventDate: "2026-12-18T15:00:00-05:00",
      venue: "The Foundry, New York",
      templateName: "Kyoto Monochrome",
      publishedAt: "2026-08-28T16:40:00+07:00",
      expiresAt: "2027-03-18T23:59:00+07:00",
    },
  ],
  cus_melina_kertanegara: [
    {
      slug: "melina-dayson",
      coupleLabel: "Melina & Dayson",
      status: "draft",
      eventDate: "2027-02-08T10:00:00+07:00",
      venue: "Mayana Garden Sanctuary, Kyoto",
      templateName: "Tuscan Terracotta",
      publishedAt: null,
      expiresAt: null,
    },
  ],
  cus_arthur_pendelton: [
    {
      slug: "arthur-evelyn-london",
      coupleLabel: "Arthur & Evelyn — London",
      status: "published",
      eventDate: "2027-01-16T14:00:00+00:00",
      venue: "Claridge's, London",
      templateName: "Aura Blanche",
      publishedAt: "2026-09-06T13:20:00+07:00",
      expiresAt: "2027-04-16T23:59:00+07:00",
    },
    {
      slug: "arthur-evelyn-jakarta",
      coupleLabel: "Arthur & Evelyn — Jakarta Dinner",
      status: "draft",
      eventDate: "2027-02-06T18:00:00+07:00",
      venue: "Plataran Menteng, Jakarta",
      templateName: "Château de Chantilly",
      publishedAt: null,
      expiresAt: null,
    },
  ],
  cus_chloe_dsouza: [
    {
      slug: "chloe-daniel-city",
      coupleLabel: "Chloe & Daniel — City Ceremony",
      status: "expired",
      eventDate: "2026-05-23T15:00:00-07:00",
      venue: "San Francisco City Hall",
      templateName: "Botanique Vivace",
      publishedAt: "2026-02-19T08:45:00+07:00",
      expiresAt: "2026-08-23T23:59:00+07:00",
    },
    {
      slug: "chloe-daniel-family",
      coupleLabel: "Chloe & Daniel — Family Reception",
      status: "finalized",
      eventDate: "2026-10-10T18:00:00-07:00",
      venue: "Cavallo Point, Sausalito",
      templateName: "Tuscan Terracotta",
      publishedAt: null,
      expiresAt: null,
    },
  ],
  cus_beatrice_vane: [
    {
      slug: "beatrice-henry-grand",
      coupleLabel: "Beatrice & Henry — Grand Celebration",
      status: "published",
      eventDate: "2027-04-17T16:00:00+07:00",
      venue: "Amankila, Bali",
      templateName: "Château de Chantilly",
      publishedAt: "2026-09-15T17:30:00+07:00",
      expiresAt: "2027-07-17T23:59:00+07:00",
    },
    {
      slug: "beatrice-henry-vows",
      coupleLabel: "Beatrice & Henry — Intimate Vows",
      status: "draft",
      eventDate: "2027-04-16T10:00:00+07:00",
      venue: "Tirtha Uluwatu, Bali",
      templateName: "Kyoto Monochrome",
      publishedAt: null,
      expiresAt: null,
    },
  ],
  cus_sophia_lauren: [
    {
      slug: "sophia-nathan",
      coupleLabel: "Sophia & Nathan",
      status: "cancelled",
      eventDate: "2027-06-12T11:00:00-04:00",
      venue: "Tribeca Loft, New York",
      templateName: "Aura Blanche",
      publishedAt: null,
      expiresAt: null,
    },
  ],
};

function buildInvitations(customer: AdminCustomer): AdminCustomerInvitation[] {
  return (invitationSeeds[customer.id] ?? []).map((invitation, index) => {
    const lifecycleDate = invitation.publishedAt ?? "2026-09-20T14:10:00+07:00";

    return {
      id: `adm_inv_${customer.id.slice(4)}_${index + 1}`,
      ...invitation,
      templateVersion: index % 2 === 0 ? "2.4" : "1.8",
      createdAt: customer.joinedAt,
      finalizedAt: invitation.status === "draft" ? null : lifecycleDate,
      quotaConsumed: invitation.status !== "draft",
    };
  });
}

function buildTransactions(
  customer: AdminCustomer,
): AdminCustomerTransaction[] {
  if (customer.totalSpending === 0) return [];

  const primaryAmount =
    customer.invitationCount > 1
      ? Math.round(customer.totalSpending * 0.8)
      : customer.totalSpending;
  const base: AdminCustomerTransaction[] = [
    {
      id: `adm_txn_${customer.id.slice(4)}_1`,
      reference: `TRX-${customer.id.slice(4, 10).toUpperCase()}-01`,
      purpose: "package",
      productName:
        customer.totalSpending >= 20_000_000
          ? "Prestige Digital Suite"
          : customer.totalSpending >= 5_000_000
            ? "Signature Digital Suite"
            : "Essential Digital Suite",
      amount: primaryAmount,
      status: customer.paymentStatus === "paid" ? "paid" : "pending",
      createdAt: customer.joinedAt,
    },
  ];

  if (primaryAmount < customer.totalSpending) {
    base.unshift({
      id: `adm_txn_${customer.id.slice(4)}_2`,
      reference: `TRX-${customer.id.slice(4, 10).toUpperCase()}-02`,
      purpose: "quotaAddon",
      productName: "Additional Invitation Allocation",
      amount: customer.totalSpending - primaryAmount,
      status: customer.paymentStatus === "paid" ? "paid" : "pending",
      createdAt: "2026-09-18T09:30:00+07:00",
    });
  }

  return base;
}

function buildQuotaHistory(customer: AdminCustomer): AdminCustomerQuotaEntry[] {
  const used = customer.quotaGranted - customer.quotaRemaining;
  const managedBonus =
    customer.accountType === "managed" && customer.quotaGranted > 0 ? 1 : 0;
  const entries: AdminCustomerQuotaEntry[] = [];

  if (used > 0) {
    entries.push({
      id: `quota_${customer.id.slice(4)}_used`,
      delta: -used,
      reason:
        used === 1
          ? "Invitation finalized"
          : `${used} invitation allocations finalized`,
      source: "Invitation",
      createdAt: "2026-09-20T14:10:00+07:00",
    });
  }

  if (managedBonus > 0) {
    entries.push({
      id: `quota_${customer.id.slice(4)}_adjustment`,
      delta: managedBonus,
      reason: "Concierge allocation approved for managed service",
      source: "Admin adjustment",
      createdAt: "2026-09-18T11:25:00+07:00",
      adminName: "Atelier Admin",
    });
  }

  if (customer.quotaGranted > 0) {
    entries.push({
      id: `quota_${customer.id.slice(4)}_grant`,
      delta: customer.quotaGranted - managedBonus,
      reason: "Package purchase confirmed",
      source: "Package purchase",
      createdAt: customer.joinedAt,
    });
  }

  return entries;
}

function buildActivity(
  customer: AdminCustomer,
  invitations: AdminCustomerInvitation[],
): AdminCustomerActivity[] {
  const activity: AdminCustomerActivity[] = [
    {
      id: `activity_${customer.id.slice(4)}_payment`,
      kind: "payment",
      title:
        customer.paymentStatus === "paid"
          ? "Payment confirmed"
          : "Payment awaiting confirmation",
      description:
        customer.paymentStatus === "paid"
          ? "The customer package transaction was confirmed."
          : "The manual payment remains pending and no account action was inferred.",
      createdAt: "2026-09-18T09:35:00+07:00",
      actor: "Atelier Admin",
    },
  ];

  invitations.slice(0, 2).forEach((invitation, index) => {
    activity.push({
      id: `activity_${invitation.id}`,
      kind: "invitation",
      title:
        invitation.status === "draft"
          ? "Invitation created"
          : invitation.status === "finalized"
            ? "Invitation finalized"
            : "Invitation status updated",
      description: `${invitation.coupleLabel} is ${invitation.status}.`,
      createdAt: `2026-09-${String(16 - index).padStart(2, "0")}T10:20:00+07:00`,
      actor: invitation.status === "draft" ? "Atelier Admin" : customer.name,
    });
  });

  activity.push({
    id: `activity_${customer.id.slice(4)}_created`,
    kind: "customer",
    title: "Customer created",
    description:
      customer.accountType === "managed"
        ? "A studio-managed customer profile was created without a linked login account."
        : "A customer profile was created and linked to a registered account.",
    createdAt: customer.joinedAt,
    actor: customer.accountType === "managed" ? "Atelier Admin" : customer.name,
  });

  return activity;
}

function buildCustomerDetail(customer: AdminCustomer): AdminCustomerDetailData {
  const invitations = buildInvitations(customer);
  const packageId =
    customer.totalSpending >= 20_000_000
      ? "prestige"
      : customer.totalSpending >= 5_000_000
        ? "signature"
        : "essential";
  const packageRecord = mockPackages.find((item) => item.id === packageId);

  return {
    customer,
    currentPackage:
      customer.paymentStatus === "paid" && packageRecord
        ? {
            id: packageRecord.id,
            name: packageRecord.name,
            description: packageRecord.description,
            activatedAt: customer.joinedAt,
            expiresAt: "2027-09-30T23:59:00+07:00",
          }
        : null,
    invitations,
    transactions: buildTransactions(customer),
    quotaHistory: buildQuotaHistory(customer),
    activity: buildActivity(customer, invitations),
  };
}

/**
 * Detail fixtures reuse the exact directory customer objects above. Subordinate
 * records are customer-owned projections, not a second customer source of truth.
 */
export const mockAdminCustomerDetails: ReadonlyMap<
  string,
  AdminCustomerDetailData
> = new Map(
  mockAdminCustomers.map((customer) => [
    customer.id,
    buildCustomerDetail(customer),
  ]),
);
