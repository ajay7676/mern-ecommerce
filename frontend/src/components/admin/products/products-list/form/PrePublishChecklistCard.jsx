
import { CheckCircle2 } from "lucide-react";

const PrePublishChecklistCard = ({ values }) => {
  const checklist = [
    {
      label: "Basic product information is added",
      isDone: Boolean(values.productName && values.sku && values.description),
    },
    {
      label: "At least one product image is uploaded",
      isDone: Boolean(values.images?.length),
    },
    {
      label: "Price and stock information is set",
      isDone: Boolean(values.sellingPrice && values.stockQuantity),
    },
    {
      label: "Variants are properly configured",
      isDone: Boolean(values.variants?.length),
    },
    {
      label: "Product status is active",
      isDone: values.status === "active",
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-extrabold text-slate-950">
        Pre-publish Checklist
      </h3>

      <div className="mt-5 space-y-3">
        {checklist.map((item) => (
          <div key={item.label} className="flex items-start gap-3">
            <CheckCircle2
              className={`mt-0.5 h-4 w-4 flex-none ${
                item.isDone ? "text-emerald-500" : "text-slate-300"
              }`}
            />

            <p
              className={`text-sm font-medium leading-6 ${
                item.isDone ? "text-slate-700" : "text-slate-400"
              }`}
            >
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrePublishChecklistCard;