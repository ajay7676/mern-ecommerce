import { sanitizeUser } from "../../../utils/userResponse.js";
import { updateUserProfile } from "../services/user.service.js";

export const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const updatedUser = await updateUserProfile(userId, req.body);

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: sanitizeUser(updatedUser),
    });
  } catch (error) {
    next(error);
  }
};
