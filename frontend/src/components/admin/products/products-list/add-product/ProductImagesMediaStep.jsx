import { useFieldArray, useFormContext } from "react-hook-form";

import ImageUploadDropzone from "../form/ImageUploadDropzone";
import ProductImagesGrid from "../form/ProductImagesGrid";
import MediaSettingsCard from "../form/MediaSettingsCard";
import MediaPreviewCard from "../form/MediaPreviewCard";
import ImageGuidelinesCard from "../form/ImageGuidelinesCard";

const ProductImagesMediaStep = () => {
  const {
    control,
    register,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "images",
  });

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <h3 className="text-lg font-bold text-slate-950">Product Images</h3>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Upload high-quality images for your product gallery.
            </p>
          </div>
          <div class="grid grid-cols-3 gap-4">
            <div class="mt-6">
              <ImageUploadDropzone
                images={fields}
                append={append}
                setError={setError}
                clearErrors={clearErrors}
              />

              {errors.images?.message && (
                <p className="mt-2 text-xs font-medium text-error">
                  {errors.images.message}
                </p>
              )}
            </div>
            <div className="col-span-2">
            <ProductImagesGrid
              images={fields}
              remove={remove}
              update={update}
            />
          </div>
          </div>
        </section>

        <MediaSettingsCard
          register={register}
          control={control}
          errors={errors}
        />
      </div>

      <aside className="space-y-6">
        <MediaPreviewCard control={control} />

        <ImageGuidelinesCard />
      </aside>
    </div>
  );
};

export default ProductImagesMediaStep;
