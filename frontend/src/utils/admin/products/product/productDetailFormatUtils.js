export const formatCurrency = (value) => {
  return `₹${Number(value || 0).toLocaleString("en-IN")}`;
};

export const formatNumber = (value) => {
  return Number(value || 0).toLocaleString("en-IN");
};

export const formatDateTime = (value) => {
  if (!value) return "-";

  return new Date(value).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatProductStatus = (status) => {
  const statusMap = {
    active: "Published",
    draft: "Draft",
    inactive: "Inactive",
  };

  return statusMap[status] || status || "-";
};

export const getProductStatusBadgeClass = (status) => {
  if (status === "active") return "badge-success";
  if (status === "draft") return "badge-warning";
  if (status === "inactive") return "badge-ghost";

  return "badge-ghost";
};

export const formatProductType = (type) => {
  const typeMap = {
    simple: "Simple Product",
    variable: "Variable Product",
  };

  return typeMap[type] || type || "-";
};

export const formatDiscount = ({ discountType, discountValue }) => {
  if (!discountType || discountType === "none") {
    return "No discount";
  }

  if (discountType === "percentage") {
    return `${Number(discountValue || 0)}% OFF`;
  }

  if (discountType === "fixed") {
    return `${formatCurrency(discountValue)} OFF`;
  }

  return "No discount";
};

export const getStockStatusLabel = (stockStatus) => {
  const statusMap = {
    inStock: "In Stock",
    lowStock: "Low Stock",
    outOfStock: "Out of Stock",
  };

  return statusMap[stockStatus] || stockStatus || "-";
};

export const getStockStatusBadgeClass = (stockStatus) => {
  if (stockStatus === "inStock") return "badge-success";
  if (stockStatus === "lowStock") return "badge-warning";
  if (stockStatus === "outOfStock") return "badge-error";

  return "badge-ghost";
};

export const formatTaxClass = (taxClass) => {
  const taxMap = {
    gst0: "GST 0%",
    gst5: "GST 5%",
    gst12: "GST 12%",
    gst18: "GST 18%",
    gst28: "GST 28%",
  };

  return taxMap[taxClass] || taxClass || "-";
};
