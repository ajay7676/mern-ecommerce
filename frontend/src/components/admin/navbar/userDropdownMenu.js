import {
  User,
  Settings,
  Lock,
  Store,
  LogOut,
} from "lucide-react";

import { ROUTES } from "../../../constants/routes";

export const userDropdownMenu = [
  {
    id: "profile",
    label: "My Profile",
    icon: User,
    path: ROUTES.CUSTOMER.PROFILE,
  },

  {
    id: "settings",
    label: "Account Settings",
    icon: Settings,
    path: ROUTES.ADMIN.SETTINGS,
  },

  {
    id: "password",
    label: "Change Password",
    icon: Lock,
    path: ROUTES.AUTH.RESET_PASSWORD,
  },

  {
    divider: true,
  },

  {
    id: "store",
    label: "View Store",
    icon: Store,
    path: ROUTES.PUBLIC.HOME,
    target: "_blank",
  },

  {
    divider: true,
  },

  {
    id: "logout",
    label: "Logout",
    icon: LogOut,
    action: "logout",
    danger: true,
  },
];