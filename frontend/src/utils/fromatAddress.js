export const formatUserAddress = (
  address = {},
) => {
  const parts = [
    address.street,
    address.city,
    address.state,
    address.country,
    address.pinCode,
  ].filter(Boolean);

  return parts.length
    ? parts.join(", ")
    : "Address not provided";
};