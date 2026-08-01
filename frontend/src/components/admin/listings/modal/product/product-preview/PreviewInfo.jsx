import {
  FiCheckCircle,
  FiStar,
} from "react-icons/fi";

const PreviewInfo = ({
  name = "",
  shortDescription = "",
  stock = 0,
  trackInventory = true,
  allowBackorder = false,
  isFeatured = false,
  children,
}) => {
  const numericStock = Number(stock);

  const validStock = Number.isFinite(numericStock)
    ? Math.max(0, numericStock)
    : 0;

  const getInventoryStatus = () => {
  if (!trackInventory) {
    return {
      label: "Available",
      className: "bg-emerald-50 text-emerald-600",
    };
  }

  if (validStock > 0) {
    return {
      label: `In Stock (${validStock})`,
      className: "bg-emerald-50 text-emerald-600",
    };
  }

  if (allowBackorder) {
    return {
      label: "Available on Backorder",
      className: "bg-amber-50 text-amber-600",
    };
  }

  return {
    label: "Out of Stock",
    className: "bg-red-50 text-red-600",
  };
};

const inventoryStatus = getInventoryStatus();

  return (
    <div className="mt-3">
      <h3 className="line-clamp-2 text-base font-bold leading-6 text-slate-900">
        {name.trim() || "Untitled Product"}
      </h3>

      <p className="mt-0.5 line-clamp-2 text-sm leading-5 text-slate-500">
        {shortDescription.trim() ||
          "Add a short product description."}
      </p>

      {children}

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <span
          role="status"
          className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1
                      text-xs font-semibold ${inventoryStatus.className}`}
        >
          <FiCheckCircle />
          {inventoryStatus.label}
        </span>

        {isFeatured && (
          <span className="inline-flex items-center gap-1.5 rounded-md bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-600">
            <FiStar />
            Featured
          </span>
        )}
      </div>
    </div>
  );
};

export default PreviewInfo;