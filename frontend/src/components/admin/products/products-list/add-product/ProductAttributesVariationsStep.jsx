import { useEffect, useMemo, useState } from "react";

import { useFieldArray, useFormContext, useWatch } from "react-hook-form";

import toast from "react-hot-toast";

import ProductAttributesCard from "../form/ProductAttributesCard";
import VariantCreationCard from "../form/VariantCreationCard";
import ProductVariantsCard from "../form/ProductVariantsCard";
import AttributesSummaryCard from "../form/AttributesSummaryCard";
import SelectedVariantPreviewCard from "../form/SelectedVariantPreviewCard";
import VariationQuickActionsCard from "../form/VariationQuickActionsCard";
import AttributeVariationTipsCard from "../form/AttributeVariationTipsCard";

import VariantsRegenerationWarning from "../form/VariantsRegenerationWarning";
import RemoveAttributeOptionModal from "../form/RemoveAttributeOptionModal";

import { createManualVariant } from "../../../../../utils/admin/products/product/productVariationUtils";

import {
  addOptionToAttribute,
  createProductOnlyOption,
  hasDuplicateOptionValue,
  removeOptionFromAttribute,
  updateOptionInAttribute,
} from "../../../../../utils/admin/products/product/productAttributeOptionUtils";

import { countVariantsUsingOption } from "../../../../../utils/admin/products/product/productAttributeVariantUtils";

import { reconcileProductVariants } from "../../../../../utils/admin/products/product/productVariantReconciliationUtils";

import { useProductAttributeOptions } from "../../../../../hooks/admin/queries/products/product-list/useProductAttributeOptions";

import VariantRegenerationConfirmModal from "../form/VariantRegenerationConfirmModal";

import {
  getTemporaryVariantImagesToCleanup,
} from "../../../../../utils/admin/products/product/productVariantImageLifecycleUtils";

import {
  useDeleteTemporaryProductImages,
} from "../../../../../hooks/admin/mutations/products/useDeleteTemporaryProductImages";
/**
 * Product Attributes & Variations Step
 *
 * Used for both:
 *
 * - Create Product
 * - Edit Product
 *
 * React Hook Form remains the source of truth.
 */
