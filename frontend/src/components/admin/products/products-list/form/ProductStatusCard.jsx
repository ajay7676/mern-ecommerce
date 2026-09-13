
import { Controller } from "react-hook-form";

const ProductStatusCard = ({ control }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-950">
        Product Status
      </h3>

      <p className="mt-1 text-sm font-medium text-slate-500">
        Set the availability status for this product.
      </p>

      <div className="mt-6 space-y-5">
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <>
              <label className="flex cursor-pointer items-start gap-4">
                <input
                  type="radio"
                  className="radio radio-primary mt-1"
                  checked={field.value === "active"}
                  onChange={() => field.onChange("active")}
                />

                <span>
                  <span className="block text-sm font-bold text-slate-900">
                    Active
                  </span>

                  <span className="block text-xs font-medium text-slate-500">
                    Product will be visible on store
                  </span>
                </span>
              </label>

              <label className="flex cursor-pointer items-start gap-4">
                <input
                  type="radio"
                  className="radio radio-primary mt-1"
                  checked={field.value === "draft"}
                  onChange={() => field.onChange("draft")}
                />

                <span>
                  <span className="block text-sm font-bold text-slate-900">
                    Draft
                  </span>

                  <span className="block text-xs font-medium text-slate-500">
                    Product will be saved as draft
                  </span>
                </span>
              </label>
            </>
          )}
        />
      </div>
    </div>
  );
};

export default ProductStatusCard;