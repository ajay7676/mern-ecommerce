import { useEffect } from "react";
import { useForm ,useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AttributeBasicInformation from "./AttributeBasicInformation";
import AttributeValuesSection from "./AttributeValuesSection";
import AttributeVisibilitySection from "./AttributeVisibilitySection";
import AttributePreview from "./AttributePreview";
import { attributeSchema } from "../../../../../../validation/admin/attribute/attribute.schema";
import { defaultAttributeFormValues } from "../../../../../../utils/admin/products/attribute/attributeForm.helpers";

const AttributeForm = ({ initialValues, onSubmit, updateField }) => {
  const {
    control,
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: zodResolver(attributeSchema),

    defaultValues: initialValues || defaultAttributeFormValues(),

    mode: "onBlur",

    reValidateMode: "onChange",
  });

  const attributeType = useWatch({
  control,
  name: "type",
});  

  /**
   * Reset form when editing existing attribute
   */
  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues, reset]);

  /**
   * Change values when attribute type changes
   */
  useEffect(() => {
    if (attributeType === "switch") {
      setValue("values", [
        {
          label: "On",
          value: "on",
          isDefault: true,
          sortOrder: 0,
        },
        {
          label: "Off",
          value: "off",
          isDefault: false,
          sortOrder: 1,
        },
      ]);
    }

    if (attributeType === "boolean") {
      setValue("values", [
        {
          label: "Yes",
          value: "true",
          isDefault: true,
          sortOrder: 0,
        },
        {
          label: "No",
          value: "false",
          isDefault: false,
          sortOrder: 1,
        },
      ]);
    }

    if (attributeType === "text" || attributeType === "number") {
      setValue("values", []);
      setValue("defaultValue", "");
    }
  }, [attributeType, setValue]);

  return (
    <div className="grid gap-5 
    xl:grid-cols-[minmax(0,1fr)_350px]"
    
    >
      {/* LEFT */}
      <div className="space-y-5">
        <AttributeBasicInformation
          register={register}
          errors={errors}
          attributeType={attributeType}
          setValue={setValue}
        />

        {/* <AttributeBasicInformation
                  values={initialValues}
                  errors={errors}
                  onChange={updateField}
                /> */}

        {/* <AttributeValuesSection
                  values={initialValues.values}
                  displayType={initialValues.displayType}
                  sortValues={initialValues.sortValues}
                  defaultValue={initialValues.defaultValue}
                  onValuesChange={(values) =>
                    updateField("values", values)
                  }
                  onDisplayTypeChange={(value) =>
                    updateField("displayType", value)
                  }
                  onSortValuesChange={(value) =>
                    updateField("sortValues", value)
                  }
                  onDefaultValueChange={(value) =>
                    updateField("defaultValue", value)
                  }
                />

                <AttributeVisibilitySection
                  values={initialValues}
                  onChange={updateField}
                /> */}
      </div>

      {/* RIGHT */}
      <div className="xl:sticky xl:top-0 xl:self-start">
        {/* <AttributePreview values={initialValues} /> */}
      </div>
    </div>
  );
};

export default AttributeForm;
