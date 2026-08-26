export const buildCreateBrandPayload = (values) => {
  return {
    name: values.name.trim(),

    slug: values.slug.trim(),

    description: values.description.trim(),

    logo: values.logo
      ? {
          publicId: values.logo.publicId,

          url: values.logo.url,

          alt: values.logo.alt || `${values.name.trim()} logo`,
        }
      : null,

    banner: values.banner
      ? {
          publicId: values.banner.publicId,

          url: values.banner.url,

          alt: values.banner.alt || `${values.name.trim()} banner`,
        }
      : null,

    status: values.status,

    isFeatured: Boolean(values.isFeatured),

    sortOrder: Number(values.sortOrder) || 0,

    seo: {
      title: values.seo.title.trim(),

      description: values.seo.description.trim(),

      keywords: values.seo.keywords
        .split(",")
        .map((keyword) => keyword.trim())
        .filter(Boolean),
    },
  };
};
