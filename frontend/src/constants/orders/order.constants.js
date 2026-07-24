export const ORDER_STATUS = {
  ALL: "all",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
};

export const ORDER_FILTERS = [
  {
    id: ORDER_STATUS.ALL,
    label: "All Orders",
  },
  {
    id: ORDER_STATUS.PROCESSING,
    label: "Processing",
  },
  {
    id: ORDER_STATUS.SHIPPED,
    label: "Shipped",
  },
  {
    id: ORDER_STATUS.DELIVERED,
    label: "Delivered",
  },
  {
    id: ORDER_STATUS.CANCELLED,
    label: "Cancelled",
  },
];