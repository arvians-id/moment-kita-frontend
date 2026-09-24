"use client";

import { Info, X } from "lucide-react";
import { useEffect, useState } from "react";

import type {
  AdminCustomer,
  AdminPrintedOrderItem,
  PrintedProduct,
} from "@/types";

export function LogPrintedOrderDialog({
  open,
  customers,
  products,
  onClose,
  onSubmit,
}: {
  open: boolean;
  customers: AdminCustomer[];
  products: PrintedProduct[];
  onClose: () => void;
  onSubmit: (order: AdminPrintedOrderItem) => void;
}) {
  const [customerId, setCustomerId] = useState(customers[0]?.id ?? "");
  const [productId, setProductId] = useState(products[0]?.id ?? "");
  const [quantity, setQuantity] = useState("100");
  const [amount, setAmount] = useState("");
  const [variant, setVariant] = useState("");
  const [deliveryMethod, setDeliveryMethod] =
    useState<AdminPrintedOrderItem["fulfillment"]["method"]>("courier");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (!open) return;
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleEscape);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, open]);

  if (!open) return null;

  const fieldClass =
    "h-11 w-full border border-border bg-surface-lowest px-3 text-[12px] font-normal tracking-normal text-on-surface normal-case outline-none focus:border-secondary";

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center overflow-y-auto bg-espresso/55 p-4 backdrop-blur-[2px]">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="log-order-title"
        className="my-auto w-full max-w-2xl bg-surface-lowest p-5 shadow-2xl sm:p-7"
      >
        <div className="flex items-start justify-between gap-5 border-b border-border pb-4">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.18em] text-secondary uppercase">
              Manual commission record
            </p>
            <h2 id="log-order-title" className="mt-1 font-serif text-[26px]">
              Log Printed Order
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close printed order form"
            className="grid size-9 place-items-center text-on-surface-variant hover:bg-surface-container"
          >
            <X aria-hidden size={19} />
          </button>
        </div>

        <form
          className="mt-5 space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            const customer = customers.find((item) => item.id === customerId);
            const product = products.find((item) => item.id === productId);
            const parsedQuantity = Number(quantity);
            const parsedAmount = Number(amount);
            if (!customer || !product || parsedQuantity < 1 || parsedAmount < 1)
              return;

            const stamp = Date.now();
            onSubmit({
              id: `adm_txn_print_local_${stamp}`,
              reference: `PO-${String(stamp).slice(-6)}`,
              purpose: "printed",
              productName: product.name,
              description: `${product.name} manual printed order for ${customer.name}.`,
              amount: parsedAmount,
              status: "pending",
              createdAt: new Date().toISOString(),
              paidAt: null,
              customer: {
                id: customer.id,
                name: customer.name,
                accountType: customer.accountType,
              },
              relatedInvitation: null,
              payment: {
                method: "Bank Transfer — Manual Verification",
                channelBadge: "Awaiting Verification",
              },
              entitlementsGranted: [],
              extension: null,
              notes: null,
              productId: product.id,
              designVariant: variant || product.materials,
              quantity: parsedQuantity,
              unitPrice: Math.round(parsedAmount / parsedQuantity),
              orderStatus: "new",
              fulfillment: {
                method: deliveryMethod,
                recipient: customer.name,
                addressSummary: null,
                trackingNumber: null,
                statusLabel: "Delivery details pending",
              },
              internalNote: note || null,
              customerNote: null,
              productionStartedAt: null,
              estimatedCompletionAt: null,
              shippedAt: null,
              deliveredAt: null,
            });
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-1.5 text-[9px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
              Customer
              <select
                required
                value={customerId}
                onChange={(event) => setCustomerId(event.target.value)}
                className={fieldClass}
              >
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name} · {customer.accountType}
                  </option>
                ))}
              </select>
            </label>
            <label className="space-y-1.5 text-[9px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
              Printed Product
              <select
                required
                value={productId}
                onChange={(event) => setProductId(event.target.value)}
                className={fieldClass}
              >
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="space-y-1.5 text-[9px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
              Quantity
              <input
                required
                type="number"
                min="1"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
                className={fieldClass}
              />
            </label>
            <label className="space-y-1.5 text-[9px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
              Quoted Total (IDR)
              <input
                required
                type="number"
                min="1"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="e.g. 25000000"
                className={fieldClass}
              />
            </label>
            <label className="space-y-1.5 text-[9px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase sm:col-span-2">
              Design / Variant
              <input
                value={variant}
                onChange={(event) => setVariant(event.target.value)}
                placeholder="Leave blank to use the product material specification"
                className={fieldClass}
              />
            </label>
            <label className="space-y-1.5 text-[9px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
              Delivery Method
              <select
                value={deliveryMethod}
                onChange={(event) =>
                  setDeliveryMethod(
                    event.target
                      .value as AdminPrintedOrderItem["fulfillment"]["method"],
                  )
                }
                className={fieldClass}
              >
                <option value="courier">Domestic courier</option>
                <option value="international">International courier</option>
                <option value="studio_pickup">Studio pickup</option>
              </select>
            </label>
            <label className="space-y-1.5 text-[9px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
              Internal Note{" "}
              <span className="font-normal normal-case">(optional)</span>
              <input
                value={note}
                onChange={(event) => setNote(event.target.value)}
                className={fieldClass}
              />
            </label>
          </div>

          <div className="flex gap-3 bg-accent p-4 text-accent-foreground">
            <Info aria-hidden size={17} className="mt-0.5 shrink-0" />
            <p className="text-[10px] leading-5">
              This stages one pending PRINTED transaction and its manual order
              context in the current interface only. It does not charge a
              customer, reserve stock, book a carrier, or call an API.
            </p>
          </div>

          <div className="flex flex-col-reverse gap-2 border-t border-border pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="min-h-11 px-5 text-[10px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase hover:bg-surface-container"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="min-h-11 bg-primary px-6 text-[10px] font-semibold tracking-[0.12em] text-primary-foreground uppercase hover:bg-secondary"
            >
              Stage Printed Order
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
