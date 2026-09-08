import {removeCloudinaryTag} from './cloudinaryAsset.js'

export const makeCloudinaryAssetPermanent =
  async ({
    publicId,
    temporaryTag = "temporary",
    resourceType = "image",
  }) => {
    if (!publicId) return;

    await removeCloudinaryTag({
      tag: temporaryTag,
      publicIds: [publicId],
      resourceType,
    });
  };