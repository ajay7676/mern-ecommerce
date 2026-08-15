const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PHONE_REGEX = /^\+?[1-9]\d{7,14}$/;

const PIN_CODE_REGEX = /^[1-9][0-9]{5}$/;

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

const ALLOWED_ROLES = ["user", "admin"];

const ALLOWED_STATUSES = ["active", "pending", "blocked"];

export const validateEditUser = (values = {}) => {
  const errors = {};

  const {
    name,
    email,
    phone,
    role,
    status,
    password,
    confirmPassword,
    department,
    designation,
    address,
  } = values;

  // =========================
  // NAME
  // =========================

  if (!name || typeof name !== "string" || !name.trim()) {
    errors.name = "Full name is required";
  } else if (name.trim().length > 100) {
    errors.name = "Full name cannot exceed 100 characters";
  }

  // =========================
  // EMAIL
  // =========================

  if (!email || typeof email !== "string" || !email.trim()) {
    errors.email = "Email is required";
  } else if (!EMAIL_REGEX.test(email.trim().toLowerCase())) {
    errors.email = "Please provide a valid email address";
  }

  // =========================
  // PHONE
  // =========================

  if (phone?.trim()) {
    const normalizedPhone = phone.replace(/\s+/g, "").trim();

    if (!PHONE_REGEX.test(normalizedPhone)) {
      errors.phone = "Please provide a valid phone number";
    }
  }

  // =========================
  // ROLE
  // =========================

  if (!role || !ALLOWED_ROLES.includes(role.toLowerCase())) {
    errors.role = "Please select a valid role";
  }

  // =========================
  // STATUS
  // =========================

  if (!status || !ALLOWED_STATUSES.includes(status.toLowerCase())) {
    errors.status = "Please select a valid status";
  }

  // =========================
  // PASSWORD
  // =========================
  //
  // Edit mode:
  // password blank => keep old password.
  //

  if (password || confirmPassword) {
    if (!password) {
      errors.password = "Password is required";
    } else if (!PASSWORD_REGEX.test(password)) {
      errors.password =
        "Password must contain at least 8 characters with uppercase, lowercase, number and special character";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm the password";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
  }

  // =========================
  // DEPARTMENT
  // =========================

  if (department !== undefined && typeof department !== "string") {
    errors.department = "Department must be valid";
  } else if (department?.trim().length > 100) {
    errors.department = "Department cannot exceed 100 characters";
  }

  // =========================
  // DESIGNATION
  // =========================

  if (designation !== undefined && typeof designation !== "string") {
    errors.designation = "Designation must be valid";
  } else if (designation?.trim().length > 100) {
    errors.designation = "Designation cannot exceed 100 characters";
  }

  // =========================
  // ADDRESS
  // =========================

  if (address) {
    const addressErrors = {};

    if (address.street !== undefined && typeof address.street !== "string") {
      addressErrors.street = "Street must be valid";
    } else if (address.street?.trim().length > 200) {
      addressErrors.street = "Street address cannot exceed 200 characters";
    }

    if (address.city !== undefined && typeof address.city !== "string") {
      addressErrors.city = "City must be valid";
    } else if (address.city?.trim().length > 100) {
      addressErrors.city = "City cannot exceed 100 characters";
    }

    if (address.state !== undefined && typeof address.state !== "string") {
      addressErrors.state = "State must be valid";
    } else if (address.state?.trim().length > 100) {
      addressErrors.state = "State cannot exceed 100 characters";
    }

    if (address.country !== undefined && typeof address.country !== "string") {
      addressErrors.country = "Country must be valid";
    } else if (address.country?.trim().length > 100) {
      addressErrors.country = "Country cannot exceed 100 characters";
    }

    if (address.pinCode?.trim()) {
      if (!PIN_CODE_REGEX.test(address.pinCode.trim())) {
        addressErrors.pinCode = "Please provide a valid 6 digit pin code";
      }
    }

    if (Object.keys(addressErrors).length > 0) {
      errors.address = addressErrors;
    }
  }

  return errors;
};
