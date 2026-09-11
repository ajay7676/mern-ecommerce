import { Box, CheckSquare, Grid2X2, Hash, Save, Type, X } from "lucide-react";

import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AttributePreview from "./AttributePreview";
import AttributeTypeFields from "./AttributeTypeFields";
import ToggleField from "./ToggleField";
import { useCreateAttribute } from "../../.././../../../hooks/admin/mutations/attributes/useCreateAttribute";
import { attributeFormSchema } from "../../../../../../validation/admin/attribute/attribute.schema";
import {
  getAttributeDefaultValues,
  getDefaultValuesByType,
} from "../../../../../../utils/admin/products/attribute/getAttributeDefaultValues";
import { buildAttributePayload } from "../../../../../../utils/admin/products/attribute/buildAttributePayload";
import { generateSlug } from "../../../../../../utils/generateSlug";
import { useEffect } from "react";

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
const AttributeFormModal = ({ isOpen, onClose }) => {
  const createAttributeMutation = useCreateAttribute();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(attributeFormSchema),
    defaultValues: getAttributeDefaultValues(),
    mode: "onSubmit",
  });
  const { fields, append, remove, replace } = useFieldArray({
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
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Prevent background scrolling
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);
  if (!isOpen) return null;
  const selectedType = attributeTypes.find(
    (item) => item.value === attributeType,
  );

  const SelectedIcon = selectedType?.icon || Grid2X2;

  const handleTypeChange = (event) => {
    const nextType = event.target.value;
    const nextValues = getDefaultValuesByType(nextType);

    reset(nextValues);
    replace(nextValues.values);
  };

  const handleNameChange = (event) => {
    const name = event.target.value;

    setValue("name", name, {
      shouldDirty: true,
      shouldValidate: true,
    });

    setValue("slug", generateSlug(name), {
      shouldDirty: true,
      shouldValidate: true,
    });
  };
  const handleCancel = () => {
    reset(getAttributeDefaultValues());
    onClose();
  };

  const onSubmit = async (values) => {
    try {
      const payload = buildAttributePayload(values);

      await createAttributeMutation.mutateAsync(payload);

      reset(getAttributeDefaultValues());
      onClose();
    } catch (error) {
      const apiErrors = error?.response?.data?.errors;

      if (apiErrors) {
        Object.entries(apiErrors).forEach(([field, message]) => {
          setError(field, {
            type: "server",
            message,
          });
        });
      }
    }
  };

  return (
    <>
      <div
        className={`
        fixed
        inset-0
        z-50
        ${isOpen ? "pointer-events-auto" : "pointer-events-none"}
      `}
        aria-hidden={!isOpen}
      >
        {/* Overlay */}

        <button
          type="button"
          aria-label="Close add attribute drawer"
          onClick={onClose}
          className={`
          absolute inset-0 bg-slate-950/35 backdrop-blur-[1px] transition-opacity duration-300
          ${isOpen ? "opacity-100" : "opacity-0"}
        `}
        />

        {/* Drawer */}

        <aside
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-attribute-title"
          className={`absolute right-0 top-0 flex h-dvh w-full flex-col
             bg-white shadow-[-12px_0_40px_rgba(15,23,42,0.12)] 
            transition-transform duration-300 ease-out max-w-7xl
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
        >
          <div className="flex h-full min-h-0 flex-col">
            {" "}
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-200 px-5 py-4 sm:px-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-950">
                  Add New Attribute
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Create product attribute based on selected type.
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
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex min-h-0 flex-1 flex-col"
            >
              {/* Body */}
              <div className="overflow-y-auto px-5 py-6 sm:px-8">
                <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
                  {/* Left Form */}
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
                            Enter the basic details for this attribute.
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

                          <p className="mt-1 text-xs text-slate-500">
                            This name will be visible in your store.
                          </p>
                        </div>

                        <div>
                          <label className="label font-semibold">
                            Attribute Slug (URL)
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

                          <p className="mt-1 text-xs text-slate-500">
                            Unique slug for the URL.
                          </p>
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
                              className="select select-bordered w-full bg-white pl-12 "
                            >
                              {attributeTypes.map((item) => (
                                <option key={item.value} value={item.value}>
                                  {item.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          {errors.type && (
                            <p className="mt-1 text-xs text-error">
                              {errors.type.message}
                            </p>
                          )}

                          <p className="mt-1 text-xs text-slate-500">
                            Choose how customers will select this attribute.
                          </p>
                        </div>
                        <div>
                          <label className="label font-semibold">
                            Status
                            <span className="text-error">*</span>
                          </label>

                          <select
                            {...register("status")}
                            className="select select-bordered w-full bg-white"
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>

                          {errors.status && (
                            <p className="mt-1 text-xs text-error">
                              {errors.status.message}
                            </p>
                          )}

                          <p className="mt-1 text-xs text-slate-500">
                            Inactive attributes will not be shown in product
                            forms.
                          </p>
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

                    {/* Additional Settings */}
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

                  {/* Right Side */}
                  <div className="space-y-5">
                    <AttributePreview form={formValues} />

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                      <h3 className="text-lg font-bold text-slate-900">
                        Attribute Type Guide
                      </h3>

                      <div className="mt-4 space-y-3">
                        {attributeTypes.map((item) => {
                          const Icon = item.icon;

                          return (
                            <div
                              key={item.value}
                              className={`flex gap-3 rounded-xl p-3 ${
                                item.value === attributeType
                                  ? "bg-primary/10"
                                  : "bg-white"
                              }`}
                            >
                              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <Icon className="h-5 w-5" />
                              </div>

                              <div>
                                <p className="font-bold text-slate-900">
                                  {item.label}
                                </p>

                                <p className="text-sm text-slate-500">
                                  {item.value === "dropdown" &&
                                    "Best for predefined options like Size."}

                                  {item.value === "switch" &&
                                    "Best for color or visual selections."}

                                  {item.value === "text" &&
                                    "Best for custom text input."}

                                  {item.value === "number" &&
                                    "Best for numeric values."}

                                  {item.value === "boolean" &&
                                    "Best for true/false values."}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 border-t border-slate-200 px-5 py-4 sm:px-8">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={createAttributeMutation.isPending}
                  className="btn btn-outline"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={createAttributeMutation.isPending || !isDirty}
                  className="btn btn-primary"
                >
                  {createAttributeMutation.isPending ? (
                    <>
                      <span className="loading loading-spinner loading-sm" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Save Attribute
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </aside>
      </div>
    </>
  );
};

export default AttributeFormModal;
