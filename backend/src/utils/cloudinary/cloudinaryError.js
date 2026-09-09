export const isCloudinaryResourceNotFound = (error) => {
  return (
    error?.http_code === 404 ||
    error?.error?.http_code === 404 ||
    error?.message?.includes("Resource not found") ||
    error?.error?.message?.includes("Resource not found")
  );
};