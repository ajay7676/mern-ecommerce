import ProductFilters from "../../../components/admin/products/products-list/ProductFilters";
import ProductsHeader from "../../../components/admin/products/products-list/ProductsHeader";
import ProductsTable from "../../../components/admin/products/products-list/ProductsTable";
import ProductPagination from "../../../components/admin/products/products-list/ProductPagination";
import AddProductDrawer from "../../../components/admin/products/products-list/add-product/AddProductDrawer";
import { useMemo, useState } from "react";
import { useAdminProducts } from "../../../hooks/admin/queries/products/product-list/useAdminProducts";
import { useProductCategoryOptions } from "../../../hooks/admin/queries/products/product-list/useProductCategoryOptions";
import { useProductBrandOptions } from "../../../hooks/admin/queries/products/product-list/useProductBrandOptions";
import {
  getProductQueryParams,
  hasActiveProductFilters,
} from "../../../utils/admin/products/product/productFilterUtils";
import { DEFAULT_PRODUCT_FILTERS } from "../../../constants/admin/products/productFilter.constants";
import ActiveProductFilters from "../../../components/admin/products/products-list/ActiveProductFilters";

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

  const [isMoreFiltersOpen, setIsMoreFiltersOpen] = useState(false);

  const queryParams = useMemo(() => {
    return getProductQueryParams(filters);
  }, [filters]);

  const { data, isLoading, isFetching, isError, error } =
    useAdminProducts(queryParams);

  const { data: categoryData } = useProductCategoryOptions();
  const { data: brandData } = useProductBrandOptions();

  const products = data?.products || [];
  const pagination = data?.pagination;

  // console.log(products);

  const categoryOptions = categoryData?.options || [];
  const brandOptions = brandData || [];

  const hasFilters = hasActiveProductFilters(filters);

  console.log(categoryOptions);
  console.log(brandOptions);

  const handleAddProductModal = () => {
    console.log("Click Add New Product Modal");
    setIsAddProductOpen(true);
  };
  const hideAddProductModal = () => {
    setIsAddProductOpen(false);
  };

  const handlePageChange = (page) => {
    setFilters((prev) => ({
      ...prev,
      page,
    }));
  };

  const handleSearchChange = (search) => {
    setFilters((prev) => ({
      ...prev,
      search,
      page: 1,
    }));
  };

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      page: 1,
    }));
  };

  const handleLimitChange = (limit) => {
    setFilters((prev) => ({
      ...prev,
      page: 1,
      limit,
    }));
  };
  const handleRemoveFilter = (name) => {
    setFilters((prev) => ({
      ...prev,
      [name]: name === "search" ? "" : "all",
      page: 1,
    }));
  };
  const handleClearFilters = () => {
    setFilters(DEFAULT_PRODUCT_FILTERS);
  };
  return (
    <>
      <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-[1560px] space-y-6">
          <ProductsHeader onAddProduct={handleAddProductModal} />

          <section className="rounded-2xl border border-slate-200 bg-white/40 p-4 shadow-sm">
            <div className="space-y-6">
              <ProductFilters
                filters={filters}
                categoryOptions={categoryOptions}
                brandOptions={brandOptions}
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
    </>
  );
};

export default ProductListPage;