const ProductAttributesVariationsStep = ({
  mode = "create",
  productId = null,
}) => {
  /**
   * -------------------------------------------------------
   * LOCAL UI STATE
   * -------------------------------------------------------
   */

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  /**
   * This stores the proposed variant state after
   * reconcileProductVariants().
   *
   * IMPORTANT:
   * We do NOT apply it immediately.
   *
   * Phase 9.7.6.5 will show confirmation modal.
   */
  const [pendingVariantRegeneration, setPendingVariantRegeneration] =
    useState(null);

  const [isApplyingRegeneration, setIsApplyingRegeneration] = useState(false);
  /**
   * Used when user removes an option.
   *
   * We first calculate how many variants use that option,
   * then show confirmation.
   */
  const [pendingOptionRemoval, setPendingOptionRemoval] = useState(null);

  /**
   * -------------------------------------------------------
   * RHF
   * -------------------------------------------------------
   */

  const {
    control,
    getValues,
    register,
    setValue,
    trigger,
    clearErrors,

    formState: { errors },
  } = useFormContext();

  const deleteTempImagesMutation =
  useDeleteTemporaryProductImages();

  const isEditMode = mode === "edit";

  /**
   * -------------------------------------------------------
   * GLOBAL ATTRIBUTE OPTIONS
   * -------------------------------------------------------
   *
   * These come from the Attribute master table.
   *
   * ProductAttributesCard creates a snapshot before adding
   * them to the product.
   */

  const {
    data: attributeData,

    isLoading: isAttributesLoading,

    isError: isAttributesError,

    refetch: refetchAttributes,
  } = useProductAttributeOptions();

  const existingAttributes = useMemo(() => {
    return attributeData?.options ?? [];
  }, [attributeData?.options]);

  /**
   * -------------------------------------------------------
   * ATTRIBUTE FIELD ARRAY
   * -------------------------------------------------------
   */

  const {
    fields: attributeFields,

    append: appendAttribute,

    remove: removeAttribute,
  } = useFieldArray({
    control,
    name: "attributes",

    /**
     * Keep RHF internal id separate from:
     *
     * attributeId
     * _id
     * id
     */
    keyName: "formFieldId",
  });

  /**
   * -------------------------------------------------------
   * VARIANT FIELD ARRAY
   * -------------------------------------------------------
   */

  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
    replace: replaceVariants,
  } = useFieldArray({
    control,
    name: "variants",
    keyName: "formFieldId",
  });

  /**
   * -------------------------------------------------------
   * WATCH ATTRIBUTES
   * -------------------------------------------------------
   */

  const watchedAttributes =
    useWatch({
      control,
      name: "attributes",
    }) || [];

  /**
   * -------------------------------------------------------
   * WATCH VARIANTS
   * -------------------------------------------------------
   */

  // Inside your component:
  const variantsValue = useWatch({
    control,
    name: "variants",
  });

  const watchedVariants = useMemo(() => variantsValue ?? [], [variantsValue]);

  /**
   * -------------------------------------------------------
   * WATCH PRODUCT VALUES USED FOR NEW VARIANTS
   * -------------------------------------------------------
   */

  const sku =
    useWatch({
      control,
      name: "sku",
    }) || "";

  const sellingPrice =
    useWatch({
      control,
      name: "sellingPrice",
    }) || "";

  const stockQuantity =
    useWatch({
      control,
      name: "stockQuantity",
    }) || "";

  const lowStockThreshold =
    useWatch({
      control,
      name: "lowStockThreshold",
    }) || "";

  const productImages =
    useWatch({
      control,
      name: "images",
    }) || [];

  /**
   * -------------------------------------------------------
   * WATCH ATTRIBUTE / VARIANT SYNC STATE
   * -------------------------------------------------------
   */

  const attributesChanged =
    useWatch({
      control,
      name: "attributesChanged",
    }) ?? false;

  const variantsNeedRegeneration =
    useWatch({
      control,
      name: "variantsNeedRegeneration",
    }) ?? false;

  const variantRegenerationReason =
    useWatch({
      control,
      name: "variantRegenerationReason",
    }) || null;

  /**
   * -------------------------------------------------------
   * DERIVED STATE
   * -------------------------------------------------------
   */

  const hasAttributes = watchedAttributes.length > 0;

  const hasVariants = watchedVariants.length > 0;

  const hasPersistedVariants = useMemo(() => {
    return watchedVariants.some((variant) => {
      return Boolean(variant?.variantId) || variant?.isExisting === true;
    });
  }, [watchedVariants]);

  const selectedVariant =
    watchedVariants[selectedVariantIndex] || watchedVariants[0] || null;

  /**
   * -------------------------------------------------------
   * KEEP SELECTED VARIANT INDEX VALID
   * -------------------------------------------------------
   */

  useEffect(() => {
    if (!watchedVariants.length) {
      setSelectedVariantIndex(0);

      return;
    }

    if (selectedVariantIndex >= watchedVariants.length) {
      setSelectedVariantIndex(watchedVariants.length - 1);
    }
  }, [watchedVariants.length, selectedVariantIndex]);

  /**
   * Different edit product opened.
   *
   * Reset UI-only state.
   */
  useEffect(() => {
    setSelectedVariantIndex(0);

    setPendingVariantRegeneration(null);

    setPendingOptionRemoval(null);
  }, [productId, mode]);

  /**
   * -------------------------------------------------------
   * MARK VARIANTS AS STALE
   * -------------------------------------------------------
   *
   * Call this whenever ATTRIBUTE STRUCTURE changes.
   *
   * Do NOT call for:
   *
   * - variant SKU change
   * - price change
   * - stock change
   * - variant image change
   * - status change
   */

  const markVariantsNeedRegeneration = (reason) => {
    /**
     * Any previous regeneration preview is now stale.
     */
    setPendingVariantRegeneration(null);

    setValue("attributesChanged", true, {
      shouldDirty: false,
      shouldTouch: false,
      shouldValidate: false,
    });

    setValue("variantsNeedRegeneration", true, {
      shouldDirty: false,
      shouldTouch: false,
      shouldValidate: false,
    });

    setValue("variantRegenerationReason", reason || null, {
      shouldDirty: false,
      shouldTouch: false,
      shouldValidate: false,
    });
  };

  const markVariantsSynchronized = () => {
    setValue("attributesChanged", false, {
      shouldDirty: false,
      shouldTouch: false,
      shouldValidate: false,
    });

    setValue("variantsNeedRegeneration", false, {
      shouldDirty: false,
      shouldTouch: false,
      shouldValidate: false,
    });

    setValue("variantRegenerationReason", null, {
      shouldDirty: false,
      shouldTouch: false,
      shouldValidate: false,
    });
  };

  /**
   * =======================================================
   * ATTRIBUTE HANDLERS
   * =======================================================
   */

  /**
   * -------------------------------------------------------
   * ADD EXISTING ATTRIBUTE SNAPSHOTS
   * -------------------------------------------------------
   *
   * ProductAttributesCard already converts backend attribute
   * into product snapshot using createProductAttributeSnapshot().
   */

  const handleAddProductAttributes = (newAttributes = []) => {
    if (!newAttributes.length) {
      return false;
    }

    appendAttribute(newAttributes);

    markVariantsNeedRegeneration("attribute-added");

    return true;
  };

  /**
   * -------------------------------------------------------
   * REMOVE FULL ATTRIBUTE
   * -------------------------------------------------------
   */

  const handleRemoveProductAttribute = (attributeIndex) => {
    const currentAttributes = getValues("attributes") || [];

    const attribute = currentAttributes[attributeIndex];

    if (!attribute) {
      return;
    }

    removeAttribute(attributeIndex);

    markVariantsNeedRegeneration("attribute-removed");

    toast(
      `${attribute.name} removed. Regenerate variants to synchronize combinations.`,
      {
        icon: "⚠️",
      },
    );
  };

  /**
   * -------------------------------------------------------
   * ADD PRODUCT-ONLY OPTION
   * -------------------------------------------------------
   */

  const handleAddAttributeOption = ({
    attributeIndex,
    label,
    colorCode = null,
  }) => {
    const currentAttributes = getValues("attributes") || [];

    const currentAttribute = currentAttributes[attributeIndex];

    if (!currentAttribute) {
      toast.error("Attribute not found");

      return false;
    }

    const cleanLabel = String(label || "").trim();

    if (!cleanLabel) {
      toast.error("Option label is required");

      return false;
    }

    const currentOptions = currentAttribute.options || [];

    /**
     * For a new custom option, its value is generated
     * from label, so duplicate-value check is correct.
     */
    if (hasDuplicateOptionValue(currentOptions, cleanLabel)) {
      toast.error("This option already exists");

      return false;
    }

    const newOption = createProductOnlyOption({
      label: cleanLabel,

      colorCode: currentAttribute.type === "switch" ? colorCode : null,
    });

    const updatedAttributes = addOptionToAttribute({
      attributes: currentAttributes,

      attributeIndex,

      option: newOption,
    });

    const nextOptions = updatedAttributes[attributeIndex]?.options || [];

    /**
     * Update only this nested options array.
     *
     * Do NOT clear variants.
     */
    setValue(`attributes.${attributeIndex}.options`, nextOptions, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });

    markVariantsNeedRegeneration("option-added");

    toast.success(
      `${cleanLabel} added. Regenerate variants to create the new combinations.`,
    );

    return true;
  };

  /**
   * -------------------------------------------------------
   * EDIT PRODUCT ATTRIBUTE OPTION
   * -------------------------------------------------------
   *
   * IMPORTANT:
   *
   * We allow changing:
   *
   * label
   * colorCode
   *
   * We KEEP option.value unchanged.
   *
   * That is what allows existing variants to keep the same
   * optionSignature.
   */

  const handleEditAttributeOption = ({
    attributeIndex,
    optionId,
    label,
    colorCode,
  }) => {
    const currentAttributes = getValues("attributes") || [];

    const currentAttribute = currentAttributes[attributeIndex];

    if (!currentAttribute) {
      toast.error("Attribute not found");

      return false;
    }

    const currentOptions = currentAttribute.options || [];

    const oldOption = currentOptions.find((option) => {
      const currentOptionId = option.optionId || option.value;

      return String(currentOptionId) === String(optionId);
    });

    if (!oldOption) {
      toast.error("Option not found");

      return false;
    }

    const cleanLabel = String(label || "").trim();

    if (!cleanLabel) {
      toast.error("Option label is required");

      return false;
    }

    /**
     * We check duplicate LABEL here.
     *
     * We do not generate a new option.value during edit.
     */
    const duplicateLabel = currentOptions.some((option) => {
      const currentOptionId = option.optionId || option.value;

      if (String(currentOptionId) === String(optionId)) {
        return false;
      }

      return (
        String(option.label || "")
          .trim()
          .toLowerCase() === cleanLabel.toLowerCase()
      );
    });

    if (duplicateLabel) {
      toast.error("Another option already uses this label");

      return false;
    }

    /**
     * updateOptionInAttribute() identifies old option
     * using its stable value.
     */
    const updatedAttributes = updateOptionInAttribute({
      attributes: currentAttributes,

      attributeIndex,

      optionValue: oldOption.value,

      updatedOption: {
        ...oldOption,

        /**
         * Editable snapshot values
         */
        label: cleanLabel,

        colorCode:
          currentAttribute.type === "switch"
            ? colorCode || oldOption.colorCode || null
            : oldOption.colorCode || null,

        /**
         * CRITICAL:
         * Never change this just because label changed.
         */
        value: oldOption.value,

        optionId: oldOption.optionId || oldOption.value,

        /**
         * Preserve original custom state.
         */
        isCustom: Boolean(oldOption.isCustom),
      },
    });

    const nextOptions = updatedAttributes[attributeIndex]?.options || [];

    setValue(`attributes.${attributeIndex}.options`, nextOptions, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });

    /**
     * Variant combination identity may remain the same,
     * but variant snapshot needs refreshing:
     *
     * label
     * colorCode
     * display name
     */
    markVariantsNeedRegeneration("option-updated");

    toast(
      "Option updated. Regenerate variants to synchronize variant snapshots.",
      {
        icon: "ℹ️",
      },
    );

    return true;
  };

  /**
   * -------------------------------------------------------
   * REQUEST REMOVE OPTION
   * -------------------------------------------------------
   */

  const handleRequestRemoveAttributeOption = ({
    attributeIndex,
    optionIndex,
  }) => {
    const currentAttributes = getValues("attributes") || [];

    const currentVariants = getValues("variants") || [];

    const attribute = currentAttributes[attributeIndex];

    const option = attribute?.options?.[optionIndex];

    if (!attribute || !option) {
      toast.error("Option not found");

      return;
    }

    if (attribute.options.length <= 1) {
      toast.error(
        "At least one option is required. Remove the full attribute instead.",
      );

      return;
    }

    const affectedVariantsCount = countVariantsUsingOption({
      variants: currentVariants,

      attribute,

      option,
    });

    setPendingOptionRemoval({
      attributeIndex,
      optionIndex,

      attributeName: attribute.name,

      option,

      affectedVariantsCount,
    });
  };

  /**
   * -------------------------------------------------------
   * CONFIRM REMOVE OPTION
   * -------------------------------------------------------
   */

  const handleConfirmRemoveAttributeOption = () => {
    if (!pendingOptionRemoval) {
      return;
    }

    const { attributeIndex, option, affectedVariantsCount } =
      pendingOptionRemoval;

    const currentAttributes = getValues("attributes") || [];

    const currentAttribute = currentAttributes[attributeIndex];

    if (!currentAttribute) {
      setPendingOptionRemoval(null);

      return;
    }

    const updatedAttributes = removeOptionFromAttribute({
      attributes: currentAttributes,

      attributeIndex,

      /**
       * Your existing helper removes by option.value.
       */
      optionValue: option.value,
    });

    const nextOptions = updatedAttributes[attributeIndex]?.options || [];

    /**
     * Important:
     *
     * We remove the ATTRIBUTE OPTION only.
     *
     * We DO NOT remove old variants yet.
     */
    setValue(`attributes.${attributeIndex}.options`, nextOptions, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });

    markVariantsNeedRegeneration("option-removed");

    setPendingOptionRemoval(null);

    if (affectedVariantsCount > 0) {
      toast(
        `${option.label} removed. ${affectedVariantsCount} variant${
          affectedVariantsCount === 1 ? "" : "s"
        } will be affected during regeneration.`,
        {
          icon: "⚠️",
        },
      );

      return;
    }

    toast.success(`${option.label} removed`);
  };

  const handleCancelRemoveAttributeOption = () => {
    setPendingOptionRemoval(null);
  };

  /**
   * =======================================================
   * VARIANT RECONCILIATION
   * =======================================================
   */

  const handleGenerateVariants = () => {
    const watchedAttributes = getValues("attributes") || [];

    const watchedVariants = getValues("variants") || [];

    if (!watchedAttributes.length) {
      toast.error("Please select at least one attribute");

      return;
    }

    /**
     * This function is SAFE for:
     *
     * Create mode
     * Edit mode
     *
     * It does not mutate RHF values.
     */
    const result = reconcileProductVariants({
      attributes: watchedAttributes,

      existingVariants: watchedVariants,

      baseSku: sku,

      sellingPrice,

      stockQuantity,

      productImages,
    });

    if (!result.success) {
      toast.error(result.error || "Unable to regenerate variants");

      return;
    }

    /**
     * IMPORTANT
     * --------------------------------------------
     *
     * DO NOT:
     *
     * replaceVariants(result.nextVariants)
     *
     * here.
     *
     * We only prepare the proposed result.
     *
     * Phase 9.7.6.5 will show confirmation first.
     */
    setPendingVariantRegeneration(result);

    if (result.warnings?.length) {
      toast(result.warnings[0], {
        icon: "⚠️",
      });
    }

    /**
     * Temporary useful feedback until
     * Phase 9.7.6.5 modal is added.
     */
    toast(
      `${result.report.preserved} preserved, ${result.report.created} new, ${result.report.removed} removed`,
      {
        icon: "🔄",
      },
    );
  };

  /**
   * =======================================================
   * MANUAL VARIANT
   * =======================================================
   */

  const handleAddManualVariantQuick = () => {
    if (!watchedAttributes.length) {
      toast.error("Please select at least one attribute");

      return;
    }

    /**
     * If attributes have changed and variants are stale,
     * regenerate first.
     */
    if (variantsNeedRegeneration && watchedVariants.length > 0) {
      toast(
        "Regenerate existing variants before adding another manual variant.",
        {
          icon: "⚠️",
        },
      );

      return;
    }

    const selectedOptions = {};

    watchedAttributes.forEach((attribute) => {
      const firstOption = attribute.options?.[0];

      if (!firstOption) {
        return;
      }

      /**
       * Keep same general structure your
       * createManualVariant utility already uses.
       */
      selectedOptions[attribute.name] = {
        attributeId: attribute.attributeId || null,

        attributeName: attribute.name,

        attributeSlug: attribute.slug || attribute.name,

        optionId: firstOption.optionId || firstOption.value,

        label: firstOption.label,

        value: firstOption.value,

        colorCode: firstOption.colorCode || null,

        isCustom: Boolean(firstOption.isCustom),
      };
    });

    if (!Object.keys(selectedOptions).length) {
      toast.error("Selected attributes do not contain any options");

      return;
    }

    const variant = createManualVariant({
      selectedOptions,

      baseSku: sku,

      price: sellingPrice || "999.00",

      stock: "0",
    });

    const nextVariant = {
      ...variant,

      variantId: null,

      isExisting: false,
      isNew: true,

      sortOrder: watchedVariants.length + 1,
    };

    appendVariant(nextVariant);

    setSelectedVariantIndex(watchedVariants.length);
  };

  /**
   * =======================================================
   * REMOVE VARIANT
   * =======================================================
   */

  const handleRemoveVariant = (variantIndex) => {
    if (variantIndex < 0 || variantIndex >= watchedVariants.length) {
      return;
    }

    removeVariant(variantIndex);

    setSelectedVariantIndex((currentIndex) => {
      if (currentIndex > variantIndex) {
        return currentIndex - 1;
      }

      if (currentIndex === variantIndex && currentIndex > 0) {
        return currentIndex - 1;
      }

      return currentIndex;
    });
  };

  /**
   * =======================================================
   * SELECT VARIANT
   * =======================================================
   */

  const handleSelectVariant = (variantIndex) => {
    if (variantIndex < 0 || variantIndex >= watchedVariants.length) {
      return;
    }

    setSelectedVariantIndex(variantIndex);
  };

  const handleCancelVariantRegeneration = () => {
    if (isApplyingRegeneration) {
      return;
    }

    setPendingVariantRegeneration(null);
  };

