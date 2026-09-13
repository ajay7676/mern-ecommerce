import {
  TextInputField,
  SelectField,
} from "./FormField";

import PriceDiscountBanner from "./PriceDiscountBanner";

const PricingFormCard = ({
  register,
  errors,
  pricing,
  discountType,
}) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h3 className="text-lg font-bold text-slate-950">
          Pricing
        </h3>

        <p className="mt-1 text-sm font-medium text-slate-500">
          Set the price details for your product.
        </p>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <TextInputField
          type="number"
          step="0.01"
          label="Selling Price (₹)"
          required
          placeholder="999.00"
          error={errors.sellingPrice?.message}
          {...register("sellingPrice")}
        />

        <SelectField
          label="Discount Type"
          error={errors.discountType?.message}
          {...register("discountType")}
        >
          <option value="none">No Discount</option>
          <option value="percentage">Percentage</option>
          <option value="fixed">Fixed Amount</option>
        </SelectField>

        <TextInputField
          type="number"
          step="0.01"
          label={
            discountType === "fixed"
              ? "Discount Value (₹)"
              : "Discount Value (%)"
          }
          placeholder="20"
          error={errors.discountValue?.message}
          {...register("discountValue")}
        />

        <SelectField
          label="Tax Class"
          error={errors.taxClass?.message}
          {...register("taxClass")}
        >
          <option value="gst0">GST 0%</option>
          <option value="gst5">GST 5%</option>
          <option value="gst12">GST 12%</option>
          <option value="gst18">GST 18%</option>
          <option value="gst28">GST 28%</option>
        </SelectField>
      </div>

      <div className="mt-6">
        <PriceDiscountBanner
          pricing={pricing}
          discountType={discountType}
        />
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
        <TextInputField
          type="number"
          step="0.01"
          label="Cost Price (₹)"
          placeholder="650.00"
          helper="Your cost price for this product"
          error={errors.costPrice?.message}
          {...register("costPrice")}
        />

        <TextInputField
          type="number"
          step="0.01"
          label="MRP (₹)"
          placeholder="1299.00"
          helper="Maximum Retail Price"
          error={errors.mrp?.message}
          {...register("mrp")}
        />

        <TextInputField
          type="number"
          step="0.01"
          label="Special Price (₹)"
          placeholder="899.00"
          helper="Leave empty if not on sale"
          error={errors.specialPrice?.message}
          {...register("specialPrice")}
        />

        <TextInputField
          type="date"
          label="Special Price From"
          error={errors.specialPriceFrom?.message}
          {...register("specialPriceFrom")}
        />

        <TextInputField
          type="date"
          label="Special Price To"
          error={errors.specialPriceTo?.message}
          {...register("specialPriceTo")}
        />
      </div>
    </section>
  );
};

export default PricingFormCard;