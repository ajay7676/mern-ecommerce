import { PUBLIC_ROUTES } from "./public.routes";
import { AUTH_ROUTES } from "./auth.routes";
import { CUSTOMER_ROUTES } from "./customer.routes";
import { ADMIN_ROUTES } from "./admin.routes";
import { ERROR_ROUTES } from "./error.routes";

export const ROUTES = {
  PUBLIC: PUBLIC_ROUTES,
  AUTH: AUTH_ROUTES,
  CUSTOMER: CUSTOMER_ROUTES,
  ADMIN: ADMIN_ROUTES,
  ERROR: ERROR_ROUTES,
};