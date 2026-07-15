import Breadcrumbs from "../../../components/productDetails/Breadcrumbs";
import ProductGallery from "../../../components/productDetails/ProductGallery";
import ProductInfo from "../../../components/productDetails/ProductInfo";
import DeliveryInfo from "../../../components/productDetails/DeliveryInfo";
import useProduct from '../../../hooks/queries/useProduct'
import { useParams } from "react-router";

const ProductDetails = () => {
    const  {slug}  = useParams(); 
    const {data, isPending,isError, error} = useProduct(slug);

    if (isPending) return <p className="p-6">Loading product...</p>

    if (isError) {
    return (
      <p className="p-6 text-red-500">
        {error?.response?.data?.message || "Failed to load product"}
      </p>
    );
  }
  const product = data?.product;
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Breadcrumbs 
           category={product.category}
           brand={product.brand}
           name={product.name}
        
        />
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_0.8fr] gap-8 mt-5">
          <ProductGallery key={product._id}  product={product}/>
          <ProductInfo  product={product} />
          <DeliveryInfo  product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;