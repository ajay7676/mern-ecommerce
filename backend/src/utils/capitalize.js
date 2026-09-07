export const capitalize = (value) => {
  if (!value) return null;

  return value.charAt(0).toUpperCase() + value.slice(1);
};