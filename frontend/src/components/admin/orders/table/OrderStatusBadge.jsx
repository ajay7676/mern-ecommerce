
import clsx from "clsx";
const variants = {
  Pending: "badge-warning",
  Packed: "badge-info",
  Shipped: "badge-primary",
  Delivered: "badge-success",
  Cancelled: "badge-error",
};
const OrderStatusBadge = ({ status }) => {
  return (
    <span
      className={clsx(
        "badge badge-outline font-medium",
        variants[status]
      )}
    >
      {status}
    </span>
  )
}

export default OrderStatusBadge