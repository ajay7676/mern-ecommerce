import {
  FiUser,
  FiPackage,
  FiHeart,
  FiMapPin,
  FiGift,
  FiLogOut,
  FiLogIn,
  FiUserPlus,
  FiHelpCircle,
} from "react-icons/fi";

export const guestMenu = [
  {
    label: "Login",
    path: "/login",
    icon: FiLogIn,
  },
  {
    label: "Register",
    path: "/register",
    icon: FiUserPlus,
  },
  {
    label: "Help Center",
    path: "/help",
    icon: FiHelpCircle,
  },
];

export const userMenu = [
  {
    label: "My Profile",
    path: "/profile",
    icon: FiUser,
  },
  {
    label: "My Orders",
    path: "/orders",
    icon: FiPackage,
  },
  {
    label: "Wishlist",
    path: "/wishlist",
    icon: FiHeart,
  },
  {
    label: "Saved Addresses",
    path: "/addresses",
    icon: FiMapPin,
  },
  {
    label: "Coupons",
    path: "/coupons",
    icon: FiGift,
  },
  {
    label: "Logout",
    action: "logout", 
    icon: FiLogOut,
    danger: true,
  },
];