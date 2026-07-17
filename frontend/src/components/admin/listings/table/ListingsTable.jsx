import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useListingColumns } from "./columns/useListingColumns.jsx";

const ListingsTable = ({ data = [] }) => {
  // Row selection state
  const [rowSelection, setRowSelection] = useState({});

  // Column definitions
  const columns = useListingColumns();

  // Create table instance
  const table = useReactTable({
    data,
    columns,

    state: {
      rowSelection,
    },

    enableRowSelection: true,

    onRowSelectionChange: setRowSelection,

    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="table w-full">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
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
  );
};

export default ListingsTable;