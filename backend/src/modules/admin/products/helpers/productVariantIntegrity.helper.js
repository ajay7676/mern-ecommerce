import mongoose from "mongoose";
import HandleError from '../../../../utils/handleError.js'

/**
 * -----------------------------------------------------
 * BASIC NORMALIZATION HELPERS
 * -----------------------------------------------------
 */

const cleanString = (value = "") => {
  return String(value ?? "").trim();
};

const normalizeValue = (value = "") => {
  return cleanString(value).toLowerCase();
};

const normalizeSku = (value = "") => {
  return cleanString(value).toUpperCase();
};

/**
 * -----------------------------------------------------
 * VARIANT ATTRIBUTE VALUES
 * -----------------------------------------------------
 *
 * Supports both:
 *
 * attributeValues: []
 *
 * and:
 *
 * attributeValues: {}
 */

const getVariantAttributeValues = (variant = {}) => {
  const values =
    variant.attributeValues ||
    variant.attributes ||
    [];

  if (Array.isArray(values)) {
    return values;
  }

  return Object.values(values);
};

/**
 * -----------------------------------------------------
 * ATTRIBUTE IDENTITY
 * -----------------------------------------------------
 */

const getAttributeKey = (attribute = {}) => {
  return (
    normalizeValue(attribute.attributeSlug) ||
    normalizeValue(attribute.slug) ||
    normalizeValue(attribute.attributeId) ||
    normalizeValue(attribute.attributeName) ||
    normalizeValue(attribute.name)
  );
};

/**
 * -----------------------------------------------------
 * NORMALIZE PRODUCT ATTRIBUTE SNAPSHOTS
 * -----------------------------------------------------
 */

const normalizeProductAttributes = (
  attributes = [],
) => {
  return attributes.map((attribute) => {
    return {
      attributeId:
        attribute.attributeId || null,

      name:
        cleanString(attribute.name),

      slug:
        cleanString(attribute.slug),

      key:
        getAttributeKey(attribute),

      options: (
        attribute.options ||
        attribute.values ||
        []
      ).map((option) => ({
        optionId:
          option.optionId || null,

        label:
          cleanString(option.label),

        value:
          cleanString(option.value),

        normalizedValue:
          normalizeValue(
            option.value,
          ),
      })),
    };
  });
};

/**
 * -----------------------------------------------------
 * 1. VALIDATE VARIANT IDS
 * -----------------------------------------------------
 *
 * Existing frontend variantId must belong to
 * the product currently being edited.
 */

const validateVariantIds = ({
  variants = [],
  existingVariants = [],
}) => {
  const existingVariantIds =
    new Set(
      existingVariants.map((variant) =>
        String(variant._id),
      ),
    );

  const seenVariantIds =
    new Set();

  variants.forEach((variant, index) => {
    const variantId =
      variant.variantId || null;

    /**
     * New variant.
     */
    if (!variantId) {
      return;
    }

    if (
      !mongoose.isValidObjectId(
        variantId,
      )
    ) {
      throw new HandleError(
        "Invalid variant ID",
        400,
        {
          [`variants.${index}.variantId`]:
            "Variant ID is invalid",
        },
      );
    }

    const normalizedId =
      String(variantId);

    /**
     * Same variantId cannot appear twice.
     */
    if (
      seenVariantIds.has(
        normalizedId,
      )
    ) {
      throw new HandleError(
        "Duplicate variant ID",
        400,
        {
          [`variants.${index}.variantId`]:
            "This variant appears more than once",
        },
      );
    }

    seenVariantIds.add(
      normalizedId,
    );

    /**
     * SECURITY CHECK.
     *
     * It must belong to this product.
     */
    if (
      !existingVariantIds.has(
        normalizedId,
      )
    ) {
      throw new HandleError(
        "Invalid product variant",
        400,
        {
          [`variants.${index}.variantId`]:
            "This variant does not belong to this product",
        },
      );
    }
  });
};

/**
 * -----------------------------------------------------
 * 2. VALIDATE ATTRIBUTE OPTIONS
 * -----------------------------------------------------
 */

