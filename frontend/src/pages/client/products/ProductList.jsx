import ProductListHeader from "../../../components/productList/ProductListHeader";
import ProductPromoBanners from "../../../components/productList/ProductPromoBanners";
import ProductFilters from "../../../components/productList/ProductFilters";
import ProductToolbar from "../../../components/productList/ProductToolbar";
import ProductGrid from "../../../components/productList/ProductGrid";
import ProductPagination from "../../../components/productList/ProductPagination";
import FeatureStrip from "../../../components/home/FeatureStrip";

const ProductList = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-4">
          <ProductListHeader />
          <ProductPromoBanners />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 mt-6">
          <ProductFilters />
          <div>
            <ProductToolbar />
            <ProductGrid />
            <ProductPagination />
          </div>
        </div>
        <FeatureStrip />
      </div>
    </div>
  );
};

export default ProductList;
