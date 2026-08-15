import HandleError from "../../../utils/handleError.js";

import {
  createAdminUser,
  countUsers,
  findSafeUserById,
  findUserByEmail,
  findUserByEmailExceptId,
  findUserById,
  findUsers,
  deleteAdminUserById,
  getAdminUserStatsRepository,
} from "./adminUser.repository.js";

import {
  normalizeUsersQuery,
  validateCreateUserPayload,
  validateStatusPayload,
  validateUpdateUserPayload,
  validateUserId,
} from "./adminUser.validators.js";

import cloudinary, {
  verifyCloudinaryConfiguration,
} from "../../../config/cloudinary.js";
import { deleteUserAvatarFromCloudinary } from "../../../services/userAvatarCleanup.service.js";

const escapeRegex = (value) => {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

export const getAdminUsersService = async (query) => {
  const {
    page,
    limit,
    search,
    role,
    status,
    joinedFrom,
    joinedTo,
    sortBy,
    sortOrder,
  } = normalizeUsersQuery(query);

  const filter = {};

  if (search) {
    const escapedSearch = escapeRegex(search);

    const regex = new RegExp(escapedSearch, "i");

    filter.$or = [
      {
        name: regex,
      },
      {
        email: regex,
      },
      {
        phone: regex,
      },
    ];
  }

  if (role) {
    filter.role = role;
  }

  if (status) {
    filter.status = status;
  }

  if (joinedFrom || joinedTo) {
    filter.createdAt = {};

    if (joinedFrom) {
      const from = new Date(joinedFrom);

      if (Number.isNaN(from.getTime())) {
        throw new HandleError("Invalid joinedFrom date", 400);
      }

      from.setHours(0, 0, 0, 0);

      filter.createdAt.$gte = from;
    }

    if (joinedTo) {
      const to = new Date(joinedTo);

      if (Number.isNaN(to.getTime())) {
        throw new HandleError("Invalid joinedTo date", 400);
      }

      to.setHours(23, 59, 59, 999);

      filter.createdAt.$lte = to;
    }
  }

  const skip = (page - 1) * limit;

  const sort = {
    [sortBy]: sortOrder === "asc" ? 1 : -1,
  };

  const [users, totalUsers] = await Promise.all([
    findUsers({
      filter,
      skip,
      limit,
      sort,
    }),

    countUsers(filter),
  ]);

  const totalPages = Math.ceil(totalUsers / limit);

  return {
    users,

    pagination: {
      currentPage: page,
      limit,

      totalUsers,
      totalPages,

      hasNextPage: page < totalPages,

      hasPreviousPage: page > 1,
    },
  };
};

export const getAdminUserService = async (userId) => {
  validateUserId(userId);

  const user = await findSafeUserById(userId);

  if (!user) {
    throw new HandleError("User not found", 404);
  }

  return user;
};

// Create new user

export const createAdminUserService = async (payload) => {
  const normalizedPayload = validateCreateUserPayload(payload);

  const existingUser = await findUserByEmail(normalizedPayload.email);

  if (existingUser) {
    throw new HandleError("A user with this email already exists", 409);
  }

  try {
    const user = await createAdminUser({
      ...normalizedPayload,

      status: "active",
    });

    const safeUser = user.toObject();

    delete safeUser.password;

    delete safeUser.resetPasswordToken;
    delete safeUser.resetPasswordExpire;

    return safeUser;
  } catch (error) {
    if (error?.code === 11000 && error?.keyPattern?.email) {
      throw new HandleError("A user with this email already exists", 409);
    }

    throw error;
  }
};

// Update USER

export const updateAdminUserService = async ({ userId, payload, adminId }) => {
  validateUserId(userId);
  const update = validateUpdateUserPayload(payload);
  const user = await findUserById(userId);

  if (!user) {
    throw new HandleError("User not found", 404);
  }

  if (update.email) {
    const existingUser = await findUserByEmailExceptId(update.email, userId);

    if (existingUser) {
      throw new HandleError("A user with this email already exists", 409);
    }
  }

  if (
    adminId.toString() === userId.toString() &&
    update.role &&
    update.role !== "admin"
  ) {
    throw new HandleError("You cannot remove your own admin role", 403);
  }
  if (update.email && update.email !== user.email) {
    const existingUser = await User.findOne({
      email: update.email,
      _id: {
        $ne: userId,
      },
    });

    if (existingUser) {
      throw new HandleError("Email is already in use", 409);
    }
  }

  Object.entries(update).forEach(([field, value]) => {
    user[field] = value;
  });

  try {
    await user.save();
  } catch (error) {
    if (error?.code === 11000 && error?.keyPattern?.email) {
      throw new HandleError("A user with this email already exists", 409);
    }

    throw error;
  }

  const safeUser = user.toObject();

  delete safeUser.password;
  delete safeUser.resetPasswordToken;
  delete safeUser.resetPasswordExpire;

  return safeUser;
};

// Block / unblock service

export const updateAdminUserStatusService = async ({
  userId,
  status,
  adminId,
}) => {
  validateUserId(userId);

  const normalizedStatus = validateStatusPayload({
    status,
  });

  if (
    adminId.toString() === userId.toString() &&
    normalizedStatus === "blocked"
  ) {
    throw new HandleError("You cannot block your own account", 403);
  }

  const user = await findUserById(userId);

  if (!user) {
    throw new HandleError("User not found", 404);
  }

  if (user.status === normalizedStatus) {
    return {
      user,
      changed: false,
    };
  }

  user.status = normalizedStatus;

  await user.save();

  const safeUser = user.toObject();

  delete safeUser.password;
  delete safeUser.resetPasswordToken;
  delete safeUser.resetPasswordExpire;

  return {
    user: safeUser,
    changed: true,
  };
};

// Delete User

export const deleteAdminUserService = async ({ userId, adminId }) => {
  validateUserId(userId);
  if (adminId.toString() === userId.toString()) {
    throw new HandleError("You cannot delete your own account", 403);
  }

  const user = await findUserById(userId);
  if (!user) {
    throw new HandleError("User not found", 404);
  }

  if (user.avatar?.publicId) {
    await deleteUserAvatarFromCloudinary(user.avatar.publicId);
  }

  await deleteAdminUserById(userId);

  return true;
};

// User Stats


export const getAdminUserStatsService =
  async () => {
    const stats =
      await getAdminUserStatsRepository();

    return stats;
  };
