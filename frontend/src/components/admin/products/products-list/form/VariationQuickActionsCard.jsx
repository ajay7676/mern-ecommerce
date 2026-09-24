import { Edit3, Plus, Wand2 } from "lucide-react";

const VariationQuickActionsCard = ({
  onGenerateVariants,
  onAddManualVariant,
  hasAttributes,
}) => {
  return (
    <div className="rounded-2xl border border-base-300 bg-base-100 p-5">
      <h3 className="font-semibold">
        Quick Actions
      </h3>

      <div className="mt-4 space-y-3">
        <button
          type="button"
          className="btn btn-outline w-full justify-start"
          disabled={!hasAttributes}
          onClick={onGenerateVariants}
        >
          
          <Wand2 className="h-4 w-4 text-primary" />
          Generate Variants
        </button>

        <button
          type="button"
          className="btn btn-outline w-full justify-start"
          disabled={!hasAttributes}
          onClick={onAddManualVariant}
        >
          <Plus className="h-4 w-4 text-primary" />
          Add Variant Manually
        </button>

        <button
          type="button"
          className="btn btn-outline w-full justify-start"
        >
          <Edit3 className="h-4 w-4 text-primary" />
          Bulk Edit
        </button>
      </div>
    </div>
  );
};

export default VariationQuickActionsCard;