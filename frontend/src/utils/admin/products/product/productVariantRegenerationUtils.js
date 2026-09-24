const slugify = (value = "") => {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

const createClientId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

export const getAttributeKey = (attribute = {}) => {
  return attribute.slug || attribute.name;
};

export const createProductOnlyOption = ({ label, colorCode = null }) => {
  const cleanLabel = String(label || "").trim();

  return {
    optionId: `custom-${slugify(cleanLabel)}-${createClientId()}`,
    label: cleanLabel,
    value: slugify(cleanLabel),
    colorCode,
    isCustom: true,
  };
};

export const buildOptionSignatureFromCombination = (combination = []) => {
  return combination
    .map(({ attribute, option }) => {
      const attributeKey = getAttributeKey(attribute);
      return `${attributeKey}:${option.value}`;
    })
    .join("|");
};

export const buildOptionSignatureFromVariant = (variant = {}) => {
  if (variant.optionSignature) return variant.optionSignature;

  const values = variant.attributeValues || {};
  const valuesArray = Array.isArray(values) ? values : Object.values(values);

  return valuesArray
    .map((item) => {
      const attributeKey = item.attributeSlug || item.attributeName;
      return `${attributeKey}:${item.value}`;
    })
    .sort()
    .join("|");
};

const buildVariantAttributeValues = (combination = []) => {
  return combination.reduce((acc, { attribute, option }) => {
    const attributeKey = getAttributeKey(attribute);

    acc[attributeKey] = {
      attributeId: attribute.attributeId || null,
      attributeName: attribute.name,
      attributeSlug: attribute.slug || attribute.name,
      optionId: option.optionId || option.value,
      label: option.label,
      value: option.value,
      colorCode: option.colorCode || null,
      isCustom: Boolean(option.isCustom),
    };

    return acc;
  }, {});
};

const getCartesianProduct = (optionGroups = []) => {
  return optionGroups.reduce(
    (acc, group) => {
      return acc.flatMap((existing) => {
        return group.map((item) => [...existing, item]);
      });
    },
    [[]]
  );
};

const buildVariantName = ({ productName, combination }) => {
  const optionLabels = combination.map(({ option }) => option.label).join(" / ");

  return optionLabels ? `${productName} - ${optionLabels}` : productName;
};

const buildVariantSku = ({ baseSku, combination, index }) => {
  const suffix = combination
    .map(({ option }) => slugify(option.value || option.label).toUpperCase())
    .filter(Boolean)
    .join("-");

  if (baseSku && suffix) return `${baseSku}-${suffix}`;

  if (baseSku) return `${baseSku}-${index + 1}`;

  return `VARIANT-${index + 1}`;
};

const getPrimaryProductImage = (productImages = []) => {
  return productImages.find((image) => image.isPrimary) || productImages[0] || null;
};

export const countVariantsUsingOption = ({
  variants = [],
  attribute,
  option,
}) => {
  const attributeKey = getAttributeKey(attribute);

  return variants.filter((variant) => {
    const values = variant.attributeValues || {};
    const valuesArray = Array.isArray(values) ? values : Object.values(values);

    return valuesArray.some((item) => {
      const currentAttributeKey = item.attributeSlug || item.attributeName;

      return (
        currentAttributeKey === attributeKey &&
        item.value === option.value
      );
    });
  }).length;
};

export const reconcileVariantsWithAttributes = ({
  attributes = [],
  currentVariants = [],
  productName = "",
  baseSku = "",
  sellingPrice = "",
  stockQuantity = "",
  productImages = [],
}) => {
  const usableAttributes = attributes
    .map((attribute) => ({
      ...attribute,
      options: (attribute.options || []).filter(
        (option) => option.label && option.value
      ),
    }))
    .filter((attribute) => attribute.name && attribute.options.length > 0);

  if (!usableAttributes.length) {
    return {
      nextVariants: [],
      removedVariants: currentVariants,
      report: {
        total: 0,
        preserved: 0,
        created: 0,
        removed: currentVariants.length,
      },
    };
  }

  const optionGroups = usableAttributes.map((attribute) => {
    return attribute.options.map((option) => ({
      attribute,
      option,
    }));
  });

  const combinations = getCartesianProduct(optionGroups);

  const existingVariantMap = new Map();

  currentVariants.forEach((variant) => {
    const signature = buildOptionSignatureFromVariant(variant);

    if (signature) {
      existingVariantMap.set(signature, variant);
    }
  });

  const primaryImage = getPrimaryProductImage(productImages);

  let created = 0;
  let preserved = 0;

  const nextVariants = combinations.map((combination, index) => {
    const optionSignature = buildOptionSignatureFromCombination(combination);
    const existingVariant = existingVariantMap.get(optionSignature);
    const attributeValues = buildVariantAttributeValues(combination);

    if (existingVariant) {
      preserved += 1;

      return {
        ...existingVariant,
        attributeValues,
        optionSignature,
        sortOrder: index + 1,
        isNew: false,
        isRemoved: false,
      };
    }

    created += 1;

    return {
      variantId: "",
      name: buildVariantName({
        productName,
        combination,
      }),
      sku: buildVariantSku({
        baseSku,
        combination,
        index,
      }),
      price: String(sellingPrice || ""),
      stock: String(stockQuantity || "0"),
      status: true,
      source: "auto",

      imageUrl: primaryImage?.url || "",
      image: primaryImage
        ? {
            publicId: primaryImage.publicId,
            url: primaryImage.url,
            isExisting: Boolean(primaryImage.isExisting),
            isTemporary: Boolean(primaryImage.isTemporary),
            assetState: primaryImage.assetState || "permanent",
          }
        : {
            publicId: null,
            url: null,
          },

      images: [],
      attributeValues,
      optionSignature,
      sortOrder: index + 1,
      isNew: true,
      isRemoved: false,
    };
  });

  const nextSignatureSet = new Set(
    nextVariants.map((variant) => variant.optionSignature)
  );

  const removedVariants = currentVariants.filter((variant) => {
    const signature = buildOptionSignatureFromVariant(variant);
    return signature && !nextSignatureSet.has(signature);
  });

  return {
    nextVariants,
    removedVariants,
    report: {
      total: nextVariants.length,
      preserved,
      created,
      removed: removedVariants.length,
    },
  };
};
