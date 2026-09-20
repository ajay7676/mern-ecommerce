import ProductDetailImagesSection from "./ProductDetailImagesSection";
import ProductDetailInfoSection from "./ProductDetailInfoSection";
import ProductDetailPricingInventorySection from "./ProductDetailPricingInventorySection";


const ProductDetailOverview = ({ product }) => {
  const productName = product?.basicInformation?.name || "Product";

  return (
    <div className="space-y-6">
      <ProductDetailImagesSection
        images={product?.media?.images || []}
        productName={productName}
      />

      <ProductDetailInfoSection product={product} />
      <ProductDetailPricingInventorySection product={product} />
    </div>
  );
};

export default ProductDetailOverview;