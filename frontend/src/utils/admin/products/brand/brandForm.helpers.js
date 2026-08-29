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

export const getBrandFormValues = (brand = null) => {
  const safe = brand ?? {};

  console.log(safe)
  const exitingInfo = {
    name: brand?.name ?? "",
    slug: brand?.slug ?? "",
    description: brand?.description ?? "",

    logo: brand?.logo
      ? {
          publicId: brand.logo.publicId ?? "",
          url: brand.logo.url ?? "",
        }
      : null,

    banner: brand?.banner
      ? {
          publicId: brand.banner.publicId ?? "",
          url: brand.banner.url ?? "",
        }
      : null,

    metaTitle: brand?.seo?.metaTitle ?? "",
    metaDescription: brand?.seo?.metaDescription ?? "",
    metaKeywords: brand?.seo?.metaKeywords ?? "",

    status: brand?.status ?? "active",
    isFeatured: Boolean(brand?.isFeatured),
    sortOrder: brand?.sortOrder ?? 0,
  };
  console.log(exitingInfo);

  return exitingInfo;
};
