export const getTempProductImagePublicIdsFromValues = (values = {}) => {
  const productImagePublicIds = (values.images || [])
    .map((image) => image?.publicId)
    .filter(Boolean);

  const variantImagePublicIds = (values.variants || []).flatMap((variant) => {
    const mainImagePublicId = variant?.image?.publicId;

    const extraImagePublicIds = (variant?.images || [])
      .map((image) => image?.publicId)
      .filter(Boolean);

    return [mainImagePublicId, ...extraImagePublicIds].filter(Boolean);
  });

  return [...new Set([...productImagePublicIds, ...variantImagePublicIds])];
};

export const cleanupTemporaryProductImagesSafely = async ({
  values,
  deleteTemporaryImages,
}) => {
  const publicIds = getTempProductImagePublicIdsFromValues(values);

  if (!publicIds.length) {
    return {
      success: true,
      deletedPublicIds: [],
    };
  }

  try {
    await deleteTemporaryImages({
      publicIds,
    });

    return {
      success: true,
      deletedPublicIds: publicIds,
    };
  } catch (error) {
    console.error("Temporary product images cleanup failed:", error);

    return {
      success: false,
      deletedPublicIds: [],
      error,
    };
  }
};


export const shouldCleanupImagesAfterCreateFailure = (error) => {
  const statusCode = error?.response?.status;
  const message = error?.response?.data?.message || "";

  // Network error: do not cleanup, because request status unknown
  if (!statusCode) return false;

  // Validation/duplicate error: keep images so admin can fix and retry
  if ([400, 401, 403, 404, 409, 422].includes(statusCode)) {
    return false;
  }

  // Server/media failure: safer to cleanup or ask re-upload
  if (statusCode >= 500) {
    return true;
  }

  return message.toLowerCase().includes("media rollback");
};