
import { Box, CheckCircle2, PauseCircle, TriangleAlert } from "lucide-react";

const statsConfig = [
  {
    key: "totalVariants",
    label: "Total Variants",
    icon: Box,
    valueClassName: "text-slate-950",
  },
  {
    key: "activeVariants",
    label: "Active Variants",
    icon: CheckCircle2,
    valueClassName: "text-emerald-600",
  },
  {
    key: "inactiveVariants",
    label: "Inactive Variants",
    icon: PauseCircle,
    valueClassName: "text-rose-600",
  },
  {
    key: "lowStockVariants",
    label: "Low Stock",
    icon: TriangleAlert,
    valueClassName: "text-orange-600",
  },
];

const VariantStatsCards = ({ stats }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {statsConfig.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.key}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4"
          >
            <div>
              <p className="text-xs font-semibold text-slate-500">
                {item.label}
              </p>

              <p className={`mt-2 text-2xl font-extrabold ${item.valueClassName}`}>
                {stats?.[item.key] ?? 0}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VariantStatsCards;