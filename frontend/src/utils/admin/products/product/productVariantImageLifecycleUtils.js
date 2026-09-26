const getImagePublicId = (image = {}) => {
  return image?.publicId || image?.imageId || null;
};

export const isTemporaryProductImage = (image = {}) => {
  return (
    image?.isTemporary === true ||
    image?.assetState === "temporary"
  );
};

export const isPermanentProductImage = (image = {}) => {
  return (
    image?.isExisting === true ||
    image?.assetState === "permanent"
  );
};

export const getVariantImagePublicIds = (variant = {}) => {
  const publicIds = [];

  const mainImagePublicId =
    getImagePublicId(variant.image);

  if (mainImagePublicId) {
    publicIds.push(mainImagePublicId);
  }

  for (const image of variant.images || []) {
    const publicId =
      getImagePublicId(image);

    if (publicId) {
      publicIds.push(publicId);
    }
  }

  return [...new Set(publicIds)];
};

export const getVariantTemporaryImagePublicIds = (
  variant = {},
) => {
  const publicIds = [];

  if (
    isTemporaryProductImage(variant.image)
  ) {
    const publicId =
      getImagePublicId(variant.image);

    if (publicId) {
      publicIds.push(publicId);
    }
  }

  for (const image of variant.images || []) {
    if (!isTemporaryProductImage(image)) {
      continue;
    }

    const publicId =
      getImagePublicId(image);

    if (publicId) {
      publicIds.push(publicId);
    }
  }

  return [...new Set(publicIds)];
};

const getProductImagePublicIds = (
  images = [],
) => {
  return images
    .map(getImagePublicId)
    .filter(Boolean);
};

/**
 * Find TEMP images belonging to variants removed by
 * regeneration.
 *
 * Important:
 * Do not delete a temp image if the same publicId is
 * still referenced by:
 *
 * - another kept variant
 * - product media images
 */
export const getTemporaryVariantImagesToCleanup = ({
  removedVariants = [],
  nextVariants = [],
  productImages = [],
}) => {
  const protectedPublicIds =
    new Set([
      ...getProductImagePublicIds(
        productImages,
      ),

      ...nextVariants.flatMap(
        getVariantImagePublicIds,
      ),
    ]);

  const removedTempPublicIds =
    removedVariants.flatMap(
      getVariantTemporaryImagePublicIds,
    );

  return [
    ...new Set(
      removedTempPublicIds.filter(
        (publicId) =>
          !protectedPublicIds.has(publicId),
      ),
    ),
  ];
};