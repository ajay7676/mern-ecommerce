import mongoose from "mongoose";
import HandleError from "../../../utils/handleError.js";

import {
  ADMIN_USER_ROLES,
  ADMIN_USER_STATUSES,
  MAX_USERS_LIMIT,
  USER_SORT_FIELDS,
} from "./adminUser.constants.js";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PHONE_REGEX = /^\+?[0-9\s-]{8,18}$/;

export const validateUserId = (userId) => {
  if (!userId || !mongoose.isValidObjectId(userId)) {
    throw new HandleError("Invalid user id", 400);
  }
  return userId;
};

export const validateCreateUserPayload = (payload) => {
  const { name, email, phone, password, role } = payload;

  if (!name || typeof name !== "string" || !name.trim()) {
    throw new HandleError("Name is required", 400);
  }

  if (!email || typeof email !== "string") {
    throw new HandleError("Email is required", 400);
  }

  const normalizedEmail = email.trim().toLowerCase();

  if (!EMAIL_REGEX.test(normalizedEmail)) {
    throw new HandleError("Please provide a valid email address", 400);
  }

  if (phone && !PHONE_REGEX.test(phone.trim())) {
    throw new HandleError("Please provide a valid phone number", 400);
  }

  if (!password || typeof password !== "string" || password.length < 8) {
    throw new HandleError("Password must contain at least 8 characters", 400);
  }

  const normalizedRole = role?.toLowerCase() ?? "user";

  if (!ADMIN_USER_ROLES.includes(normalizedRole)) {
    throw new HandleError("Invalid user role", 400);
  }

  return {
    name: name.trim(),

    email: normalizedEmail,

    phone: phone?.trim() || undefined,

    password,

    role: normalizedRole,
  };
};

export const validateUpdateUserPayload = (payload) => {
  const allowedFields = ["name", "email", "phone", "role"];

  const receivedFields = Object.keys(payload);

  const invalidFields = receivedFields.filter(
    (field) => !allowedFields.includes(field),
  );

  if (invalidFields.length) {
    throw new HandleError(
      `Invalid update fields: ${invalidFields.join(", ")}`,
      400,
    );
  }

  if (!receivedFields.length) {
    throw new HandleError("At least one field is required", 400);
  }

  const update = {};
  if (Object.prototype.hasOwnProperty.call(payload, "name")) {
    if (typeof payload.name !== "string" || !payload.name.trim()) {
      throw new HandleError("Name cannot be empty", 400);
    }

    update.name = payload.name.trim();
  }

  if (Object.prototype.hasOwnProperty.call(payload, "email")) {
    const email = payload.email?.trim().toLowerCase();

    if (!email || !EMAIL_REGEX.test(email)) {
      throw new HandleError("Please provide a valid email address", 400);
    }

    update.email = email;
  }

  if (Object.prototype.hasOwnProperty.call(payload, "phone")) {
    const phone = payload.phone?.trim();

    if (phone && !PHONE_REGEX.test(phone)) {
      throw new HandleError("Please provide a valid phone number", 400);
    }

    update.phone = phone || null;
  }

  if (Object.prototype.hasOwnProperty.call(payload, "role")) {
    const role = payload.role?.toLowerCase();

    if (!ADMIN_USER_ROLES.includes(role)) {
      throw new HandleError("Invalid user role", 400);
    }

    update.role = role;
  }

  return update;
};

export const validateStatusPayload = (payload) => {
  const status = payload?.status?.toLowerCase();

  if (!status || !ADMIN_USER_STATUSES.includes(status)) {
    throw new HandleError("Invalid user status", 400);
  }

  return status;
};

export const normalizeUsersQuery = (query) => {
  const page = Math.max(Number(query.page) || 1, 1);

  const limit = Math.min(
    Math.max(Number(query.limit) || 10, 1),
    MAX_USERS_LIMIT,
  );

  const role = query.role?.trim().toLowerCase() || "";

  const status = query.status?.trim().toLowerCase() || "";

  if (role && !ADMIN_USER_ROLES.includes(role)) {
    throw new HandleError("Invalid role filter", 400);
  }

  if (status && !ADMIN_USER_STATUSES.includes(status)) {
    throw new HandleError("Invalid status filter", 400);
  }

  const sortBy = USER_SORT_FIELDS.includes(query.sortBy)
    ? query.sortBy
    : "createdAt";

  const sortOrder = query.sortOrder === "asc" ? "asc" : "desc";

  return {
    page,
    limit,

    search: query.search?.trim() || "",

    role,
    status,

    joinedFrom: query.joinedFrom || "",

    joinedTo: query.joinedTo || "",

    sortBy,
    sortOrder,
  };
};
