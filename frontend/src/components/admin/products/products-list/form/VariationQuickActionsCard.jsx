
import { Edit3, Plus, Wand2 } from "lucide-react";

const VariationQuickActionsCard = ({
  onGenerateVariants,
  onAddManualVariant,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-bold text-slate-950">
        Quick Actions
      </h3>

      <div className="mt-4 space-y-3">
        <button
          type="button"
          onClick={onGenerateVariants}
          className="btn btn-outline h-auto min-h-0 w-full justify-start rounded-xl px-4 py-3 text-left"
        >
          <Wand2 className="h-4 w-4 text-primary" />

          <span>
            <span className="block text-sm font-bold">
              Generate Variants
            </span>

            <span className="block text-xs font-medium text-slate-500">
              Create all possible combinations
            </span>
          </span>
        </button>

        <button
          type="button"
          onClick={onAddManualVariant}
          className="btn btn-outline h-auto min-h-0 w-full justify-start rounded-xl px-4 py-3 text-left"
        >
          <Plus className="h-4 w-4 text-primary" />

          <span>
            <span className="block text-sm font-bold">
              Add Variant Manually
            </span>

            <span className="block text-xs font-medium text-slate-500">
              Create a single variant
            </span>
          </span>
        </button>

        <button
          type="button"
          className="btn btn-outline h-auto min-h-0 w-full justify-start rounded-xl px-4 py-3 text-left"
        >
          <Edit3 className="h-4 w-4 text-primary" />

          <span>
            <span className="block text-sm font-bold">
              Bulk Edit
            </span>

            <span className="block text-xs font-medium text-slate-500">
              Update price, stock or status
            </span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default VariationQuickActionsCard;