
import { ImageIcon } from "lucide-react";
import { useWatch } from "react-hook-form";


import {
     formatCurrency 
    } from '../../../../../utils/admin/products/product/productPricingUtils';

const AdditionalProductPreviewCard = ({ control }) => {
  const productName = useWatch({
    control,
    name: "productName",
  });

  const sellingPrice = useWatch({
    control,
    name: "sellingPrice",
  });

  const shortDescription = useWatch({
    control,
    name: "shortDescription",
  });

  const images =
    useWatch({
      control,
      name: "images",
    }) || [];

  const primaryImage =
    images.find((image) => image.isPrimary) || images[0];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-bold text-slate-950">
        Product Preview
      </h3>

      <p className="mt-1 text-sm font-medium text-slate-500">
        This is how your product will appear.
      </p>

      <div className="mt-5 rounded-2xl bg-slate-50 p-5 text-center">
        <div className="flex min-h-47.5 items-center justify-center">
          {primaryImage ? (
            <img
              src={primaryImage.previewUrl || primaryImage.url}
              alt={productName || "Product"}
              className="h-40 w-40 object-contain"
            />
          ) : (
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-primary/10 text-primary">
              <ImageIcon className="h-12 w-12" />
            </div>
          )}
        </div>

        <h4 className="mt-4 text-base font-extrabold text-slate-950">
          {productName || "Product Name"}
        </h4>

        <p className="mt-2 text-xl font-extrabold text-primary">
          {formatCurrency(sellingPrice || 0)}
        </p>

        <p className="mt-2 text-sm font-medium text-slate-500">
          {shortDescription || "Product preview will appear here..."}
        </p>
      </div>
    </div>
  );
};

export default AdditionalProductPreviewCard;