const handleApplyVariantRegeneration =
  async () => {
    if (
      !pendingVariantRegeneration ||
      isApplyingRegeneration
    ) {
      return;
    }

    try {
      setIsApplyingRegeneration(
        true,
      );

      const currentValues =
        getValues();

      /**
       * Re-run against latest values.
       */
      const latestResult =
        reconcileProductVariants({
          attributes:
            currentValues.attributes ||
            [],

          existingVariants:
            currentValues.variants ||
            [],

          baseSku:
            currentValues.sku ||
            "",

          sellingPrice:
            currentValues.sellingPrice ||
            "",

          stockQuantity:
            currentValues.stockQuantity ||
            "0",

          productImages:
            currentValues.images ||
            [],
        });

      if (!latestResult.success) {
        toast.error(
          latestResult.error ||
            "Unable to regenerate variants",
        );

        return;
      }

      /**
       * -------------------------------------------
       * CLEAN TEMP IMAGES OF REMOVED VARIANTS
       * -------------------------------------------
       */
      const temporaryImagesToCleanup =
        getTemporaryVariantImagesToCleanup(
          {
            removedVariants:
              latestResult.removedVariants,

            nextVariants:
              latestResult.nextVariants,

            productImages:
              currentValues.images ||
              [],
          },
        );

      if (
        temporaryImagesToCleanup.length >
        0
      ) {
        try {
          await deleteTempImagesMutation.mutateAsync(
            {
              publicIds:
                temporaryImagesToCleanup,
            },
          );
        } catch (error) {
          console.error(
            "Temporary variant cleanup failed:",
            error,
          );

          toast.error(
            "Unable to clean temporary images from removed variants",
          );

          return;
        }
      }

      /**
       * -------------------------------------------
       * APPLY RECONCILIATION
       * -------------------------------------------
       */
      replaceVariants(
        latestResult.nextVariants,
      );

      markVariantsSynchronized();

      clearErrors("variants");

      setSelectedVariantIndex(0);

      setPendingVariantRegeneration(
        null,
      );

      await trigger([
        "attributes",
        "variants",
      ]);

      const {
        preserved,
        created,
        removed,
      } =
        latestResult.report;

      toast.success(
        `Variants regenerated: ${preserved} preserved, ${created} new, ${removed} removed`,
      );
    } catch (error) {
      console.error(
        "Variant regeneration failed:",
        error,
      );

      toast.error(
        "Failed to regenerate variants",
      );
    } finally {
      setIsApplyingRegeneration(
        false,
      );
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        {/* ========================================= */}
        {/* LEFT COLUMN */}
        {/* ========================================= */}

        <div className="space-y-6">
          <ProductAttributesCard
            mode={mode}
            isEditMode={isEditMode}
            attributeFields={attributeFields}
            attributes={watchedAttributes}
            /**
             * Attribute master selection
             */
            onAddAttributes={handleAddProductAttributes}
            onRemoveAttribute={handleRemoveProductAttribute}
            existingAttributes={existingAttributes}
            isAttributesLoading={isAttributesLoading}
            isAttributesError={isAttributesError}
            refetchAttributes={refetchAttributes}
            /**
             * Product snapshot option handlers
             */
            onAddOption={handleAddAttributeOption}
            onEditOption={handleEditAttributeOption}
            onRemoveOption={handleRequestRemoveAttributeOption}
          />

          {/* ======================================= */}
          {/* STALE VARIANT WARNING */}
          {/* ======================================= */}

          <VariantsRegenerationWarning
            visible={variantsNeedRegeneration}
            reason={variantRegenerationReason}
            onRegenerate={handleGenerateVariants}
          />

          {/* ======================================= */}
          {/* TEMPORARY RECONCILIATION PREVIEW */}
          {/* Phase 9.7.6.5 will replace this with */}
          {/* the confirmation modal. */}
          {/* ======================================= */}

          {/* {pendingVariantRegeneration && (
            <div className="rounded-2xl border border-info/20 bg-info/5 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">
                    Variant regeneration preview ready
                  </h4>

                  <p className="mt-1 text-xs text-slate-500">
                    Existing variants have not been changed yet.
                  </p>
                </div>

                <button
                  type="button"
                  className="btn btn-ghost btn-xs rounded-lg"
                  onClick={() => setPendingVariantRegeneration(null)}
                >
                  Dismiss
                </button>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                <div className="rounded-xl bg-white p-3">
                  <p className="text-xs text-slate-500">Final</p>

                  <p className="mt-1 text-lg font-bold">
                    {pendingVariantRegeneration.report.total}
                  </p>
                </div>

                <div className="rounded-xl bg-white p-3">
                  <p className="text-xs text-slate-500">Preserved</p>

                  <p className="mt-1 text-lg font-bold text-success">
                    {pendingVariantRegeneration.report.preserved}
                  </p>
                </div>

                <div className="rounded-xl bg-white p-3">
                  <p className="text-xs text-slate-500">New</p>

                  <p className="mt-1 text-lg font-bold text-info">
                    {pendingVariantRegeneration.report.created}
                  </p>
                </div>

                <div className="rounded-xl bg-white p-3">
                  <p className="text-xs text-slate-500">Removed</p>

                  <p className="mt-1 text-lg font-bold text-error">
                    {pendingVariantRegeneration.report.removed}
                  </p>
                </div>
              </div>

              <p className="mt-3 text-xs text-slate-500">
                The next phase will add Apply Regeneration and Cancel
                confirmation.
              </p>
            </div>
          )} */}

          {/* ======================================= */}
          {/* VARIANT GENERATION */}
          {/* ======================================= */}

          <VariantCreationCard
            mode={mode}
            isEditMode={isEditMode}
            attributes={watchedAttributes}
            variants={watchedVariants}
            hasPersistedVariants={hasPersistedVariants}
            /**
             * Child only calls this.
             *
             * It must NOT generate or replace
             * variants internally anymore.
             */
            onGenerateVariants={handleGenerateVariants}
          />

          {/* ======================================= */}
          {/* VARIANT TABLE */}
          {/* ======================================= */}

          <ProductVariantsCard
            mode={mode}
            isEditMode={isEditMode}
            fields={variantFields}
            watchedVariants={watchedVariants}
            register={register}
            control={control}
            setValue={setValue}
            remove={handleRemoveVariant}
            errors={errors}
            lowStockThreshold={lowStockThreshold}
            selectedVariantIndex={selectedVariantIndex}
            onSelectVariant={handleSelectVariant}
          />
        </div>

        {/* ========================================= */}
        {/* RIGHT COLUMN */}
        {/* ========================================= */}

        <aside className="space-y-6 xl:sticky xl:top-4 xl:self-start">
          <AttributesSummaryCard attributes={watchedAttributes} />

          <SelectedVariantPreviewCard variant={selectedVariant} />

          <VariationQuickActionsCard
            mode={mode}
            isEditMode={isEditMode}
            hasAttributes={hasAttributes}
            hasVariants={hasVariants}
            hasPersistedVariants={hasPersistedVariants}
            onGenerateVariants={handleGenerateVariants}
            onAddManualVariant={handleAddManualVariantQuick}
          />

          <AttributeVariationTipsCard />
        </aside>
      </div>

      {/* =========================================== */}
      {/* REMOVE OPTION CONFIRMATION */}
      {/* =========================================== */}

      <RemoveAttributeOptionModal
        open={Boolean(pendingOptionRemoval)}
        data={pendingOptionRemoval}
        onCancel={handleCancelRemoveAttributeOption}
        onConfirm={handleConfirmRemoveAttributeOption}
      />
      <VariantRegenerationConfirmModal
        open={Boolean(pendingVariantRegeneration)}
        data={pendingVariantRegeneration}
        isApplying={isApplyingRegeneration}
        onCancel={handleCancelVariantRegeneration}
        onConfirm={handleApplyVariantRegeneration}
      />
    </>
  );
};

export default ProductAttributesVariationsStep;
