const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    String(value).trim() === ""
  );
};

const isValidNumber = (value) => {
  if (isEmpty(value)) return false;

  return Number.isFinite(Number(value));
};

const validateOptionalNumber = ({
  value,
  fieldName,
  label,
  errors,
  integer = false,
}) => {
  if (isEmpty(value)) return;

  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    errors[fieldName] =
      `${label} must be a valid number`;
    return;
  }

  if (numericValue < 0) {
    errors[fieldName] =
      `${label} cannot be negative`;
    return;
  }

  if (
    integer &&
    !Number.isInteger(numericValue)
  ) {
    errors[fieldName] =
      `${label} must be a whole number`;
  }
};

export const validateProduct = (
  values = {},
  mode = "draft",
) => {
  const errors = {};
  const isPublishing = mode === "publish";

  const name = values.name?.trim() || "";

  if (!name) {
    errors.name = "Product name is required";
  } else if (name.length > 180) {
    errors.name =
      "Product name cannot exceed 180 characters";
  }

  if (
    values.shortDescription?.length > 250
  ) {
    errors.shortDescription =
      "Short description cannot exceed 250 characters";
  }

  if (isPublishing) {
    if (!values.shortDescription?.trim()) {
      errors.shortDescription =
        "Short description is required";
    }

    if (!values.description?.trim()) {
      errors.description =
        "Product description is required";
    }

    if (!values.category) {
      errors.category =
        "Category is required";
    }

    if (!values.brand) {
      errors.brand = "Brand is required";
    }

    if (!values.sku?.trim()) {
      errors.sku = "SKU is required";
    }

    if (!isValidNumber(values.price)) {
      errors.price =
        "Valid product price is required";
    }

    if (!values.currency) {
      errors.currency =
        "Currency is required";
    }

    if (
      !Array.isArray(values.images) ||
      values.images.length === 0
    ) {
      errors.images =
        "At least one product image is required";
    }
  }

  validateOptionalNumber({
    value: values.price,
    fieldName: "price",
    label: "Price",
    errors,
  });

  validateOptionalNumber({
    value: values.discountPrice,
    fieldName: "discountPrice",
    label: "Discount price",
    errors,
  });

  validateOptionalNumber({
    value: values.costPrice,
    fieldName: "costPrice",
    label: "Cost price",
    errors,
  });

  if (!isEmpty(values.discountPrice)) {
    if (isEmpty(values.price)) {
      errors.discountPrice =
        "Price is required when discount price is provided";
    } else if (
      Number(values.discountPrice) >=
      Number(values.price)
    ) {
      errors.discountPrice =
        "Discount price must be less than price";
    }
  }

  if (values.trackInventory) {
    validateOptionalNumber({
      value: values.stock,
      fieldName: "stock",
      label: "Stock",
      errors,
      integer: true,
    });

    if (
      isPublishing &&
      isEmpty(values.stock)
    ) {
      errors.stock =
        "Stock quantity is required";
    }
  }

  validateOptionalNumber({
    value: values.lowStockThreshold,
    fieldName: "lowStockThreshold",
    label: "Low stock threshold",
    errors,
    integer: true,
  });

  if (
    values.seoTitle &&
    values.seoTitle.length > 60
  ) {
    errors.seoTitle =
      "SEO title cannot exceed 60 characters";
  }

  if (
    values.seoDescription &&
    values.seoDescription.length > 160
  ) {
    errors.seoDescription =
      "SEO description cannot exceed 160 characters";
  }

  if (
    Array.isArray(values.seoKeywords) &&
    values.seoKeywords.length > 10
  ) {
    errors.seoKeywords =
      "Maximum 10 SEO keywords are allowed";
  }

  if (
    Array.isArray(values.seoKeywords) &&
    values.seoKeywords.some(
      (keyword) => keyword.length > 30,
    )
  ) {
    errors.seoKeywords =
      "Each SEO keyword must be 30 characters or less";
  }

  const weightValue = values.weight?.value;

  validateOptionalNumber({
    value: weightValue,
    fieldName: "weight.value",
    label: "Weight",
    errors,
  });

  const dimensions = values.dimensions || {};
  const dimensionValues = [
    dimensions.length,
    dimensions.width,
    dimensions.height,
  ];

  const hasAnyDimension =
    dimensionValues.some(
      (value) => !isEmpty(value),
    );

  const hasAllDimensions =
    dimensionValues.every(
      (value) => !isEmpty(value),
    );

  if (
    hasAnyDimension &&
    !hasAllDimensions
  ) {
    errors.dimensions =
      "Length, width and height are all required";
  }

  if (hasAnyDimension) {
    ["length", "width", "height"].forEach(
      (fieldName) => {
        validateOptionalNumber({
          value: dimensions[fieldName],
          fieldName: `dimensions.${fieldName}`,
          label: fieldName,
          errors,
        });
      },
    );
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};