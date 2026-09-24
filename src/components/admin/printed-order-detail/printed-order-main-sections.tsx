import {
  CalendarClock,
  ExternalLink,
  ImageIcon,
  MapPin,
  PackageCheck,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  idrFormat,
  orderDateFormat,
  printedOrderStatusLabel,
} from "@/components/admin/printed-orders/printed-order-utils";
import type {
  AdminPrintedOrderDetailData,
  AdminPrintedOrderItem,
} from "@/types";

function SectionHeading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="border-b border-border pb-4">
      <p className="text-[9px] font-semibold tracking-[0.16em] text-secondary uppercase">
        {kicker}
      </p>
      <h2 className="mt-1 font-serif text-[24px]">{title}</h2>
    </div>
  );
}

function maybeDate(value: string | null) {
  return value ? orderDateFormat.format(new Date(value)) : "Not available yet";
}

export function ProductAndPricingSection({
  data,
}: {
  data: AdminPrintedOrderDetailData;
}) {
  const { order, product } = data;

  return (
    <section className="border border-border bg-surface-lowest p-5 shadow-sm sm:p-7">
      <SectionHeading
        kicker="01 · Order specification"
        title="Product & pricing"
      />
      <div className="mt-5 grid gap-5 md:grid-cols-[220px_minmax(0,1fr)]">
        {product ? (
          <div className="relative min-h-64 overflow-hidden bg-surface-container">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(min-width: 768px) 220px, 100vw"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="grid min-h-48 place-items-center bg-surface-low text-center text-on-surface-variant md:min-h-64">
            <div>
              <ImageIcon aria-hidden size={28} className="mx-auto" />
              <p className="mt-2 text-[9px] font-semibold tracking-[0.12em] uppercase">
                Custom atelier specification
              </p>
            </div>
          </div>
        )}

        <div className="min-w-0">
          <p className="text-[9px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
            Product / Design
          </p>
          <h3 className="mt-1 font-serif text-[24px]">{order.productName}</h3>
          <p className="mt-2 text-[11px] leading-5 text-on-surface-variant">
            {product?.description ?? order.description}
          </p>

          <dl className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="bg-surface-low p-4 sm:col-span-2">
              <dt className="text-[8px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
                Variant / Material
              </dt>
              <dd className="mt-1.5 text-[11px] leading-5 font-semibold">
                {order.designVariant}
              </dd>
            </div>
            {product ? (
              <>
                <div className="bg-surface-low p-4">
                  <dt className="text-[8px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
                    Edition
                  </dt>
                  <dd className="mt-1.5 text-[11px] font-semibold">
                    {product.edition}
                  </dd>
                </div>
                <div className="bg-surface-low p-4">
                  <dt className="text-[8px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
                    Finish
                  </dt>
                  <dd className="mt-1.5 text-[11px] font-semibold">
                    {product.badge}
                  </dd>
                </div>
              </>
            ) : null}
          </dl>
        </div>
      </div>

      <dl className="mt-6 divide-y divide-border border-y border-border text-[11px]">
        <div className="flex items-center justify-between gap-4 py-3">
          <dt className="text-on-surface-variant">Unit price</dt>
          <dd className="font-semibold">{idrFormat.format(order.unitPrice)}</dd>
        </div>
        <div className="flex items-center justify-between gap-4 py-3">
          <dt className="text-on-surface-variant">Quantity</dt>
          <dd className="font-semibold">{order.quantity} sets</dd>
        </div>
        <div className="flex items-center justify-between gap-4 py-3">
          <dt className="text-on-surface-variant">Subtotal</dt>
          <dd className="font-semibold">{idrFormat.format(order.amount)}</dd>
        </div>
        <div className="flex items-center justify-between gap-4 py-3">
          <dt className="text-on-surface-variant">Delivery fee</dt>
          <dd className="text-on-surface-variant">Not separately recorded</dd>
        </div>
        <div className="flex items-center justify-between gap-4 py-4 text-[13px]">
          <dt className="font-semibold">Total</dt>
          <dd className="font-serif text-[20px]">
            {idrFormat.format(order.amount)}
          </dd>
        </div>
      </dl>
    </section>
  );
}

