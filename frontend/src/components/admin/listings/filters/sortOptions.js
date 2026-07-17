import {
  CalendarClock,
  CalendarRange,
  ArrowUpWideNarrow,
  ArrowDownWideNarrow,
  Package,
  BadgeIndianRupee,
} from "lucide-react";

export const SORT_OPTIONS = [
  {
    id: "newest",
    label: "Newest",
    icon: CalendarClock,
  },
  {
    id: "oldest",
    label: "Oldest",
    icon: CalendarRange,
  },
  {
    id: "price_high",
    label: "Price: High to Low",
    icon: ArrowDownWideNarrow,
  },
  {
    id: "price_low",
    label: "Price: Low to High",
    icon: ArrowUpWideNarrow,
  },
  {
    id: "stock",
    label: "Stock",
    icon: Package,
  },
  {
    id: "settlement",
    label: "Settlement",
    icon: BadgeIndianRupee,
  },
];