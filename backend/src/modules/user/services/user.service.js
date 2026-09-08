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
import {verifyTemporaryCloudinaryAsset} from '../../../utils/cloudinary/cloudinaryTemporaryAsset.js'
import { safeDeleteCloudinaryAsset } from "../../../utils/cloudinary/safeDeleteCloudinaryAsset.js";
import {verifyCloudinaryConfiguration} from '../../../config/cloudinary.js'
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

  const newAvatar = payload.avatar ?? null;

  const previousAvatarPublicId = user.avatar?.publicId ?? null;

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

    editableFields.forEach((field) => {
      if (Object.prototype.hasOwnProperty.call(payload, field)) {
        user[field] = payload[field];
      }
    });

    if (newAvatar) {
      user.avatar = newAvatar;
    }

    await user.save();

    databaseSaved = true;

    if (newAvatar) {
      await makeCloudinaryAssetPermanent({
        publicId: newAvatar.publicId,
      });
    }

    if (
      newAvatar &&
      previousAvatarPublicId &&
      previousAvatarPublicId !== newAvatar.publicId
    ) {
      await safeDeleteCloudinaryAsset({
        publicId: previousAvatarPublicId,
      });
    }

    return buildProfileResponse(user);
  } catch (error) {
    if (newAvatar && !databaseSaved) {
      await safeDeleteCloudinaryAsset({
        publicId: newAvatar.publicId,
      });
    }

    throw error;
  }
};
