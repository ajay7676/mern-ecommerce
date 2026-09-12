
import {
  Activity,
  Boxes,
  CheckCircle2,
  PauseCircle,
  RotateCcw,
} from "lucide-react";

const statsConfig = [
  {
    key: "totalAttributes",
    label: "Total Attributes",
    icon: Boxes,
    helper: "All created attributes",
  },
  {
    key: "activeAttributes",
    label: "Active Attributes",
    icon: CheckCircle2,
    helper: "Visible in product forms",
  },
  {
    key: "inactiveAttributes",
    label: "Inactive Attributes",
    icon: PauseCircle,
    helper: "Hidden from product forms",
  },
  {
    key: "productsUsing",
    label: "Products Using",
    icon: Activity,
    helper: "Total product usage",
  },
];

// import AttributeStatCard from "./AttributeStatCard";
import AttributeStatsSkeleton from "./AttributeStatsSkeleton";

const AttributeStats = (
  {
  stats,
  isLoading,
  isError,
  onRetry,
}
) => {

  if (isLoading) {
    return <AttributeStatsSkeleton />;
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-error/20 bg-error/5 p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-bold text-error">
              Failed to load stats
            </h3>

            <p className="text-sm text-slate-500">
              Stats could not be fetched right now.
            </p>
          </div>

          <button
            type="button"
            onClick={onRetry}
            className="btn btn-error btn-sm"
          >
            <RotateCcw className="h-4 w-4" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {statsConfig.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.key}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {item.label}
                </p>

                <h3 className="mt-2 text-3xl font-bold text-slate-950">
                  {stats?.[item.key] ?? 0}
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  {item.helper}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AttributeStats;