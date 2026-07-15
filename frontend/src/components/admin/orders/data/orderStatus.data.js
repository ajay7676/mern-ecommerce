
export const warehouseOptions = [
  {
    id: 1,
    value: "noida",
    label: "Noida Warehouse",
  },
   {
    id:2,
    value: "Gwalior",
    label: "Gwalior Warehouse",
  },
  {
    id:3,
    value: "delhi",
    label: "Delhi Warehouse",
    disabled: true,
  },
];

import {
  PackageCheck,
  Package,
  Truck,
  MapPinned,
  AlertTriangle,
  CheckCircle2,
  CalendarClock,
} from "lucide-react";

export const orderStatus = [
  {
    id: 1,
    title: "To Accept",
    count: 0,
    icon: PackageCheck,
    color: "primary",
  },
  {
    id: 2,
    title: "To Pack",
    count: 0,
    icon: Package,
    color: "warning",
  },
  {
    id: 3,
    title: "To Dispatch",
    count: 0,
    icon: Truck,
    color: "secondary",
  },
  {
    id: 4,
    title: "In Transit",
    count: 0,
    icon: MapPinned,
    color: "info",
  },
  {
    id: 5,
    title: "Pending Service",
    count: 0,
    icon: AlertTriangle,
    color: "error",
  },
  {
    id: 6,
    title: "Completed",
    count: 0,
    icon: CheckCircle2,
    color: "success",
  },
  {
    id: 7,
    title: "Upcoming",
    count: 0,
    icon: CalendarClock,
    color: "accent",
  },
];