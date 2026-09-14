
import { CheckCircle2, Lightbulb } from "lucide-react";

const tips = [
  "Use existing attributes to maintain consistency.",
  "Select only relevant options for this product.",
  "You can create variants automatically or manually.",
  "Add variant-wise images for better customer experience.",
  "Update price and stock for each variant.",
  "Keep SKU unique for each variant.",
];

const AttributeVariationTipsCard = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <Lightbulb className="h-5 w-5 text-primary" />

        <h3 className="text-lg font-bold text-slate-950">
          Tips
        </h3>
      </div>

      <div className="mt-5 space-y-3">
        {tips.map((tip) => (
          <div key={tip} className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald-500" />

            <p className="text-sm font-medium leading-6 text-slate-600">
              {tip}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttributeVariationTipsCard;