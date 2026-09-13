
import {
  CheckCircle2,
  Crown,
  GripVertical,
  Trash2,
} from "lucide-react";

import {
  formatFileSize,
  revokeImagePreviewUrl,
} from '../../../../../utils/admin/products/product/productImageUtils'

const ProductImagesGrid = ({
  images,
  remove,
  update,
}) => {
  if (!images.length) {
    return null;
  }

  const handleSetPrimary = (selectedIndex) => {
    images.forEach((image, index) => {
      update(index, {
        ...image,
        isPrimary: index === selectedIndex,
      });
    });
  };

  const handleRemoveImage = (index) => {
    revokeImagePreviewUrl(images[index]?.previewUrl);
    remove(index);
  };

  return (
    <div className="mt-6">
      <div className="mb-3 flex items-center justify-between gap-4">
        <h4 className="text-sm font-bold text-slate-900">
          Uploaded Images
        </h4>

        <p className="text-xs font-medium text-slate-500">
          {images.length}/8 images uploaded
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-4 2xl:grid-cols-4">
        {images.map((image, index) => (
          <div
            key={image.id}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
          >
            <div className="relative aspect-4/3 bg-slate-100">
              <img
                src={image.previewUrl}
                alt={image.altText || image.name}
                className="h-full w-full object-cover"
              />

              {image.isPrimary && (
                <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white shadow">
                  <Crown className="h-3.5 w-3.5" />
                  Primary
                </span>
              )}

              <div className="absolute right-3 top-3 flex gap-2 opacity-0 transition group-hover:opacity-100">
                {!image.isPrimary && (
                  <button
                    type="button"
                    onClick={() => handleSetPrimary(index)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-emerald-600 shadow hover:bg-emerald-50"
                    title="Set primary"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-error shadow hover:bg-error/10"
                  title="Remove image"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-start gap-3">
                <GripVertical className="mt-1 h-4 w-4 flex-none text-slate-400" />

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-slate-900">
                    {image.name}
                  </p>

                  <p className="mt-1 text-xs font-medium text-slate-500">
                    {formatFileSize(image.size)}
                  </p>

                  <p className="mt-1 text-xs font-medium text-slate-400">
                    Sort order: {index + 1}
                  </p>
                </div>
              </div>

              {!image.isPrimary && (
                <button
                  type="button"
                  onClick={() => handleSetPrimary(index)}
                  className="btn btn-outline btn-sm mt-4 w-full rounded-xl"
                >
                  Set as Primary
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImagesGrid;