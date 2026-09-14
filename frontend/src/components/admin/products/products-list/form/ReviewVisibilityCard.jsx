
import { CheckCircle2 } from "lucide-react";

const ReviewVisibilityCard = ({ visibility }) => {
  const items = [
    {
      key: "onlineStore",
      label: "Online Store",
      description: "Visible on the website",
    },
    {
      key: "mobileApp",
      label: "Mobile App",
      description: "Visible on mobile application",
    },
    {
      key: "pos",
      label: "POS",
      description: "Visible on point of sale",
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-extrabold text-slate-950">
        Product Visibility
      </h3>

      <p className="mt-1 text-sm font-medium text-slate-500">
        Choose where this product will be visible.
      </p>

      <div className="mt-5 space-y-4">
        {items.map((item) => {
          const isActive = Boolean(visibility?.[item.key]);

          return (
            <div key={item.key} className="flex items-start gap-3">
              <CheckCircle2
                className={`mt-0.5 h-4 w-4 ${
                  isActive ? "text-primary" : "text-slate-300"
                }`}
              />

              <div>
                <p
                  className={`text-sm font-bold ${
                    isActive ? "text-slate-900" : "text-slate-400"
                  }`}
                >
                  {item.label}
                </p>

                <p className="text-xs font-medium text-slate-500">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewVisibilityCard;