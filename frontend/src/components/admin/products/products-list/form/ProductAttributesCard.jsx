// components/ProductAttributesCard.jsx

import { useState } from "react";
import { Edit3, GripVertical, Plus, Trash2, X } from "lucide-react";

import ExistingAttributesModal from "./ExistingAttributesModal";


import {
  ATTRIBUTE_TYPE_OPTIONS,
  createAttributeOption,
  createCustomAttribute,
} from '../../../../../utils/admin/products/product/productVariationUtils';

const ProductAttributesCard = ({
  fields,
  watchedAttributes,
  register,
  setValue,
  append,
  remove,
  errors,
}) => {
  const [isExistingModalOpen, setIsExistingModalOpen] = useState(false);

  const handleAddExistingAttributes = (selectedAttributes) => {
    selectedAttributes.forEach((attribute) => {
      append(attribute);
    });
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-950">
            Select Attributes for This Product
          </h3>

          <p className="mt-1 text-sm font-medium text-slate-500">
            Choose attributes from your existing attribute library or add custom attributes.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => setIsExistingModalOpen(true)}
            className="btn btn-outline btn-primary h-11 min-h-11 rounded-xl"
          >
            <Plus className="h-4 w-4" />
            Add from Existing Attributes
          </button>

          <button
            type="button"
            onClick={() => append(createCustomAttribute())}
            className="btn btn-outline btn-primary h-11 min-h-11 rounded-xl"
          >
            <Plus className="h-4 w-4" />
            Add Custom Attribute
          </button>
        </div>
      </div>

      {errors.attributes?.message && (
        <p className="mt-3 text-xs font-medium text-error">
          {errors.attributes.message}
        </p>
      )}

      <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200">
        <table className="table w-full min-w-230">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-xs text-slate-500">
              <th className="w-10" />
              <th className="min-w-47.5">Attribute</th>
              <th className="min-w-40">Type</th>
              <th className="min-w-105">Selected Options</th>
              <th className="w-28 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {fields.map((field, index) => {
              const attribute = watchedAttributes?.[index] || {};
              const optionError = errors.attributes?.[index]?.options?.message;

              return (
                <tr key={field.id} className="border-b border-slate-100">
                  <td>
                    <GripVertical className="h-4 w-4 text-slate-400" />
                  </td>

                  <td>
                    <input
                      type="text"
                      placeholder="Size"
                      disabled={attribute.source === "existing"}
                      className="input input-bordered h-10 min-h-10 w-full rounded-xl border-slate-200 bg-white text-sm disabled:bg-slate-50 disabled:text-slate-700"
                      {...register(`attributes.${index}.name`)}
                    />

                    {errors.attributes?.[index]?.name?.message && (
                      <p className="mt-1 text-xs font-medium text-error">
                        {errors.attributes[index].name.message}
                      </p>
                    )}
                  </td>

                  <td>
                    <select
                      disabled={attribute.source === "existing"}
                      className="select select-bordered h-10 min-h-10 w-full rounded-xl border-slate-200 bg-white text-sm disabled:bg-slate-50 disabled:text-slate-700"
                      {...register(`attributes.${index}.type`)}
                    >
                      {ATTRIBUTE_TYPE_OPTIONS.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td>
                    <AttributeOptionsEditor
                      type={attribute.type}
                      options={attribute.options || []}
                      onChange={(nextOptions) =>
                        setValue(`attributes.${index}.options`, nextOptions, {
                          shouldDirty: true,
                          shouldValidate: true,
                        })
                      }
                    />

                    {optionError && (
                      <p className="mt-1 text-xs font-medium text-error">
                        {optionError}
                      </p>
                    )}
                  </td>

                  <td>
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        className="btn btn-ghost btn-sm btn-circle"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="btn btn-ghost btn-sm btn-circle text-error"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {!fields.length && (
              <tr>
                <td colSpan={5}>
                  <div className="py-10 text-center">
                    <p className="text-sm font-bold text-slate-700">
                      No attributes selected
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Add existing attributes like Size, Color or Material.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ExistingAttributesModal
        isOpen={isExistingModalOpen}
        selectedAttributes={watchedAttributes}
        onAddAttributes={handleAddExistingAttributes}
        onClose={() => setIsExistingModalOpen(false)}
      />
    </section>
  );
};

const AttributeOptionsEditor = ({ type, options, onChange }) => {
  const [draft, setDraft] = useState("");

  const handleAddOption = () => {
    const value = draft.trim();

    if (!value) return;

    const isDuplicate = options.some(
      (option) => option.label.toLowerCase() === value.toLowerCase()
    );

    if (isDuplicate) {
      setDraft("");
      return;
    }

    onChange([...options, createAttributeOption(value, type)]);
    setDraft("");
  };

  const handleRemoveOption = (optionIndex) => {
    onChange(options.filter((_, index) => index !== optionIndex));
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {options.map((option, optionIndex) => (
        <span
          key={option.optionId || option.value}
          className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700"
        >
          {type === "color" && (
            <span
              className="h-3 w-3 rounded-full border border-slate-300"
              style={{ backgroundColor: option.colorCode || "#111827" }}
            />
          )}

          {option.label}

          <button
            type="button"
            onClick={() => handleRemoveOption(optionIndex)}
            className="text-slate-400 hover:text-error"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </span>
      ))}

      <div className="flex items-center gap-2">
        <input
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              handleAddOption();
            }
          }}
          placeholder="+ option"
          className="input input-bordered h-9 min-h-9 w-28 rounded-lg border-slate-200 bg-white text-xs"
        />

        <button
          type="button"
          onClick={handleAddOption}
          className="btn btn-outline btn-primary btn-sm rounded-lg"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default ProductAttributesCard;