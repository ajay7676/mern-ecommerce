import Breadcrumbs from "../../components/productDetails/Breadcrumbs";
import ProductGallery from "../../components/productDetails/ProductGallery";
import ProductInfo from "../../components/productDetails/ProductInfo";
import DeliveryInfo from "../../components/productDetails/DeliveryInfo";

const ProductDetails = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Breadcrumbs />
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_0.8fr] gap-8 mt-5">
          <ProductGallery />
          <ProductInfo />
          <DeliveryInfo />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;