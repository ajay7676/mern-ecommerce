import {

  FiEyeOff,
  FiGlobe,
  FiLock,
} from "react-icons/fi";

export const PRODUCT_STATUS_OPTIONS = [
  {
    value: "draft",
    label: "Draft",
    color: "bg-slate-400",
  },
  {
    value: "published",
    label: "Published",
    color: "bg-emerald-500",
  },
  {
    value: "archived",
    label: "Archived",
    color: "bg-amber-500",
  },
];

export const PRODUCT_VISIBILITY_OPTIONS = [
  {
    value: "public",
    label: "Public",
    icon: FiGlobe,
  },
  {
    value: "private",
    label: "Private",
    icon: FiLock,
  },
  {
    value: "hidden",
    label: "Hidden",
    icon: FiEyeOff,
  },
];