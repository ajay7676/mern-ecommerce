import ProductFilters from "../../../components/admin/products/products-list/ProductFilters";
import ProductsHeader from "../../../components/admin/products/products-list/ProductsHeader";
import ProductsTable from "../../../components/admin/products/products-list/ProductsTable";
import ProductPagination from "../../../components/admin/products/products-list/ProductPagination";
import { products } from "../../../components/admin/products/products-list/data/products.mock";
import AddProductDrawer from "../../../components/admin/products/products-list/add-product/AddProductDrawer";
import { useState } from "react";

const ProductListPage = () => {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  const handleAddProductModal = () => {
         console.log("Click Add New Product Modal")
    setIsAddProductOpen(true);
  };
  const hideAddProductModal = () => {
    setIsAddProductOpen(false);
  };
  return (
    <>
      <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-[1560px] space-y-6">
          <ProductsHeader
            onAddProduct={handleAddProductModal}
          />

          <section className="rounded-2xl border border-slate-200 bg-white/40 p-4 shadow-sm">
            <ProductFilters />

            <div className="mt-5">
              <ProductsTable products={products} />
              <ProductPagination />
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
