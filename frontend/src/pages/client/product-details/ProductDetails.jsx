import {useParams } from "react-router";
import Breadcrumbs from "../../../components/productDetails/Breadcrumbs";
import ProductGallery from "../../../components/productDetails/ProductGallery";
import ProductInfo from "../../../components/productDetails/ProductInfo";
import DeliveryInfo from "../../../components/productDetails/DeliveryInfo";
import useProductDetails from "../../../hooks/queries/useProductDetails";
import useProductVariants from "../../../hooks/queries/products/useProductVariants";

const ProductDetails = () => {
  const { slug: productId } = useParams();

  const {
    data: productData,
    isPending: isProductLoading,
    isError: isProductError,
    error,
  } = useProductDetails(productId);

  const product = productData?.product;
  const {
    data: variantData,
    isLoading: areVariantsLoading,
    isError: variantsError,
  } = useProductVariants(productId);


   if (
    isProductLoading ||
    areVariantsLoading
  ) {
    return (
      <div className="p-6">
        <div className="skeleton h-10 w-64" />
      </div>
    );
  }
  if (
    isProductError ||
    variantsError
  ) {
    return (
      <div className="alert alert-error">
        {error?.response?.data?.message || "Failed to load product"}
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Breadcrumbs
          category={product.category}
          brand={product.brand}
          name={product.name}
        />
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_0.8fr] gap-8 mt-5">
          <ProductGallery key={product._id} product={product} />
          <ProductInfo product={product} variantData={variantData} />

          <DeliveryInfo product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
