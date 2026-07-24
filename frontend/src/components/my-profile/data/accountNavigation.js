import {
  FiCreditCard,
  FiFileText,
  FiHeart,
  FiLogOut,
  FiMapPin,
  FiSettings,
  FiUser,
} from "react-icons/fi";


import {CUSTOMER_ROUTES} from '../../../constants/routes/customer.routes'

export const accountNavigation = [
  {
    id: "profile",
    label: "My Profile",
    path: CUSTOMER_ROUTES.PROFILE,
    icon: FiUser,
  },
  {
    id: "orders",
    label: "My Orders",
    path: CUSTOMER_ROUTES.ORDERS,
    icon: FiFileText,
  },
  {
    id: "wishlist",
    label: "Wishlist",
    path: CUSTOMER_ROUTES.WISHLIST,
    icon: FiHeart,
  },
  {
    id: "addresses",
    label: "Addresses",
    path: CUSTOMER_ROUTES.ADDRESSES,
    icon: FiMapPin,
  },
  {
    id: "payments",
    label: "Payment Methods",
    path: CUSTOMER_ROUTES.PAYMENT_METHODS,
    icon: FiCreditCard,
  },
  {
    id: "settings",
    label: "Account Settings",
    path: CUSTOMER_ROUTES.ACCOUNT_SETTINGS,
    icon: FiSettings,
  },
];

export const logoutNavigation = {
  id: "logout",
  label: "Logout",
  icon: FiLogOut,
};