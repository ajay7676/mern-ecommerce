import {
  Box,
  CheckSquare,
  Grid2X2,
  Hash,
  Save,
  Type,
  X,
} from "lucide-react";

import { useEffect } from "react";
import {
  Controller,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AttributePreview from "../add/AttributePreview";
import AttributeTypeFields from "../add/AttributeTypeFields";
import ToggleField from "../add/ToggleField";
import { useUpdateAttribute } from "../../../../../../hooks/admin/mutations/attributes/useUpdateAttribute";
import { getDefaultValuesByType } from "../../../../../../utils/admin/products/attribute/getAttributeDefaultValues";
import {attributeFormSchema} from '../../../../../../validation/admin/attribute/attribute.schema';
import {getAttributeFormValues} from '../../../../../../utils/admin/products/attribute/getAttributeFormValues'
import {buildAttributePayload} from '../../../../../../utils/admin/products/attribute/buildAttributePayload'
import {generateSlug} from '../../../../../../utils/generateSlug' 
import { useAttribute } from "../../../../../../hooks/admin/queries/products/attributes/useAttribute";

const attributeTypes = [
  {
    label: "Dropdown",
    value: "dropdown",
    icon: Grid2X2,
  },
  {
    label: "Switch",
    value: "switch",
    icon: Box,
  },
  {
    label: "Text",
    value: "text",
    icon: Type,
  },
  {
    label: "Number",
    value: "number",
    icon: Hash,
  },
  {
    label: "Boolean",
    value: "boolean",
    icon: CheckSquare,
  },
];

const EditAttributeModal = ({
  isOpen,
  attributeId,
  onClose,
}) => {

  const {
    data: attribute,
    isLoading,
    isError,
    error,
    refetch,
  } = useAttribute(attributeId);
  const updateAttributeMutation = useUpdateAttribute(attributeId);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    reset,
    formState: {
      errors,
      isDirty,
    },
  } = useForm({
    resolver: zodResolver(attributeFormSchema),
    defaultValues: {
      name: "",
      slug: "",
      type: "dropdown",
      values: [],
      placeholder: "",
      defaultValue: "",
      minValue: "",
      maxValue: "",
      step: "",
      unit: "",
      maxLength: "",
      trueLabel: "Yes",
      falseLabel: "No",
      isRequired: false,
      showInFilter: true,
      showOnProductPage: true,
      status: "active",
      sortOrder: 0,
    },
    mode: "onSubmit",
  });

  useEffect(() => {
  if (!isOpen) {
    return;
  }

  const originalOverflow = document.body.style.overflow;
  const originalPaddingRight = document.body.style.paddingRight;

  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;

  document.body.style.overflow = "hidden";

  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }

  return () => {
    document.body.style.overflow = originalOverflow;
    document.body.style.paddingRight = originalPaddingRight;
  };
}, [isOpen]);

  const {
    fields,
    append,
    remove,
    replace,
  } = useFieldArray({
    control,
    name: "values",
  });


  const formValues = useWatch({
    control,
  });

  const attributeType = useWatch({
    control,
    name: "type",
  });

  useEffect(() => {
    if (!isOpen || !attribute) {
      return;
    }

    const formData = getAttributeFormValues(attribute);

    reset(formData);

    replace(formData.values || []);
  }, [isOpen, attribute, reset, replace]);

  if (!isOpen) {
    return null;
  }

  const selectedType = attributeTypes.find(
    (item) => item.value === attributeType
  );

  const SelectedIcon = selectedType?.icon || Grid2X2;

  const isTypeLocked =
    Number(attribute?.productCount || 0) > 0;

  const handleTypeChange = (event) => {
    const nextType = event.target.value;

    const nextValues = getDefaultValuesByType(nextType);

    reset({
      ...nextValues,
      name: formValues.name,
      slug: formValues.slug,
      status: formValues.status,
      sortOrder: formValues.sortOrder,
      isRequired: formValues.isRequired,
      showInFilter: formValues.showInFilter,
      showOnProductPage: formValues.showOnProductPage,
    });

    replace(nextValues.values || []);
  };

  const handleNameChange = (event) => {
    const name = event.target.value;

    setValue("name", name, {
      shouldDirty: true,
      shouldValidate: true,
    });

    setValue("slug",generateSlug(name), {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const handleCancel = () => {
    if (attribute) {
      const formData = getAttributeFormValues(attribute);
      reset(formData);
      replace(formData.values || []);
    }

    onClose();
  };

  const onSubmit = async (values) => {
    try {
      const payload = buildAttributePayload(values);

      await updateAttributeMutation.mutateAsync({
        attributeId,
        payload,
      });

      onClose();
    } catch (error) {
      const apiErrors =
        error?.response?.data?.errors;

      if (apiErrors) {
        Object.entries(apiErrors).forEach(
          ([field, message]) => {
            setError(field, {
              type: "server",
              message,
            });
          }
        );
      }
    }
  };

  return (
   <div className="fixed inset-0 z-50 bg-black/40">
  <div
    className="
      fixed
      right-0
      top-0
      h-screen
      w-full
      bg-base-100
      shadow-2xl

      sm:w-[92%]
      md:w-[85%]
      lg:w-[70%]

      flex
      flex-col
      overflow-hidden
    "
  >
        <div className="flex items-start justify-between border-b border-slate-200 px-5 py-4 sm:px-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              Edit Attribute
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Update product attribute details and storefront behavior.
            </p>
          </div>

          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-ghost btn-sm btn-circle"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {isLoading && (
          <div className="space-y-4 p-8">
            <div className="h-6 w-64 animate-pulse rounded bg-slate-200" />
            <div className="h-12 w-full animate-pulse rounded bg-slate-200" />
            <div className="h-12 w-full animate-pulse rounded bg-slate-200" />
            <div className="h-48 w-full animate-pulse rounded bg-slate-200" />
          </div>
        )}

        {isError && (
          <div className="p-8 text-center">
            <h3 className="text-lg font-bold text-error">
              Failed to load attribute
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              {error?.response?.data?.message ||
                "Something went wrong while loading attribute."}
            </p>

            <button
              type="button"
              onClick={refetch}
              className="btn btn-error btn-sm mt-4"
            >
              Try Again
            </button>
          </div>
        )}

        {!isLoading && !isError && attribute && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex min-h-0 flex-1 flex-col"
          >
            <div className="overflow-y-auto px-5 py-6 sm:px-8">
              <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                  <section>
                    <div className="mb-5 flex items-start gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                        1
                      </span>

                      <div>
                        <h3 className="text-lg font-bold text-slate-900">
                          Basic Information
                        </h3>

                        <p className="text-sm text-slate-500">
                          Update the basic details for this attribute.
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <label className="label font-semibold">
                          Attribute Name
                          <span className="text-error">*</span>
                        </label>

                        <input
                          type="text"
                          value={formValues.name || ""}
                          onChange={handleNameChange}
                          placeholder="e.g. Size"
                          className="input input-bordered w-full bg-white"
                        />

                        {errors.name && (
                          <p className="mt-1 text-xs text-error">
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="label font-semibold">
                          Attribute Slug
                          <span className="text-error">*</span>
                        </label>

                        <input
                          type="text"
                          {...register("slug")}
                          placeholder="e.g. size"
                          className="input input-bordered w-full bg-white"
                        />

                        {errors.slug && (
                          <p className="mt-1 text-xs text-error">
                            {errors.slug.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="label font-semibold">
                          Attribute Type
                          <span className="text-error">*</span>
                        </label>

                        <div className="relative">
                          <SelectedIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary" />

                          <select
                            value={attributeType}
                            onChange={handleTypeChange}
                            disabled={isTypeLocked}
                            className="select select-bordered w-full bg-white pl-12 font-semibold disabled:bg-slate-100"
                          >
                            {attributeTypes.map((item) => (
                              <option
                                key={item.value}
                                value={item.value}
                              >
                                {item.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        {isTypeLocked && (
                          <p className="mt-1 text-xs text-warning">
                            Type cannot be changed because this attribute is used by products.
                          </p>
                        )}

                        {errors.type && (
                          <p className="mt-1 text-xs text-error">
                            {errors.type.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="label font-semibold">
                          Status
                        </label>

                        <select
                          {...register("status")}
                          className="select select-bordered w-full bg-white"
                        >
                          <option value="active">
                            Active
                          </option>

                          <option value="inactive">
                            Inactive
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="label font-semibold">
                          Sort Order
                        </label>

                        <input
                          type="number"
                          {...register("sortOrder")}
                          className="input input-bordered w-full bg-white"
                        />
                      </div>
                    </div>
                  </section>

                  <AttributeTypeFields
                    type={attributeType}
                    fields={fields}
                    append={append}
                    remove={remove}
                    register={register}
                    errors={errors}
                  />

                  <section className="mt-7 border-t border-slate-200 pt-6">
                    <div className="mb-5 flex items-start gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                        3
                      </span>

                      <div>
                        <h3 className="text-lg font-bold text-slate-900">
                          Additional Settings
                        </h3>

                        <p className="text-sm text-slate-500">
                          Configure how this attribute behaves in your store.
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-3">
                      <Controller
                        name="isRequired"
                        control={control}
                        render={({ field }) => (
                          <ToggleField
                            label="Required"
                            description="Make this attribute mandatory."
                            checked={field.value}
                            onChange={field.onChange}
                          />
                        )}
                      />

                      <Controller
                        name="showInFilter"
                        control={control}
                        render={({ field }) => (
                          <ToggleField
                            label="Show in Filter"
                            description="Display in storefront filters."
                            checked={field.value}
                            onChange={field.onChange}
                          />
                        )}
                      />

                      <Controller
                        name="showOnProductPage"
                        control={control}
                        render={({ field }) => (
                          <ToggleField
                            label="Show on Product Page"
                            description="Display on product detail page."
                            checked={field.value}
                            onChange={field.onChange}
                          />
                        )}
                      />
                    </div>
                  </section>
                </div>

                <div className="space-y-5">
                  <AttributePreview form={formValues} />

                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900">
                      Attribute Info
                    </h3>

                    <div className="mt-4 space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-500">
                          Products using
                        </span>

                        <span className="font-semibold text-slate-900">
                          {attribute.productCount || 0}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-slate-500">
                          Current status
                        </span>

                        <span
                          className={`rounded-lg px-2 py-1 text-xs font-semibold ${
                            attribute.status === "active"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-rose-100 text-rose-700"
                          }`}
                        >
                          {attribute.status === "active"
                            ? "Active"
                            : "Inactive"}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-slate-500">
                          Created
                        </span>

                        <span className="font-semibold text-slate-900">
                          {attribute.createdAt
                            ? new Date(attribute.createdAt).toLocaleDateString()
                            : "—"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-200 px-5 py-4 sm:px-8">
              <button
                type="button"
                onClick={handleCancel}
                disabled={updateAttributeMutation.isPending}
                className="btn btn-outline"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={
                  updateAttributeMutation.isPending ||
                  !isDirty
                }
                className="btn btn-primary"
              >
                {updateAttributeMutation.isPending ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Update Attribute
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditAttributeModal;