import { flexRender } from "@tanstack/react-table";

import { orders } from "../data/orders.tabledata";
import useOrdersTable from "../../../../hooks/admin/orders/useOrdersTable";

const OrdersTable = () => {
  const { table } = useOrdersTable(orders);
  return (
    <section className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm">
      <div className="overflow-x-auto">
        <table className="table table-zebra">
           {/* Table Header */}

          <thead className="bg-base-200">

            {table.getHeaderGroups().map((headerGroup) => (

              <tr key={headerGroup.id}>

                {headerGroup.headers.map((header) => (

                  <th
                    key={header.id}
                    className="whitespace-nowrap font-semibold"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>

                ))}

              </tr>

            ))}

          </thead>
           {/* Table Body */}

          <tbody>

            {table.getRowModel().rows.map((row) => (

              <tr
                key={row.id}
                className="hover"
              >

                {row.getVisibleCells().map((cell) => (

                  <td key={cell.id}>

                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}

                  </td>

                ))}

              </tr>

            ))}

          </tbody>
        </table>
      </div>
    </section>
  );
};

export default OrdersTable;
