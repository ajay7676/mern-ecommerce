import { useMemo } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import OrderStatusBadge from "./OrderStatusBadge";
import PaymentBadge from "./PaymentBadge";
import OrderActions from './OrderActions'
const columnHelper = createColumnHelper();

const headers = {
  id: "Order ID",
  customer: "Customer",
  date: "Date",
  total: "Total",
  items: "Items",
  status: "Status",
  payment: "Payment",
};

const useOrderColumns = () => {
  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: headers.id,
        cell: ({ getValue }) => (
          <span className="font-semibold text-primary">{getValue()}</span>
        ),
      }),
      columnHelper.accessor("customer", {
        header: headers.customer,
        cell: ({ getValue }) => {
          const customer = getValue();

          return (
            <div>
              <p className="font-medium">{customer.name}</p>

              <p className="text-xs text-base-content/60">{customer.email}</p>
            </div>
          );
        },
      }),
      columnHelper.accessor("date", {
        header: headers.date,
      }),

      columnHelper.accessor("total", {
        header: headers.total,
        cell: ({ getValue }) => (
          <span className="font-semibold">₹{getValue()}</span>
        ),
      }),

      columnHelper.accessor("items", {
        header: headers.items,
      }),

      columnHelper.accessor("status", {
        header: headers.status,
        cell: ({ getValue }) => <OrderStatusBadge status={getValue()} />,
      }),

      columnHelper.accessor("payment", {
        header: headers.payment,
        cell: ({ getValue }) => <PaymentBadge payment={getValue()} />,
      }),

      columnHelper.display({
        id: "actions",
        header: "",
        cell: ({ row }) => <OrderActions order={row.original} />,
      }),
    ],
    [],
  );

  return columns;
};

export default useOrderColumns;
