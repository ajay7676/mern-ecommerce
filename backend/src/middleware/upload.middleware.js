import multer from "multer";
import HandleError from "../utils/handleError.js";

const storage = multer.memoryStorage();

export const uploadImage = multer({
  storage,

  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },

  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(
        new HandleError("Invalid image type", 400, {
          image: "Only JPG, JPEG, PNG and WEBP images are allowed",
        }),
      );
    }

    cb(null, true);
  },
});