const validateVariantOptions = ({
  variant,
  variantIndex,
  productAttributes,
}) => {
  const variantValues =
    getVariantAttributeValues(
      variant,
    );

  const seenAttributes =
    new Set();

  for (const variantValue of variantValues) {
    const attributeKey =
      getAttributeKey(
        variantValue,
      );

    if (!attributeKey) {
      throw new HandleError(
        "Invalid variant attribute",
        400,
        {
          [`variants.${variantIndex}.attributeValues`]:
            "Variant attribute identity is missing",
        },
      );
    }

    /**
     * Prevent this:
     *
     * Storage = 128GB
     * Storage = 256GB
     *
     * inside one variant.
     */
    if (
      seenAttributes.has(
        attributeKey,
      )
    ) {
      throw new HandleError(
        "Duplicate variant attribute",
        400,
        {
          [`variants.${variantIndex}.attributeValues`]:
            `Attribute "${attributeKey}" appears more than once`,
        },
      );
    }

    seenAttributes.add(
      attributeKey,
    );

    /**
     * Does product have this attribute?
     */
    const productAttribute =
      productAttributes.find(
        (attribute) =>
          attribute.key ===
          attributeKey,
      );

    if (!productAttribute) {
      throw new HandleError(
        "Unknown variant attribute",
        400,
        {
          [`variants.${variantIndex}.attributeValues`]:
            `Attribute "${attributeKey}" does not exist on this product`,
        },
      );
    }

    const optionValue =
      normalizeValue(
        variantValue.value,
      );

    /**
     * Does this option actually exist?
     */
    const optionExists =
      productAttribute.options.some(
        (option) =>
          option.normalizedValue ===
          optionValue,
      );

    if (!optionExists) {
      throw new HandleError(
        "Invalid variant option",
        400,
        {
          [`variants.${variantIndex}.attributeValues`]:
            `Option "${variantValue.value}" does not exist for "${productAttribute.name}"`,
        },
      );
    }
  }
};

/**
 * -----------------------------------------------------
 * 3. VALIDATE COMPLETE AUTO VARIANT
 * -----------------------------------------------------
 */

const validateCompleteAutoVariant = ({
  variant,
  variantIndex,
  productAttributes,
}) => {
  if (
    variant.source === "manual"
  ) {
    return;
  }

  const variantAttributeKeys =
    new Set(
      getVariantAttributeValues(
        variant,
      ).map((item) =>
        getAttributeKey(item),
      ),
    );

  for (const attribute of productAttributes) {
    if (
      !variantAttributeKeys.has(
        attribute.key,
      )
    ) {
      throw new HandleError(
        "Incomplete variant combination",
        400,
        {
          [`variants.${variantIndex}.attributeValues`]:
            `Variant is missing "${attribute.name}"`,
        },
      );
    }
  }
};

/**
 * -----------------------------------------------------
 * 4. GENERATE TRUSTED OPTION SIGNATURE
 * -----------------------------------------------------
 */

export const buildCanonicalVariantSignature = (
  variant = {},
) => {
  return getVariantAttributeValues(
    variant,
  )
    .map((item) => ({
      attributeKey:
        getAttributeKey(item),

      value:
        normalizeValue(
          item.value,
        ),
    }))
    .filter(
      (item) =>
        item.attributeKey &&
        item.value,
    )
    .sort((a, b) =>
      a.attributeKey.localeCompare(
        b.attributeKey,
      ),
    )
    .map(
      (item) =>
        `${item.attributeKey}:${item.value}`,
    )
    .join("|");
};

/**
 * -----------------------------------------------------
 * 5. UNIQUE COMBINATIONS
 * -----------------------------------------------------
 */

const buildValidatedVariants = (
  variants = [],
) => {
  const seenSignatures =
    new Map();

  return variants.map(
    (variant, index) => {
      const signature =
        buildCanonicalVariantSignature(
          variant,
        );

      if (!signature) {
        throw new HandleError(
          "Invalid variant combination",
          400,
          {
            [`variants.${index}.optionSignature`]:
              "Variant combination cannot be empty",
          },
        );
      }

      if (
        seenSignatures.has(
          signature,
        )
      ) {
        throw new HandleError(
          "Duplicate variant combination",
          400,
          {
            [`variants.${index}.optionSignature`]:
              "Same variant combination already exists",
          },
        );
      }

      seenSignatures.set(
        signature,
        index,
      );

      /**
       * IMPORTANT:
       *
       * Ignore frontend optionSignature.
       * Backend creates a trusted one.
       */
      return {
        ...variant,

        optionSignature:
          signature,
      };
    },
  );
};

/**
 * -----------------------------------------------------
 * 6. UNIQUE SKUS
 * -----------------------------------------------------
 */

