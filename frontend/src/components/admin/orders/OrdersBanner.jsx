import { useState } from "react";
import { Info, X } from "lucide-react";

const OrdersBanner = ({
  title = "Improve your shipping experience",
  description = "Enable warehouse automation and shipping integrations to process orders faster and reduce manual work.",
  actionLabel = "Learn More",
  onAction,
}) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <section className="relative overflow-hidden rounded-2xl border border-info/20 bg-info/10 p-5">
      <div className="flex items-center gap-11">
        {/* Icon */}
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-info text-info-content">
          <Info size={15} />
        </div>
        {/* Content */}
        <div className="flex items-center gap-10">
          <h2 className="text-base font-semibold text-base-content">
            {title}
          </h2>

          <p className="mt-1 text-sm leading-6 text-base-content/70">
            {description}
          </p>

          {actionLabel && (
            <button
              type="button"
              onClick={onAction}
              className="cursor-pointer text-sm font-semibold text-primary hover:underline"
            >
              {actionLabel}
            </button>
          )}
        </div>

        {/* Close */}
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="btn btn-ghost btn-sm btn-circle"
          aria-label="Close banner"
        >
          <X size={18} />
        </button>
      </div>
    </section>
  );
};

export default OrdersBanner;