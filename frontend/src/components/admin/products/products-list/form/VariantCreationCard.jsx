import { useMemo, useState } from "react";
import { Plus, Wand2 } from "lucide-react";


import {
  calculatePossibleVariantCount,
  createManualVariant,
  generateVariantsFromAttributes,
}  from '../../../../../utils/admin/products/product/productVariationUtils'

const VariantCreationCard = ({
  attributes,
  baseSku,
  sellingPrice,
  onGenerateVariants,
  onAddManualVariant,
}) => {
  const [manualValues, setManualValues] = useState({});
  const [manualPrice, setManualPrice] = useState(sellingPrice || "999.00");
  const [manualStock, setManualStock] = useState("25");

  const possibleCount = useMemo(() => {
    return calculatePossibleVariantCount(attributes);
  }, [attributes]);

  const handleGenerate = () => {
    const variants = generateVariantsFromAttributes({
      attributes,
      baseSku,
      sellingPrice,
    });

    onGenerateVariants(variants);
  };

  const handleAddManual = () => {
    const selectedOptions = {};

    attributes.forEach((attribute) => {
      const selectedValue = manualValues[attribute.attributeId];
      const option =
        attribute.options.find((item) => item.value === selectedValue) ||
        attribute.options[0];

      if (!option) return;

      selectedOptions[attribute.name] = {
        attributeId: attribute.attributeId,
        attributeName: attribute.name,
        optionId: option.optionId,
        label: option.label,
        value: option.value,
        colorCode: option.colorCode || null,
      };
    });

    const variant = createManualVariant({
      selectedOptions,
      baseSku,
      price: manualPrice,
      stock: manualStock,
    });

    onAddManualVariant(variant);
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div>
        <h3 className="text-lg font-bold text-slate-950">
          Create Product Variations
        </h3>

        <p className="mt-1 text-sm font-medium text-slate-500">
          Choose how you want to create variants for this product.
        </p>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <div className="rounded-2xl border border-primary bg-primary/5 p-5">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
              <Wand2 className="h-5 w-5" />
            </div>

            <div>
              <h4 className="font-bold text-slate-950">
                Generate Automatically
              </h4>

              <p className="mt-1 text-sm text-slate-500">
                Create all possible combinations from selected attributes.
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-xl bg-white px-4 py-3 text-center text-sm font-bold text-primary">
            Total possible variants: {possibleCount}
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={!possibleCount}
            className="btn btn-primary mt-5 w-full rounded-xl text-white"
          >
            <Wand2 className="h-4 w-4" />
            Generate Variants
          </button>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Plus className="h-5 w-5" />
            </div>

            <div>
              <h4 className="font-bold text-slate-950">
                Add Manually
              </h4>

              <p className="mt-1 text-sm text-slate-500">
                Create one specific variant combination manually.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {attributes.map((attribute) => (
              <label key={attribute.attributeId} className="block">
                <span className="mb-1 block text-xs font-bold text-slate-700">
                  {attribute.name}
                </span>

                <select
                  value={manualValues[attribute.attributeId] || ""}
                  onChange={(event) =>
                    setManualValues((prev) => ({
                      ...prev,
                      [attribute.attributeId]: event.target.value,
                    }))
                  }
                  className="select select-bordered h-10 min-h-10 w-full rounded-xl border-slate-200 bg-white text-sm"
                >
                  <option value="">Select {attribute.name}</option>

                  {attribute.options.map((option) => (
                    <option key={option.optionId} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            ))}

            <label>
              <span className="mb-1 block text-xs font-bold text-slate-700">
                Price
              </span>

              <input
                type="number"
                value={manualPrice}
                onChange={(event) => setManualPrice(event.target.value)}
                className="input input-bordered h-10 min-h-10 w-full rounded-xl border-slate-200 bg-white text-sm"
              />
            </label>

            <label>
              <span className="mb-1 block text-xs font-bold text-slate-700">
                Stock
              </span>

              <input
                type="number"
                value={manualStock}
                onChange={(event) => setManualStock(event.target.value)}
                className="input input-bordered h-10 min-h-10 w-full rounded-xl border-slate-200 bg-white text-sm"
              />
            </label>
          </div>

          <button
            type="button"
            onClick={handleAddManual}
            disabled={!attributes.length}
            className="btn btn-outline btn-primary mt-5 w-full rounded-xl"
          >
            <Plus className="h-4 w-4" />
            Add Variant Manually
          </button>
        </div>
      </div>
    </section>
  );
};

export default VariantCreationCard;