// components/ProductReviewPublishStep.jsx

import {
  useFormContext,
  useWatch,
} from "react-hook-form";

import ReviewProductDetailsCard from "../form/ReviewProductDetailsCard";
import ReviewProductPreviewCard from "../form/ReviewProductPreviewCard";
import PublishOptionsCard from "../form/PublishOptionsCard";
import ReviewVisibilityCard from "../form/ReviewVisibilityCard";
import PrePublishChecklistCard from "../form/PrePublishChecklistCard";

const ProductReviewPublishStep = ({ onEditStep }) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const values = useWatch({
    control,
  });

  const publishOption = useWatch({
    control,
    name: "publishOption",
  });


  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_370px]">
      <ReviewProductDetailsCard
        values={values}
        onEditStep={onEditStep}
      />

      <aside className="space-y-6 xl:sticky xl:top-4 xl:self-start">
        <ReviewProductPreviewCard values={values} />

        <PublishOptionsCard
          control={control}
          register={register}
          errors={errors}
          publishOption={publishOption}
        />

        <ReviewVisibilityCard visibility={values.visibility} />

        <PrePublishChecklistCard values={values} />
      </aside>
    </div>
  );
};

export default ProductReviewPublishStep;