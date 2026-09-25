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

  return `custom-${slug}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}`;
};

export const createProductOnlyOption = ({
  label,
  colorCode = null,
}) => {
  const cleanLabel = String(label || "").trim();

  return {
    optionId: createClientOptionId(cleanLabel),
    label: cleanLabel,
    value: slugifyOptionValue(cleanLabel),
    colorCode: colorCode || null,
    isCustom: true,
  };
};

export const normalizeAttributeOptions = (options = []) => {
  return options.map((option) => ({
    optionId: option.optionId || option.value,
    label: option.label || "",
    value:
      option.value ||
      slugifyOptionValue(option.label),

    colorCode: option.colorCode || null,

    isCustom: Boolean(option.isCustom),
  }));
};

export const hasDuplicateOptionValue = (
  options = [],
  value,
  ignoreOptionId = null
) => {
  const normalizedValue =
    slugifyOptionValue(value);

  return options.some((option) => {
    if (
      ignoreOptionId &&
      option.optionId === ignoreOptionId
    ) {
      return false;
    }

    return (
      String(option.value || "").toLowerCase() ===
      normalizedValue.toLowerCase()
    );
  });
};

/**
 * Important:
 * Copy backend/global attribute into the product form.
 *
 * Never append the raw React Query object directly.
 */
export const createProductAttributeSnapshot = (
  attribute
) => {
  return {
    attributeId:
      attribute.attributeId ||
      attribute._id ||
      attribute.id ||
      null,

    name: attribute.name || "",

    slug:
      attribute.slug ||
      slugifyOptionValue(attribute.name),

    type: attribute.type || "dropdown",

    source: "existing",

    options: normalizeAttributeOptions(
      attribute.options ||
        attribute.values ||
        []
    ),
  };
};

/**
 * Only product snapshot fields are editable here.
 *
 * We intentionally do NOT change option.value.
 *
 * value participates in variant optionSignature,
 * so changing it can break existing variants.
 */
export const updateProductAttributeOption = ({
  options = [],
  optionId,
  label,
  colorCode,
}) => {
  const cleanLabel = String(label || "").trim();

  if (!cleanLabel) {
    throw new Error("Option label is required");
  }

  return options.map((option) => {
    if (option.optionId !== optionId) {
      return option;
    }

    return {
      ...option,

      // editable product-level snapshot
      label: cleanLabel,

      colorCode:
        colorCode !== undefined
          ? colorCode || null
          : option.colorCode,

      // keep stable
      value: option.value,
      optionId: option.optionId,
    };
  });
};