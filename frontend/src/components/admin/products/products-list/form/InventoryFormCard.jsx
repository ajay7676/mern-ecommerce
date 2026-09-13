import {
  Controller,
} from "react-hook-form";

import {
  Info,
} from "lucide-react";

import {
  TextInputField,
  SelectField,
} from "./FormField";

import {
  getStockStatus,
} from '../../../../../utils/admin/products/product/productPricingUtils'

const InventoryFormCard = ({
  register,
  control,
  errors,
  stockQuantity,
  lowStockThreshold,
}) => {
  const stockStatus = getStockStatus({
    stockQuantity,
    lowStockThreshold,
  });

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h3 className="text-lg font-bold text-slate-950">
          Inventory
        </h3>

        <p className="mt-1 text-sm font-medium text-slate-500">
          Manage stock and inventory settings for this product.
        </p>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <TextInputField
          label="SKU (Stock Keeping Unit)"
          required
          placeholder="ADIDAS-TSHIRT-001"
          helper="Unique identifier for this product"
          error={errors.sku?.message}
          {...register("sku")}
        />

        <TextInputField
          label="Barcode (ISBN, UPC, EAN)"
          placeholder="8901234567890"
          helper="Scan-friendly barcode"
          error={errors.barcode?.message}
          {...register("barcode")}
        />

        <Controller
          name="trackInventory"
          control={control}
          render={({ field }) => (
            <label className="flex cursor-pointer flex-col justify-end gap-3">
              <span className="text-sm font-bold text-slate-800">
                Track Inventory
              </span>

              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={field.value}
                onChange={(event) =>
                  field.onChange(event.target.checked)
                }
              />

              <span className="text-xs font-medium text-slate-500">
                Enable stock tracking for this product
              </span>
            </label>
          )}
        />

        <TextInputField
          type="number"
          label="Stock Quantity"
          required
          placeholder="75"
          helper="Available quantity in stock"
          error={errors.stockQuantity?.message}
          {...register("stockQuantity")}
        />

        <TextInputField
          type="number"
          label="Low Stock Threshold"
          placeholder="10"
          helper="Alert when stock falls below this"
          error={errors.lowStockThreshold?.message}
          {...register("lowStockThreshold")}
        />

        <SelectField
          label="Units"
          error={errors.units?.message}
          {...register("units")}
        >
          <option value="pcs">Pcs</option>
          <option value="kg">Kg</option>
          <option value="g">Gram</option>
          <option value="ltr">Liter</option>
          <option value="ml">ML</option>
          <option value="box">Box</option>
        </SelectField>

        <Controller
          name="allowBackorders"
          control={control}
          render={({ field }) => (
            <label className="flex cursor-pointer flex-col justify-end gap-3">
              <span className="text-sm font-bold text-slate-800">
                Allow Backorders
              </span>

              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={field.value}
                onChange={(event) =>
                  field.onChange(event.target.checked)
                }
              />

              <span className="text-xs font-medium text-slate-500">
                Allow customers to order when out of stock
              </span>
            </label>
          )}
        />
      </div>

      <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4">
        <div className="flex items-start gap-3">
          <Info className="mt-0.5 h-5 w-5 text-blue-600" />

          <div>
            <p className="text-sm font-bold text-blue-700">
              Stock Status:{" "}
              <span className={stockStatus.className}>
                {stockStatus.label}
              </span>
            </p>

            <p className="mt-1 text-sm font-medium text-blue-600">
              {stockStatus.label === "In Stock" &&
                "This product is available for purchase."}

              {stockStatus.label === "Low Stock" &&
                "This product stock is running low."}

              {stockStatus.label === "Out of Stock" &&
                "This product is currently out of stock."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InventoryFormCard;