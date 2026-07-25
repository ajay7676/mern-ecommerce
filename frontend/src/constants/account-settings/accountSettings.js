import {
  FiGift,
  FiMail,
  FiPackage,
} from "react-icons/fi";

export const initialProfileData = {
  fullName: "Aman Verma",
  email: "amanverma@email.com",
  phone: "+91 98765 43210",
  dateOfBirth: "1998-05-12",
  gender: "male",
  language: "english",
  avatar:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=85",
};

export const initialPasswordData = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export const initialEmailPreferences = [
  {
    id: "orderUpdates",
    title: "Order Updates",
    description: "Receive emails about your orders and delivery updates.",
    enabled: true,
    icon: FiPackage,
  },
  {
    id: "offers",
    title: "Offers & Promotions",
    description: "Receive emails about offers, discounts and new products.",
    enabled: true,
    icon: FiGift,
  },
  {
    id: "newsletters",
    title: "Newsletters",
    description: "Receive our newsletter and updates.",
    enabled: false,
    icon: FiMail,
  },
];