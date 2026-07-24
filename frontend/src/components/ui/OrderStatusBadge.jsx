import clsx from "clsx";

const statusStyles = {
  processing: "bg-blue-50 text-blue-600",
  shipped: "bg-orange-50 text-orange-600",
  delivered: "bg-emerald-50 text-emerald-600",
  cancelled: "bg-slate-100 text-slate-600",
};

const OrderStatusBadge = ({ status }) => {
  const formattedStatus =
    status?.charAt(0).toUpperCase() + status?.slice(1);

  return (
    <span
      className={clsx(
        "inline-flex min-h-7 items-center rounded-md px-3",
        "text-sm font-medium capitalize",
        statusStyles[status] ?? "bg-slate-100 text-slate-600",
      )}
    >
      {formattedStatus}
    </span>
  );
};

export default OrderStatusBadge;

