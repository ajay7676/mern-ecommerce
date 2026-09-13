import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const pages = [1, 2, 3, 4, 5];

const ProductPagination = () => {
  return (
    <div className="flex overflow-x-auto flex-col gap-4 rounded-b-2xl border border-t-0 border-slate-200 bg-white px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
      <p className="text-sm font-medium text-slate-500">
        Showing 1 to 8 of 128 products
      </p>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="join">
          <button
            type="button"
            className="btn join-item h-10 min-h-10 w-10 rounded-xl border-slate-200 bg-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {pages.map((page) => (
            <button
              key={page}
              type="button"
              className={`btn join-item h-10 min-h-10 w-10 border-slate-200 ${
                page === 1
                  ? "btn-primary text-white"
                  : "bg-white text-slate-700"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            className="btn join-item h-10 min-h-10 w-10 border-slate-200 bg-white"
          >
            ...
          </button>

          <button
            type="button"
            className="btn join-item h-10 min-h-10 w-10 border-slate-200 bg-white"
          >
            16
          </button>

          <button
            type="button"
            className="btn join-item h-10 min-h-10 w-10 rounded-xl border-slate-200 bg-white"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <select className="select select-bordered h-10 min-h-10 rounded-xl border-slate-200 bg-white text-sm font-medium">
          <option>10 / page</option>
          <option>20 / page</option>
          <option>50 / page</option>
        </select>
      </div>
    </div>
  );
};

export default ProductPagination;