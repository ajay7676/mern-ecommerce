const getVariantAttributeValues = (
  variant = {}
) => {
  const values = variant.attributeValues;

  if (!values) {
    return [];
  }

  if (Array.isArray(values)) {
    return values;
  }

  return Object.values(values);
};

const getAttributeIdentity = (
  attribute = {}
) => {
  return {
    attributeId:
      attribute.attributeId || null,

    slug:
      attribute.slug || null,

    name:
      attribute.name || null,
  };
};

export const variantUsesAttributeOption = ({
  variant,
  attribute,
  option,
}) => {
  const values =
    getVariantAttributeValues(variant);

  const attributeIdentity =
    getAttributeIdentity(attribute);

  return values.some((item) => {
    const sameAttribute =
      (attributeIdentity.attributeId &&
        item.attributeId &&
        String(item.attributeId) ===
          String(
            attributeIdentity.attributeId
          )) ||
      (attributeIdentity.slug &&
        item.attributeSlug &&
        item.attributeSlug ===
          attributeIdentity.slug) ||
      item.attributeName ===
        attributeIdentity.name;

    if (!sameAttribute) {
      return false;
    }

    return (
      String(item.optionId || "") ===
        String(option.optionId || "") ||
      String(item.value || "") ===
        String(option.value || "")
    );
  });
};

export const getVariantsUsingOption = ({
  variants = [],
  attribute,
  option,
}) => {
  return variants.filter((variant) =>
    variantUsesAttributeOption({
      variant,
      attribute,
      option,
    })
  );
};

export const countVariantsUsingOption = ({
  variants = [],
  attribute,
  option,
}) => {
  return getVariantsUsingOption({
    variants,
    attribute,
    option,
  }).length;
};