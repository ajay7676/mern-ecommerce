export const getCategoryFormValues = (category) => {
  const safeCategory = category ?? {};
  return {
    name: safeCategory.name ?? "",
    slug: safeCategory.slug ?? "",
    description: safeCategory.description ?? "",
    parentCategory:
      safeCategory.parentCategory?._id ?? safeCategory.parentCategory ?? "",
    status: safeCategory.status ?? "active",
    sortOrder: safeCategory.sortOrder ?? "",
    icon: safeCategory.icon ?? "",
    seoTitle: safeCategory.seo?.title ?? "",
    seoDescription: safeCategory.seo?.description ?? "",
    seoKeywords: Array.isArray(safeCategory.seo?.keywords)
      ? safeCategory.seo.keywords.join(", ")
      : "",
  };
};

export const buildCategoryPayload = ({ values }) => {
  return {
    name: values.name.trim(),

    slug: values.slug.trim(),

    description: values.description.trim(),

    parentCategory: values.parentCategory || null,

    status: values.status,

    sortOrder: values.sortOrder === "" ? 0 : Number(values.sortOrder),

    icon: values.icon.trim() || null,

    seo: {
      title: values.seoTitle.trim(),

      description: values.seoDescription.trim(),

      keywords: values.seoKeywords
        .split(",")
        .map((keyword) => keyword.trim())
        .filter(Boolean),
    },
  };
};
