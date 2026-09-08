import mongoose from 'mongoose';
import HandleError from '../../../utils/handleError.js'
import { buildProfileResponse } from "../../../utils/userResponse.js";
import { findUserById, findUserProfileById } from '../repositories/user.repository.js';



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


export const updateUserProfileService = async (
  userId,
  payload
) => {
  if (!userId || !mongoose.isValidObjectId(userId)) {
    throw new HandleError("Invalid user id", 400);
  }

  const user = await findUserById(userId);

  if (!user) {
    throw new HandleError("User not found", 404);
  }

  const allowedFields = [
    "name",
    "phone",
    "dateOfBirth",
    "gender",
    "address"
  ];

  for (const field of allowedFields) {
    if (
      Object.prototype.hasOwnProperty.call(
        payload,
        field
      )
    ) {
      user[field] = payload[field];
    }
  }

  await user.save();

  return buildProfileResponse(user);
};