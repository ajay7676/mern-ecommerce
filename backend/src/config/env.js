import dotenv from "dotenv";

dotenv.config();

const requiredEnvVariables = [
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
  "CLOUDINARY_USER_TEMP_FOLDER",
];

for (const key of requiredEnvVariables) {
  if (!process.env[key]) {
    throw new Error(
      `Missing required environment variable: ${key}`
    );
  }
}

export const env = {
  port: process.env.PORT || 8000,

  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
    userTempFolder:
      process.env.CLOUDINARY_USER_TEMP_FOLDER,
  },
};