import { v2 as cloudinary } from "cloudinary";
import HandleError from "../utils/handleError.js";

export const verifyCloudinaryConfiguration = () => {
  const cloudName =
    process.env.CLOUDINARY_CLOUD_NAME?.trim();

  const apiKey =
    process.env.CLOUDINARY_API_KEY?.trim();

  const apiSecret =
    process.env.CLOUDINARY_API_SECRET?.trim();

  const missingVariables = [];

  if (!cloudName) {
    missingVariables.push(
      "CLOUDINARY_CLOUD_NAME",
    );
  }

  if (!apiKey) {
    missingVariables.push(
      "CLOUDINARY_API_KEY",
    );
  }

  if (!apiSecret) {
    missingVariables.push(
      "CLOUDINARY_API_SECRET",
    );
  }

  if (missingVariables.length > 0) {
    console.error(
      "Missing Cloudinary variables:",
      missingVariables,
    );

    throw new HandleError(
      "Image upload service is not configured",
      500,
    );
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });

  const configuration = cloudinary.config();

  console.log("Cloudinary configuration:", {
    cloudNameExists: Boolean(
      configuration.cloud_name,
    ),
    apiKeyExists: Boolean(
      configuration.api_key,
    ),
    apiSecretExists: Boolean(
      configuration.api_secret,
    ),
  });

  return true;
};

export default cloudinary;