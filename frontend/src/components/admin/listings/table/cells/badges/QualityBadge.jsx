import clsx from "clsx";
import {
  BadgeCheck,
  CircleAlert,
  CircleDashed,
  TriangleAlert,
} from "lucide-react";

const QUALITY_CONFIG = {
  excellent: {
    label: "Excellent",
    icon: BadgeCheck,
    className: "border border-emerald-200 bg-emerald-50 text-emerald-700",
  },

  good: {
    label: "Good",
    icon: BadgeCheck,
    className: "border border-blue-200 bg-blue-50 text-blue-700",
  },

  average: {
    label: "Average",
    icon: CircleAlert,
    className: "border border-amber-200 bg-amber-50 text-amber-700",
  },

  poor: {
    label: "Poor",
    icon: TriangleAlert,
    className: "border border-red-200 bg-red-50 text-red-700",
  },

  unknown: {
    label: "Unknown",
    icon: CircleDashed,
    className: "border border-slate-200 bg-slate-100 text-slate-600",
  },
};

const SIZE_CLASSES = {
  sm: {
    badge: "px-2 py-0.5 text-[10px]",
    icon: 12,
  },

  md: {
    badge: "px-2.5 py-1 text-xs",
    icon: 14,
  },

  lg: {
    badge: "px-3 py-1.5 text-sm",
    icon: 16,
  },
};

const QualityBadge = ({
  quality = "unknown",
  size = "md",
  className = "",
  loading = false,
}) => {
  if (loading) {
    return <div className="skeleton h-7 w-24 rounded-full" />;
  }

  const config =
    QUALITY_CONFIG[quality.toLowerCase()] ?? QUALITY_CONFIG.unknown;

  const styles = SIZE_CLASSES[size] ?? SIZE_CLASSES.md;

  const Icon = config.icon;
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-full font-medium whitespace-nowrap",
        config.className,
        styles.badge,
        className,
      )}
      title={config.label}
    >
      <Icon size={styles.icon} />

      {config.label}
    </span>
  );
};

export default QualityBadge;
