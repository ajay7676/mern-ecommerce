export const validateBrandForm = (values) => {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = "Brand name is required";
  }

  if (!values.slug.trim()) {
    errors.slug = "Brand slug is required";
  }

  if (!values.logo?.publicId) {
    errors.logo = "Brand logo is required";
  }

  if (values.description.length > 500) {
    errors.description = "Description cannot exceed 500 characters";
  }

  if (values.seo.title.length > 60) {
    errors.seoTitle = "Meta title cannot exceed 60 characters";
  }

  if (values.seo.description.length > 160) {
    errors.seoDescription = "Meta description cannot exceed 160 characters";
  }

  return errors;
};
