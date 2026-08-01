import { FiEye } from "react-icons/fi";
import Card from "../card/Card";
import PreviewGallery from './PreviewGallery'
import PreviewPrice from "./PreviewPrice";
import PreviewInfo from './PreviewInfo'

const ProductPreviewCard = (
  {
  product = {},
  disabled = false,
  onViewFullPage,
}
) => {

   const images = Array.isArray(product.images)
    ? product.images
    : [];
   const handleViewFullPage = () => {
    if (
      disabled ||
      typeof onViewFullPage !== "function"
    ) {
      return;
    }

    onViewFullPage(product);
  };
  return (
    <Card
      className="overflow-visible"
      bodyClassName="pt-5"
    >
        <header className="mb-4 flex items-center justify-between gap-4">
        <h2
          id="product-preview-heading"
          className="text-base font-semibold text-slate-950">
          Product Preview
        </h2>

        <button
          type="button"
          disabled={
            disabled ||
            typeof onViewFullPage !== "function"
          }
          onClick={handleViewFullPage}
          className="inline-flex items-center gap-2 text-xs
                     font-semibold text-violet-600 transition
                     hover:text-violet-700
                     disabled:cursor-not-allowed
                     disabled:opacity-50"
        >
          <FiEye className="text-base" />
          View Full Page
        </button>
      </header>
       <PreviewGallery
        images={images}
        productName={product.name}
      />
       <PreviewInfo
        name={product.name}
        shortDescription={
          product.shortDescription
        }
        stock={product.stock}
        trackInventory={
          product.trackInventory ?? true
        }
        allowBackorder={
          product.allowBackorder ?? false
        }
        isFeatured={product.isFeatured ?? false}
      >
        <PreviewPrice
          price={product.price}
          discountPrice={product.discountPrice}
          currency={product.currency || "INR"}
        />
      </PreviewInfo>
    </Card>
  );
};

export default ProductPreviewCard;
