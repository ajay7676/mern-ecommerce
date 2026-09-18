// components/ProductAttributesVariationsStep.jsx

import { useMemo, useState } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";

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

const ProductAttributesVariationsStep = () => {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  const {
    control,
    getValues,
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

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
  } = useFieldArray({
    control,
    name: "attributes",
  });

  const {
    fields: variantFields,
    append: appendVariant,
    replace: replaceVariants,
    remove: removeVariant,
  } = useFieldArray({
    control,
    name: "variants",
  });

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

  const sku = useWatch({
    control,
    name: "sku",
  });

  const sellingPrice = useWatch({
    control,
    name: "sellingPrice",
  });

  const lowStockThreshold = useWatch({
    control,
    name: "lowStockThreshold",
  });

  const variants =
    useWatch({
      control,
      name: "variants",
    }) || [];

  const selectedVariant =
    watchedVariants[selectedVariantIndex] || watchedVariants[0];

  const handleGenerateVariants = () => {
    const variants = generateVariantsFromAttributes({
      attributes: watchedAttributes,
      baseSku: sku,
      sellingPrice,
    });

    replaceVariants(variants);
    setSelectedVariantIndex(0);
  };

  const handleAddManualVariantQuick = () => {
    const selectedOptions = {};

    watchedAttributes.forEach((attribute) => {
      const firstOption = attribute.options?.[0];

      if (!firstOption) return;

      selectedOptions[attribute.name] = {
        attributeId: attribute.attributeId,
        attributeName: attribute.name,
        optionId: firstOption.optionId,
        label: firstOption.label,
        value: firstOption.value,
        colorCode: firstOption.colorCode || null,
      };
    });

    const variant = createManualVariant({
      selectedOptions,
      baseSku: sku,
      price: sellingPrice || "999.00",
      stock: "0",
    });

    appendVariant(variant);
    setSelectedVariantIndex(watchedVariants.length);
  };

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
      <div className="space-y-6">
        <ProductAttributesCard
          attributeFields={attributeFields}
          attributes={watchedAttributes}
          appendAttribute={appendAttribute}
          removeAttribute={removeAttribute}
          existingAttributes={existingAttributes}
          isAttributesLoading={isAttributesLoading}
          isAttributesError={isAttributesError}
          refetchAttributes={refetchAttributes}
        />

        <VariantCreationCard
          attributes={watchedAttributes}
          variants={variants}
          replaceVariants={replaceVariants}
          getValues={getValues}
        />

        <ProductVariantsCard
          fields={variantFields}
          watchedVariants={watchedVariants}
          register={register}
          control={control}
          setValue={setValue}
          remove={removeVariant}
          errors={errors}
          lowStockThreshold={lowStockThreshold}
          selectedVariantIndex={selectedVariantIndex}
          onSelectVariant={setSelectedVariantIndex}
        />
      </div>

      <aside className="space-y-6 xl:sticky xl:top-4 xl:self-start">
        <AttributesSummaryCard attributes={watchedAttributes} />

        <SelectedVariantPreviewCard variant={selectedVariant} />

        <VariationQuickActionsCard
          onGenerateVariants={handleGenerateVariants}
          onAddManualVariant={handleAddManualVariantQuick}
        />

        <AttributeVariationTipsCard />
      </aside>
    </div>
  );
};

export default ProductAttributesVariationsStep;
