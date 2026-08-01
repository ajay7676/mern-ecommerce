import { useState } from "react";
import { FiImage } from "react-icons/fi";

const normalizeImages = (images = []) => {
  if (!Array.isArray(images)) return [];

  return images
    .map((image, index) => {
      const source =
         image?.url || image?.previewUrl || "";

      if (!source) return null;

      return {
        ...image,

        previewKey:
          image.public_id ||
          image._id ||
          `${source}-${index}`,

        source,

        alt:
          image.alt ||
          image.file?.name ||
          `Product image ${index + 1}`,
      };
    })
    .filter(Boolean);
};

const ImagePlaceholder = ({ size = "large" }) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-slate-50 text-slate-400">
      <FiImage
        className={
          size === "large"
            ? "text-5xl"
            : "text-xl"
        }
      />

      {size === "large" && (
        <p className="mt-2 text-sm">
          Product image preview
        </p>
      )}
    </div>
  );
};

const PreviewGallery = ({
  images = [],
  productName = "Product",
}) => {
  const [selectedImageKey, setSelectedImageKey] =
    useState(null);

  const [failedImages, setFailedImages] = useState(
    () => new Set()
  );

  const normalizedImages = normalizeImages(images);

  const primaryImage =
    normalizedImages.find((image) => image.isPrimary) ||
    normalizedImages[0] ||
    null;

  const selectedImage =
    normalizedImages.find(
      (image) =>
        image.previewKey === selectedImageKey
    ) ||
    primaryImage;

  const markImageAsFailed = (source) => {
    setFailedImages((previousImages) => {
      const nextImages = new Set(previousImages);
      nextImages.add(source);

      return nextImages;
    });
  };

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_72px]">
      {/* Main product image */}
      <div className="aspect-4/3 overflow-hidden rounded-lg border border-slate-200 bg-white">
        {selectedImage &&
        !failedImages.has(selectedImage.source) ? (
          <img
            key={selectedImage.source}
            src={selectedImage.source}
            alt={
              selectedImage.alt ||
              `${productName} preview`
            }
            onError={() =>
              markImageAsFailed(
                selectedImage.source
              )
            }
            className="h-full w-full object-contain p-3"
          />
        ) : (
          <ImagePlaceholder />
        )}
      </div>

      {/* Thumbnail list */}
      {normalizedImages.length > 0 && (
        <div
          className="flex gap-3 overflow-x-auto pb-1
                     sm:max-h-57.5 sm:flex-col
                     sm:overflow-x-hidden sm:overflow-y-auto
                     sm:pb-0 sm:pr-1"
          aria-label="Product image thumbnails"
        >
          {normalizedImages.map((image) => {
            const isSelected =
              image.previewKey ===
              selectedImage?.previewKey;

            return (
              <button
                key={image.previewKey}
                type="button"
                aria-label={`View ${image.alt}`}
                aria-pressed={isSelected}
                onClick={() =>
                  setSelectedImageKey(
                    image.previewKey
                  )
                }
                className={`h-17 w-17 shrink-0
                            overflow-hidden rounded-lg border-2
                            bg-white p-1 transition
                            focus:outline-none focus:ring-2
                            focus:ring-violet-200 ${
                              isSelected
                                ? "border-violet-600"
                                : "border-slate-200 hover:border-violet-300"
                            }`}
              >
                {!failedImages.has(image.source) ? (
                  <img
                    src={image.source}
                    alt=""
                    onError={() =>
                      markImageAsFailed(
                        image.source
                      )
                    }
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <ImagePlaceholder size="small" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PreviewGallery;