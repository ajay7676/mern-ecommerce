export const cleanString = (value = "") => {
  return String(value ?? "").trim();
};

export const getImagePublicId = (image = {}) => {
  return cleanString(
    image.publicId ||
      image.imageId ||
      ""
  );
};

export const isTemporaryImage = (image = {}) => {
  return (
    image.isTemporary === true ||
    image.assetState === "temporary"
  );
};
export const isPermanentImage = (image = {}) => {
  return (
    image.isExisting === true ||
    image.assetState === "permanent"
  );
};

export const collectExistingProductImages = (
  existingProduct = {},
) => {
  const images = [
    ...(existingProduct.images || []),
    ...(existingProduct.media?.images || []),
  ];

  return images
    .map((image) => {
      const publicId =
        getImagePublicId(image);

      if (!publicId) {
        return null;
      }

      return {
        publicId,

        source:
          "product",

        image,
      };
    })
    .filter(Boolean);
};

export const collectExistingVariantImages = (
  existingVariants = [],
) => {
  const result = [];

  existingVariants.forEach(
    (variant, variantIndex) => {
      /**
       * Main variant image.
       */
      if (variant.image) {
        const publicId =
          getImagePublicId(
            variant.image,
          );

        if (publicId) {
          result.push({
            publicId,

            source:
              "variant-main",

            variantId:
              variant._id ||
              variant.variantId ||
              null,

            variantIndex,

            image:
              variant.image,
          });
        }
      }

      /**
       * Optional future multiple
       * variant images.
       */
      (
        variant.images || []
      ).forEach(
        (image, imageIndex) => {
          const publicId =
            getImagePublicId(
              image,
            );

          if (!publicId) {
            return;
          }

          result.push({
            publicId,

            source:
              "variant-extra",

            variantId:
              variant._id ||
              variant.variantId ||
              null,

            variantIndex,
            imageIndex,

            image,
          });
        },
      );
    },
  );

  return result;
};

export const collectExistingImageItems = ({
  existingProduct,
  existingVariants = [],
}) => {
  return [
    ...collectExistingProductImages(
      existingProduct,
    ),

    ...collectExistingVariantImages(
      existingVariants,
    ),
  ];
};

export const collectIncomingProductImages = (
  payload = {},
) => {
  const images =
    payload.media?.images ||
    payload.images ||
    [];

  return images
    .map((image, imageIndex) => {
      const publicId =
        getImagePublicId(image);

      if (!publicId) {
        return null;
      }

      return {
        publicId,

        source:
          "product",

        imageIndex,

        image,
      };
    })
    .filter(Boolean);
};

export const collectIncomingVariantImages = (
  payload = {},
) => {
  const variants =
    payload
      .attributesAndVariations
      ?.variants || [];

  const result = [];

  variants.forEach(
    (variant, variantIndex) => {
      /**
       * Main variant image.
       */
      if (variant.image) {
        const publicId =
          getImagePublicId(
            variant.image,
          );

        if (publicId) {
          result.push({
            publicId,

            source:
              "variant-main",

            variantId:
              variant.variantId ||
              null,

            variantIndex,

            image:
              variant.image,
          });
        }
      }

      /**
       * Optional future:
       * multiple variant images.
       */
      (
        variant.images || []
      ).forEach(
        (image, imageIndex) => {
          const publicId =
            getImagePublicId(
              image,
            );

          if (!publicId) {
            return;
          }

          result.push({
            publicId,

            source:
              "variant-extra",

            variantId:
              variant.variantId ||
              null,

            variantIndex,
            imageIndex,

            image,
          });
        },
      );
    },
  );

  return result;
};

export const collectIncomingImageItems = (
  payload = {},
) => {
  return [
    ...collectIncomingProductImages(
      payload,
    ),

    ...collectIncomingVariantImages(
      payload,
    ),
  ];
};

export const uniquePublicIds = (
  publicIds = [],
) => {
  return [
    ...new Set(
      publicIds.filter(Boolean),
    ),
  ];
};