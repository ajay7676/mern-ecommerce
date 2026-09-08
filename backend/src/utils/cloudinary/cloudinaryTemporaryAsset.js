import HandleError  from '../handleError.js';
import { getCloudinaryAsset } from './cloudinaryAsset.js';

export const verifyTemporaryCloudinaryAsset =
  async ({
    publicId,
    ownerId,
    requiredTags = [],
    temporaryTag = "temporary",
    ownerContextKey = "uploaded_by",
    resourceType = "image",
  }) => {
    const asset = await getCloudinaryAsset({
      publicId,
      resourceType,
    });

    const tags = asset.tags ?? [];

    if (!tags.includes(temporaryTag)) {
      throw new HandleError(
        "Asset is not temporary",
        400,
      );
    }

    for (const tag of requiredTags) {
      if (!tags.includes(tag)) {
        throw new HandleError(
          "Invalid uploaded asset",
          400,
        );
      }
    }

    const uploadedBy =
      asset.context?.custom?.[
        ownerContextKey
      ];

    if (
      ownerId &&
      String(uploadedBy) !== String(ownerId)
    ) {
      throw new HandleError(
        "Uploaded asset does not belong to this user",
        403,
      );
    }

    return asset;
  };