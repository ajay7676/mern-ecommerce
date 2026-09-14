
import {
  useFieldArray,
  useFormContext,
} from "react-hook-form";

import ProductDetailsCard from "../form/ProductDetailsCard";
import CustomInformationCard from "../form/CustomInformationCard";
import AdditionalProductPreviewCard from "../form/AdditionalProductPreviewCard";
import CompletionStatusCard from "../form/CompletionStatusCard";
import AdditionalDetailsTipsCard from "../form/AdditionalDetailsTipsCard";

const ProductAdditionalDetailsStep = () => {
  const {
    register,
    control,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const {
    fields: customFieldItems,
    append: appendCustomField,
    remove: removeCustomField,
  } = useFieldArray({
    control,
    name: "customFields",
  });

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <ProductDetailsCard
          register={register}
          control={control}
          setValue={setValue}
          setError={setError}
          clearErrors={clearErrors}
          errors={errors}
        />

        <CustomInformationCard
          fields={customFieldItems}
          register={register}
          append={appendCustomField}
          remove={removeCustomField}
          errors={errors}
        />
      </div>

      <aside className="space-y-6 xl:sticky xl:top-4 xl:self-start">
        <AdditionalProductPreviewCard control={control} />

        <CompletionStatusCard />

        <AdditionalDetailsTipsCard />
      </aside>
    </div>
  );
};

export default ProductAdditionalDetailsStep;