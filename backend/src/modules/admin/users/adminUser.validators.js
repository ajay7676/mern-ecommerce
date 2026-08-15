import mongoose from "mongoose";
import HandleError from "../../../utils/handleError.js";

import {
  ADMIN_USER_ROLES,
  ADMIN_USER_STATUSES,
  MAX_USERS_LIMIT,
  USER_SORT_FIELDS,
} from "./adminUser.constants.js";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PHONE_REGEX = /^\+?[1-9]\d{7,14}$/;

const PIN_CODE_REGEX = /^[1-9][0-9]{5}$/;

const MAX_NAME_LENGTH = 100;
const MAX_DEPARTMENT_LENGTH = 100;
const MAX_DESIGNATION_LENGTH = 100;
const MAX_ADDRESS_FIELD_LENGTH = 200;

export const validateUserId = (userId) => {
  if (!userId || !mongoose.isValidObjectId(userId)) {
    throw new HandleError("Invalid user id", 400);
  }
  return userId;
};

export const validateCreateUserPayload = (
  payload = {},
) => {
  if (
    !payload ||
    typeof payload !== "object" ||
    Array.isArray(payload)
  ) {
    throw new HandleError(
      "Invalid user data",
      400,
    );
  }

  const {
    name,
    email,
    phone,
    avatar,
    password,
    department,
    designation,
    address,
    role,
    status,
  } = payload;

  /*
   * ============================
   * NAME
   * ============================
   */

  if (
    !name ||
    typeof name !== "string" ||
    !name.trim()
  ) {
    throw new HandleError(
      "Name is required",
      400,
    );
  }

  const normalizedName = name.trim();

  if (
    normalizedName.length >
    MAX_NAME_LENGTH
  ) {
    throw new HandleError(
      `Name cannot exceed ${MAX_NAME_LENGTH} characters`,
      400,
    );
  }

  /*
   * ============================
   * EMAIL
   * ============================
   */

  if (
    !email ||
    typeof email !== "string"
  ) {
    throw new HandleError(
      "Email is required",
      400,
    );
  }

  const normalizedEmail =
    email.trim().toLowerCase();

  if (
    !EMAIL_REGEX.test(
      normalizedEmail,
    )
  ) {
    throw new HandleError(
      "Please provide a valid email address",
      400,
    );
  }

  /*
   * ============================
   * PHONE
   * ============================
   */

  let normalizedPhone;

  if (
    phone !== undefined &&
    phone !== null &&
    phone !== ""
  ) {
    if (typeof phone !== "string") {
      throw new HandleError(
        "Phone number must be a string",
        400,
      );
    }

    normalizedPhone =
      phone.replace(/\s+/g, "").trim();

    if (
      !PHONE_REGEX.test(
        normalizedPhone,
      )
    ) {
      throw new HandleError(
        "Please provide a valid phone number",
        400,
      );
    }
  }

  /*
   * ============================
   * PASSWORD
   * ============================
   */

  if (
    !password ||
    typeof password !== "string"
  ) {
    throw new HandleError(
      "Password is required",
      400,
    );
  }

  if (password.length < 8) {
    throw new HandleError(
      "Password must contain at least 8 characters",
      400,
    );
  }

  const hasUppercase =
    /[A-Z]/.test(password);

  const hasLowercase =
    /[a-z]/.test(password);

  const hasNumber =
    /\d/.test(password);

  const hasSpecialCharacter =
    /[^A-Za-z0-9]/.test(password);

  if (
    !hasUppercase ||
    !hasLowercase ||
    !hasNumber ||
    !hasSpecialCharacter
  ) {
    throw new HandleError(
      "Password must contain uppercase, lowercase, number and special character",
      400,
    );
  }

  /*
   * ============================
   * ROLE
   * ============================
   */

  const normalizedRole =
    typeof role === "string"
      ? role.trim().toLowerCase()
      : "user";

  if (
    !ADMIN_USER_ROLES.includes(
      normalizedRole,
    )
  ) {
    throw new HandleError(
      "Invalid user role",
      400,
    );
  }

  /*
   * ============================
   * STATUS
   * ============================
   */

  const normalizedStatus =
    typeof status === "string"
      ? status.trim().toLowerCase()
      : "active";

  if (
    !ADMIN_USER_STATUSES.includes(
      normalizedStatus,
    )
  ) {
    throw new HandleError(
      "Invalid user status",
      400,
    );
  }

  /*
   * ============================
   * AVATAR
   * ============================
   */

  let normalizedAvatar;

  if (
    avatar !== undefined &&
    avatar !== null
  ) {
    if (
      typeof avatar !== "object" ||
      Array.isArray(avatar)
    ) {
      throw new HandleError(
        "Invalid avatar data",
        400,
      );
    }

    const {
      url,
      publicId,
    } = avatar;

    if (
      !url ||
      typeof url !== "string" ||
      !url.trim()
    ) {
      throw new HandleError(
        "Avatar URL is required",
        400,
      );
    }

    if (
      !publicId ||
      typeof publicId !== "string" ||
      !publicId.trim()
    ) {
      throw new HandleError(
        "Avatar public ID is required",
        400,
      );
    }

    /*
     * Because this image should have
     * already been uploaded to Cloudinary.
     */
    if (
      !url
        .trim()
        .startsWith("https://")
    ) {
      throw new HandleError(
        "Invalid avatar URL",
        400,
      );
    }

    normalizedAvatar = {
      url: url.trim(),
      publicId:
        publicId.trim(),
    };
  }

  /*
   * ============================
   * DEPARTMENT
   * ============================
   */

  let normalizedDepartment = "";

  if (
    department !== undefined &&
    department !== null
  ) {
    if (
      typeof department !== "string"
    ) {
      throw new HandleError(
        "Department must be a string",
        400,
      );
    }

    normalizedDepartment =
      department.trim();

    if (
      normalizedDepartment.length >
      MAX_DEPARTMENT_LENGTH
    ) {
      throw new HandleError(
        `Department cannot exceed ${MAX_DEPARTMENT_LENGTH} characters`,
        400,
      );
    }
  }

  /*
   * ============================
   * DESIGNATION
   * ============================
   */

  let normalizedDesignation = "";

  if (
    designation !== undefined &&
    designation !== null
  ) {
    if (
      typeof designation !== "string"
    ) {
      throw new HandleError(
        "Designation must be a string",
        400,
      );
    }

    normalizedDesignation =
      designation.trim();

    if (
      normalizedDesignation.length >
      MAX_DESIGNATION_LENGTH
    ) {
      throw new HandleError(
        `Designation cannot exceed ${MAX_DESIGNATION_LENGTH} characters`,
        400,
      );
    }
  }

  /*
   * ============================
   * ADDRESS
   * ============================
   */

  let normalizedAddress = {
    street: "",
    city: "",
    state: "",
    country: "India",
    pinCode: "",
  };

  if (
    address !== undefined &&
    address !== null
  ) {
    if (
      typeof address !== "object" ||
      Array.isArray(address)
    ) {
      throw new HandleError(
        "Address must be an object",
        400,
      );
    }

    const {
      street,
      city,
      state,
      country,
      pinCode,
    } = address;

    const addressFields = {
      street,
      city,
      state,
      country,
      pinCode,
    };

    for (
      const [field, value]
      of Object.entries(addressFields)
    ) {
      if (
        value !== undefined &&
        value !== null &&
        typeof value !== "string"
      ) {
        throw new HandleError(
          `${field} must be a string`,
          400,
        );
      }
    }

    const normalizedStreet =
      street?.trim() || "";

    const normalizedCity =
      city?.trim() || "";

    const normalizedState =
      state?.trim() || "";

    const normalizedCountry =
      country?.trim() || "India";

    const normalizedPinCode =
      pinCode?.trim() || "";

    if (
      normalizedStreet.length >
      MAX_ADDRESS_FIELD_LENGTH
    ) {
      throw new HandleError(
        "Street address is too long",
        400,
      );
    }

    if (
      normalizedCity.length > 100
    ) {
      throw new HandleError(
        "City name is too long",
        400,
      );
    }

    if (
      normalizedState.length > 100
    ) {
      throw new HandleError(
        "State name is too long",
        400,
      );
    }

    if (
      normalizedCountry.length > 100
    ) {
      throw new HandleError(
        "Country name is too long",
        400,
      );
    }

    /*
     * Only validate pin code when
     * the user provided one.
     */

    if (
      normalizedPinCode &&
      !PIN_CODE_REGEX.test(
        normalizedPinCode,
      )
    ) {
      throw new HandleError(
        "Please provide a valid 6 digit pin code",
        400,
      );
    }

    normalizedAddress = {
      street: normalizedStreet,
      city: normalizedCity,
      state: normalizedState,
      country: normalizedCountry,
      pinCode: normalizedPinCode,
    };
  }
  /*

  /*
   * ============================
   * SANITIZED PAYLOAD
   * ============================
   */

  return {
    name: normalizedName,

    email: normalizedEmail,

    phone: normalizedPhone,

    password,

    role: normalizedRole,

    status: normalizedStatus,

    avatar: normalizedAvatar,

    department:
      normalizedDepartment,

    designation:
      normalizedDesignation,

    address:
      normalizedAddress,
  };
};
 
