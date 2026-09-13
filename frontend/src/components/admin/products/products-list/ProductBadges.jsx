export const StockBadge = ({ status }) => {
  const config = {
    in_stock: {
      label: "In Stock",
      className: "bg-emerald-100 text-emerald-700",
    },
    low_stock: {
      label: "Low Stock",
      className: "bg-orange-100 text-orange-700",
    },
    out_of_stock: {
      label: "Out of Stock",
      className: "bg-rose-100 text-rose-700",
    },
  };

  const current = config[status] || config.in_stock;

  return (
    <span
      className={`inline-flex rounded-md px-2 py-1 text-xs font-semibold ${current.className}`}
    >
      {current.label}
    </span>
  );
};

export const ProductStatusBadge = ({ status }) => {
  const isPublished = status === "published";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-3 py-1 text-xs font-semibold ${
        isPublished
          ? "bg-emerald-100 text-emerald-700"
          : "bg-orange-100 text-orange-700"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isPublished ? "bg-emerald-500" : "bg-orange-500"
        }`}
      />
      {isPublished ? "Published" : "Draft"}
    </span>
  );
};