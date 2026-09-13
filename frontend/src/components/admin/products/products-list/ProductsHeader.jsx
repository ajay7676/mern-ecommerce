
import {
  Download,
  Plus,
  Upload,
  ChevronDown,
} from "lucide-react";

const ProductsHeader = ({onAddProduct}) => {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-950">
          All Products
        </h1>

        <p className="mt-1 text-sm font-medium text-slate-500">
          Manage and view all products in your store.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="btn h-11 min-h-11 rounded-xl border-slate-200 bg-white px-5 text-slate-800 shadow-sm hover:bg-slate-50"
        >
          <Download className="h-4 w-4" />
          Export
        </button>

        <button
          type="button"
          className="btn h-11 min-h-11 rounded-xl border-slate-200 bg-white px-5 text-slate-800 shadow-sm hover:bg-slate-50"
        >
          <Upload className="h-4 w-4" />
          Import
        </button>

        <button
          type="button"
          onClick={onAddProduct}
          className="btn btn-primary h-11 min-h-11 rounded-xl px-6 text-white shadow-md"
        >
          <Plus className="h-4 w-4" />
          Add New Product
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default ProductsHeader;