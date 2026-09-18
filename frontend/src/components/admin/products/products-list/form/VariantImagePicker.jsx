
import { useRef } from "react";
import { Plus } from "lucide-react";

import { createVariantImagePreview } from '../../../../../utils/admin/products/product/productVariationUtils'

const VariantImagePicker = ({
  variant,
  index,
  setValue,
}) => {
  const inputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const image = createVariantImagePreview(file);

    setValue(`variants.${index}.imageUrl`, image.url, {
      shouldDirty: true,
      shouldValidate: true,
    });

    setValue(`variants.${index}.images`, [image], {
      shouldDirty: true,
      shouldValidate: true,
    });

    event.target.value = "";
  };

  return (
    <div className="flex items-center gap-2">
      <img
        src={variant.imageUrl}
        alt={variant.name || "Variant"}
        className="h-12 w-12 rounded-xl border border-slate-200 object-cover"
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex h-12 w-12 flex-col items-center justify-center rounded-xl border border-dashed border-primary/40 bg-primary/5 text-xs font-bold text-primary hover:bg-primary/10"
      >
        <Plus className="h-4 w-4" />
        Add
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleImageChange}
      />
    </div>
  );
};

export default VariantImagePicker;