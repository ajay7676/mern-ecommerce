import { Heart, ShoppingCart, UserRound } from "lucide-react";

export const ROUTES = {
  home: "/",
  newIn: "/new-in",
  women: "/women",
  men: "/men",
  kids: "/kids",
  footwear: "/footwear",
  beauty: "/beauty",
  homeAndLiving: "/home-and-living",
  wishlist: "/wishlist",
  cart: "/cart",
  profile: "/profile",
  products: "/products",
};

export const headerActions = [
  {
    label: "Ajay",
    href: ROUTES.profile,
    icon: UserRound,
  },
  {
    label: "Wishlist",
    href: ROUTES.wishlist,
    icon: Heart,
  },
  {
    label: "Cart",
    href: ROUTES.cart,
    icon: ShoppingCart,
    badge: 2,
  },
];

export const navigationItems = [
  {
    label: "New In",
    href: ROUTES.newIn,
  },
  {
    label: "Women",
    href: ROUTES.women,
  },
  {
    label: "Men",
    href: ROUTES.men,
  },
  {
    label: "Kids",
    href: ROUTES.kids,
  },
  {
    label: "Footwear",
    href: ROUTES.footwear,
  },
  {
    label: "Beauty",
    href: ROUTES.beauty,
  },
  {
    label: "Home & Living",
    href: ROUTES.homeAndLiving,
  },
];