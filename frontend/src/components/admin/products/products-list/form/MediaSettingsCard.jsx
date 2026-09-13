
import { Controller } from "react-hook-form";

import {
  SelectField,
  TextAreaField,
  TextInputField,
} from "./FormField";

const MediaSettingsCard = ({
  register,
  control,
  errors,
}) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h3 className="text-lg font-bold text-slate-950">
          Media Settings
        </h3>

        <p className="mt-1 text-sm font-medium text-slate-500">
          Manage image SEO, display order and video media.
        </p>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <TextAreaField
          label="Image Alt Text"
          placeholder="Describe this product image for SEO and accessibility"
          helper="Good alt text helps SEO and screen readers."
          rows={3}
          error={errors.imageAltText?.message}
          {...register("imageAltText")}
        />

        <div className="space-y-6">
          <SelectField
            label="Display Order"
            error={errors.displayOrder?.message}
            {...register("displayOrder")}
          >
            <option value="custom">Custom Order</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </SelectField>

          <Controller
            name="imageZoom"
            control={control}
            render={({ field }) => (
              <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <span>
                  <span className="block text-sm font-bold text-slate-900">
                    Enable Image Zoom
                  </span>

                  <span className="block text-xs font-medium text-slate-500">
                    Customers can zoom product images.
                  </span>
                </span>

                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={field.value}
                  onChange={(event) =>
                    field.onChange(event.target.checked)
                  }
                />
              </label>
            )}
          />
        </div>

        <div className="md:col-span-2">
          <TextInputField
            label="Product Video URL"
            placeholder="https://youtube.com/watch?v=..."
            helper="Optional YouTube/Vimeo/product demo video URL."
            error={errors.videoUrl?.message}
            {...register("videoUrl")}
          />
        </div>
      </div>
    </section>
  );
};

export default MediaSettingsCard;