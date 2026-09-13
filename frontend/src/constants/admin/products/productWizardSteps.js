import {
  Info,
  IndianRupee,
  Image,
  SlidersHorizontal,
  FileText,
  Send,
  CircleCheck,
} from "lucide-react";

export const PRODUCT_WIZARD_STEPS = [
  {
    id: 1,
    label: "Basic Information",
    icon: Info,
  },
  {
    id: 2,
    label: "Pricing & Inventory",
    icon: IndianRupee,
  },
  {
    id: 3,
    label: "Images & Media",
    icon: Image,
  },
  {
    id: 4,
    label: "Attributes & Variations",
    icon: SlidersHorizontal,
  },
  {
    id: 5,
    label: "Additional Details",
    icon: FileText,
  },
  {
    id: 6,
    label: "Review & Publish",
    icon: Send,
  },
];

export const CompletedStepIcon = CircleCheck;