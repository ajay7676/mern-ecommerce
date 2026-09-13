// components/ProductVisibilityCard.jsx

import { Controller } from "react-hook-form";

const visibilityOptions = [
  {
    name: "visibility.onlineStore",
    label: "Online Store",
    description: "Visible on the website",
  },
  {
    name: "visibility.mobileApp",
    label: "Mobile App",
    description: "Visible on mobile application",
  },
  {
    name: "visibility.pos",
    label: "POS",
    description: "Visible on point of sale",
  },
];

const ProductVisibilityCard = ({ control }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-950">
        Visibility
      </h3>

      <p className="mt-1 text-sm font-medium text-slate-500">
        Choose where this product will be visible.
      </p>

      <div className="mt-6 space-y-4">
        {visibilityOptions.map((item) => (
          <Controller
            key={item.name}
            name={item.name}
            control={control}
            render={({ field }) => (
              <label className="flex cursor-pointer items-start gap-4">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary checkbox-sm mt-1 rounded"
                  checked={field.value}
                  onChange={(event) => field.onChange(event.target.checked)}
                />

                <span>
                  <span className="block text-sm font-bold text-slate-900">
                    {item.label}
                  </span>

                  <span className="block text-xs font-medium text-slate-500">
                    {item.description}
                  </span>
                </span>
              </label>
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductVisibilityCard;