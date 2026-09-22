// src/features/admin/products/add-product/components/ProductImagesMediaStep.jsx

import { useState } from "react";
import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { ImageIcon } from "lucide-react";
import { toast } from "react-hot-toast";

import ImageUploadDropzone from "../form/ImageUploadDropzone";
import ProductImagesGrid from "../form/ProductImagesGrid";

import { useUploadProductImages } from "../../../../../hooks/admin/mutations/products/useUploadProductImages";
import { useDeleteTemporaryProductImages } from "../../../../../hooks/admin/mutations/products/useDeleteTemporaryProductImages";

import {
  ensureOnePrimaryImage,
  mapUploadedImageToFormImage,
  normalizeImageSortOrder,
  validateProductImageFiles,
} from "../../../../../utils/admin/products/product/productImageUtils";
import {
  MAX_PRODUCT_IMAGE_SIZE,
  MAX_PRODUCT_IMAGES,
} from "../../../../../constants/admin/products/product.constants";

const ProductImagesMediaStep = () => {
  const {
    control,
    getValues,
    setValue,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const [deletingPublicId, setDeletingPublicId] = useState(null);

  const uploadProductImages = useUploadProductImages();
  const deleteTemporaryProductImages = useDeleteTemporaryProductImages();

  const { fields, append, replace } = useFieldArray({
    control,
    name: "images",
  });

  const images =
    useWatch({
      control,
      name: "images",
    }) || [];

  const isUploading = uploadProductImages.isPending;
  const remainingSlots = Math.max(MAX_PRODUCT_IMAGE_SIZE - images.length, 0);

  const handleFilesSelected = async (selectedFiles) => {
    const currentImages = getValues("images") || [];

    const validation = validateProductImageFiles({
      files: selectedFiles,
      currentImageCount: currentImages.length,
    });

    if (!validation.isValid) {
      toast.error(validation.message);
      return;
    }

    try {
      const uploadedImages = await uploadProductImages.mutateAsync(
        validation.files,
      );

      const formImages = uploadedImages.map((image, index) =>
        mapUploadedImageToFormImage({
          image,
          index,
          currentImageCount: currentImages.length,
        }),
      );

      append(formImages, {
        shouldFocus: false,
      });

      clearErrors("images");

      toast.success("Product images uploaded successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Product image upload failed",
      );
    }
  };

  const shouldDeleteImageImmediately = (image) => {
    return image?.isTemporary === true || image?.assetState === "temporary";
  };

  const handleRemoveImage = async (index) => {
  const image = images[index];

  if (!image) return;

  try {
    if (shouldDeleteImageImmediately(image) && image.publicId) {
      await deleteTemporaryProductImages.mutateAsync({
        publicIds: [image.publicId],
      });
    }

    const nextImages = images.filter((_, imageIndex) => imageIndex !== index);

    const normalizedImages = nextImages.map((item, itemIndex) => ({
      ...item,
      sortOrder: itemIndex + 1,
      isPrimary:
        nextImages.some((nextImage) => nextImage.isPrimary)
          ? item.isPrimary
          : itemIndex === 0,
    }));

    replace(normalizedImages);
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Failed to remove image"
    );
  }
};

  const handleMakePrimary = (selectedIndex) => {
    const currentImages = getValues("images") || [];

    const updatedImages = currentImages.map((image, index) => ({
      ...image,
      isPrimary: index === selectedIndex,
      sortOrder: image.sortOrder || index + 1,
    }));

    setValue("images", updatedImages, {
      shouldDirty: true,
      shouldValidate: true,
    });

    clearErrors("images");
  };

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <h3 className="flex items-center gap-2 text-base font-bold text-slate-900">
                <ImageIcon className="h-5 w-5 text-primary" />
                Product Images
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Upload product images to Cloudinary before creating product.
              </p>
            </div>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              {images.length}/{MAX_PRODUCT_IMAGES}
            </span>
          </div>

          <ImageUploadDropzone
            onFilesSelected={handleFilesSelected}
            isUploading={isUploading}
            remainingSlots={remainingSlots}
          />

          {errors.images?.message && (
            <p className="mt-3 text-sm text-error">{errors.images.message}</p>
          )}

          <div className="mt-6">
            <ProductImagesGrid
              images={fields.map((field, index) => ({
                ...field,
                ...images[index],
              }))}
              onRemoveImage={handleRemoveImage}
              onMakePrimary={handleMakePrimary}
              deletingPublicId={deletingPublicId}
            />
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-base font-bold text-slate-900">Media Settings</h3>

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            <Controller
              name="imageAltText"
              control={control}
              render={({ field }) => (
                <div>
                  <label className="label">
                    <span className="label-text font-medium">
                      Default image alt text
                    </span>
                  </label>

                  <input
                    {...field}
                    value={field.value || ""}
                    type="text"
                    placeholder="Adidas cotton t-shirt"
                    className="input input-bordered w-full rounded-xl"
                  />

                  {errors.imageAltText?.message && (
                    <p className="mt-1 text-xs text-error">
                      {errors.imageAltText.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              name="displayOrder"
              control={control}
              render={({ field }) => (
                <div>
                  <label className="label">
                    <span className="label-text font-medium">
                      Display order
                    </span>
                  </label>

                  <select
                    {...field}
                    className="select select-bordered w-full rounded-xl"
                  >
                    <option value="custom">Custom</option>
                    <option value="newest">Newest first</option>
                    <option value="oldest">Oldest first</option>
                  </select>
                </div>
              )}
            />

            <Controller
              name="videoUrl"
              control={control}
              render={({ field }) => (
                <div>
                  <label className="label">
                    <span className="label-text font-medium">
                      Product video URL
                    </span>
                  </label>

                  <input
                    {...field}
                    value={field.value || ""}
                    type="url"
                    placeholder="https://youtube.com/..."
                    className="input input-bordered w-full rounded-xl"
                  />

                  {errors.videoUrl?.message && (
                    <p className="mt-1 text-xs text-error">
                      {errors.videoUrl.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              name="imageZoom"
              control={control}
              render={({ field }) => (
                <label className="mt-8 flex items-center gap-3 rounded-2xl border border-slate-200 p-4">
                  <input
                    type="checkbox"
                    checked={Boolean(field.value)}
                    onChange={(event) => field.onChange(event.target.checked)}
                    className="toggle toggle-primary"
                  />

                  <span>
                    <span className="block text-sm font-semibold text-slate-800">
                      Enable image zoom
                    </span>
                    <span className="block text-xs text-slate-500">
                      Customers can zoom product images.
                    </span>
                  </span>
                </label>
              )}
            />
          </div>
        </div>
      </div>

      <aside className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-base font-bold text-slate-900">
            Image Upload Rules
          </h3>

          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <p>Use clear product images with white or clean background.</p>
            <p>Upload at least one image before publishing.</p>
            <p>Exactly one image should be primary.</p>
            <p>Final payload should contain Cloudinary publicId and url.</p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-base font-bold text-slate-900">
            Primary Image Preview
          </h3>

          {images.length ? (
            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
              <img
                src={
                  images.find((image) => image.isPrimary)?.url || images[0]?.url
                }
                alt="Primary product"
                className="aspect-square w-full object-cover"
              />
            </div>
          ) : (
            <div className="mt-4 rounded-2xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
              No primary image selected.
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default ProductImagesMediaStep;
