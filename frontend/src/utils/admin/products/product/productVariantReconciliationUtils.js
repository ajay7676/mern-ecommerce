const MAX_GENERATED_VARIANTS = 100;

/**
 * -------------------------------------------------------
 * Basic helpers
 * -------------------------------------------------------
 */

const cleanString = (value = "") => {
  return String(value ?? "").trim();
};

const slugify = (value = "") => {
  return cleanString(value)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

const createClientId = () => {
  if (
    typeof crypto !== "undefined" &&
    crypto.randomUUID
  ) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}`;
};

/**
 * Attribute identity must remain stable.
 *
 * Prefer slug.
 * Then backend id.
 * Finally name.
 */
export const getAttributeKey = (
  attribute = {}
) => {
  return (
    cleanString(attribute.slug) ||
    cleanString(attribute.attributeId) ||
    slugify(attribute.name)
  );
};

/**
 * Option identity.
 *
 * IMPORTANT:
 * value should remain stable when only label/color changes.
 */
export const getOptionValue = (
  option = {}
) => {
  return (
    cleanString(option.value) ||
    slugify(option.label)
  );
};

export const buildCanonicalOptionSignature = (items = []) => {
  return items
    .map((item) => ({
      attributeKey: cleanString(
        item.attributeKey
      ).toLowerCase(),

      value: cleanString(
        item.value
      ).toLowerCase(),
    }))
    .filter(
      (item) =>
        item.attributeKey &&
        item.value
    )
    .sort((a, b) =>
      a.attributeKey.localeCompare(
        b.attributeKey
      )
    )
    .map(
      (item) =>
        `${item.attributeKey}:${item.value}`
    )
    .join("|");
};

const getVariantAttributeValuesArray = (variant = {}) => {
  const values = variant.attributeValues;

  if (!values) {
    return [];
  }

  if (Array.isArray(values)) {
    return values;
  }

  return Object.entries(values).map(
    ([attributeKey, value]) => ({
      attributeKey,
      ...value,
    })
  );
};

export const buildVariantOptionSignature = (variant = {}) => {
  const values =
    getVariantAttributeValuesArray(variant);

  if (values.length) {
    return buildCanonicalOptionSignature(
      values.map((item) => ({
        attributeKey:
          item.attributeSlug ||
          item.attributeKey ||
          item.attributeName ||
          item.attributeId,

        value:
          item.value ||
          item.optionId,
      }))
    );
  }

  if (variant.optionSignature) {
    const parts = String(
      variant.optionSignature
    )
      .split("|")
      .map((part) => {
        const separatorIndex =
          part.indexOf(":");

        if (separatorIndex === -1) {
          return null;
        }

        return {
          attributeKey: part
            .slice(0, separatorIndex)
            .trim(),

          value: part
            .slice(separatorIndex + 1)
            .trim(),
        };
      })
      .filter(Boolean);

    return buildCanonicalOptionSignature(parts);
  }

  return "";
};
const normalizeAttributesForGeneration = (
  attributes = []
) => {
  return attributes
    .map((attribute) => {
      const attributeKey =
        getAttributeKey(attribute);

      const options = (
        attribute.options || []
      )
        .map((option) => ({
          ...option,

          optionId:
            option.optionId ||
            option.value,

          label: cleanString(
            option.label
          ),

          value:
            getOptionValue(option),

          colorCode:
            option.colorCode || null,

          isCustom:
            Boolean(option.isCustom),
        }))
        .filter(
          (option) =>
            option.label &&
            option.value
        );

      return {
        ...attribute,
        attributeKey,
        options,
      };
    })
    .filter(
      (attribute) =>
        attribute.attributeKey &&
        attribute.name &&
        attribute.options.length > 0
    );
};

const validateAttributesForGeneration = (
  attributes = []
) => {
  if (!attributes.length) {
    return {
      valid: false,
      message:
        "At least one attribute is required.",
    };
  }

  for (const attribute of attributes) {
    if (!attribute.options?.length) {
      return {
        valid: false,
        message: `${attribute.name} must contain at least one option.`,
      };
    }

    const optionValues =
      attribute.options.map(
        (option) =>
          getOptionValue(option)
      );

    if (
      optionValues.length !==
      new Set(optionValues).size
    ) {
      return {
        valid: false,
        message: `${attribute.name} contains duplicate option values.`,
      };
    }
  }

  return {
    valid: true,
  };
};

export const getPossibleVariantCount = (
  attributes = []
) => {
  const normalizedAttributes =
    normalizeAttributesForGeneration(
      attributes
    );

  if (!normalizedAttributes.length) {
    return 0;
  }

  return normalizedAttributes.reduce(
    (total, attribute) =>
      total *
      attribute.options.length,
    1
  );
};

const buildCartesianProduct = (
  optionGroups = []
) => {
  if (!optionGroups.length) {
    return [];
  }

  return optionGroups.reduce(
    (combinations, group) => {
      return combinations.flatMap(
        (combination) =>
          group.map((item) => [
            ...combination,
            item,
          ])
      );
    },
    [[]]
  );
};

const buildVariantAttributeValues = (
  combination = []
) => {
  return combination.reduce(
    (result, { attribute, option }) => {
      const attributeKey =
        getAttributeKey(attribute);

      result[attributeKey] = {
        attributeId:
          attribute.attributeId ||
          null,

        attributeName:
          attribute.name,

        attributeSlug:
          attribute.slug ||
          attributeKey,

        optionId:
          option.optionId ||
          option.value,

        label:
          option.label,

        value:
          option.value,

        colorCode:
          option.colorCode ||
          null,

        isCustom:
          Boolean(
            option.isCustom
          ),
      };

      return result;
    },
    {}
  );
};

const buildCombinationSignature = (
  combination = []
) => {
  return buildCanonicalOptionSignature(
    combination.map(
      ({ attribute, option }) => ({
        attributeKey:
          getAttributeKey(
            attribute
          ),

        value:
          option.value,
      })
    )
  );
};

const buildVariantName = (
  combination = []
) => {
  return combination
    .map(
      ({ option }) =>
        option.label
    )
    .filter(Boolean)
    .join(" / ");
};

const buildGeneratedSku = ({
  baseSku,
  combination,
  index,
}) => {
  const cleanBaseSku =
    cleanString(baseSku)
      .toUpperCase();

  const suffix =
    combination
      .map(({ option }) =>
        slugify(
          option.value ||
            option.label
        ).toUpperCase()
      )
      .filter(Boolean)
      .join("-");

  if (
    cleanBaseSku &&
    suffix
  ) {
    return `${cleanBaseSku}-${suffix}`;
  }

  if (cleanBaseSku) {
    return `${cleanBaseSku}-${index + 1}`;
  }

  return `VAR-${index + 1}-${createClientId()
    .slice(0, 6)
    .toUpperCase()}`;
};

const getPrimaryProductImage = (
  images = []
) => {
  return (
    images.find(
      (image) =>
        image.isPrimary
    ) ||
    images[0] ||
    null
  );
};

const mapProductImageToVariantImage = (
  image
) => {
  if (
    !image?.publicId &&
    !image?.url
  ) {
    return {
      publicId: null,
      url: null,
    };
  }

  return {
    publicId:
      image.publicId || null,

    url:
      image.url || null,

    isExisting:
      Boolean(
        image.isExisting
      ),

    isTemporary:
      Boolean(
        image.isTemporary
      ),

    assetState:
      image.assetState ||
      (image.isTemporary
        ? "temporary"
        : "permanent"),
  };
};

const preserveExistingVariant = ({
  existingVariant,
  combination,
  optionSignature,
  sortOrder,
}) => {
  return {
    // First copy everything existing
    ...existingVariant,

    // Preserve backend identity
    variantId:
      existingVariant.variantId ||
      existingVariant.id ||
      existingVariant._id ||
      null,

    // Refresh only attribute-dependent data
    name:
      buildVariantName(
        combination
      ),

    attributeValues:
      buildVariantAttributeValues(
        combination
      ),

    optionSignature,

    sortOrder,

    // Explicitly preserve business data
    sku:
      existingVariant.sku ||
      "",

    price:
      existingVariant.price ??
      "",

    stock:
      existingVariant.stock ??
      "0",

    status:
      existingVariant.status ??
      true,

    source:
      existingVariant.source ||
      "auto",

    image:
      existingVariant.image || {
        publicId: null,
        url: null,
      },

    images:
      existingVariant.images ||
      [],

    // frontend metadata
    isExisting: true,
    isNew: false,
    isRemoved: false,
  };
};

const buildNewVariant = ({
  combination,
  index,
  baseSku,
  sellingPrice,
  stockQuantity,
  primaryProductImage,
}) => {
  return {
    variantId: null,

    name:
      buildVariantName(
        combination
      ),

    sku:
      buildGeneratedSku({
        baseSku,
        combination,
        index,
      }),

    price:
      String(
        sellingPrice ?? ""
      ),

    stock:
      String(
        stockQuantity ?? "0"
      ),

    status: true,

    source: "auto",

    image:
      mapProductImageToVariantImage(
        primaryProductImage
      ),

    images: [],

    attributeValues:
      buildVariantAttributeValues(
        combination
      ),

    optionSignature:
      buildCombinationSignature(
        combination
      ),

    sortOrder:
      index + 1,

    isExisting: false,
    isNew: true,
    isRemoved: false,
  };
};

export const reconcileProductVariants = ({
  attributes = [],
  existingVariants = [],

  baseSku = "",
  sellingPrice = "",
  stockQuantity = "0",

  productImages = [],

  maxVariants =
    MAX_GENERATED_VARIANTS,
}) => {
  /**
   * ---------------------------------------------
   * 1. Normalize attributes
   * ---------------------------------------------
   */

  const normalizedAttributes =
    normalizeAttributesForGeneration(
      attributes
    );

  /**
   * ---------------------------------------------
   * 2. Validate
   * ---------------------------------------------
   */

  const validation =
    validateAttributesForGeneration(
      normalizedAttributes
    );

  if (!validation.valid) {
    return {
      success: false,

      error:
        validation.message,

      nextVariants:
        existingVariants,

      preservedVariants: [],
      createdVariants: [],
      removedVariants: [],

      warnings: [],

      report: {
        previousTotal:
          existingVariants.length,

        total:
          existingVariants.length,

        preserved: 0,
        created: 0,
        removed: 0,
      },
    };
  }

  /**
   * ---------------------------------------------
   * 3. Check number of combinations
   * ---------------------------------------------
   */

  const possibleVariantCount =
    getPossibleVariantCount(
      normalizedAttributes
    );

  if (
    possibleVariantCount >
    maxVariants
  ) {
    return {
      success: false,

      error:
        `This attribute combination would create ${possibleVariantCount} variants. Maximum allowed is ${maxVariants}.`,

      nextVariants:
        existingVariants,

      preservedVariants: [],
      createdVariants: [],
      removedVariants: [],

      warnings: [],

      report: {
        previousTotal:
          existingVariants.length,

        total:
          possibleVariantCount,

        preserved: 0,
        created: 0,
        removed: 0,
      },
    };
  }

  /**
   * ---------------------------------------------
   * 4. Build all expected combinations
   * ---------------------------------------------
   */

  const optionGroups =
    normalizedAttributes.map(
      (attribute) =>
        attribute.options.map(
          (option) => ({
            attribute,
            option,
          })
        )
    );

  const combinations =
    buildCartesianProduct(
      optionGroups
    );

  /**
   * ---------------------------------------------
   * 5. Index old variants
   * ---------------------------------------------
   */

  const existingVariantMap =
    new Map();

  const duplicateSignatures =
    [];

  existingVariants.forEach(
    (variant) => {
      const signature =
        buildVariantOptionSignature(
          variant
        );

      if (!signature) {
        return;
      }

      if (
        existingVariantMap.has(
          signature
        )
      ) {
        duplicateSignatures.push(
          signature
        );

        return;
      }

      existingVariantMap.set(
        signature,
        variant
      );
    }
  );

  if (duplicateSignatures.length) {
    return {
      success: false,

      error:
        "Existing variants contain duplicate attribute combinations.",

      duplicateSignatures: [
        ...new Set(
          duplicateSignatures
        ),
      ],

      nextVariants:
        existingVariants,

      preservedVariants: [],
      createdVariants: [],
      removedVariants: [],

      warnings: [],

      report: {
        previousTotal:
          existingVariants.length,

        total:
          existingVariants.length,

        preserved: 0,
        created: 0,
        removed: 0,
      },
    };
  }

  /**
   * ---------------------------------------------
   * 6. Build next variant collection
   * ---------------------------------------------
   */

  const primaryProductImage =
    getPrimaryProductImage(
      productImages
    );

  const preservedVariants = [];
  const createdVariants = [];

  const nextSignatureSet =
    new Set();

  const nextVariants =
    combinations.map(
      (
        combination,
        index
      ) => {
        const optionSignature =
          buildCombinationSignature(
            combination
          );

        nextSignatureSet.add(
          optionSignature
        );

        const existingVariant =
          existingVariantMap.get(
            optionSignature
          );

        /**
         * Existing combination
         *
         * Preserve business data.
         */
        if (existingVariant) {
          const preserved =
            preserveExistingVariant({
              existingVariant,
              combination,
              optionSignature,

              sortOrder:
                index + 1,
            });

          preservedVariants.push(
            preserved
          );

          return preserved;
        }

        /**
         * Completely new combination
         */
        const created =
          buildNewVariant({
            combination,
            index,

            baseSku,
            sellingPrice,
            stockQuantity,

            primaryProductImage,
          });

        createdVariants.push(
          created
        );

        return created;
      }
    );

  /**
   * ---------------------------------------------
   * 7. Find old variants no longer valid
   * ---------------------------------------------
   */

  const removedVariants =
    existingVariants.filter(
      (variant) => {
        const signature =
          buildVariantOptionSignature(
            variant
          );

        if (!signature) {
          return true;
        }

        return !nextSignatureSet.has(
          signature
        );
      }
    );

  /**
   * ---------------------------------------------
   * 8. Check duplicate SKU
   * ---------------------------------------------
   */

  const normalizedSkus =
    nextVariants
      .map((variant) =>
        cleanString(
          variant.sku
        ).toLowerCase()
      )
      .filter(Boolean);

  const hasDuplicateSku =
    normalizedSkus.length !==
    new Set(
      normalizedSkus
    ).size;

  const warnings = [];

  if (hasDuplicateSku) {
    warnings.push(
      "Some variants contain duplicate SKUs. Review variant SKUs before updating the product."
    );
  }

  /**
   * ---------------------------------------------
   * 9. Return reconciliation preview
   * ---------------------------------------------
   */

  return {
    success: true,

    nextVariants,

    preservedVariants,
    createdVariants,
    removedVariants,

    warnings,

    report: {
      previousTotal:
        existingVariants.length,

      total:
        nextVariants.length,

      preserved:
        preservedVariants.length,

      created:
        createdVariants.length,

      removed:
        removedVariants.length,
    },
  };
};