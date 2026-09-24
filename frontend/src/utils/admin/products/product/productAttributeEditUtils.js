import {
  countVariantsUsingOption,
  createProductOnlyOption,
} from "./productVariantRegenerationUtils";

export const updateAttributeOption = ({
  attributes,
  attributeIndex,
  optionIndex,
  updates,
}) => {
  return attributes.map((attribute, currentAttributeIndex) => {
    if (currentAttributeIndex !== attributeIndex) return attribute;

    return {
      ...attribute,
      options: attribute.options.map((option, currentOptionIndex) => {
        if (currentOptionIndex !== optionIndex) return option;

        return {
          ...option,

          // Important: do not change value after variants exist.
          // value is used in optionSignature.
          label: updates.label ?? option.label,
          colorCode: updates.colorCode ?? option.colorCode,
        };
      }),
    };
  });
};

export const addAttributeOption = ({
  attributes,
  attributeIndex,
  label,
  colorCode = null,
}) => {
  const cleanLabel = String(label || "").trim();

  if (!cleanLabel) {
    return {
      success: false,
      message: "Option label is required",
      attributes,
    };
  }

  return {
    success: true,
    attributes: attributes.map((attribute, currentAttributeIndex) => {
      if (currentAttributeIndex !== attributeIndex) return attribute;

      const newOption = createProductOnlyOption({
        label: cleanLabel,
        colorCode,
      });

      const duplicate = (attribute.options || []).some(
        (option) => option.value === newOption.value
      );

      if (duplicate) {
        throw new Error("This option already exists");
      }

      return {
        ...attribute,
        options: [...(attribute.options || []), newOption],
      };
    }),
  };
};

export const removeAttributeOption = ({
  attributes,
  variants,
  attributeIndex,
  optionIndex,
}) => {
  const attribute = attributes[attributeIndex];
  const option = attribute?.options?.[optionIndex];

  if (!attribute || !option) {
    return {
      success: false,
      message: "Option not found",
      affectedVariantsCount: 0,
      attributes,
    };
  }

  const affectedVariantsCount = countVariantsUsingOption({
    variants,
    attribute,
    option,
  });

  const nextAttributes = attributes.map((item, currentAttributeIndex) => {
    if (currentAttributeIndex !== attributeIndex) return item;

    return {
      ...item,
      options: item.options.filter(
        (_, currentOptionIndex) => currentOptionIndex !== optionIndex
      ),
    };
  });

  return {
    success: true,
    affectedVariantsCount,
    removedOption: option,
    attributes: nextAttributes,
  };
};