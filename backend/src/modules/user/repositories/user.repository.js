import User from '../../../model/userModel.js';

export const findUserProfileById = async (userId) => {
  return User.findById(userId)
    .select(
      "_id name email phone dateOfBirth gender avatar role address status createdAt updatedAt lastLoginAt"
    )
    .lean();
};


export const findUserById = async (userId) => {
  return User.findById(userId);
};