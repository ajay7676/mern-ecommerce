import { Star } from "lucide-react";
import clsx from "clsx";

import QualityBadge from "./badges/QualityBadge";

const MAX_RATING = 5;

const QualityCell = ({
  quality = {},
  loading = false,
  className = "",
}) => {
  if (loading) {
    return (
      <div className="space-y-2">
        <div className="skeleton h-5 w-24" />
        <div className="skeleton h-4 w-16" />
        <div className="skeleton h-5 w-20 rounded-full" />
      </div>
    );
  }

  const {
    status = "unknown",
    score = 0,
    recommendation = "",
    reviews,
  } = quality;

  const rating = Math.max(
    0,
    Math.min(MAX_RATING, Number(score))
  );

  return (
    <div
      className={clsx(
        "min-w-42.5 space-y-2",
        className
      )}
    >
      {/* Rating */}

      <div className="flex items-center gap-1">
        {Array.from({ length: MAX_RATING }).map((_, index) => (
          <Star
            key={index}
            size={14}
            className={clsx(
              index < Math.round(rating)
                ? "fill-amber-400 text-amber-400"
                : "text-slate-300"
            )}
          />
        ))}

        <span className="ml-1 text-sm font-semibold text-slate-700">
          {rating.toFixed(1)}
        </span>

        {typeof reviews === "number" && (
          <span className="text-xs text-slate-500">
            ({reviews})
          </span>
        )}
      </div>

      {/* Badge */}

      <QualityBadge quality={status} />

      {/* Recommendation */}

      {recommendation && (
        <p
          title={recommendation}
          className="
            line-clamp-2
            text-xs
            text-slate-500
          "
        >
          {recommendation}
        </p>
      )}
    </div>
  );
};

export default QualityCell;