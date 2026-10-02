const getPublicId = (image = {}) => {
  return (
    image?.publicId ||
    image?.imageId ||
    null
  );
};

export const collectProductAssetPublicIds = ({
  product,
  variants = [],
}) => {
  const publicIds = [];

  /**
   * Product images.
   */
  const productImages =
    product?.images ||
    product?.media?.images ||
    [];

  for (const image of productImages) {
    const publicId =
      getPublicId(image);

    if (publicId) {
      publicIds.push(
        publicId,
      );
    }
  }

  /**
   * Variant images.
   */
  for (const variant of variants) {
    const mainVariantImage =
      getPublicId(
        variant?.image,
      );

    if (mainVariantImage) {
      publicIds.push(
        mainVariantImage,
      );
    }

    for (
      const image of
      variant?.images || []
    ) {
      const publicId =
        getPublicId(image);

      if (publicId) {
        publicIds.push(
          publicId,
        );
      }
    }
  }

  return [
    ...new Set(
      publicIds,
    ),
  ];
};