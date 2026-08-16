
import {
  LayoutDashboard,
  Package,
  Boxes,
  ShoppingCart,
  Users,
  MessageSquare,
  Settings,
  BarChart3,
  User2Icon,
} from "lucide-react";

import  { ROUTES } from '../../../constants/routes';
import { FiBox, FiGitBranch, FiGrid, FiLayers, FiPlusCircle, FiSliders, FiTag } from "react-icons/fi";

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
    label: "Products",
    icon: FiGrid,
    path: ROUTES.ADMIN.PRODUCTS,
    children: [
      {
        label: "All Products",
        icon: FiGrid,
        path: ROUTES.ADMIN.PRODUCTS,
      },
      {
        label: "Add New Product",
        icon: FiPlusCircle,
        path: ROUTES.ADMIN.CREATE_PRODUCT,
      },
      {
        label: "Categories",
        icon: FiLayers,
        path: ROUTES.ADMIN.CATEGORIES,
      },
      {
        label: "Brands",
        icon: FiTag,
        path: ROUTES.ADMIN.BRANDS,
      },
      {
        label: "Attributes",
        icon: FiSliders,
        path: ROUTES.ADMIN.ATTRIBUTES,
      },
      {
        label: "Product Variation",
        icon: FiGitBranch,
        path: ROUTES.ADMIN.PRODUCT_VARIATIONS,
      },
    ],
  },
  // s
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
    path: ROUTES.ADMIN.PAYMENTS,
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
    id: "users",
    label: "Users",
    icon: User2Icon,
    path: ROUTES.ADMIN.USERS,
  },

  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    path: ROUTES.ADMIN.SETTINGS,
  },

]