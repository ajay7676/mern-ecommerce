export const slugifyOptionValue = (value = "") => {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export const createClientOptionId = (label = "") => {
  const slug = slugifyOptionValue(label);

  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `custom-${slug}-${crypto.randomUUID()}`;
  }

  return `custom-${slug}-${Date.now()}`;
};

export const createProductOnlyOption = ({
  label,
  colorCode = null,
}) => {
  const cleanLabel = String(label || "").trim();
  const value = slugifyOptionValue(cleanLabel);

  return {
    optionId: createClientOptionId(cleanLabel),
    label: cleanLabel,
    value,
    colorCode,
    isCustom: true,
  };
};

export const normalizeAttributeOptions = (options = []) => {
  return options.map((option) => ({
    optionId: option.optionId || option.value,
    label: option.label,
    value: option.value || slugifyOptionValue(option.label),
    colorCode: option.colorCode || null,
    isCustom: Boolean(option.isCustom),
  }));
};

export const hasDuplicateOptionValue = (options = [], value) => {
  const normalizedValue = slugifyOptionValue(value);

  return options.some((option) => {
    return String(option.value).toLowerCase() === normalizedValue;
  });
};

export const addOptionToAttribute = ({
  attributes = [],
  attributeIndex,
  option,
}) => {
  return attributes.map((attribute, index) => {
    if (index !== attributeIndex) return attribute;

    return {
      ...attribute,
      options: [...(attribute.options || []), option],
    };
  });
};

export const removeOptionFromAttribute = ({
  attributes = [],
  attributeIndex,
  optionValue,
}) => {
  return attributes.map((attribute, index) => {
    if (index !== attributeIndex) return attribute;

    return {
      ...attribute,
      options: (attribute.options || []).filter((option) => {
        return option.value !== optionValue;
      }),
    };
  });
};

export const updateOptionInAttribute = ({
  attributes = [],
  attributeIndex,
  optionValue,
  updatedOption,
}) => {
  return attributes.map((attribute, index) => {
    if (index !== attributeIndex) return attribute;

    return {
      ...attribute,
      options: (attribute.options || []).map((option) => {
        if (option.value !== optionValue) return option;

        return {
          ...option,
          ...updatedOption,
          value:
            updatedOption.value ||
            slugifyOptionValue(updatedOption.label || option.label),
        };
      }),
    };
  });
};

export const hasEmptyAttributeOptions = (attributes = []) => {
  return attributes.some((attribute) => {
    return !attribute.options || attribute.options.length === 0;
  });
};