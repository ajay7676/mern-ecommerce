import { useRef, useState } from "react";
import {
  ImagePlus,
  Loader2,
  Pencil,
} from "lucide-react";

import toast from "react-hot-toast";

// import {
//   useUploadProductImages,
// } from "../../../hooks/useUploadProductImages";

// import {
//   mapUploadedImageToVariantImage,
// } from "../../../../../utils/admin/products/product/productVariantImageUtils";
import { useUploadProductImages } from "../../../../../hooks/admin/mutations/products/useUploadProductImages";
import { mapUploadedImageToVariantImage } from "../../../../../utils/admin/products/product/productVariantImageUtils";

const MAX_IMAGE_SIZE =
  2 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const VariantImageUploader = ({
  variant,
  variantIndex,
  setValue,
  disabled = false,
}) => {
  const inputRef = useRef(null);

  const [previewError, setPreviewError] =
    useState(false);

  const uploadMutation =
    useUploadProductImages();

  const image =
    variant?.image || null;

  const imageUrl =
    image?.url ||
    variant?.imageUrl ||
    "";

  const handleOpenFilePicker = () => {
    if (
      disabled ||
      uploadMutation.isPending
    ) {
      return;
    }

    inputRef.current?.click();
  };

  const validateFile = (file) => {
    if (!file) {
      return false;
    }

    if (
      !ALLOWED_IMAGE_TYPES.includes(
        file.type,
      )
    ) {
      toast.error(
        "Only JPG, PNG and WebP images are allowed",
      );

      return false;
    }

    if (
      file.size >
      MAX_IMAGE_SIZE
    ) {
      toast.error(
        "Image size must be 2MB or less",
      );

      return false;
    }

    return true;
  };

  const handleFileChange =
    async (event) => {
      const file =
        event.target.files?.[0];

      /**
       * Allows selecting the same file again.
       */
      event.target.value = "";

      if (!validateFile(file)) {
        return;
      }

      try {
        const uploadedImages =
          await uploadMutation.mutateAsync([
            file,
          ]);

        const uploadedImage =
          uploadedImages?.[0];

        if (!uploadedImage) {
          throw new Error(
            "Image upload response is empty",
          );
        }

        const variantImage =
          mapUploadedImageToVariantImage(
            uploadedImage,
          );

        /**
         * Store image against THIS variant only.
         */
        setValue(
          `variants.${variantIndex}.image`,
          variantImage,
          {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
          },
        );

        /**
         * Keep compatibility with your existing
         * preview code if it still reads imageUrl.
         */
        setValue(
          `variants.${variantIndex}.imageUrl`,
          variantImage.url,
          {
            shouldDirty: true,
            shouldValidate: false,
          },
        );

        setPreviewError(false);

        toast.success(
          "Variant image uploaded",
        );
      } catch (error) {
        console.error(
          "Variant image upload failed:",
          error,
        );

        toast.error(
          error?.response?.data?.message ||
            error?.message ||
            "Failed to upload variant image",
        );
      }
    };

  return (
    <div className="flex items-center gap-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFileChange}
        disabled={
          disabled ||
          uploadMutation.isPending
        }
      />

      {imageUrl &&
      !previewError ? (
        <button
          type="button"
          onClick={
            handleOpenFilePicker
          }
          disabled={
            disabled ||
            uploadMutation.isPending
          }
          className="group relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-50"
          title="Replace variant image"
        >
          <img
            src={imageUrl}
            alt={
              variant?.name ||
              "Variant"
            }
            className="h-full w-full object-cover"
            onError={() =>
              setPreviewError(true)
            }
          />

          <span className="absolute inset-0 hidden items-center justify-center bg-black/40 text-white group-hover:flex">
            <Pencil className="h-3.5 w-3.5" />
          </span>
        </button>
      ) : (
        <button
          type="button"
          onClick={
            handleOpenFilePicker
          }
          disabled={
            disabled ||
            uploadMutation.isPending
          }
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-dashed border-primary/50 bg-primary/5 text-primary transition hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-50"
          title="Add variant image"
        >
          {uploadMutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ImagePlus className="h-4 w-4" />
          )}
        </button>
      )}

      {imageUrl && (
        <button
          type="button"
          onClick={
            handleOpenFilePicker
          }
          disabled={
            disabled ||
            uploadMutation.isPending
          }
          className="btn btn-ghost btn-xs hidden xl:inline-flex"
        >
          {uploadMutation.isPending
            ? "Uploading..."
            : "Replace"}
        </button>
      )}
    </div>
  );
};

export default VariantImageUploader;