
import {
  getStockStatus,
  toNumber,
} from "../../../../../utils/admin/products/product/productPricingUtils";

const InventorySummaryCard = ({
  stockQuantity,
  lowStockThreshold,
  units,
}) => {
  const stock = toNumber(stockQuantity);
  const threshold = toNumber(lowStockThreshold);
  const reservedStock = stock > 0 ? 5 : 0;
  const availableStock = Math.max(stock - reservedStock, 0);

  const stockStatus = getStockStatus({
    stockQuantity,
    lowStockThreshold,
  });

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-950">
        Inventory Summary
      </h3>

      <div className="mt-5 space-y-4 text-sm">
        <SummaryRow
          label="Current Stock"
          value={`${stock} ${units}`}
        />

        <SummaryRow
          label="Reserved Stock"
          value={`${reservedStock} ${units}`}
        />

        <SummaryRow
          label="Available Stock"
          value={`${availableStock} ${units}`}
          valueClassName="text-emerald-700"
        />

        <SummaryRow
          label="Low Stock Threshold"
          value={`${threshold} ${units}`}
        />

        <div className="flex items-center justify-between gap-4">
          <span className="text-slate-500">
            Stock Status
          </span>

          <span
            className={`rounded-lg px-3 py-1 text-xs font-bold ${stockStatus.className}`}
          >
            {stockStatus.label}
          </span>
        </div>
      </div>
    </div>
  );
};

const SummaryRow = ({
  label,
  value,
  valueClassName = "",
}) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-slate-500">
        {label}
      </span>

      <span className={`font-semibold text-slate-900 ${valueClassName}`}>
        {value}
      </span>
    </div>
  );
};

export default InventorySummaryCard;