export const getAddressTypeLabel = (type = "") => {
  const labels = {
    home: "Home",
    office: "Office",
    "parents-home": "Parents Home",
  };

  return labels[type] ?? "Other";
};

export const createEmptyAddress = () => ({
  fullName: "",
  phone: "",
  pincode: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  type: "home",
  isDefault: false,
});