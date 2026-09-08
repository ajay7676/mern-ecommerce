import { getUserProfileService, 
  updateUserProfileService, 
  uploadTemporaryAvatarService 
 } from "../services/user.service.js";

export const getProfile = async (req, res, next) => {
  try {
    const profile = await getUserProfileService(req.user._id);

    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

export const uploadProfileAvatar = async (req, res, next) => {
  try {
    const avatar = await uploadTemporaryAvatarService({
      file: req.file,
      userId: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Profile image uploaded successfully",
      data: avatar,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {

    const profile =
      await updateUserProfileService(
        req.user._id,
        req.body
      );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};
