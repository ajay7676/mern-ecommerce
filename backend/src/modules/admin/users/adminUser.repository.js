import User from "../../../model/userModel.js";

export const findUserById = (userId) => {
  return User.findById(userId);
};

export const findSafeUserById = (userId) => {
  return User.findById(userId)
    .select("-password -resetPasswordToken -resetPasswordExpire")
    .lean();
};

export const findUserByEmail = (email) => {
  return User.findOne({
    email,
  });
};

export const findUserByEmailExceptId = (email, userId) => {
  return User.findOne({
    email,

    _id: {
      $ne: userId,
    },
  });
};

export const createAdminUser = (payload) => {
  return User.create(payload);
};

export const countUsers = (filter) => {
  return User.countDocuments(filter);
};

export const findUsers = ({ filter, skip, limit, sort }) => {
  return User.find(filter)
    .select(
      "name email phone avatar role status createdAt updatedAt lastLoginAt",
    )
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .lean();
};


export const deleteAdminUserById = async (
  userId
) => {
  return User.findByIdAndDelete(userId);
};



