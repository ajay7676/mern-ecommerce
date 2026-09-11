
import { Plus } from "lucide-react";

const AttributeEmptyState = ({ onAddAttribute }) => {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
      <h3 className="text-lg font-bold text-slate-900">
        No attributes found
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        Create your first product attribute or change your filters.
      </p>

      <button
        type="button"
        onClick={onAddAttribute}
        className="btn btn-primary mt-5"
      >
        <Plus className="h-4 w-4" />
        Add New Attribute
      </button>
    </div>
  );
};

export default AttributeEmptyState;