
export const getCategoryFormValues = (
  category,
) => {
  const safe =
    category ?? {};

  return {
    name:
      safe.name ?? "",

    slug:
      safe.slug ?? "",

    description:
      safe.description ?? "",

    parentCategory:
      safe.parentCategory?._id ??
      safe.parentCategory ??
      "",

    status:
      safe.status ??
      "active",

    sortOrder:
      safe.sortOrder ??
      "",

    icon:
      safe.icon ??
      "",

    seoTitle:
      safe.seo?.title ??
      "",

    seoDescription:
      safe.seo?.description ??
      "",

    seoKeywords:
      Array.isArray(
        safe.seo?.keywords,
      )
        ? safe.seo.keywords.join(
            ", ",
          )
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
