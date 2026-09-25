/**
 * Convert label into stable option value.
 *
 * Example:
 * "Navy Blue" -> "navy-blue"
 */
export const slugifyOptionValue = (value = "") => {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

/**
 * Create frontend-only id for custom product option.
 */
export const createClientOptionId = (label = "") => {
  const slug = slugifyOptionValue(label);

  if (
    typeof crypto !== "undefined" &&
    crypto.randomUUID
  ) {
    return `custom-${slug}-${crypto.randomUUID()}`;
  }

  return `custom-${slug}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}`;
};

/**
 * Create option that exists only inside this product.
 *
 * It does NOT update global Attribute collection.
 */
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

/**
 * Normalize options coming from backend/global attribute.
 */
export const normalizeAttributeOptions = (options = []) => {
  return options.map((option) => ({
    optionId:
      option.optionId ||
      option.value,

    label:
      option.label || "",

    value:
      option.value ||
      slugifyOptionValue(option.label),

    colorCode:
      option.colorCode || null,

    isCustom:
      Boolean(option.isCustom),
  }));
};

/**
 * Create editable product snapshot from global attribute.
 *
 * Important:
 * We don't edit original React Query/global attribute object.
 */
export const createProductAttributeSnapshot = (attribute = {}) => {
  return {
    attributeId:
      attribute.attributeId ||
      attribute._id ||
      attribute.id ||
      null,

    name:
      attribute.name || "",

    slug:
      attribute.slug ||
      slugifyOptionValue(attribute.name),

    type:
      attribute.type || "dropdown",

    source:
      "existing",

    options: normalizeAttributeOptions(
      attribute.options ||
        attribute.values ||
        []
    ),
  };
};

/**
 * Check duplicate option value.
 *
 * Used while adding custom option.
 */
export const hasDuplicateOptionValue = (
  options = [],
  value,
  ignoreOptionId = null
) => {
  const normalizedValue =
    slugifyOptionValue(value);

  return options.some((option) => {
    const currentOptionId =
      option.optionId ||
      option.value;

    if (
      ignoreOptionId &&
      String(currentOptionId) ===
        String(ignoreOptionId)
    ) {
      return false;
    }

    return (
      String(option.value || "")
        .trim()
        .toLowerCase() ===
      normalizedValue.toLowerCase()
    );
  });
};

/**
 * -------------------------------------------------------
 * ADD OPTION TO ATTRIBUTE
 * -------------------------------------------------------
 *
 * Returns NEW attributes array.
 * Does not mutate original state.
 */
export const addOptionToAttribute = ({
  attributes = [],
  attributeIndex,
  option,
}) => {
  return attributes.map(
    (attribute, index) => {
      if (index !== attributeIndex) {
        return attribute;
      }

      return {
        ...attribute,

        options: [
          ...(attribute.options || []),
          option,
        ],
      };
    }
  );
};

/**
 * -------------------------------------------------------
 * REMOVE OPTION FROM ATTRIBUTE
 * -------------------------------------------------------
 *
 * Removes using stable option.value.
 */
export const removeOptionFromAttribute = ({
  attributes = [],
  attributeIndex,
  optionValue,
}) => {
  return attributes.map(
    (attribute, index) => {
      if (index !== attributeIndex) {
        return attribute;
      }

      return {
        ...attribute,

        options: (
          attribute.options || []
        ).filter(
          (option) =>
            String(option.value) !==
            String(optionValue)
        ),
      };
    }
  );
};

/**
 * -------------------------------------------------------
 * UPDATE OPTION IN ATTRIBUTE
 * -------------------------------------------------------
 *
 * optionValue identifies the existing option.
 *
 * Important:
 * For persisted/edit product options we normally keep
 * updatedOption.value equal to old option.value.
 */
export const updateOptionInAttribute = ({
  attributes = [],
  attributeIndex,
  optionValue,
  updatedOption,
}) => {
  return attributes.map(
    (attribute, index) => {
      if (index !== attributeIndex) {
        return attribute;
      }

      return {
        ...attribute,

        options: (
          attribute.options || []
        ).map((option) => {
          if (
            String(option.value) !==
            String(optionValue)
          ) {
            return option;
          }

          return {
            ...option,
            ...updatedOption,

            /**
             * Keep original optionId when caller
             * doesn't provide another one.
             */
            optionId:
              updatedOption.optionId ||
              option.optionId ||
              option.value,
          };
        }),
      };
    }
  );
};

/**
 * Optional dedicated helper.
 *
 * Useful if you prefer editing option directly
 * without updateOptionInAttribute().
 */
export const updateProductAttributeOption = ({
  options = [],
  optionId,
  label,
  colorCode,
}) => {
  const cleanLabel =
    String(label || "").trim();

  if (!cleanLabel) {
    throw new Error(
      "Option label is required"
    );
  }

  return options.map((option) => {
    const currentOptionId =
      option.optionId ||
      option.value;

    if (
      String(currentOptionId) !==
      String(optionId)
    ) {
      return option;
    }

    return {
      ...option,

      label:
        cleanLabel,

      colorCode:
        colorCode !== undefined
          ? colorCode || null
          : option.colorCode,

      /**
       * Important:
       * don't regenerate value when only label changes.
       */
      value:
        option.value,

      optionId:
        option.optionId ||
        option.value,

      isCustom:
        Boolean(option.isCustom),
    };
  });
};