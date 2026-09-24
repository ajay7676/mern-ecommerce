
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

import {
  createManualVariant,
  generateVariantsFromAttributes,
} from "../../../../../utils/admin/products/product/productVariationUtils";
import { useProductAttributeOptions } from "../../../../../hooks/admin/queries/products/product-list/useProductAttributeOptions";
import { PRODUCT_FORM_MODE } from '../../../../../constants/admin/products/productFormMode.constants'

const ProductAttributesVariationsStep = ({
  mode = PRODUCT_FORM_MODE.CREATE,
  productId = null,
}) => {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  const {
    control,
    getValues,
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

 const isEditMode = mode === PRODUCT_FORM_MODE.EDIT;
  const isCreateMode = mode === PRODUCT_FORM_MODE.CREATE;

  const {
    data: attributeData,
    isLoading: isAttributesLoading,
    isError: isAttributesError,
    refetch: refetchAttributes,
  } = useProductAttributeOptions();

  const existingAttributes = useMemo(() => {
    return attributeData?.options ?? [];
  }, [attributeData?.options]);
const {
    fields: attributeFields,
    append: appendAttribute,
    remove: removeAttribute,
    update: updateAttribute,
    replace: replaceAttributes,
  } = useFieldArray({
    control,
    name: "attributes",

    // Prevent confusion with backend _id / variantId.
    keyName: "formFieldId",
  });

    const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
    update: updateVariant,
    replace: replaceVariants,
  } = useFieldArray({
    control,
    name: "variants",
    keyName: "formFieldId",
  });

   /**
   * ------------------------------------------------------
   * Watched form values
   * ------------------------------------------------------
   */

  const watchedAttributes =
    useWatch({
      control,
      name: "attributes",
    }) || [];

  const watchedVariants =
    useWatch({
      control,
      name: "variants",
    }) || [];

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

  const productName =
    useWatch({
      control,
      name: "productName",
    }) || "";

  const productImages =
    useWatch({
      control,
      name: "images",
    }) || [];

   /**
   * ------------------------------------------------------
   * Edit state
   * ------------------------------------------------------
   */

  const hasPersistedVariants = useMemo(() => {
    return watchedVariants.some(
      (variant) =>
        Boolean(variant?.variantId) ||
        variant?.isExisting === true
    );
  }, [watchedVariants]);

  const hasAttributes = watchedAttributes.length > 0;

  const hasVariants = watchedVariants.length > 0;

  /**
   * If a variant is deleted or variants are regenerated,
   * make sure selectedVariantIndex never points outside array.
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
   * When opening another product in edit mode,
   * start preview from the first variant.
   */
  useEffect(() => {
    setSelectedVariantIndex(0);
  }, [productId, mode]);

  const selectedVariant =
    watchedVariants[selectedVariantIndex] ||
    watchedVariants[0] ||
    null;

  /**
   * ------------------------------------------------------
   * Common form update helper
   * ------------------------------------------------------
   */

  const setProductFormValue = (fieldName, value) => {
    setValue(fieldName, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  /**
   * ------------------------------------------------------
   * Generate variants
   * ------------------------------------------------------
   *
   * IMPORTANT:
   * In edit mode we DO NOT replace persisted variants yet.
   *
   * Phase 9.7.6.4 will add:
   * reconcileProductVariants()
   *
   * which preserves:
   * - variantId
   * - SKU
   * - price
   * - stock
   * - status
   * - image
   */

  const handleGenerateVariants = () => {
    if (!watchedAttributes.length) {
      toast.error("Please select at least one attribute");
      return;
    }

    if (isEditMode && hasPersistedVariants) {
      toast(
        "Existing variants cannot be replaced directly. Use safe regeneration.",
        {
          icon: "⚠️",
        }
      );

      return;
    }

    const generatedVariants = generateVariantsFromAttributes({
      attributes: watchedAttributes,
      baseSku: sku,
      sellingPrice,
      stockQuantity,
      productImages,
    });

    const normalizedVariants = generatedVariants.map(
      (variant, index) => ({
        ...variant,

        variantId: variant.variantId || null,

        isExisting: false,
        isNew: true,

        sortOrder: index + 1,
      })
    );

    replaceVariants(normalizedVariants);

    setSelectedVariantIndex(0);
  };

  /**
   * ------------------------------------------------------
   * Add manual variant
   * ------------------------------------------------------
   */

  const handleAddManualVariantQuick = () => {
    if (!watchedAttributes.length) {
      toast.error("Please select at least one attribute");
      return;
    }

    const selectedOptions = {};

    watchedAttributes.forEach((attribute) => {
      const firstOption = attribute.options?.[0];

      if (!firstOption) return;

      const attributeKey =
        attribute.slug ||
        attribute.name;

      selectedOptions[attributeKey] = {
        attributeId: attribute.attributeId || null,

        attributeName: attribute.name,

        attributeSlug:
          attribute.slug || attribute.name,

        optionId:
          firstOption.optionId ||
          firstOption.value,

        label: firstOption.label,

        value: firstOption.value,

        colorCode:
          firstOption.colorCode || null,

        isCustom:
          Boolean(firstOption.isCustom),
      };
    });

    if (!Object.keys(selectedOptions).length) {
      toast.error(
        "Selected attributes do not contain any options"
      );

      return;
    }

    const manualVariant = createManualVariant({
      selectedOptions,
      baseSku: sku,
      price: sellingPrice || "",
      stock: "0",
    });

    const nextVariant = {
      ...manualVariant,

      variantId: null,

      isExisting: false,
      isNew: true,

      sortOrder: watchedVariants.length + 1,
    };

    appendVariant(nextVariant);

    setSelectedVariantIndex(watchedVariants.length);
  };

  /**
   * ------------------------------------------------------
   * Remove variant
   * ------------------------------------------------------
   */

  const handleRemoveVariant = (variantIndex) => {
    if (
      variantIndex < 0 ||
      variantIndex >= watchedVariants.length
    ) {
      return;
    }

    removeVariant(variantIndex);

    setSelectedVariantIndex((currentIndex) => {
      if (currentIndex > variantIndex) {
        return currentIndex - 1;
      }

      if (
        currentIndex === variantIndex &&
        currentIndex > 0
      ) {
        return currentIndex - 1;
      }

      return currentIndex;
    });
  };

  /**
   * ------------------------------------------------------
   * Select variant
   * ------------------------------------------------------
   */

  const handleSelectVariant = (variantIndex) => {
    if (
      variantIndex < 0 ||
      variantIndex >= watchedVariants.length
    ) {
      return;
    }

    setSelectedVariantIndex(variantIndex);
  };


  return (
   <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
      {/* LEFT COLUMN */}
      <div className="space-y-6">
        <ProductAttributesCard
          mode={mode}
          isEditMode={isEditMode}
          attributeFields={attributeFields}
          attributes={watchedAttributes}
          appendAttribute={appendAttribute}
          updateAttribute={updateAttribute}
          replaceAttributes={replaceAttributes}
          removeAttribute={removeAttribute}
          existingAttributes={existingAttributes}
          isAttributesLoading={isAttributesLoading}
          isAttributesError={isAttributesError}
          refetchAttributes={refetchAttributes}
          getValues={getValues}
          setValue={setValue}
          setProductFormValue={setProductFormValue}
        />

        <VariantCreationCard
          mode={mode}
          isEditMode={isEditMode}
          attributes={watchedAttributes}
          variants={watchedVariants}
          hasPersistedVariants={hasPersistedVariants}
          replaceVariants={replaceVariants}
          getValues={getValues}
          onGenerateVariants={handleGenerateVariants}
        />

        <ProductVariantsCard
          mode={mode}
          isEditMode={isEditMode}
          fields={variantFields}
          watchedVariants={watchedVariants}
          register={register}
          control={control}
          setValue={setValue}
          updateVariant={updateVariant}
          remove={handleRemoveVariant}
          errors={errors}
          lowStockThreshold={lowStockThreshold}
          selectedVariantIndex={selectedVariantIndex}
          onSelectVariant={handleSelectVariant}
        />
      </div>

      {/* RIGHT COLUMN */}
      <aside className="space-y-6 xl:sticky xl:top-4 xl:self-start">
        <AttributesSummaryCard
          attributes={watchedAttributes}
        />

        <SelectedVariantPreviewCard
          variant={selectedVariant}
        />

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
  );
};

export default ProductAttributesVariationsStep;
