const buildPayload = (values) => {
  const payload = {
    name: values.name.trim(),
    phone: values.phone.trim(),

    role: values.role,
    status: values.status,

    department: values.department.trim(),

    designation: values.designation.trim(),

    address: {
      street: values.address.street.trim(),
      city: values.address.city.trim(),
      state: values.address.state.trim(),
      country: values.address.country.trim() || "India",
      pinCode: values.address.pinCode.trim(),
    },

    avatar: values.profileImage
      ? {
          url: values.profileImage.url,
          publicId: values.profileImage.publicId,
        }
      : null,
  };

  if (values.password) {
    payload.password = values.password;
  }
  return payload;
};

export default buildPayload;
