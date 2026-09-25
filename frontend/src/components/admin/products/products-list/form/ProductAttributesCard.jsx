import { useState } from "react";
import { Check, Edit2, Plus, X } from "lucide-react";
import { useFormContext } from "react-hook-form";
import toast from "react-hot-toast";

import ExistingAttributesModal from "./ExistingAttributesModal";

import {
  createProductAttributeSnapshot,
} from "../../../../../utils/admin/products/product/productAttributeOptionUtils";

const ProductAttributesCard = ({
  attributes,
  attributeFields,

  appendAttribute,
  removeAttribute,

  existingAttributes,

  onAddOption,
  onEditOption,
  onRemoveOption,

  isAttributesLoading,
  isAttributesError,
  refetchAttributes,
}) => {
  const [isExistingModalOpen, setIsExistingModalOpen] =
    useState(false);

  const [optionInputs, setOptionInputs] =
    useState({});

  const [optionColorInputs, setOptionColorInputs] =
    useState({});

  const [editingOption, setEditingOption] =
    useState(null);

  const [editOptionForm, setEditOptionForm] =
    useState({
      label: "",
      colorCode: "",
    });

  const {
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  /**
   * -----------------------------------------------------
   * ADD EXISTING ATTRIBUTE
   * -----------------------------------------------------
   *
   * Important:
   * Copy global attribute into product snapshot.
   *
   * Never append React Query/global attribute object
   * directly into editable form state.
   */

  const handleAddExistingAttributes = (
    selectedAttributes
  ) => {
    if (!selectedAttributes?.length) {
      return;
    }

    const existingIds = new Set(
      attributes
        .map(
          (attribute) =>
            attribute.attributeId
        )
        .filter(Boolean)
        .map(String)
    );

    const snapshots = selectedAttributes
      .map((attribute) =>
        createProductAttributeSnapshot(
          attribute
        )
      )
      .filter((attribute) => {
        if (!attribute.attributeId) {
          return true;
        }

        return !existingIds.has(
          String(attribute.attributeId)
        );
      });

    if (!snapshots.length) {
      toast(
        "Selected attributes are already added",
        {
          icon: "ℹ️",
        }
      );

      return;
    }

    /**
     * RHF useFieldArray append supports array.
     */
    appendAttribute(snapshots);

    toast.success(
      `${snapshots.length} attribute${
        snapshots.length === 1 ? "" : "s"
      } added`
    );
  };

  /**
   * -----------------------------------------------------
   * CUSTOM OPTION INPUT
   * -----------------------------------------------------
   */

  const handleOptionInputChange = (
    attributeIndex,
    value
  ) => {
    setOptionInputs((previous) => ({
      ...previous,
      [attributeIndex]: value,
    }));
  };

  /**
   * -----------------------------------------------------
   * ADD PRODUCT-ONLY OPTION
   * -----------------------------------------------------
   */

  const handleAddCustomOption = (
    attributeIndex
  ) => {
    const attribute =
      attributes[attributeIndex];

    if (!attribute) {
      return;
    }

    const label =
      optionInputs[
        attributeIndex
      ]?.trim();

    if (!label) {
      setError(
        `attributes.${attributeIndex}.options`,
        {
          type: "manual",
          message:
            "Option label is required",
        }
      );

      toast.error(
        "Option label is required"
      );

      return;
    }

    const colorCode =
      attribute.type === "switch"
        ? optionColorInputs[
            attributeIndex
          ] || "#111827"
        : null;

    const success = onAddOption?.({
      attributeIndex,
      label,
      colorCode,
    });

    if (!success) {
      return;
    }

    setOptionInputs((previous) => ({
      ...previous,
      [attributeIndex]: "",
    }));

    setOptionColorInputs(
      (previous) => ({
        ...previous,
        [attributeIndex]:
          "#111827",
      })
    );

    clearErrors(
      `attributes.${attributeIndex}.options`
    );
  };

  /**
   * -----------------------------------------------------
   * START EDIT OPTION
   * -----------------------------------------------------
   */

  const handleStartEditOption = (
    attributeIndex,
    option
  ) => {
    setEditingOption({
      attributeIndex,

      // Prefer optionId because label/value may change later.
      optionId:
        option.optionId ||
        option.value,
    });

    setEditOptionForm({
      label: option.label || "",

      colorCode:
        option.colorCode ||
        "#111827",
    });
  };

  const handleCancelEditOption = () => {
    setEditingOption(null);

    setEditOptionForm({
      label: "",
      colorCode: "",
    });
  };

  /**
   * -----------------------------------------------------
   * COLOR VALIDATION
   * -----------------------------------------------------
   */

  const isValidHexColor = (
    value = ""
  ) => {
    return /^#([0-9A-Fa-f]{3}){1,2}$/.test(
      value
    );
  };

  /**
   * -----------------------------------------------------
   * SAVE OPTION EDIT
   * -----------------------------------------------------
   *
   * Important:
   *
   * We send only:
   * - label
   * - colorCode
   *
   * Parent keeps existing option.value stable.
   */

  const handleSaveEditOption = () => {
    if (!editingOption) {
      return;
    }

    const {
      attributeIndex,
      optionId,
    } = editingOption;

    const attribute =
      attributes[attributeIndex];

    if (!attribute) {
      return;
    }

    const cleanLabel =
      editOptionForm.label.trim();

    if (!cleanLabel) {
      setError(
        `attributes.${attributeIndex}.options`,
        {
          type: "manual",
          message:
            "Option label is required",
        }
      );

      toast.error(
        "Option label is required"
      );

      return;
    }

    const isColorAttribute =
      attribute.type === "switch";

    const cleanColorCode =
      editOptionForm.colorCode?.trim() ||
      null;

    if (
      isColorAttribute &&
      !isValidHexColor(
        cleanColorCode
      )
    ) {
      setError(
        `attributes.${attributeIndex}.options`,
        {
          type: "manual",
          message:
            "Please enter a valid color code",
        }
      );

      toast.error(
        "Please enter a valid color code"
      );

      return;
    }

    const success = onEditOption?.({
      attributeIndex,
      optionId,
      label: cleanLabel,

      colorCode: isColorAttribute
        ? cleanColorCode
        : undefined,
    });

    if (!success) {
      return;
    }

    clearErrors(
      `attributes.${attributeIndex}.options`
    );

    setEditingOption(null);

    setEditOptionForm({
      label: "",
      colorCode: "",
    });
  };

  /**
   * -----------------------------------------------------
   * REMOVE OPTION
   * -----------------------------------------------------
   *
   * Parent will:
   * - detect affected variants
   * - open confirmation modal
   * - remove option only after confirm
   */

  const handleRemoveAttributeOption = (
    attributeIndex,
    optionIndex
  ) => {
    onRemoveOption?.({
      attributeIndex,
      optionIndex,
    });
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* HEADER */}

      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Product Attributes
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Select attributes like Size,
            Color, Material from your
            attribute table.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            setIsExistingModalOpen(true)
          }
          className="btn btn-primary btn-sm rounded-xl text-white"
        >
          <Plus className="h-4 w-4" />

          Add Existing
        </button>
      </div>

      {/* EMPTY STATE */}

      {attributes.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
          <p className="text-sm font-semibold text-slate-700">
            No attributes selected yet.
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Add Size, Color or other
            variant attributes to generate
            product variants.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {attributes.map(
            (attribute, index) => {
              return (
                <div
                  key={
                    attributeFields[
                      index
                    ]?.formFieldId ||
                    attribute.attributeId ||
                    `${attribute.slug}-${index}`
                  }
                  className="rounded-2xl border border-slate-200 p-4"
                >
                  {/* ATTRIBUTE HEADER */}

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        {attribute.name}
                      </h4>

                      <p className="text-xs text-slate-500">
                        Type:{" "}
                        {attribute.type}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        removeAttribute(
                          index
                        )
                      }
                      className="btn btn-xs btn-outline btn-error rounded-lg"
                    >
                      Remove
                    </button>
                  </div>

                  {/* OPTIONS */}

                  <div className="mt-3 flex flex-wrap gap-2">
                    {(
                      attribute.options ||
                      []
                    ).map(
                      (
                        option,
                        optionIndex
                      ) => {
                        const optionId =
                          option.optionId ||
                          option.value;

                        const isEditing =
                          editingOption?.attributeIndex ===
                            index &&
                          editingOption?.optionId ===
                            optionId;

                        if (isEditing) {
                          const isColorAttribute =
                            attribute.type ===
                            "switch";

                          return (
                            <span
                              key={
                                optionId
                              }
                              className="inline-flex flex-wrap items-center gap-2 rounded-2xl border border-primary bg-primary/5 px-2 py-1 text-xs font-semibold text-slate-700"
                            >
                              {isColorAttribute && (
                                <>
                                  <input
                                    type="color"
                                    value={
                                      editOptionForm.colorCode ||
                                      "#111827"
                                    }
                                    onChange={(
                                      event
                                    ) =>
                                      setEditOptionForm(
                                        (
                                          previous
                                        ) => ({
                                          ...previous,

                                          colorCode:
                                            event
                                              .target
                                              .value,
                                        })
                                      )
                                    }
                                    className="h-7 w-8 cursor-pointer rounded-md border border-slate-200 bg-white p-0.5"
                                    title="Choose option color"
                                  />

                                  <input
                                    type="text"
                                    value={
                                      editOptionForm.colorCode ||
                                      ""
                                    }
                                    onChange={(
                                      event
                                    ) =>
                                      setEditOptionForm(
                                        (
                                          previous
                                        ) => ({
                                          ...previous,

                                          colorCode:
                                            event
                                              .target
                                              .value,
                                        })
                                      )
                                    }
                                    placeholder="#111827"
                                    className="h-7 w-24 rounded-md border border-slate-200 bg-white px-2 text-xs outline-none focus:border-primary"
                                  />
                                </>
                              )}

                              <input
                                type="text"
                                value={
                                  editOptionForm.label
                                }
                                onChange={(
                                  event
                                ) =>
                                  setEditOptionForm(
                                    (
                                      previous
                                    ) => ({
                                      ...previous,

                                      label:
                                        event
                                          .target
                                          .value,
                                    })
                                  )
                                }
                                onKeyDown={(
                                  event
                                ) => {
                                  if (
                                    event.key ===
                                    "Enter"
                                  ) {
                                    event.preventDefault();

                                    handleSaveEditOption();
                                  }

                                  if (
                                    event.key ===
                                    "Escape"
                                  ) {
                                    handleCancelEditOption();
                                  }
                                }}
                                autoFocus
                                className="h-7 w-28 rounded-md border border-slate-200 bg-white px-2 text-xs outline-none focus:border-primary"
                              />

                              <button
                                type="button"
                                onClick={
                                  handleSaveEditOption
                                }
                                className="rounded-full p-0.5 text-success hover:bg-success/10"
                                title="Save option"
                              >
                                <Check className="h-3 w-3" />
                              </button>

                              <button
                                type="button"
                                onClick={
                                  handleCancelEditOption
                                }
                                className="rounded-full p-0.5 text-slate-400 hover:bg-slate-100"
                                title="Cancel edit"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </span>
                          );
                        }

                        return (
                          <span
                            key={
                              optionId
                            }
                            className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
                          >
                            {option.colorCode && (
                              <span
                                className="h-2.5 w-2.5 rounded-full border border-slate-300"
                                style={{
                                  backgroundColor:
                                    option.colorCode,
                                }}
                              />
                            )}

                            <span>
                              {
                                option.label
                              }
                            </span>

                            {option.isCustom && (
                              <span className="rounded-full bg-warning/10 px-1.5 py-0.5 text-[10px] font-bold text-warning">
                                Custom
                              </span>
                            )}

                            <button
                              type="button"
                              onClick={() =>
                                handleStartEditOption(
                                  index,
                                  option
                                )
                              }
                              className="rounded-full p-0.5 text-slate-400 transition hover:bg-primary/10 hover:text-primary"
                              title="Edit option only for this product"
                            >
                              <Edit2 className="h-3 w-3" />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveAttributeOption(
                                  index,
                                  optionIndex
                                )
                              }
                              className="rounded-full cursor-pointer p-0.5 text-slate-400 transition hover:bg-error/10 hover:text-error"
                              title="Remove option from this product"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        );
                      }
                    )}
                  </div>

                  {/* ADD CUSTOM OPTION */}

                  <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                    {attribute.type ===
                      "switch" && (
                      <input
                        type="color"
                        value={
                          optionColorInputs[
                            index
                          ] ||
                          "#111827"
                        }
                        onChange={(
                          event
                        ) =>
                          setOptionColorInputs(
                            (
                              previous
                            ) => ({
                              ...previous,

                              [index]:
                                event
                                  .target
                                  .value,
                            })
                          )
                        }
                        className="h-10 w-12 cursor-pointer rounded-xl border border-slate-200 bg-white p-1"
                        title="Choose option color"
                      />
                    )}

                    <input
                      type="text"
                      value={
                        optionInputs[
                          index
                        ] || ""
                      }
                      onChange={(
                        event
                      ) =>
                        handleOptionInputChange(
                          index,
                          event.target
                            .value
                        )
                      }
                      onKeyDown={(
                        event
                      ) => {
                        if (
                          event.key ===
                          "Enter"
                        ) {
                          event.preventDefault();

                          handleAddCustomOption(
                            index
                          );
                        }
                      }}
                      placeholder={
                        attribute.type ===
                        "switch"
                          ? "Add color option, e.g. Navy"
                          : "Add option"
                      }
                      className="input input-bordered h-10 min-h-10 flex-1 rounded-xl text-sm"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        handleAddCustomOption(
                          index
                        )
                      }
                      className="btn btn-outline btn-primary h-10 min-h-10 rounded-xl"
                    >
                      <Plus className="h-4 w-4" />

                      Add Option
                    </button>
                  </div>

                  {errors
                    ?.attributes?.[
                      index
                    ]?.options
                    ?.message && (
                    <p className="mt-2 text-xs font-medium text-error">
                      {
                        errors
                          .attributes[
                            index
                          ].options
                          .message
                      }
                    </p>
                  )}
                </div>
              );
            }
          )}
        </div>
      )}

      <ExistingAttributesModal
        isOpen={
          isExistingModalOpen
        }
        onClose={() =>
          setIsExistingModalOpen(
            false
          )
        }
        selectedAttributes={
          attributes
        }
        existingAttributes={
          existingAttributes
        }
        isLoading={
          isAttributesLoading
        }
        isError={
          isAttributesError
        }
        onRetry={
          refetchAttributes
        }
        onAddAttributes={
          handleAddExistingAttributes
        }
      />
    </div>
  );
};

export default ProductAttributesCard;
