import { v2 as cloudinary } from 'cloudinary';

 cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImageToCloudinary = async(filePath, folder = "mern-ecommerce/products") => {
      
        const result = await cloudinary.uploader.upload(filePath, {
        folder,
        resource_type: "image",
       })

       return  {
        url: result.secure_url,
        public_id: result.public_id,
       }
}

const deleteImageFromCloudinary = async (public_id) => {
      if(!public_id) return null;
       const result = await cloudinary.uploader.destroy(publicId);
      return result;
}

export { cloudinary, uploadImageToCloudinary, deleteImageFromCloudinary };