export function ProductionSection({ order }: { order: AdminPrintedOrderItem }) {
  const steps = [
    "new",
    "confirmed",
    "in_production",
    "ready",
    "shipped",
    "completed",
  ] as const;
  const currentIndex = steps.indexOf(
    order.orderStatus === "cancelled" ? "new" : order.orderStatus,
  );

  return (
    <section className="border border-border bg-surface-lowest p-5 shadow-sm sm:p-7">
      <SectionHeading
        kicker="02 · Manual operations"
        title="Production progress"
      />
      {order.orderStatus === "cancelled" ? (
        <div className="mt-5 bg-surface-low p-4 text-[11px] leading-5 text-on-surface-variant">
          This order was cancelled. Cancellation does not imply that its related
          payment was refunded.
        </div>
      ) : (
        <ol className="mt-6 grid gap-2 sm:grid-cols-3 xl:grid-cols-6">
          {steps.map((step, index) => (
            <li
              key={step}
              className={`border-t-2 p-3 ${index <= currentIndex ? "border-secondary bg-accent/45" : "border-border bg-surface-low"}`}
            >
              <span className="text-[8px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-1 text-[9px] font-semibold uppercase">
                {printedOrderStatusLabel[step]}
              </p>
            </li>
          ))}
        </ol>
      )}

      <dl className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="bg-surface-low p-4">
          <dt className="flex items-center gap-2 text-[8px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
            <PackageCheck aria-hidden size={12} /> Production started
          </dt>
          <dd className="mt-2 text-[11px] font-semibold">
            {maybeDate(order.productionStartedAt)}
          </dd>
        </div>
        <div className="bg-surface-low p-4">
          <dt className="flex items-center gap-2 text-[8px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
            <CalendarClock aria-hidden size={12} /> Estimated completion
          </dt>
          <dd className="mt-2 text-[11px] font-semibold">
            {maybeDate(order.estimatedCompletionAt)}
          </dd>
        </div>
        <div className="bg-surface-low p-4">
          <dt className="text-[8px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
            Print run
          </dt>
          <dd className="mt-2 text-[11px] font-semibold">
            {order.quantity} completed sets
          </dd>
        </div>
      </dl>
    </section>
  );
}

export function FulfillmentSection({
  order,
  phone,
}: {
  order: AdminPrintedOrderItem;
  phone: string | null;
}) {
  const methodLabel = {
    courier: "Domestic courier",
    international: "International courier",
    studio_pickup: "Studio pickup",
  }[order.fulfillment.method];

  return (
    <section className="border border-border bg-surface-lowest p-5 shadow-sm sm:p-7">
      <SectionHeading kicker="03 · Handover" title="Delivery & fulfillment" />
      <dl className="mt-5 grid gap-3 sm:grid-cols-2">
        {[
          ["Recipient", order.fulfillment.recipient],
          ["Phone", phone ?? "Not available"],
          ["Method", methodLabel],
          ["Shipping status", order.fulfillment.statusLabel],
          ["Address", order.fulfillment.addressSummary ?? "Not available yet"],
          [
            "Tracking number",
            order.fulfillment.trackingNumber ?? "Not available yet",
          ],
          ["Shipped date", maybeDate(order.shippedAt)],
          ["Delivered date", maybeDate(order.deliveredAt)],
        ].map(([label, value]) => (
          <div key={label} className="bg-surface-low p-4">
            <dt className="text-[8px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
              {label}
            </dt>
            <dd className="mt-1.5 break-words text-[11px] leading-5 font-semibold">
              {value}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 flex items-start gap-2 border border-border p-4 text-[10px] leading-5 text-on-surface-variant">
        {order.fulfillment.method === "studio_pickup" ? (
          <MapPin
            aria-hidden
            size={15}
            className="mt-0.5 shrink-0 text-secondary"
          />
        ) : (
          <Truck
            aria-hidden
            size={15}
            className="mt-0.5 shrink-0 text-secondary"
          />
        )}
        Fulfillment details are maintained manually. No carrier API, label
        generation, or live shipment tracking is connected.
      </p>
    </section>
  );
}

export function RelatedInvitation({ order }: { order: AdminPrintedOrderItem }) {
  if (!order.relatedInvitation) return null;
  return (
    <Link
      href={`/admin/invitations/${order.relatedInvitation.id}`}
      prefetch={false}
      className="flex items-center justify-between gap-4 border border-border bg-surface-lowest p-4 text-[11px] shadow-sm hover:bg-surface-low"
    >
      <span>
        <span className="block text-[8px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
          Related digital invitation
        </span>
        <strong className="mt-1 block">
          {order.relatedInvitation.coupleLabel}
        </strong>
      </span>
      <ExternalLink aria-hidden size={15} className="shrink-0 text-secondary" />
    </Link>
  );
}
