export const getEditUserInitialValues = (user) => ({
  name: user?.name || "",
  email: user?.email || "",
  phone: user?.phone || "",

  profileImage: user?.avatar?.url
    ? {
        url: user.avatar.url,
        publicId: user.avatar.publicId,
      }
    : null,

  role: user?.role || "user",
  status: user?.status || "active",

  password: "",
  confirmPassword: "",

  department: user?.department || "",
  designation: user?.designation || "",

  address: {
    street: user?.address?.street || "",
    city: user?.address?.city || "",
    state: user?.address?.state || "",
    country: user?.address?.country || "India",
    pinCode: user?.address?.pinCode || "",
  },
});