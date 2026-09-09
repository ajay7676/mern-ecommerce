import mongoose from "mongoose";
import HandleError from "../../../utils/handleError.js";
import { buildProfileResponse } from "../../../utils/userResponse.js";
import {
  findUserById,
  findUserProfileById,
} from "../repositories/user.repository.js";
// import { uploadBufferToCloudinary } from "../../../utils/cloudinary/cloudinaryUpload.js";
import { USER_AVATAR_CONFIG } from "../constants/userAvatar.constants.js";
import { uploadTemporaryImage } from "../../../utils/cloudinary/uploadTemporaryImage.js";
import { makeCloudinaryAssetPermanent } from "../../../utils/cloudinary/makeAssetPermanent.js";
import { verifyTemporaryCloudinaryAsset } from "../../../utils/cloudinary/cloudinaryTemporaryAsset.js";
import { safeDeleteCloudinaryAsset } from "../../../utils/cloudinary/safeDeleteCloudinaryAsset.js";
import { verifyCloudinaryConfiguration } from "../../../config/cloudinary.js";
import { deleteCloudinaryAssets } from "../../../utils/cloudinary/cloudinaryDelete.js";
import { isCloudinaryResourceNotFound } from "../../../utils/cloudinary/cloudinaryError.js";
export const getUserProfileService = async (userId) => {
  if (!userId || !mongoose.isValidObjectId(userId)) {
    throw new HandleError("Invalid user id", 400);
  }

  const user = await findUserProfileById(userId);

  if (!user) {
    throw new HandleError("User not found", 404);
  }

  return buildProfileResponse(user);
};

export const uploadTemporaryAvatarService = async ({ file, userId }) => {
  return uploadTemporaryImage({
    file,
    ownerId: userId,
    config: USER_AVATAR_CONFIG,
  });
};

export const updateUserProfileService = async (userId, payload) => {
  verifyCloudinaryConfiguration();

  if (!userId || !mongoose.isValidObjectId(userId)) {
    throw new HandleError("Invalid user id", 400);
  }
  const user = await findUserById(userId);

  if (!user) {
    throw new HandleError("User not found", 404);
  }

  const previousAvatarPublicId = user.avatar?.publicId ?? null;

  const hasAvatarField = Object.prototype.hasOwnProperty.call(
    payload,
    "avatar",
  );

  const newAvatar = hasAvatarField ? payload.avatar : undefined;

  let databaseSaved = false;

  try {
    if (newAvatar) {
      await verifyTemporaryCloudinaryAsset({
        publicId: newAvatar.publicId,

        ownerId: userId,

        requiredTags: ["user-avatar"],
      });
    }

    const editableFields = ["name", "phone", "dateOfBirth", "gender"];

    for (const field of editableFields) {
      if (Object.prototype.hasOwnProperty.call(payload, field)) {
        user[field] = payload[field];
      }
    }

    if (hasAvatarField) {
      if (newAvatar === null) {
        user.avatar = {
          publicId: null,
          url: null,
        };
      } else {
        user.avatar = {
          publicId: newAvatar.publicId,
          url: newAvatar.url,
        };
      }
    }

    await user.save();

    databaseSaved = true;

    // New avatar: make permanent

    if (newAvatar) {
      try {
        await makeCloudinaryAssetPermanent({
          publicId: newAvatar.publicId,
        });
      } catch (error) {
        console.error("Failed to mark avatar permanent:", error);
      }
    }

    // Replace or remove old avatar
    if (
      hasAvatarField &&
      previousAvatarPublicId &&
      previousAvatarPublicId !== newAvatar?.publicId
    ) {
      await safeDeleteCloudinaryAsset({
        publicId: previousAvatarPublicId,
      });
    }

    return buildProfileResponse(user);
  } catch (error) {
    // Roll back only if new temporary avatar
    // was never committed to DB.
    if (newAvatar && !databaseSaved) {
      await safeDeleteCloudinaryAsset({
        publicId: newAvatar.publicId,
      });
    }

    throw error;
  }
};

export const deleteTemporaryProfileAvatarService = async ({
  userId,
  publicIds,
}) => {
  if (!userId || !mongoose.isValidObjectId(userId)) {
    throw new HandleError("Invalid user id", 400);
  }

  const uniquePublicIds = [...new Set(publicIds)];

  const verifiedPublicIds = [];
  const notFoundPublicIds = [];

  for (const publicId of uniquePublicIds) {
    try {
      await verifyTemporaryCloudinaryAsset({
        publicId,
        ownerId: userId,
        requiredTags: ["user-avatar"],
        temporaryTag: "temporary",
        resourceType: "image",
      });

      verifiedPublicIds.push(publicId);
    } catch (error) {
      if (isCloudinaryResourceNotFound(error)) {
        notFoundPublicIds.push(publicId);
        continue;
      }

      throw error;
    }
  }

  let cloudinaryResult = null;

  if (verifiedPublicIds.length > 0) {
    cloudinaryResult = await deleteCloudinaryAssets({
      publicIds: verifiedPublicIds,
      resourceType: "image",
    });
  }

  return {
    requestedCount: uniquePublicIds.length,
    deletedCount: verifiedPublicIds.length,
    deletedPublicIds: verifiedPublicIds,
    notFoundPublicIds,
    cloudinaryResult,
  };
};
