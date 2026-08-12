export const validateUser = (values, { requirePassword = false } = {}) => {
  const errors = {};

  if (!values.name?.trim()) {
    errors.name = "Name is required";
  }

  if (!values.email?.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address";
  }

  if (requirePassword && !values.password) {
    errors.password = "Password is required";
  }

  if (requirePassword && values.password && values.password.length < 8) {
    errors.password = "Password must contain at least 8 characters";
  }

  return errors;
};