export const validateUpdateUserPayload = (payload = {}) => {
  const update = {};

  if (payload.name !== undefined) {
    if (
      typeof payload.name !== "string" ||
      !payload.name.trim()
    ) {
      throw new HandleError(
        "Name cannot be empty",
        400
      );
    }

    update.name = payload.name.trim();
  }

  if (payload.email !== undefined) {
    if (typeof payload.email !== "string") {
      throw new HandleError(
        "Invalid email",
        400
      );
    }

    const email =
      payload.email.trim().toLowerCase();

    if (!EMAIL_REGEX.test(email)) {
      throw new HandleError(
        "Please provide a valid email address",
        400
      );
    }

    update.email = email;
  }

  if (payload.phone !== undefined) {
    const phone = payload.phone?.trim();

    if (
      phone &&
      !PHONE_REGEX.test(phone)
    ) {
      throw new HandleError(
        "Please provide a valid phone number",
        400
      );
    }

    update.phone = phone || undefined;
  }

  if (payload.role !== undefined) {
    const role =
      payload.role.trim().toLowerCase();

    if (
      !ADMIN_USER_ROLES.includes(role)
    ) {
      throw new HandleError(
        "Invalid user role",
        400
      );
    }

    update.role = role;
  }

  if (payload.status !== undefined) {
    const status =
      payload.status.trim().toLowerCase();

    if (
      !ADMIN_USER_STATUSES.includes(status)
    ) {
      throw new HandleError(
        "Invalid user status",
        400
      );
    }

    update.status = status;
  }

  if (payload.password) {
    if (
      typeof payload.password !== "string" ||
      payload.password.length < 8
    ) {
      throw new HandleError(
        "Password must contain at least 8 characters",
        400
      );
    }

    update.password = payload.password;
  }

  if (payload.department !== undefined) {
    if (
      typeof payload.department !== "string"
    ) {
      throw new HandleError(
        "Department must be a string",
        400
      );
    }

    update.department =
      payload.department.trim();
  }

  if (payload.designation !== undefined) {
    if (
      typeof payload.designation !== "string"
    ) {
      throw new HandleError(
        "Designation must be a string",
        400
      );
    }

    update.designation =
      payload.designation.trim();
  }

  if (payload.avatar !== undefined) {
    if (payload.avatar === null) {
      update.avatar = {
        url: null,
        publicId: null,
      };
    } else {
      if (
        typeof payload.avatar !== "object" ||
        !payload.avatar.url ||
        !payload.avatar.publicId
      ) {
        throw new HandleError(
          "Invalid avatar data",
          400
        );
      }

      update.avatar = {
        url: payload.avatar.url.trim(),
        publicId:
          payload.avatar.publicId.trim(),
      };
    }
  }

  if (payload.address !== undefined) {
    if (
      typeof payload.address !== "object" ||
      payload.address === null ||
      Array.isArray(payload.address)
    ) {
      throw new HandleError(
        "Invalid address",
        400
      );
    }

    update.address = {
      street:
        payload.address.street?.trim() || "",
      city:
        payload.address.city?.trim() || "",
      state:
        payload.address.state?.trim() || "",
      country:
        payload.address.country?.trim() ||
        "India",
      pinCode:
        payload.address.pinCode?.trim() || "",
    };
  }

  if (Object.keys(update).length === 0) {
    throw new HandleError(
      "No valid fields provided for update",
      400
    );
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
