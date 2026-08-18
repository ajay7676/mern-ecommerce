export const getCategoryApiErrorMessage = (
  error,
  fallbackMessage = "Something went wrong",
) => {
  return error?.response?.data?.message || error?.message || fallbackMessage;
};

export const getCategoryFieldErrors = (error) => {
  const errors = error?.response?.data?.errors;

  if (!errors) {
    return {};
  }

  if (!Array.isArray(errors)) {
    return errors;
  }

  return errors.reduce((result, item) => {
    if (item?.field && item?.message) {
      result[item.field] = item.message;
    }

    return result;
  }, {});
};
