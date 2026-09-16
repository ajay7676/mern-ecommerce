
import { Star, Trash2 } from "lucide-react";

const ProductImagesGrid = ({
  images = [],
  onRemoveImage,
  onMakePrimary,
  deletingPublicId = null,
}) => {
  if (!images.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center">
        <p className="text-sm font-medium text-slate-700">
          No product images uploaded yet.
        </p>
        <p className="mt-1 text-xs text-slate-500">
          Upload at least one image before publishing.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {images.map((image, index) => {
        const isDeleting = deletingPublicId === image.publicId;

        return (
          <div
            key={image.id || image.imageId || image.publicId}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <div className="relative aspect-square bg-slate-100">
              <img
                src={image.url || image.previewUrl}
                alt={image.altText || "Product image"}
                className="h-full w-full object-cover"
              />

              {image.isPrimary && (
                <span className="absolute left-2 top-2 rounded-full bg-primary px-2 py-1 text-[11px] font-semibold text-white">
                  Primary
                </span>
              )}

              <div className="absolute right-2 top-2 flex gap-2 opacity-100 md:opacity-0 md:transition md:group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => onMakePrimary(index)}
                  disabled={image.isPrimary || isDeleting}
                  className="btn btn-square btn-xs rounded-lg bg-white text-slate-700 shadow hover:bg-slate-100"
                  title="Make primary"
                >
                  <Star className="h-3.5 w-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => onRemoveImage(index)}
                  disabled={isDeleting}
                  className="btn btn-square btn-xs rounded-lg bg-white text-error shadow hover:bg-error hover:text-white"
                  title="Remove image"
                >
                  {isDeleting ? (
                    <span className="loading loading-spinner loading-xs" />
                  ) : (
                    <Trash2 className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-1 p-3">
              <p className="truncate text-xs font-medium text-slate-800">
                {image.publicId}
              </p>

              <p className="text-[11px] text-slate-500">
                Sort order: {image.sortOrder || index + 1}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductImagesGrid;