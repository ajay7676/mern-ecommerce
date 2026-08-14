import {
  deleteTemporaryUserAvatarService,
} from "../services/userAvatarCleanup.service.js";

export const deleteTemporaryUserAvatar = async (
  req,
  res,
  next,
) => {
  try {
    const { publicId } = req.body;

    const result =
      await deleteTemporaryUserAvatarService({
        publicId,
      });

    res.status(200).json({
      success: true,
      message:
        "Temporary avatar deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};