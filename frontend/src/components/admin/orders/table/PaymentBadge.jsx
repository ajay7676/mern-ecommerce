import clsx from "clsx";

const variants = {
  Paid: "badge-success",
  COD: "badge-warning",
  Failed: "badge-error",
  Refunded: "badge-secondary",
};

const PaymentBadge = ({ payment }) => {
  return (
       <span
      className={clsx(
        "badge badge-outline font-medium",
        variants[payment]
      )}
    >
      {payment}
    </span>
  )
}

export default PaymentBadge