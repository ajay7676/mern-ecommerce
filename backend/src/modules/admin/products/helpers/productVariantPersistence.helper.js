import HandleError from "../../../../utils/handleError.js";

/**
 * Build CREATE / UPDATE / DELETE plan
 * without touching MongoDB.
 */
export const buildProductVariantPersistencePlan = ({
  productId,
  existingVariants = [],
  incomingVariants = [],
}) => {
  /**
   * Existing DB variants indexed by _id.
   */
  const existingById =
    new Map(
      existingVariants.map(
        (variant) => [
          String(variant._id),
          variant,
        ]
      )
    );

  const seenIncomingVariantIds =
    new Set();

  const variantsToUpdate = [];
  const variantsToCreate = [];

  /**
   * --------------------------------------------
   * PROCESS INCOMING VARIANTS
   * --------------------------------------------
   */
  for (const incomingVariant of incomingVariants) {
    const incomingVariantId =
      incomingVariant?._id
        ? String(
            incomingVariant._id
          )
        : null;

    /**
     * NEW VARIANT
     */
    if (!incomingVariantId) {
      const {
        _id,
        ...createData
      } =
        incomingVariant;

      variantsToCreate.push(
        createData
      );

      continue;
    }

    /**
     * DUPLICATE incoming variantId
     */
    if (
      seenIncomingVariantIds.has(
        incomingVariantId
      )
    ) {
      throw new HandleError(
        "Duplicate variant id",
        400,
        {
          variants:
            `Variant ${incomingVariantId} appears more than once`,
        }
      );
    }

    seenIncomingVariantIds.add(
      incomingVariantId
    );

    /**
     * SECURITY / INTEGRITY CHECK
     *
     * The supplied variant must already belong
     * to this product.
     */
    const existingVariant =
      existingById.get(
        incomingVariantId
      );

    if (!existingVariant) {
      throw new HandleError(
        "Invalid product variant",
        400,
        {
          variants:
            "One or more variant IDs do not belong to this product",
        }
      );
    }

    /**
     * Don't allow immutable DB identity fields
     * into $set.
     */
    const {
      _id,
      product,
      createdAt,
      createdBy,
      ...updateData
    } =
      incomingVariant;

    variantsToUpdate.push({
      variantId:
        existingVariant._id,

      update: {
        ...updateData,

        product:
          productId,

        /**
         * Preserve original creator.
         */
        createdBy:
          existingVariant.createdBy,
      },
    });
  }

  /**
   * --------------------------------------------
   * FIND DELETED VARIANTS
   * --------------------------------------------
   *
   * Existing DB variant is removed when its ID
   * is not present in the incoming variant list.
   */
  const variantsToDelete =
    existingVariants.filter(
      (variant) => {
        return !seenIncomingVariantIds.has(
          String(variant._id)
        );
      }
    );

  return {
    variantsToUpdate,
    variantsToCreate,
    variantsToDelete,

    report: {
      existing:
        existingVariants.length,

      incoming:
        incomingVariants.length,

      update:
        variantsToUpdate.length,

      create:
        variantsToCreate.length,

      delete:
        variantsToDelete.length,
    },
  };
};

export const preserveSimpleDefaultVariantId = ({
  productType,
  existingVariants = [],
  incomingVariants = [],
}) => {
  if (
    productType !== "simple"
  ) {
    return incomingVariants;
  }

  if (
    incomingVariants.length !==
    1
  ) {
    return incomingVariants;
  }

  const incomingVariant =
    incomingVariants[0];

  /**
   * Already has identity.
   */
  if (incomingVariant._id) {
    return incomingVariants;
  }

  const existingDefaultVariant =
    existingVariants.find(
      (variant) =>
        variant.optionSignature ===
          "default" ||
        variant.source ===
          "default"
    );

  if (
    !existingDefaultVariant
  ) {
    return incomingVariants;
  }

  return [
    {
      ...incomingVariant,

      _id:
        existingDefaultVariant._id,
    },
  ];
};