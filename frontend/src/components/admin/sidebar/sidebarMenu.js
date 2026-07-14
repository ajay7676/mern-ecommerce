
import {
  LayoutDashboard,
  Package,
  Boxes,
  ShoppingCart,
  Users,
  MessageSquare,
  Settings,
  BarChart3,
} from "lucide-react";

import  { ROUTES } from '../../../constants/routes';

export  const sidebarMenu  = [
    {
    id: "home",
    label: "Home",
    icon: LayoutDashboard,
    path: ROUTES.ADMIN.DASHBOARD,
  },
    {
    id: "listings",
    label: "Listings",
    icon: Package,
    path: ROUTES.ADMIN.LISTINGS,
  },
   {
    id: "inventory",
    label: "Inventory",
    icon: Boxes,
    path: ROUTES.ADMIN.CATEGORIES,
  },
   {
    id: "orders",
    label: "Orders",
    icon: ShoppingCart,
    path: ROUTES.ADMIN.ORDERS,
    badge: 12,
  },
    {
    id: "payments",
    label: "Payments",
    icon: Users,
    path: ROUTES.ADMIN.USERS,
  },
    {
    id: "growth",
    label: "Growth",
    icon: Users,
    path: ROUTES.ADMIN.GROWTH,
  },
   {
    id: "ads",
    label: "Ads",
    icon: MessageSquare,
    path: ROUTES.ADMIN.ADS,
    badge: 5,
  },

  {
    id: "analytics",
    label: "Reports",
    icon: BarChart3,
    path: ROUTES.ADMIN.REPORTS,
  },

  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    path: ROUTES.ADMIN.SETTINGS,
  },

]