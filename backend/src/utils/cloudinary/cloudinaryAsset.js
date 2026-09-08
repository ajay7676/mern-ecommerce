import cloudinary,{verifyCloudinaryConfiguration} from "../../config/cloudinary.js";

// This is useful for ownership verification.
export const getCloudinaryAsset = async ({
  publicId,
  resourceType = "image",
}) => {
  if (!publicId) {
    throw new Error(
      "Cloudinary publicId is required",
    );
  }

  return cloudinary.api.resource(publicId, {
    resource_type: resourceType,
    tags: true,
    context: true,
  });
};

// This is useful for temporary → permanent conversion.

export const addCloudinaryTag = async ({
  tag,
  publicIds,
  resourceType = "image",
}) => {
  if (!tag) {
    throw new Error("Tag is required");
  }

  if (
    !Array.isArray(publicIds) ||
    publicIds.length === 0
  ) {
    return null;
  }

  return cloudinary.uploader.add_tag(
    tag,
    publicIds,
    {
      resource_type: resourceType,
    },
  );
};

export const removeCloudinaryTag = async ({
  tag,
  publicIds,
  resourceType = "image",
}) => {
  if (!tag) {
    throw new Error("Tag is required");
  }

  if (
    !Array.isArray(publicIds) ||
    publicIds.length === 0
  ) {
    return null;
  }

  return cloudinary.uploader.remove_tag(
    tag,
    publicIds,
    {
      resource_type: resourceType,
    },
  );
};



