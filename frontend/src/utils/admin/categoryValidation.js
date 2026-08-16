import {
  MAX_CATEGORY_DESCRIPTION_LENGTH,
  MAX_CATEGORY_NAME_LENGTH,
  MAX_SEO_DESCRIPTION_LENGTH,
  MAX_SEO_TITLE_LENGTH,
} from "../../constants/admin/products/category.constants";

export const validateCategoryForm = (values) => {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = "Category name is required";
  } else if (values.name.trim().length > MAX_CATEGORY_NAME_LENGTH) {
    errors.name = `Category name cannot exceed ${MAX_CATEGORY_NAME_LENGTH} characters`;
  }
  if (
    values.description &&
    values.description.length > MAX_CATEGORY_DESCRIPTION_LENGTH
  ) {
    errors.description = `Description cannot exceed ${MAX_CATEGORY_DESCRIPTION_LENGTH} characters`;
  }

  if (values.sortOrder !== "" && Number(values.sortOrder) < 0) {
    errors.sortOrder = "Sort order cannot be negative";
  }

  if (values.seoTitle && values.seoTitle.length > MAX_SEO_TITLE_LENGTH) {
    errors.seoTitle = `SEO title cannot exceed ${MAX_SEO_TITLE_LENGTH} characters`;
  }

  if (
    values.seoDescription &&
    values.seoDescription.length > MAX_SEO_DESCRIPTION_LENGTH
  ) {
    errors.seoDescription = `SEO description cannot exceed ${MAX_SEO_DESCRIPTION_LENGTH} characters`;
  }

  return errors;
};
