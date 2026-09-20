import ProductFilters from "../../../components/admin/products/products-list/ProductFilters";
import ProductsHeader from "../../../components/admin/products/products-list/ProductsHeader";
import ProductsTable from "../../../components/admin/products/products-list/ProductsTable";
import ProductPagination from "../../../components/admin/products/products-list/ProductPagination";
import AddProductDrawer from "../../../components/admin/products/products-list/add-product/AddProductDrawer";
import ProductMoreFiltersDrawer from "../../../components/admin/products/products-list/ProductMoreFiltersDrawer";
import { useEffect, useMemo, useState } from "react";
import { useAdminProducts } from "../../../hooks/admin/queries/products/product-list/useAdminProducts";
import { useProductCategoryOptions } from "../../../hooks/admin/queries/products/product-list/useProductCategoryOptions";
import { useProductBrandOptions } from "../../../hooks/admin/queries/products/product-list/useProductBrandOptions";
import {
  getMoreFiltersCount,
  getProductQueryParams,
  hasActiveProductFilters,
} from "../../../utils/admin/products/product/productFilterUtils";
import { DEFAULT_PRODUCT_FILTERS } from "../../../constants/admin/products/productFilter.constants";
import ActiveProductFilters from "../../../components/admin/products/products-list/ActiveProductFilters";
import ProductDetailDrawer from "../../../components/admin/products/products-list/view-product/ProductDetailDrawer";
import useDebounce from "../../../utils/useDebounce";
import toast from "react-hot-toast";
const ProductListPage = () => {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    status: "all",
    productType: "all",
    category: "all",
    brand: "all",
    stockStatus: "all",
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  const [searchInput, setSearchInput] = useState(
    DEFAULT_PRODUCT_FILTERS.search,
  );
  const [isMoreFiltersOpen, setIsMoreFiltersOpen] = useState(false);

  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isProductDetailDrawerOpen, setIsProductDetailDrawerOpen] =
    useState(false);

  const debouncedSearch = useDebounce(searchInput, 500);

  useEffect(() => {
    setFilters((prev) => {
      const cleanSearch = debouncedSearch.trim();

      if (prev.search === cleanSearch) {
        return prev;
      }

      return {
        ...prev,
        search: cleanSearch,
        page: 1,
      };
    });
  }, [debouncedSearch]);

  const queryParams = useMemo(() => {
    return getProductQueryParams(filters);
  }, [filters]);

  const { data, isLoading, isFetching, isError, error } =
    useAdminProducts(queryParams);

  const { data: categoryData, isLoading: isCategoriesLoading } =
    useProductCategoryOptions();

  const { data: brandData, isLoading: isBrandsLoading } =
    useProductBrandOptions();

  const products = data?.products || [];
  const pagination = data?.pagination;

  const isParentCategory = (category) => {
    return (
      !category.parentCategory ||
      category.parentCategory === null ||
      category.parentCategory === ""
    );
  };

  const allCategoryOptions = categoryData?.options || [];
  const brandOptions = brandData || [];
  const categoryOptions = allCategoryOptions.filter(isParentCategory);
  const hasFilters = hasActiveProductFilters(filters);
  const moreFiltersCount = getMoreFiltersCount(filters);

  const handleAddProductModal = () => {
    console.log("Click Add New Product Modal");
    setIsAddProductOpen(true);
  };
  const hideAddProductModal = () => {
    setIsAddProductOpen(false);
  };

  const handleViewProduct = (product) => {
  const productId = product?.id;

  if (!productId) {
    console.log("Product id not found:", product);
    toast.error("Product id not found");
    return;
  }
  

  setSelectedProductId(productId);
  setIsProductDetailDrawerOpen(true);
};

  const handleCloseProductDetailDrawer = () => {
    setIsProductDetailDrawerOpen(false);
  };

  const handleSearchChange = (value) => {
    setSearchInput(value);
  };

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      page: 1,
    }));
  };

  const handleRemoveFilter = (name) => {
    if (name === "search") {
      setSearchInput("");

      setFilters((prev) => ({
        ...prev,
        search: "",
        page: 1,
      }));

      return;
    }

    if (name === "sort") {
      setFilters((prev) => ({
        ...prev,
        sortBy: DEFAULT_PRODUCT_FILTERS.sortBy,
        sortOrder: DEFAULT_PRODUCT_FILTERS.sortOrder,
        page: 1,
      }));

      return;
    }

    setFilters((prev) => ({
      ...prev,
      [name]: "all",
      page: 1,
    }));
  };

  const handleClearFilters = () => {
    setSearchInput(DEFAULT_PRODUCT_FILTERS.search);
    setFilters(DEFAULT_PRODUCT_FILTERS);
  };

  const handleApplyMoreFilters = (advancedFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...advancedFilters,
      page: 1,
    }));

    setIsMoreFiltersOpen(false);
  };

  const handleClearAdvancedFilters = (advancedFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...advancedFilters,
      page: 1,
    }));
  };

  const handlePageChange = (page) => {
    setFilters((prev) => ({
      ...prev,
      page,
    }));
  };

  const handleLimitChange = (limit) => {
    setFilters((prev) => ({
      ...prev,
      limit,
      page: 1,
    }));
  };

   console.log(selectedProductId)

  return (
    <>
      <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-[1560px] space-y-6">
          <ProductsHeader onAddProduct={handleAddProductModal} />

          <section className="rounded-2xl border border-slate-200 bg-white/40 p-4 shadow-sm">
            <div className="space-y-6">
              <ProductFilters
                filters={filters}
                searchValue={searchInput}
                categoryOptions={categoryOptions}
                brandOptions={brandOptions}
                isCategoriesLoading={isCategoriesLoading}
                isBrandsLoading={isBrandsLoading}
                moreFiltersCount={moreFiltersCount}
                onSearchChange={handleSearchChange}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                onOpenMoreFilters={() => setIsMoreFiltersOpen(true)}
                onSavedViews={() => {}}
                onCreateView={() => {}}
                hasActiveFilters={hasFilters}
              />

              <ActiveProductFilters
                filters={filters}
                categoryOptions={categoryOptions}
                brandOptions={brandOptions}
                onRemoveFilter={handleRemoveFilter}
              />
            </div>
            <div className="mt-5">
              <ProductsTable
                products={products}
                isLoading={isLoading}
                isFetching={isFetching}
                isError={isError}
                errorMessage={
                  error?.response?.data?.message || "Failed to load products"
                }
                hasFilters={hasFilters}
                onAddProduct={handleAddProductModal}
                onViewProduct={handleViewProduct}
                onClearFilters={handleClearFilters}
              />
              <ProductPagination
                pagination={pagination}
                onPageChange={handlePageChange}
                onLimitChange={handleLimitChange}
                isLoading={isFetching}
              />
            </div>
          </section>
        </div>
      </main>
      <AddProductDrawer
        isOpen={isAddProductOpen}
        onClose={hideAddProductModal}
      />
      <ProductMoreFiltersDrawer
        isOpen={isMoreFiltersOpen}
        filters={filters}
        onClose={() => setIsMoreFiltersOpen(false)}
        onApply={handleApplyMoreFilters}
        onClearAdvanced={handleClearAdvancedFilters}
      />
      <ProductDetailDrawer
        isOpen={isProductDetailDrawerOpen}
        productId={selectedProductId}
        onClose={handleCloseProductDetailDrawer}
      />
    </>
  );
};

export default ProductListPage;
