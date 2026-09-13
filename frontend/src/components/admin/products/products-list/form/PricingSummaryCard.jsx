

import {
  formatCurrency,
  TAX_LABEL_MAP,
} from '../../../../../utils/admin/products/product/productPricingUtils'

const PricingSummaryCard = ({
  pricing,
  mrp,
  taxClass,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-950">
        Pricing Summary
      </h3>

      <div className="mt-5 space-y-4 text-sm">
        <SummaryRow
          label="MRP"
          value={formatCurrency(mrp)}
        />

        <SummaryRow
          label={`Discount`}
          value={`-${formatCurrency(pricing.discountAmount)}`}
          valueClassName="text-rose-600"
        />

        <SummaryRow
          label="Selling Price (Excl. Tax)"
          value={formatCurrency(pricing.priceExcludingTax)}
        />

        <SummaryRow
          label={TAX_LABEL_MAP[taxClass] || "Tax"}
          value={formatCurrency(pricing.taxAmount)}
        />

        <div className="border-t border-slate-200 pt-4">
          <SummaryRow
            label="Final Selling Price"
            value={formatCurrency(pricing.finalSellingPrice)}
            labelClassName="font-bold text-slate-950"
            valueClassName="text-lg font-extrabold text-primary"
          />
        </div>
      </div>
    </div>
  );
};

const SummaryRow = ({
  label,
  value,
  labelClassName = "",
  valueClassName = "",
}) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className={`text-slate-500 ${labelClassName}`}>
        {label}
      </span>

      <span className={`font-semibold text-slate-900 ${valueClassName}`}>
        {value}
      </span>
    </div>
  );
};

export default PricingSummaryCard;