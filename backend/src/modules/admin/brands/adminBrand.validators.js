import HandleError from "../../../utils/handleError.js";

import {
  BRAND_STATUSES,
  MAX_BRAND_DESCRIPTION_LENGTH,
  MAX_BRAND_NAME_LENGTH,
  MAX_BRAND_SEO_DESCRIPTION_LENGTH,
  MAX_BRAND_SEO_KEYWORDS,
  MAX_BRAND_SEO_TITLE_LENGTH,
} from "./adminBrand.constants.js";

import { normalizeBrandSlug } from "./adminBrand.helpers.js";

export const validateCreateBrandPayload = (payload = {}) => {
  const {
    name,
    slug,
    description,
    logo,
    banner,
    status,
    isFeatured,
    sortOrder,
    seo,
  } = payload;

  if (typeof name !== "string" || !name.trim()) {
    throw new HandleError("Brand name is required", 400, {
      name: "Brand name is required",
    });
  }

  const normalizedName = name.trim();

  if (normalizedName.length > MAX_BRAND_NAME_LENGTH) {
    throw new HandleError("Brand name is too long", 400, {
      name: `Brand name cannot exceed ${MAX_BRAND_NAME_LENGTH} characters`,
    });
  }

  const normalizedSlug = normalizeBrandSlug(slug || normalizedName);

  if (!normalizedSlug) {
    throw new HandleError("Brand slug is required", 400, {
      slug: "Brand slug is required",
    });
  }

  const normalizedDescription = description?.trim() ?? "";

  if (normalizedDescription.length > MAX_BRAND_DESCRIPTION_LENGTH) {
    throw new HandleError("Brand description is too long", 400, {
      description: `Description cannot exceed ${MAX_BRAND_DESCRIPTION_LENGTH} characters`,
    });
  }

  const normalizedStatus = status?.toLowerCase() ?? "active";

  if (!BRAND_STATUSES.includes(normalizedStatus)) {
    throw new HandleError("Invalid brand status", 400, {
      status: "Status must be active or inactive",
    });
  }

  const normalizedSortOrder =
    sortOrder === undefined || sortOrder === "" ? 0 : Number(sortOrder);

  if (!Number.isInteger(normalizedSortOrder) || normalizedSortOrder < 0) {
    throw new HandleError("Invalid display order", 400, {
      sortOrder: "Display order must be 0 or greater",
    });
  }

  if (isFeatured !== undefined && typeof isFeatured !== "boolean") {
    throw new HandleError("Invalid featured value", 400, {
      isFeatured: "Featured must be true or false",
    });
  }

  /*
   * Logo is required according
   * to your Add Brand design.
   */
  if (!logo?.publicId || !logo?.url) {
    throw new HandleError("Brand logo is required", 400, {
      logo: "Please upload a brand logo",
    });
  }

  const seoTitle = seo?.title?.trim() ?? "";

  if (seoTitle.length > MAX_BRAND_SEO_TITLE_LENGTH) {
    throw new HandleError("SEO title is too long", 400, {
      seoTitle: `SEO title cannot exceed ${MAX_BRAND_SEO_TITLE_LENGTH} characters`,
    });
  }

  const seoDescription = seo?.description?.trim() ?? "";

  if (seoDescription.length > MAX_BRAND_SEO_DESCRIPTION_LENGTH) {
    throw new HandleError("SEO description is too long", 400, {
      seoDescription: `SEO description cannot exceed ${MAX_BRAND_SEO_DESCRIPTION_LENGTH} characters`,
    });
  }

  const keywords = Array.isArray(seo?.keywords)
    ? [
        ...new Set(
          seo.keywords.map((keyword) => String(keyword).trim()).filter(Boolean),
        ),
      ]
    : [];

  if (keywords.length > MAX_BRAND_SEO_KEYWORDS) {
    throw new HandleError("Too many SEO keywords", 400, {
      seoKeywords: `Maximum ${MAX_BRAND_SEO_KEYWORDS} SEO keywords are allowed`,
    });
  }

  return {
    name: normalizedName,

    slug: normalizedSlug,

    description: normalizedDescription,

    logo: {
      publicId: logo.publicId,

      url: logo.url,

      alt: logo.alt?.trim() || `${normalizedName} logo`,
    },

    banner:
      banner?.publicId && banner?.url
        ? {
            publicId: banner.publicId,

            url: banner.url,

            alt: banner.alt?.trim() || `${normalizedName} banner`,
          }
        : {
            publicId: null,
            url: null,
            alt: "",
          },

    status: normalizedStatus,

    isFeatured: isFeatured ?? false,

    sortOrder: normalizedSortOrder,

    seo: {
      title: seoTitle,

      description: seoDescription,

      keywords,
    },
  };
};
