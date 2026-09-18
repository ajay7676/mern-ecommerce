export const validateProductAttributeSnapshot = ({ attributes = [], variants = [] }) => {
  if (!attributes.length) {
    return {
      isValid: false,
      field: "attributes",
      message: "Please select at least one product attribute",
    };
  }

  for (const attribute of attributes) {
    if (!attribute.attributeId && attribute.source === "existing") {
      return {
        isValid: false,
        field: "attributes",
        message: `${attribute.name || "Attribute"} is missing attribute id`,
      };
    }

    if (!attribute.name?.trim()) {
      return {
        isValid: false,
        field: "attributes",
        message: "Attribute name is required",
      };
    }

    if (!["dropdown", "switch"].includes(attribute.type)) {
      return {
        isValid: false,
        field: "attributes",
        message: `${attribute.name} is not valid for variations`,
      };
    }

    if (!attribute.options?.length) {
      return {
        isValid: false,
        field: "attributes",
        message: `${attribute.name} must have at least one option`,
      };
    }

    const optionValues = attribute.options.map((option) => option.value);
    const uniqueOptionValues = new Set(optionValues);

    if (optionValues.length !== uniqueOptionValues.size) {
      return {
        isValid: false,
        field: "attributes",
        message: `${attribute.name} has duplicate options`,
      };
    }

    for (const option of attribute.options) {
      if (!option.label?.trim() || !option.value?.trim()) {
        return {
          isValid: false,
          field: "attributes",
          message: `${attribute.name} has invalid option`,
        };
      }

      if (attribute.type === "switch" && !option.colorCode) {
        return {
          isValid: false,
          field: "attributes",
          message: `${option.label} color code is required`,
        };
      }
    }
  }

  if (!variants.length) {
    return {
      isValid: false,
      field: "variants",
      message: "Please generate variants after selecting attributes",
    };
  }

  return {
    isValid: true,
    field: null,
    message: "",
  };
};