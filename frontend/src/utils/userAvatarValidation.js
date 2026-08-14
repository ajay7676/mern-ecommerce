export const USER_AVATAR_MAX_SIZE = 2 * 1024 * 1024;

export const USER_AVATAR_ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export const validateUserAvatar = (file) => {
  if (!file) {
    return "Please select an image";
  }

  if (!USER_AVATAR_ALLOWED_TYPES.includes(file.type)) {
    return "Only PNG, JPG and WEBP images are allowed";
  }

  if (file.size > USER_AVATAR_MAX_SIZE) {
    return "Image size must be less than 2 MB";
  }

  return null;
};
