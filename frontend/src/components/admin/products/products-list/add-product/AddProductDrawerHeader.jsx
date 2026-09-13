import {
  ArrowLeft,
  ChevronRight,
  X,
} from "lucide-react";

const AddProductDrawerHeader = ({
  onClose,
}) => {
  return (
    <div className="flex flex-none items-start justify-between border-b border-slate-200 bg-white px-5 py-4 sm:px-8">
      <div className="flex items-start gap-4">
        <button
          type="button"
          onClick={onClose}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-200 bg-white text-violet-700 shadow-sm hover:bg-violet-50"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">
            Add New Product
          </h2>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm font-medium text-slate-500">
            <span>Dashboard</span>
            <ChevronRight className="h-4 w-4" />
            <span>Products</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-slate-800">
              Add New Product
            </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="btn btn-ghost btn-sm btn-circle"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
};

export default AddProductDrawerHeader;