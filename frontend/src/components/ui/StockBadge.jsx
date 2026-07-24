import clsx from "clsx";

const getStockDetails = (stock) => {
  if (stock <= 0) {
    return {
      label: "Out of Stock",
      className: "bg-red-50 text-red-600",
    };
  }

  if (stock <= 2) {
    return {
      label: `Only ${stock} left`,
      className: "bg-orange-50 text-orange-600",
    };
  }

  return {
    label: "In Stock",
    className: "bg-emerald-50 text-emerald-600",
  };
};

const StockBadge = ({ stock = 0 }) => {
  const stockDetails = getStockDetails(stock);

  return (
    <span
      className={clsx(
        "inline-flex min-h-7 items-center rounded-md px-3",
        "text-xs font-medium",
        stockDetails.className,
      )}
    >
      {stockDetails.label}
    </span>
  );
};

export default StockBadge;