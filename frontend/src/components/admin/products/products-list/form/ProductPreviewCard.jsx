// components/ProductPreviewCard.jsx

import { ImageIcon } from "lucide-react";
import { useWatch } from "react-hook-form";

const ProductPreviewCard = ({ control }) => {
  const productName = useWatch({
    control,
    name: "productName",
  });

  const shortDescription = useWatch({
    control,
    name: "shortDescription",
  });

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-950">
        Product Preview
      </h3>

      <p className="mt-1 text-sm font-medium text-slate-500">
        This is how your product will appear.
      </p>

      <div className="mt-6 flex min-h-75 items-center justify-center rounded-2xl bg-slate-50 p-6">
        <div className="text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary">
            <ImageIcon className="h-11 w-11" />
          </div>

          <h4 className="mt-6 text-lg font-bold text-slate-950">
            {productName || "Product Name"}
          </h4>

          <p className="mt-2 text-2xl font-extrabold text-primary">
            ₹0.00
          </p>

          <p className="mt-4 text-sm font-medium text-slate-500">
            {shortDescription || "Short description will appear here..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductPreviewCard;