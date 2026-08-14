import multer from "multer";

import HandleError from "../utils/handleError.js";

const MAX_FILE_SIZE = 2 * 1024 * 1024;

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];

const storage = multer.memoryStorage();

const fileFilter = (req, file, callback) => {
  if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    return callback(
      new HandleError("Only PNG, JPG and WEBP images are allowed", 400),
    );
  }

  callback(null, true);
};

const uploadUserAvatar = multer({
  storage,

  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 1,
  },

  fileFilter,
});

export default uploadUserAvatar;
