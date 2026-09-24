import type { AdminNotification } from "@/types";

/**
 * Operational events only. Related customer, invitation, transaction, and
 * printed-order data is deliberately referenced by id and resolved by the
 * service layer so this feed never becomes a second resource registry.
 */
export const mockAdminNotifications: readonly AdminNotification[] = [
  {
    id: "adm_ntf_payment_03",
    kind: "paymentVerification",
    category: "payments",
    title: "Payment verification required",
    description:
      "A payment proof for the Grand Heirloom Letterpress Suite is waiting for manual review.",
    occurredAt: "2026-09-24T09:46:00+07:00",
    readAt: null,
    priority: "urgent",
    relatedResourceType: "transaction",
    relatedResourceId: "adm_txn_03",
  },
  {
    id: "adm_ntf_printed_ready_03",
    kind: "printedOrderReady",
    category: "printedOrders",
    title: "Printed order ready for dispatch",
    description:
      "Le Jardin Minimaliste has cleared production and needs a courier booking.",
    occurredAt: "2026-09-24T08:15:00+07:00",
    readAt: null,
    priority: "requiresAction",
    relatedResourceType: "printedOrder",
    relatedResourceId: "adm_txn_print_03",
  },
  {
    id: "adm_ntf_invitation_expiring_01",
    kind: "invitationExpiring",
    category: "invitations",
    title: "Invitation expires in 6 days",
    description:
      "Marc & Julianne’s public hosting window is approaching its expiration date.",
    occurredAt: "2026-09-24T07:30:00+07:00",
    readAt: null,
    priority: "urgent",
    relatedResourceType: "invitation",
    relatedResourceId: "adm_inv_julianne_moreau_1",
  },
  {
    id: "adm_ntf_wishes_ayu_01",
    kind: "wishesPending",
    category: "moderation",
    title: "Wishes awaiting moderation",
    description:
      "New guestbook wishes for Ayu & Dimas are waiting for an Admin review.",
    occurredAt: "2026-09-24T06:50:00+07:00",
    readAt: null,
    priority: "requiresAction",
    relatedResourceType: "invitation",
    relatedResourceId: "adm_inv_ayu_prameswari_1",
  },
  {
    id: "adm_ntf_payment_04",
    kind: "paymentVerification",
    category: "payments",
    title: "Quota payment awaiting verification",
    description:
      "Melina Kertanegara’s additional invitation quota purchase needs payment review.",
    occurredAt: "2026-09-23T16:42:00+07:00",
    readAt: null,
    priority: "requiresAction",
    relatedResourceType: "transaction",
    relatedResourceId: "adm_txn_04",
  },
  {
    id: "adm_ntf_printed_new_01",
    kind: "printedOrderReady",
    category: "printedOrders",
    title: "New printed order needs preparation",
    description:
      "A Grand Heirloom Letterpress Suite order is ready for swatch confirmation and production planning.",
    occurredAt: "2026-09-23T11:20:00+07:00",
    readAt: null,
    priority: "requiresAction",
    relatedResourceType: "printedOrder",
    relatedResourceId: "adm_txn_03",
  },
  {
    id: "adm_ntf_invitation_expired_01",
    kind: "invitationExpired",
    category: "invitations",
    title: "Invitation hosting has ended",
    description:
      "Chloe & Daniel’s City Ceremony is archived after its public hosting window ended.",
    occurredAt: "2026-09-22T09:10:00+07:00",
    readAt: "2026-09-22T10:05:00+07:00",
    priority: "normal",
    relatedResourceType: "invitation",
    relatedResourceId: "adm_inv_chloe_dsouza_1",
  },
  {
    id: "adm_ntf_customer_created_01",
    kind: "customerCreated",
    category: "customers",
    title: "New customer account created",
    description:
      "Sophia Lauren joined Moment Kita and is ready for a studio account review.",
    occurredAt: "2026-09-09T09:55:00+07:00",
    readAt: "2026-09-09T11:20:00+07:00",
    priority: "normal",
    relatedResourceType: "customer",
    relatedResourceId: "cus_sophia_lauren",
  },
];
