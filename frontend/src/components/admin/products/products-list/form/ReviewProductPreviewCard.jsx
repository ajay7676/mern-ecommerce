// components/ReviewProductPreviewCard.jsx

import { ImageIcon } from "lucide-react";

import {
     calculatePricing,
      formatCurrency 
    } from '../../../../../utils/admin/products/product/productPricingUtils'

const ReviewProductPreviewCard = ({ values }) => {
  const primaryImage =
    values.images?.find((image) => image.isPrimary) || values.images?.[0];

  const pricing = calculatePricing({
    sellingPrice: values.sellingPrice,
    discountType: values.discountType,
    discountValue: values.discountValue,
    taxClass: values.taxClass,
  });

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-extrabold text-slate-950">
        Product Preview
      </h3>

      <div className="mt-5 rounded-2xl bg-slate-50 p-5 text-center">
        <div className="flex min-h-52.5 items-center justify-center">
          {primaryImage ? (
            <img
              src={primaryImage.previewUrl || primaryImage.url}
              alt={values.productName || "Product"}
              className="h-44 w-44 object-contain"
            />
          ) : (
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-primary/10 text-primary">
              <ImageIcon className="h-12 w-12" />
            </div>
          )}
        </div>

        <h4 className="mt-4 text-base font-extrabold text-slate-950">
          {values.productName || "Product Name"}
        </h4>

        <div className="mt-2 flex items-center justify-center gap-2">
          <span className="text-xl font-extrabold text-primary">
            {formatCurrency(pricing.finalSellingPrice)}
          </span>

          {values.mrp && Number(values.mrp) > pricing.finalSellingPrice && (
            <span className="text-sm font-semibold text-slate-400 line-through">
              {formatCurrency(values.mrp)}
            </span>
          )}
        </div>

        <span
          className={`mt-3 inline-flex rounded-lg px-3 py-1 text-xs font-bold ${
            Number(values.stockQuantity || 0) > 0
              ? "bg-emerald-100 text-emerald-700"
              : "bg-rose-100 text-rose-700"
          }`}
        >
          {Number(values.stockQuantity || 0) > 0 ? "In Stock" : "Out of Stock"}
        </span>
      </div>
    </div>
  );
};

export default ReviewProductPreviewCard;