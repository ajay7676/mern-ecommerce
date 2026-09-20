export const getProductDetailErrorMessage = (error) => {
  return (
    error?.response?.data?.message ||
    error?.message ||
    "Failed to load product detail"
  );
};