export const getVariantAttributeValuesArray = (variant = {}) => {
  const values = variant.attributeValues;

  if (!values) {
    return [];
  }

  if (Array.isArray(values)) {
    return values;
  }

  return Object.values(values);
};

export const getVariantDisplayName = (variant = {}) => {
  if (variant.name) {
    return variant.name;
  }

  return getVariantAttributeValuesArray(variant)
    .map((item) => item.label || item.value)
    .filter(Boolean)
    .join(" / ");
};

export const getVariantImageUrl = (variant = {}) => {
  return (
    variant.image?.url ||
    variant.imageUrl ||
    variant.images?.[0]?.url ||
    ""
  );
};

export const isPersistedVariant = (variant = {}) => {
  return (
    Boolean(variant.variantId) ||
    variant.isExisting === true
  );
};

export const getVariantStatus = (variant = {}) => {
  if (variant.status === "active") {
    return true;
  }

  if (variant.status === "inactive") {
    return false;
  }

  return variant.status !== false;
};