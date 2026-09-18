import { toast } from "react-hot-toast";

import {
  calculatePossibleVariantCount,
  generateVariantsFromCurrentOptions,
} from "../../../../../utils/admin/products/product/productVariationUtils";

const VariantCreationCard = ({
  attributes = [],
  variants = [],
  replaceVariants,
  getValues,
}) => {
  const possibleVariantCount = calculatePossibleVariantCount(attributes);

  const handleGenerateVariants = () => {
    if (!getValues || !replaceVariants) {
      toast.error("Variant generator is not connected properly");
      return;
    }

    const values = getValues();

    const result = generateVariantsFromCurrentOptions({
      attributes,
      existingVariants: variants,
      baseSku: values.sku,
      sellingPrice: values.sellingPrice,
      stockQuantity: values.stockQuantity,
      productImages: values.images,
    });

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    replaceVariants(result.variants);

    toast.success(result.message);
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Generate Variants
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Variants will be generated from current selected attribute options.
          </p>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {possibleVariantCount} possible
        </span>
      </div>

      <button
        type="button"
        onClick={handleGenerateVariants}
        disabled={!possibleVariantCount}
        className="btn btn-primary mt-5 rounded-xl text-white"
      >
        Generate Variants ({possibleVariantCount})
      </button>
    </div>
  );
};

export default VariantCreationCard;
