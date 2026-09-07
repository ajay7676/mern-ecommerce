import User from '../../../model/userModel.js';
import HandleError from '../../../utils/handleError.js'

export const updateUserProfile = async (userId, profileData) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new HandleError(404, "User not found");
  }

  const allowedFields = [
    "name",
    "phone",
    "dateOfBirth",
    "gender",
  ];

  for (const field of allowedFields) {
    if (Object.prototype.hasOwnProperty.call(profileData, field)) {
      user[field] = profileData[field];
    }
  }

  await user.save();

  return user;
};