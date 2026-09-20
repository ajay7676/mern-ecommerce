import { useMemo, useState } from "react";
import { ImageOff, Images, Star } from "lucide-react";

const ProductDetailImagesSection = ({ images = [], productName = "" }) => {
  const sortedImages = useMemo(() => {
    return [...images].sort((a, b) => {
      if (a.isPrimary) return -1;
      if (b.isPrimary) return 1;

      return Number(a.sortOrder || 0) - Number(b.sortOrder || 0);
    });
  }, [images]);

  const [selectedImagePublicId, setSelectedImagePublicId] = useState(null);

  const selectedImage =
    sortedImages.find((image) => image.publicId === selectedImagePublicId) ||
    sortedImages.find((image) => image.isPrimary) ||
    sortedImages[0] ||
    null;

  if (!sortedImages.length) {
    return (
      <section className="rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Images className="h-5 w-5" />
          </div>

          <div>
            <h3 className="font-bold text-base-content">Product Images</h3>
            <p className="text-xs text-base-content/50">
              Uploaded product media
            </p>
          </div>
        </div>

        <div className="flex min-h-70 flex-col items-center justify-center rounded-3xl border border-dashed border-base-300 bg-base-200/50 text-center">
          <ImageOff className="h-12 w-12 text-base-content/30" />

          <p className="mt-4 font-semibold text-base-content">
            No product images found
          </p>

          <p className="mt-1 text-sm text-base-content/50">
            This product does not have any uploaded images.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm">
      <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Images className="h-5 w-5" />
          </div>

          <div>
            <h3 className="font-bold text-base-content">Product Images</h3>
            <p className="text-xs text-base-content/50">
              {sortedImages.length} image{sortedImages.length > 1 ? "s" : ""} uploaded
            </p>
          </div>
        </div>

        {selectedImage?.isPrimary && (
          <span className="badge badge-primary gap-1 text-white">
            <Star className="h-3.5 w-3.5" />
            Primary image
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_150px]">
        {/* Main Image */}
        <div className="overflow-hidden rounded-3xl border border-base-300 bg-base-200">
          <div className="relative aspect-square max-h-130 w-full">
            <img
              src={selectedImage.url}
              alt={selectedImage.altText || productName || "Product image"}
              className="h-full w-full object-cover"
            />

            {selectedImage.isPrimary && (
              <div className="absolute left-4 top-4">
                <span className="badge badge-primary gap-1 text-white">
                  <Star className="h-3.5 w-3.5" />
                  Primary
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-4 gap-3 lg:grid-cols-1">
          {sortedImages.map((image, index) => {
            const isSelected = selectedImage?.publicId === image.publicId;

            return (
              <button
                key={image.publicId || image.url || index}
                type="button"
                onClick={() => setSelectedImagePublicId(image.publicId)}
                className={`relative overflow-hidden rounded-2xl border bg-base-200 transition ${
                  isSelected
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-base-300 hover:border-primary/60"
                }`}
              >
                <div className="aspect-square">
                  <img
                    src={image.url}
                    alt={image.altText || `${productName} image ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>

                {image.isPrimary && (
                  <div className="absolute right-1 top-1 rounded-full bg-primary p-1 text-white">
                    <Star className="h-3 w-3" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {selectedImage?.altText && (
        <div className="mt-4 rounded-2xl bg-base-200 px-4 py-3">
          <p className="text-xs font-semibold uppercase text-base-content/50">
            Alt text
          </p>
          <p className="mt-1 text-sm text-base-content/70">
            {selectedImage.altText}
          </p>
        </div>
      )}
    </section>
  );
};

export default ProductDetailImagesSection;