export const formatCurrency = (value) => {
  return `₹${Number(value || 0).toLocaleString("en-IN")}`;
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