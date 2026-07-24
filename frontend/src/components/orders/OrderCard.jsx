import { Link } from "react-router-dom";
import OrderStatusBadge from '../ui/OrderStatusBadge';
import {CUSTOMER_ROUTES} from '../../constants/routes/customer.routes'

import { formatCurrency } from "../../utils/formatCurrency";
import OrderImages from "./OrderImages";

const OrderCard = ({ order }) => {
  const detailsPath = CUSTOMER_ROUTES.ORDERS.DETAILS.replace(
    ":id",
    order.id,
  );

  const itemLabel =
    order.products.length === 1
      ? "1 Item"
      : `${order.products.length} Items`;

  return (
    <article
      className="
        grid gap-5 rounded-xl border border-slate-200
        bg-white px-5 py-5
        transition-shadow duration-200
        hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)]
        sm:px-7
        lg:grid-cols-[100px_minmax(0,1fr)_170px_130px]
        lg:items-center
      "
    >
      <OrderImages products={order.products} />

      <div className="min-w-0">
        <h2 className="text-sm font-medium text-slate-950 sm:text-[15px]">
          Order #{order.id}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {order.createdAt}
          <span className="mx-1.5">|</span>
          {itemLabel}
        </p>
      </div>

      <div className="flex flex-col items-start gap-6 lg:items-start">
        <OrderStatusBadge status={order.status} />

        <p className="text-lg font-bold text-slate-950">
          {formatCurrency(order.totalAmount)}
        </p>
      </div>

      <div className="flex justify-start lg:justify-end">
        <Link
          to={detailsPath}
          className="
            inline-flex min-h-10 items-center justify-center
            rounded-md border border-slate-200 bg-white
            px-4 text-sm font-medium text-indigo-600
            transition-colors duration-200
            hover:border-indigo-200 hover:bg-indigo-50
            focus:outline-none focus:ring-2
            focus:ring-indigo-500 focus:ring-offset-2
          "
        >
          View Details
        </Link>
      </div>
    </article>
  );
};

export default OrderCard;