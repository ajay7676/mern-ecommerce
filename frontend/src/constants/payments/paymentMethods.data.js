import {
  FiCreditCard,
  FiDollarSign,
  FiHome,
  FiPercent,
} from "react-icons/fi";

export const paymentMethodsData = [
  {
    id: "payment-1",
    type: "visa",
    brand: "Visa",
    maskedNumber: "**** **** **** 4242",
    expiryDate: "06/28",
    holderName: "Aman Verma",
    isDefault: true,
  },
  {
    id: "payment-2",
    type: "mastercard",
    brand: "Mastercard",
    maskedNumber: "**** **** **** 8888",
    expiryDate: "12/27",
    holderName: "Aman Verma",
    isDefault: false,
  },
  {
    id: "payment-3",
    type: "upi",
    brand: "UPI",
    upiId: "amanverma@upi",
    description: "UPI ID",
    isDefault: false,
  },
];

export const morePaymentOptions = [
  {
    id: "cash-on-delivery",
    title: "Cash on Delivery",
    description: "Pay in cash when your order is delivered.",
    icon: FiDollarSign,
    iconClassName: "bg-emerald-50 text-emerald-600",
  },
  {
    id: "net-banking",
    title: "Net Banking",
    description: "Pay securely using your preferred bank.",
    icon: FiHome,
    iconClassName: "bg-blue-50 text-blue-600",
  },
  {
    id: "upi",
    title: "UPI",
    description: "Pay instantly using any UPI app.",
    icon: FiCreditCard,
    iconClassName: "bg-violet-50 text-violet-600",
  },
  {
    id: "emi",
    title: "EMI Options",
    description: "Easy EMIs on Credit Cards.",
    icon: FiPercent,
    iconClassName: "bg-orange-50 text-orange-600",
  },
];