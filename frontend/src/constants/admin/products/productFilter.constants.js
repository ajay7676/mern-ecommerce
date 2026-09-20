export const DEFAULT_PRODUCT_FILTERS = {
  page: 1,
  limit: 10,
  search: "",
  category: "all",
  brand: "all",
  status: "all",
  stockStatus: "all",
  productType: "all",
  sortBy: "createdAt",
  sortOrder: "desc",
};

export const PRODUCT_STATUS_OPTIONS = [
  { label: "All Status", value: "all" },
  { label: "Published", value: "active" },
  { label: "Draft", value: "draft" },
  { label: "Inactive", value: "inactive" },
];

export const PRODUCT_STOCK_OPTIONS = [
  { label: "All Stock", value: "all" },
  { label: "In Stock", value: "inStock" },
  { label: "Low Stock", value: "lowStock" },
  { label: "Out of Stock", value: "outOfStock" },
];

export const PRODUCT_TYPE_OPTIONS = [
  { label: "All Types", value: "all" },
  { label: "Simple Product", value: "simple" },
  { label: "Variable Product", value: "variable" },
];

export const PRODUCT_SORT_OPTIONS = [
  { label: "Newest First", value: "createdAt_desc" },
  { label: "Oldest First", value: "createdAt_asc" },
  { label: "Name A-Z", value: "name_asc" },
  { label: "Name Z-A", value: "name_desc" },
  { label: "Price Low to High", value: "price_asc" },
  { label: "Price High to Low", value: "price_desc" },
  { label: "Stock Low to High", value: "stock_asc" },
  { label: "Stock High to Low", value: "stock_desc" },
];