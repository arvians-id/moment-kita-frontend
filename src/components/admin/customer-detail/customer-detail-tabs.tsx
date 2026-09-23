import {
  Activity,
  Gauge,
  LayoutDashboard,
  Mail,
  ReceiptText,
} from "lucide-react";

export type CustomerDetailTab =
  "overview" | "invitations" | "transactions" | "quota" | "activity";

const tabs: readonly {
  id: CustomerDetailTab;
  label: string;
  icon: typeof LayoutDashboard;
}[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "invitations", label: "Invitations", icon: Mail },
  { id: "transactions", label: "Transactions", icon: ReceiptText },
  { id: "quota", label: "Quota History", icon: Gauge },
  { id: "activity", label: "Activity", icon: Activity },
];

export function CustomerDetailTabs({
  activeTab,
  counts,
  onChange,
}: {
  activeTab: CustomerDetailTab;
  counts: Partial<Record<CustomerDetailTab, number>>;
  onChange: (tab: CustomerDetailTab) => void;
}) {
  return (
    <div className="overflow-x-auto bg-surface-container p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div
        role="tablist"
        aria-label="Customer detail sections"
        className="flex min-w-max items-stretch"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const count = counts[tab.id];

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(tab.id)}
              className={`inline-flex min-h-11 items-center justify-center gap-2 border-b-2 px-4 text-[10px] font-semibold tracking-[0.1em] whitespace-nowrap uppercase transition-colors sm:px-5 ${
                isActive
                  ? "border-secondary bg-surface-lowest text-primary shadow-sm"
                  : "border-transparent text-on-surface-variant hover:bg-surface-low hover:text-primary"
              }`}
            >
              <Icon aria-hidden size={14} />
              {tab.label}
              {typeof count === "number" ? (
                <span className="bg-surface-low px-1.5 py-0.5 text-[9px] tracking-normal text-on-surface-variant">
                  {count}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
