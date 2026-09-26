import { useRef, useState } from "react";

import {
  ImagePlus,
  Loader2,
  Pencil,
  Trash2,
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

import {
  useDeleteTemporaryProductImages,
} from "../../../../../hooks/admin/mutations/products/useDeleteTemporaryProductImages";

import {
  isTemporaryProductImage,
} from "../../../../../utils/admin/products/product/productVariantImageLifecycleUtils";

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
  const inputRef =
    useRef(null);

  const [
    previewError,
    setPreviewError,
  ] = useState(false);

  const uploadMutation =
    useUploadProductImages();

  const deleteTempMutation =
    useDeleteTemporaryProductImages();

  const currentImage =
    variant?.image || null;

  const imageUrl =
    currentImage?.url ||
    variant?.imageUrl ||
    "";

  const isBusy =
    uploadMutation.isPending ||
    deleteTempMutation.isPending;

  const handleOpenFilePicker = () => {
    if (
      disabled ||
      isBusy
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

  /**
   * Clear image from RHF.
   */
  const clearVariantImage = () => {
    setValue(
      `variants.${variantIndex}.image`,
      {
        publicId: null,
        url: null,
      },
      {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      },
    );

    /**
     * Keep compatibility with any old UI
     * still reading imageUrl.
     */
    setValue(
      `variants.${variantIndex}.imageUrl`,
      "",
      {
        shouldDirty: true,
        shouldValidate: false,
      },
    );

    setPreviewError(false);
  };

  /**
   * -----------------------------------------------
   * REPLACE IMAGE
   * -----------------------------------------------
   *
   * 1. Upload new image FIRST.
   * 2. New image becomes temporary.
   * 3. If previous image was temporary:
   *      delete previous temporary asset.
   * 4. If previous image was permanent:
   *      do NOT delete it.
   * 5. Replace RHF image.
   */
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

      const previousImage =
        currentImage;

      try {
        /**
         * Upload new image before touching old one.
         */
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

        const newVariantImage =
          mapUploadedImageToVariantImage(
            uploadedImage,
          );

        /**
         * If previous image was TEMPORARY,
         * clean it now.
         *
         * If deletion fails, we still keep the newly
         * uploaded image. The stale temp asset can be
         * handled by your temp cleanup policy later.
         */
        if (
          previousImage?.publicId &&
          previousImage.publicId !==
            newVariantImage.publicId &&
          isTemporaryProductImage(
            previousImage,
          )
        ) {
          try {
            await deleteTempMutation.mutateAsync(
              {
                publicIds: [
                  previousImage.publicId,
                ],
              },
            );
          } catch (cleanupError) {
            console.error(
              "Previous temporary variant image cleanup failed:",
              cleanupError,
            );

            toast(
              "New image uploaded, but previous temporary image cleanup failed",
              {
                icon: "⚠️",
              },
            );
          }
        }

        /**
         * If previousImage is PERMANENT:
         *
         * nothing gets deleted here.
         *
         * Backend will detect:
         *
         * old permanent publicId
         * vs
         * new temporary publicId
         *
         * during final Update Product.
         */

        setValue(
          `variants.${variantIndex}.image`,
          newVariantImage,
          {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
          },
        );

        setValue(
          `variants.${variantIndex}.imageUrl`,
          newVariantImage.url,
          {
            shouldDirty: true,
            shouldValidate: false,
          },
        );

        setPreviewError(false);

        toast.success(
          previousImage?.publicId
            ? "Variant image replaced"
            : "Variant image uploaded",
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

  /**
   * -----------------------------------------------
   * REMOVE IMAGE
   * -----------------------------------------------
   */
  const handleRemoveImage =
    async () => {
      if (
        !currentImage?.publicId
      ) {
        clearVariantImage();
        return;
      }

      /**
       * TEMP IMAGE
       *
       * Delete immediately from Cloudinary.
       */
      if (
        isTemporaryProductImage(
          currentImage,
        )
      ) {
        try {
          await deleteTempMutation.mutateAsync(
            {
              publicIds: [
                currentImage.publicId,
              ],
            },
          );

          clearVariantImage();

          toast.success(
            "Variant image removed",
          );
        } catch (error) {
          console.error(
            "Temporary variant image delete failed:",
            error,
          );

          /**
           * Don't clear RHF when delete failed.
           *
           * This lets the user retry and prevents us
           * from losing the temp publicId reference.
           */
          toast.error(
            error?.response?.data?.message ||
              "Failed to remove temporary image",
          );
        }

        return;
      }

      /**
       * PERMANENT IMAGE
       *
       * Do NOT call Cloudinary delete API here.
       *
       * Remove only from form.
       *
       * Backend will detect the missing publicId and
       * delete it only after DB update succeeds.
       */
      clearVariantImage();

      toast(
        "Image removed from variant. It will be permanently deleted after product update.",
        {
          icon: "ℹ️",
        },
      );
    };

  return (
    <div className="flex items-center gap-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        disabled={
          disabled ||
          isBusy
        }
        onChange={
          handleFileChange
        }
      />

      {imageUrl &&
      !previewError ? (
        <div className="group relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
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

          {isBusy && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <Loader2 className="h-4 w-4 animate-spin text-white" />
            </div>
          )}

          {!isBusy && (
            <div className="absolute inset-0 hidden items-center justify-center gap-1 bg-black/50 group-hover:flex">
              <button
                type="button"
                onClick={
                  handleOpenFilePicker
                }
                className="rounded-full bg-white/90 p-1.5 text-slate-700 hover:bg-white"
                title="Replace image"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>

              <button
                type="button"
                onClick={
                  handleRemoveImage
                }
                className="rounded-full bg-white/90 p-1.5 text-error hover:bg-white"
                title="Remove image"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={
            handleOpenFilePicker
          }
          disabled={
            disabled ||
            isBusy
          }
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-dashed border-primary/50 bg-primary/5 text-primary transition hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-50"
          title="Add variant image"
        >
          {isBusy ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ImagePlus className="h-4 w-4" />
          )}
        </button>
      )}
    </div>
  );
};

export default VariantImageUploader;