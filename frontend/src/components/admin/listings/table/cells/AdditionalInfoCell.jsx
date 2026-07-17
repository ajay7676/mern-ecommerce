import clsx from "clsx";
import {
  BadgeCheck,
  PackageCheck,
  Truck,
  Wallet,
  RotateCcw,
  Zap,
} from "lucide-react";

const ICONS = {
  shipping: {
    icon: Truck,
    label: "Shipping",
    color: "text-sky-600",
  },

  fulfilled: {
    icon: PackageCheck,
    label: "Fulfilled",
    color: "text-emerald-600",
  },

  assured: {
    icon: BadgeCheck,
    label: "Assured",
    color: "text-indigo-600",
  },

  cod: {
    icon: Wallet,
    label: "Cash on Delivery",
    color: "text-amber-600",
  },

  replacement: {
    icon: RotateCcw,
    label: "Replacement",
    color: "text-violet-600",
  },

  express: {
    icon: Zap,
    label: "Express Delivery",
    color: "text-rose-600",
  },
};

const AdditionalInfoCell = ({
  info = {},
  loading = false,
  showLabels = false,
  className = "",
}) => {
  if (loading) {
    return (
      <div className="flex gap-2">
        <div className="skeleton h-8 w-8 rounded-lg" />
        <div className="skeleton h-8 w-8 rounded-lg" />
        <div className="skeleton h-8 w-8 rounded-lg" />
      </div>
    );
  }

  const enabledItems = Object.entries(ICONS).filter(
    ([key]) => info[key]
  );

  if (!enabledItems.length) {
    return (
      <span className="text-xs text-slate-400">
        —
      </span>
    );
  }

  return (
    <div
      className={clsx(
        "flex flex-wrap items-center gap-2",
        className
      )}
    >
      {enabledItems.map(([key, item]) => {
        const Icon = item.icon;

        return (
          <div
            key={key}
            className="tooltip"
            data-tip={item.label}
          >
            <div
              className={clsx(
                "flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white transition-all duration-200",
                "hover:border-primary hover:bg-primary/5"
              )}
            >
              <Icon
                size={18}
                className={item.color}
              />
            </div>

            {showLabels && (
              <p className="mt-1 text-center text-[10px] text-slate-500">
                {item.label}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AdditionalInfoCell;