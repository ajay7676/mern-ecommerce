
import { ChevronDown } from "lucide-react";
import { useWatch } from "react-hook-form";

import {
  TextInputField,
  TextAreaField,
} from "./FormField";

const SeoInformationCard = ({
  register,
  control,
  errors,
}) => {
  const metaTitle = useWatch({
    control,
    name: "metaTitle",
  });

  const metaDescription = useWatch({
    control,
    name: "metaDescription",
  });

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-950">
            SEO Information (Optional)
          </h3>

          <p className="mt-1 text-sm font-medium text-slate-500">
            Improve your product's visibility on search engines.
          </p>
        </div>

        <ChevronDown className="h-5 w-5 text-slate-500" />
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <TextInputField
          label="Meta Title"
          placeholder="Enter meta title"
          rightText={`${metaTitle?.length || 0}/60`}
          error={errors.metaTitle?.message}
          {...register("metaTitle")}
        />

        <TextAreaField
          label="Meta Description"
          placeholder="Enter meta description"
          rows={2}
          rightText={`${metaDescription?.length || 0}/160`}
          error={errors.metaDescription?.message}
          {...register("metaDescription")}
        />

        <div className="md:col-span-2">
          <TextInputField
            label="Meta Keywords"
            placeholder="Enter keywords and press enter..."
            error={errors.metaKeywords?.message}
            {...register("metaKeywords")}
          />
        </div>
      </div>
    </div>
  );
};

export default SeoInformationCard;