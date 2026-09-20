
import { DEFAULT_PRODUCT_FILTERS } from '../../../../constants/admin/products/productFilter.constants';

export const normalizeProductFilters = (filters = {}) => {
  return {
    ...DEFAULT_PRODUCT_FILTERS,
    ...filters,
    page: Number(filters.page || DEFAULT_PRODUCT_FILTERS.page),
    limit: Number(filters.limit || DEFAULT_PRODUCT_FILTERS.limit),
  };
};

export const getProductQueryParams = (filters = {}) => {
  const normalized = normalizeProductFilters(filters);

  return {
    page: normalized.page,
    limit: normalized.limit,
    search: normalized.search,
    category: normalized.category,
    brand: normalized.brand,
    status: normalized.status,
    stockStatus: normalized.stockStatus,
    productType: normalized.productType,
    sortBy: normalized.sortBy,
    sortOrder: normalized.sortOrder,
  };
};

export const hasActiveProductFilters = (filters = {}) => {
  return (
    Boolean(filters.search) ||
    filters.category !== "all" ||
    filters.brand !== "all" ||
    filters.status !== "all" ||
    filters.stockStatus !== "all" ||
    filters.productType !== "all"
  );
};

export const splitSortValue = (value = "createdAt_desc") => {
  const [sortBy = "createdAt", sortOrder = "desc"] = value.split("_");

  return {
    sortBy,
    sortOrder,
  };
};

export const joinSortValue = ({ sortBy = "createdAt", sortOrder = "desc" }) => {
  return `${sortBy}_${sortOrder}`;
};