import { PackageSearch, RefreshCw, ArrowRight } from "lucide-react";

const EmptyOrdersState = ({
  title = "No Orders Found",
  description = "Orders requiring your attention will appear here. Try changing filters or refresh the page.",
  primaryLabel = "Refresh",
  secondaryLabel = "View All Orders",
  onPrimaryClick,
  onSecondaryClick,
}) => {
  return (
    <section className="rounded-2xl border border-base-300 bg-base-100 shadow-sm">
      <div className="flex min-h-105 flex-col items-center justify-center px-6 py-12 text-center">
        {/* Icon */}
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary">
          <PackageSearch size={48} strokeWidth={1.8} />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-base-content">
          {title}
        </h2>

        {/* Description */}
        <p className="mt-3 max-w-lg text-sm leading-7 text-base-content/70">
          {description}
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onPrimaryClick}
            className="btn btn-primary"
          >
            <RefreshCw size={18} />

            {primaryLabel}
          </button>

          <button
            type="button"
            onClick={onSecondaryClick}
            className="btn btn-outline"
          >
            {secondaryLabel}

            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default EmptyOrdersState;