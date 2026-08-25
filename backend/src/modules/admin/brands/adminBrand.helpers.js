// import cloudinary from "../../../config/cloudinary.js";

export const normalizeBrandSlug = (value = "") => {
  return value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};



// export const removeTemporaryTagFromAsset = async (publicId) => {
//   if (!publicId) {
//     return;
//   }

//   await cloudinary.uploader.remove_tag("temporary", [publicId], {
//     resource_type: "image",
//   });
// };