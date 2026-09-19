import ProductFilters from "../../../components/admin/products/products-list/ProductFilters";
import ProductsHeader from "../../../components/admin/products/products-list/ProductsHeader";
import ProductsTable from "../../../components/admin/products/products-list/ProductsTable";
import ProductPagination from "../../../components/admin/products/products-list/ProductPagination";
// import { products } from "../../../components/admin/products/products-list/data/products.mock";
import AddProductDrawer from "../../../components/admin/products/products-list/add-product/AddProductDrawer";
import { useMemo, useState } from "react";
import { useAdminProducts } from "../../../hooks/admin/queries/products/product-list/useAdminProducts";

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

  const queryParams = useMemo(() => {
    return {
      ...filters,
    };
  }, [filters]);

  const { data, isLoading, isFetching, isError, error } =
    useAdminProducts(queryParams);

  const products = data?.products || [];
  const pagination = data?.pagination;
  console.log(products);

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
  return (
    <>
      <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-[1560px] space-y-6">
          <ProductsHeader onAddProduct={handleAddProductModal} />

          <section className="rounded-2xl border border-slate-200 bg-white/40 p-4 shadow-sm">
            <ProductFilters
             handleFilterChange={handleFilterChange}
             handleSearchChange={handleSearchChange}
            />

            <div className="mt-5">
              <ProductsTable
                products={products}
                isLoading={isLoading}
                isFetching={isFetching}
                isError={isError}
                errorMessage={
                  error?.response?.data?.message || "Failed to load products"
                }
              />
              <ProductPagination
                pagination={pagination}
                onPageChange={handlePageChange}
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
