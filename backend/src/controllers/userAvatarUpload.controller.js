import { uploadUserAvatarService } from "../services/userAvatarUpload.service.js";

export const uploadUserAvatar = async (req, res, next) => {
  try {
    const adminId = req.user?._id ;

    const image = await uploadUserAvatarService({
      file: req.file,
      adminId,
    });

    res.status(201).json({
      success: true,

      message: "Profile image uploaded successfully",

      data: image,
    });
  } catch (error) {
    next(error);
  }
};
