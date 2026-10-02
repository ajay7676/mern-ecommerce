const getPublicId = (image = {}) => {
  return (
    image?.publicId ||
    image?.imageId ||
    null
  );
};

export const isTemporaryProductImage = (image = {}) => {
  if (!image) {
    return false;
  }

  return (
    image.isTemporary === true ||
    image.assetState === "temporary"
  );
};

/**
 * Collect every temporary image currently referenced
 * by the product form.
 *
 * Supports:
 *
 * product images
 * variant.image
 * variant.images
 */
export const collectTemporaryProductImagePublicIds = (
  values = {},
) => {
  const publicIds = [];

  /**
   * ---------------------------------------------
   * PRODUCT IMAGES
   * ---------------------------------------------
   */
  const productImages =
    values.images ||
    values.media?.images ||
    [];

  for (const image of productImages) {
    if (
      !isTemporaryProductImage(
        image,
      )
    ) {
      continue;
    }

    const publicId =
      getPublicId(image);

    if (publicId) {
      publicIds.push(
        publicId,
      );
    }
  }

  /**
   * ---------------------------------------------
   * VARIANT IMAGES
   * ---------------------------------------------
   */
  for (
    const variant of
    values.variants || []
  ) {
    /**
     * Main variant image.
     */
    if (
      isTemporaryProductImage(
        variant?.image,
      )
    ) {
      const publicId =
        getPublicId(
          variant.image,
        );

      if (publicId) {
        publicIds.push(
          publicId,
        );
      }
    }

    /**
     * Future support:
     * multiple images per variant.
     */
    for (
      const image of
      variant?.images || []
    ) {
      if (
        !isTemporaryProductImage(
          image,
        )
      ) {
        continue;
      }

      const publicId =
        getPublicId(image);

      if (publicId) {
        publicIds.push(
          publicId,
        );
      }
    }
  }

  /**
   * Same image may be referenced by:
   *
   * product
   * variant A
   * variant B
   *
   * Delete only once.
   */
  return [
    ...new Set(
      publicIds,
    ),
  ];
};