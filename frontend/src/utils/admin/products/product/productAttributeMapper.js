export const mapBackendAttributeToProductAttribute = (attribute) => {
  return {
    attributeId: attribute._id,
    name: attribute.name,
    slug: attribute.slug,
    type: attribute.type,
    source: "existing",

    options: (attribute.values || []).map((item) => ({
      optionId: item.value,
      label: item.label,
      value: item.value,
      colorCode: item.colorCode || null,
      isCustom: false,
    })),
  };
};

export const isVariantAttributeType = (type) => {
  return ["dropdown", "switch"].includes(type);
};