export const INITIAL_BRAND_FORM = {
  name: "",
  slug: "",
  description: "",

  logo: null,
  banner: null,

  status: "active",
  isFeatured: false,
  sortOrder: 0,

  seo: {
    title: "",
    description: "",
    keywords: "",
  },
};

export const BRAND_LOGO_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const BRAND_BANNER_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const MAX_BRAND_LOGO_SIZE = 2 * 1024 * 1024;

export const MAX_BRAND_BANNER_SIZE = 5 * 1024 * 1024;
