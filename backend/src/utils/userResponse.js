const capitalize = (value) => {
  if (!value) return null;

  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const buildProfileResponse = (user) => {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone ?? null,
    dateOfBirth: user.dateOfBirth ?? null,
    gender: user.gender ?? null,

    // Optional display value
    genderLabel: capitalize(user.gender),

    avatar: user.avatar ?? null,
    role: user.role,
    status: user.status,
    address: user.address,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};