import {env} from '../../../config/env.js'
export const USER_AVATAR_CONFIG = {
  folder:
    env.cloudinary.userTempFolder,

  tags: [
    "user-avatar",
    "temporary",
  ],

  maxSize:
    2 * 1024 * 1024,

  allowedMimeTypes: [
    "image/jpeg",
    "image/png",
    "image/webp",
  ],

  transformation: [
    {
      width: 500,
      height: 500,
      crop: "fill",
      gravity: "face",
    },
    {
      quality: "auto",
      fetch_format: "auto",
    },
  ],
};


