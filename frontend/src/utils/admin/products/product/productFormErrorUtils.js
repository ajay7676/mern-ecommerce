import { PRODUCT_STEP_FIELDS } from "./productStepValidation";

/**
 * Safely get nested value from object using dot path.
 * Example: getNestedValue(errors, "visibility.onlineStore")
 */
const getNestedValue = (object, path) => {
  return path.split(".").reduce((acc, key) => {
    return acc?.[key];
  }, object);
};

/**
 * Extract first readable message from React Hook Form error object.
 */
const getErrorMessage = (error) => {
  if (!error) return "";

  if (typeof error.message === "string") {
    return error.message;
  }

  if (Array.isArray(error)) {
    for (const item of error) {
      const message = getErrorMessage(item);
      if (message) return message;
    }
  }

  if (typeof error === "object") {
    for (const value of Object.values(error)) {
      const message = getErrorMessage(value);
      if (message) return message;
    }
  }

  return "";
};

/**
 * Find first error from selected fields.
 * Useful for step-wise validation.
 */
export const getFirstErrorFromFields = (errors = {}, fields = []) => {
  for (const field of fields) {
    const error = getNestedValue(errors, field);
    const message = getErrorMessage(error);

    if (message) {
      return {
        field,
        message,
      };
    }
  }

  return {
    field: null,
    message: "",
  };
};

/**
 * Get step number from field name.
 * Example: "images.0.url" -> Step 3
 */
export const getStepFromFieldName = (fieldName = "") => {
  const matchedStep = Object.entries(PRODUCT_STEP_FIELDS).find(
    ([, fields]) => {
      return fields.some((field) => {
        return fieldName === field || fieldName.startsWith(`${field}.`);
      });
    }
  );

  return matchedStep ? Number(matchedStep[0]) : 1;
};

/**
 * Flatten nested React Hook Form errors.
 */
const flattenErrors = (errors = {}, parentPath = "") => {
  const result = [];

  Object.entries(errors || {}).forEach(([key, value]) => {
    const path = parentPath ? `${parentPath}.${key}` : key;

    const message = getErrorMessage(value);

    if (value?.message && message) {
      result.push({
        field: path,
        message,
      });

      return;
    }

    if (typeof value === "object") {
      result.push(...flattenErrors(value, path));
    }
  });

  return result;
};

/**
 * Main function:
 * Finds the first form error and returns field, message, and step.
 */
export const getFirstProductFormError = (errors = {}) => {
  const flatErrors = flattenErrors(errors);

  if (!flatErrors.length) {
    return {
      field: null,
      message: "Please fill all required fields",
      step: 1,
    };
  }

  const firstError = flatErrors[0];

  return {
    field: firstError.field,
    message: firstError.message || "Please fill required field",
    step: getStepFromFieldName(firstError.field),
  };
};