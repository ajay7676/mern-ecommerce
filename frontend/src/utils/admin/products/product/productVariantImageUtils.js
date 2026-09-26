export const mapUploadedImageToVariantImage = (image) => {
  if (!image?.publicId || !image?.url) {
    throw new Error("Invalid uploaded variant image");
  }

  return {
    publicId: image.publicId,
    url: image.url,

    isExisting: false,
    isTemporary: true,
    assetState: "temporary",
  };
};

export const getVariantImageUrl = (variant = {}) => {
  return (
    variant.image?.url ||
    variant.imageUrl ||
    variant.images?.[0]?.url ||
    ""
  );
};