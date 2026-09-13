import { Tag } from "lucide-react";

import {
  formatCurrency,
} from '../../../../../utils/admin/products/product/productPricingUtils'

const PriceDiscountBanner = ({
  pricing,
  discountType,
}) => {
  const showDiscount =
    pricing.discountAmount > 0;

  return (
    <div className="rounded-2xl border border-violet-100 bg-violet-50 px-5 py-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary">
            <Tag className="h-5 w-5" />
          </div>

          <div>
            <p className="text-sm font-bold text-primary">
              Selling Price after discount:{" "}
              {formatCurrency(pricing.finalSellingPrice)}
            </p>

            {!showDiscount && (
              <p className="mt-1 text-xs font-medium text-slate-500">
                No discount applied yet.
              </p>
            )}
          </div>
        </div>

        {showDiscount && (
          <p className="text-sm font-bold text-emerald-700">
            You save:{" "}
            {formatCurrency(pricing.discountAmount)}
            {discountType === "percentage" &&
              ` (${pricing.discount}%)`}
          </p>
        )}
      </div>
    </div>
  );
};

export default PriceDiscountBanner;