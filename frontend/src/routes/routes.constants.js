export const PATHS = {
  // Public
  HOME: "/",
  PRODUCTS: "/products",
  PRODUCT_DETAILS: "/products/:productId",
  CATEGORIES: "/categories/:slug",
  BRANDS: "/brands/:slug",
  SEARCH: "/search",
  CART: "/cart",
  CONTACT: "/contact",
  ABOUT: "/about",
  // Customer Auth
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password/:token",

  // Customer Protected
  PROFILE: "/profile",
  PROFILE_EDIT: "/profile/edit",
  ADDRESSES: "/addresses",
  ORDERS: "/orders",
  ORDER_DETAILS: "/orders/:id",
  CHECKOUT: "/checkout",
  PAYMENT: "/payment",

  // Admin Auth
  ADMIN_LOGIN: "/admin/login",
  ADMIN_REGISTER: "/admin/register",

   // Admin

  ADMIN_DASHBOARD: "/admin",
  ADMIN_PRODUCTS: "/admin/products",
  ADMIN_PRODUCT_CREATE: "/admin/products/create",
  ADMIN_PRODUCT_EDIT: "/admin/products/:id/edit",

  ADMIN_CATEGORIES: "/admin/categories",
  ADMIN_BRANDS: "/admin/brands",

  ADMIN_ORDERS: "/admin/orders",
  ADMIN_ORDER_DETAILS: "/admin/orders/:id",

  ADMIN_USERS: "/admin/users",

  ADMIN_REVIEWS: "/admin/reviews",

  ADMIN_SETTINGS: "/admin/settings",

  NOT_FOUND: "*",

};
