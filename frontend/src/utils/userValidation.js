const PASSWORD_PATTERN =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

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

  if (requirePassword) {
    if (!values.password) {
      errors.password = "Password is required";
    } else if (!PASSWORD_PATTERN.test(values.password)) {
      errors.password =
        "Password must contain uppercase, lowercase, number and symbol";
    }
  }

  return errors;
};
