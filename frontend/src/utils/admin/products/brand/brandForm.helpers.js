// export const buildCreateBrandPayload = (values) => {
//   return {
//     name: values.name.trim(),

//     slug: values.slug.trim(),

//     description: values.description.trim(),

//     logo: values.logo
//       ? {
//           publicId: values.logo.publicId,

//           url: values.logo.url,

//           alt: values.logo.alt || `${values.name.trim()} logo`,
//         }
//       : null,

//     banner: values.banner
//       ? {
//           publicId: values.banner.publicId,

//           url: values.banner.url,

//           alt: values.banner.alt || `${values.name.trim()} banner`,
//         }
//       : null,

//     status: values.status,

//     isFeatured: Boolean(values.isFeatured),

//     sortOrder: Number(values.sortOrder) || 0,

//     seo: {
//       title: values.seo.title.trim(),

//       description: values.seo.description.trim(),

//       keywords: values.seo.keywords
//         .split(",")
//         .map((keyword) => keyword.trim())
//         .filter(Boolean),
//     },
//   };
// };

export const buildCreateBrandPayload = (values) => {


  const keywords = values.seo?.keywords;
  const normalizedTitle = values.seo?.title ?? "";
  const normalizeddescription = values.seo?.description ?? "";

  const normalizedKeywords = Array.isArray(keywords)
    ? keywords
        .map((keyword) => String(keyword).trim())
        .filter(Boolean)
    : String(keywords ?? "")
        .split(",")
        .map((keyword) => keyword.trim())
        .filter(Boolean);

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
      title: normalizedTitle,

      description: normalizeddescription,

      keywords: normalizedKeywords,
    },
  };
};
export const getBrandFormValues = (brand = null) => {

  const safe = brand ?? {};

  const exitingInfo = {
    name: safe.brand?.name ?? "",
    slug: safe.brand?.slug ?? "",
    description: safe.brand?.description ?? "",

    logo: safe.brand?.logo
      ? {
          publicId: brand.logo.publicId ?? "",
          url: brand.logo.url ?? "",
        }
      : null,

    banner: safe.brand?.banner
      ? {
          publicId: brand.banner.publicId ?? "",
          url: brand.banner.url ?? "",
        }
      : null,

    metaTitle: safe.brand?.seo?.metaTitle ?? "",
    metaDescription: safe.brand?.seo?.metaDescription ?? "",
    metaKeywords: safe.brand?.seo?.metaKeywords ?? "",

    status: safe.brand?.status ?? "active",
    isFeatured: Boolean(safe.brand?.isFeatured),
    sortOrder: safe.brand?.sortOrder ?? 0,
  };

  return exitingInfo;
};

export const getInitialBrandFormValues = (
  brand = null
) => ({
  name: brand?.name ?? "",

  slug: brand?.slug ?? "",

  description:
    brand?.description ?? "",

  logo: brand?.logo
    ? {
        publicId:
          brand.logo.publicId ?? "",
        url:
          brand.logo.url ?? "",
      }
    : null,

  banner: brand?.banner
    ? {
        publicId:
          brand.banner.publicId ?? "",
        url:
          brand.banner.url ?? "",
      }
    : null,

  status:
    brand?.status ?? "active",

  isFeatured:
    Boolean(brand?.isFeatured),

  sortOrder:
    brand?.sortOrder ?? 0,

  metaTitle:
    brand?.seo?.metaTitle ?? "",

  metaDescription:
    brand?.seo?.metaDescription ?? "",

  metaKeywords:
    brand?.seo?.metaKeywords ?? "",
});