const validateUniqueVariantSkus = (
  variants = [],
) => {
  const seenSkus =
    new Map();

  variants.forEach(
    (variant, index) => {
      const sku =
        normalizeSku(
          variant.sku,
        );

      if (!sku) {
        throw new HandleError(
          "Variant SKU is required",
          400,
          {
            [`variants.${index}.sku`]:
              "Variant SKU is required",
          },
        );
      }

      if (
        seenSkus.has(sku)
      ) {
        throw new HandleError(
          "Duplicate variant SKU",
          400,
          {
            [`variants.${index}.sku`]:
              `SKU "${sku}" is used by another variant`,
          },
        );
      }

      seenSkus.set(
        sku,
        index,
      );
    },
  );
};

/**
 * -----------------------------------------------------
 * 7. IMAGE URL VALIDATION
 * -----------------------------------------------------
 */

const isUnsafeImageUrl = (
  value = "",
) => {
  const url =
    normalizeValue(value);

  return (
    url.startsWith("blob:") ||
    url.startsWith("data:")
  );
};

const validateVariantImageUrls = (
  variants = [],
) => {
  variants.forEach(
    (variant, variantIndex) => {
      const images = [
        variant.image,
        ...(variant.images || []),
      ].filter(Boolean);

      images.forEach(
        (image, imageIndex) => {
          if (
            isUnsafeImageUrl(
              image.url,
            )
          ) {
            throw new HandleError(
              "Invalid variant image",
              400,
              {
                [`variants.${variantIndex}.images.${imageIndex}.url`]:
                  "Blob or data URLs cannot be saved",
              },
            );
          }
        },
      );
    },
  );
};

/**
 * -----------------------------------------------------
 * 8. COLLECT ALL VARIANT IMAGES
 * -----------------------------------------------------
 */

const collectVariantImages = (
  variants = [],
) => {
  return variants.flatMap(
    (variant, variantIndex) => {
      const images = [];

      if (
        variant.image?.publicId
      ) {
        images.push({
          ...variant.image,

          variantIndex,

          usage:
            "variant-main",
        });
      }

      (
        variant.images || []
      ).forEach(
        (image, imageIndex) => {
          if (
            !image?.publicId
          ) {
            return;
          }

          images.push({
            ...image,

            variantIndex,

            imageIndex,

            usage:
              "variant-extra",
          });
        },
      );

      return images;
    },
  );
};

/**
 * -----------------------------------------------------
 * 9. COLLECT CURRENT PRODUCT IMAGE IDS
 * -----------------------------------------------------
 *
 * These are trusted because they come from MongoDB.
 */

const collectExistingProductImageIds = ({
  product,
  existingVariants = [],
}) => {
  const publicIds =
    new Set();

  const productImages =
    product.images ||
    product.media?.images ||
    [];

  for (const image of productImages) {
    if (image?.publicId) {
      publicIds.add(
        String(
          image.publicId,
        ),
      );
    }
  }

  for (const variant of existingVariants) {
    if (
      variant.image?.publicId
    ) {
      publicIds.add(
        String(
          variant.image.publicId,
        ),
      );
    }

    for (
      const image of
      variant.images || []
    ) {
      if (
        image?.publicId
      ) {
        publicIds.add(
          String(
            image.publicId,
          ),
        );
      }
    }
  }

  return publicIds;
};

/**
 * -----------------------------------------------------
 * MAIN PURE VALIDATOR
 * -----------------------------------------------------
 */

export const validateProductVariantIntegrity = ({
  variants = [],
  attributes = [],
  existingVariants = [],
  product,
}) => {
  const productAttributes =
    normalizeProductAttributes(
      attributes,
    );

  /**
   * 1. Existing Mongo variant IDs.
   */
  validateVariantIds({
    variants,
    existingVariants,
  });

  /**
   * 2. Attribute / option validation.
   */
  variants.forEach(
    (variant, variantIndex) => {
      validateVariantOptions({
        variant,
        variantIndex,
        productAttributes,
      });

      validateCompleteAutoVariant({
        variant,
        variantIndex,
        productAttributes,
      });
    },
  );

  /**
   * 3. Duplicate SKU validation.
   */
  validateUniqueVariantSkus(
    variants,
  );

  /**
   * 4. Reject browser URLs.
   */
  validateVariantImageUrls(
    variants,
  );

  /**
   * 5. Generate trusted signatures and
   * reject duplicate combinations.
   */
  const validatedVariants =
    buildValidatedVariants(
      variants,
    );

  /**
   * 6. Collect incoming images.
   */
  const variantImages =
    collectVariantImages(
      validatedVariants,
    );

  /**
   * 7. Trusted existing product images.
   */
  const existingProductImageIds =
    collectExistingProductImageIds({
      product,
      existingVariants,
    });

  return {
    variants:
      validatedVariants,

    variantImages,

    existingProductImageIds,
  };
};