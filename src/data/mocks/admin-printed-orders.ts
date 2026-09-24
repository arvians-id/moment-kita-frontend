import type {
  AdminPrintedOrderFulfillment,
  AdminPrintedOrderStatus,
} from "@/types";

export interface PrintedOrderOperationsFixture {
  transactionId: string;
  productId: string | null;
  designVariant: string;
  quantity: number;
  orderStatus: AdminPrintedOrderStatus;
  fulfillment: AdminPrintedOrderFulfillment;
  internalNote: string | null;
  customerNote: string | null;
  productionStartedAt: string | null;
  estimatedCompletionAt: string | null;
  shippedAt: string | null;
  deliveredAt: string | null;
}

/**
 * Manual operational context keyed to the shared transaction id. No payment
 * status or amount is stored here, preventing drift from Admin Transactions.
 */
export const mockPrintedOrderOperations: readonly PrintedOrderOperationsFixture[] =
  [
    {
      transactionId: "adm_txn_03",
      productId: null,
      designVariant: "Warm White Cotton · Copper Foil Monogram",
      quantity: 250,
      orderStatus: "new",
      fulfillment: {
        method: "international",
        recipient: "Sarah Jenkins",
        addressSummary: "Singapore · full address pending confirmation",
        trackingNumber: null,
        statusLabel: "Delivery details pending",
      },
      internalNote: "Confirm paper swatch before scheduling the run.",
      customerNote:
        "Please keep the copper foil warm and understated; delivery contact will be confirmed over WhatsApp.",
      productionStartedAt: null,
      estimatedCompletionAt: "2026-10-18T17:00:00+07:00",
      shippedAt: null,
      deliveredAt: null,
    },
    {
      transactionId: "adm_txn_print_02",
      productId: "copenhagen-suite",
      designVariant: "700gsm Moulin Cotton · Deep Letterpress",
      quantity: 150,
      orderStatus: "in_production",
      fulfillment: {
        method: "courier",
        recipient: "Ayu Prameswari",
        addressSummary: "Jakarta Selatan, DKI Jakarta",
        trackingNumber: null,
        statusLabel: "Preparing shipment",
      },
      internalNote: "Plate engraving approved.",
      customerNote:
        "Keep the letterpress impression crisp but not overly deep.",
      productionStartedAt: "2026-09-16T09:00:00+07:00",
      estimatedCompletionAt: "2026-10-14T17:00:00+07:00",
      shippedAt: null,
      deliveredAt: null,
    },
    {
      transactionId: "adm_txn_print_03",
      productId: "linen-suite",
      designVariant: "600gsm Cotton · Blind Deboss Botanical Crest",
      quantity: 150,
      orderStatus: "ready",
      fulfillment: {
        method: "international",
        recipient: "Julianne Moreau",
        addressSummary: "Paris, France",
        trackingNumber: null,
        statusLabel: "Ready for courier booking",
      },
      internalNote: null,
      customerNote: "Include fifteen archival keepsake proofs for family.",
      productionStartedAt: "2026-09-12T09:30:00+07:00",
      estimatedCompletionAt: "2026-10-01T17:00:00+07:00",
      shippedAt: null,
      deliveredAt: null,
    },
    {
      transactionId: "adm_txn_print_04",
      productId: null,
      designVariant: "Six-paper sample box · neutral palette",
      quantity: 1,
      orderStatus: "shipped",
      fulfillment: {
        method: "international",
        recipient: "Chloe D'Souza",
        addressSummary: "San Francisco, CA",
        trackingNumber: "DHL-8391-2047",
        statusLabel: "In transit",
      },
      internalNote: null,
      customerNote: "Neutral samples only, with no bright white stocks.",
      productionStartedAt: "2026-09-09T10:00:00+07:00",
      estimatedCompletionAt: "2026-09-17T17:00:00+07:00",
      shippedAt: "2026-09-18T11:15:00+07:00",
      deliveredAt: null,
    },
    {
      transactionId: "adm_txn_print_05",
      productId: "ethereal-botanique-suite",
      designVariant: "Ivory Paper · Terracotta Wax Seal · Vellum",
      quantity: 100,
      orderStatus: "confirmed",
      fulfillment: {
        method: "studio_pickup",
        recipient: "Arthur Pendelton",
        addressSummary: null,
        trackingNumber: null,
        statusLabel: "Studio pickup after completion",
      },
      internalNote: "Final wording approved; awaiting press slot.",
      customerNote:
        "Coordinate studio pickup with the concierge after sealing.",
      productionStartedAt: null,
      estimatedCompletionAt: "2026-10-10T17:00:00+07:00",
      shippedAt: null,
      deliveredAt: null,
    },
    {
      transactionId: "adm_txn_print_06",
      productId: "sienna-suite",
      designVariant: "Tuscan Ocre · Matte Bronze Foil · Silk Ribbon",
      quantity: 100,
      orderStatus: "completed",
      fulfillment: {
        method: "courier",
        recipient: "Melina Kertanegara",
        addressSummary: "Denpasar, Bali",
        trackingNumber: "JNE-MK-240829-18",
        statusLabel: "Delivered",
      },
      internalNote: null,
      customerNote: "Ribbon color approved from the second physical swatch.",
      productionStartedAt: "2026-08-31T09:00:00+07:00",
      estimatedCompletionAt: "2026-09-18T17:00:00+07:00",
      shippedAt: "2026-09-18T14:20:00+07:00",
      deliveredAt: "2026-09-20T12:05:00+07:00",
    },
    {
      transactionId: "adm_txn_print_07",
      productId: "linen-suite",
      designVariant: "Botanical Crest · Rose Foil",
      quantity: 50,
      orderStatus: "cancelled",
      fulfillment: {
        method: "courier",
        recipient: "Beatrice Vane",
        addressSummary: null,
        trackingNumber: null,
        statusLabel: "Cancelled before fulfillment",
      },
      internalNote: "Commission refunded before plate casting.",
      customerNote: null,
      productionStartedAt: null,
      estimatedCompletionAt: null,
      shippedAt: null,
      deliveredAt: null,
    },
  ];
