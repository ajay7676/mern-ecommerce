import { useMemo, useState } from "react";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
} from "@tanstack/react-table";

import useOrderColumns from "../../../components/admin/orders/table/useOrderColumns";

const useOrdersTable = (data = []) => {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState([]);

  const columns = useOrderColumns();
  const tableData = useMemo(() => data, [data]);

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
      globalFilter,
      rowSelection,
      columnFilters,
    },
    onSortingChange: setSorting,

    onGlobalFilterChange: setGlobalFilter,

    onRowSelectionChange: setRowSelection,

    onColumnFiltersChange: setColumnFilters,

    getCoreRowModel: getCoreRowModel(),

    getSortedRowModel: getSortedRowModel(),

    getPaginationRowModel: getPaginationRowModel(),

    getFilteredRowModel: getFilteredRowModel(),

    getFacetedRowModel: getFacetedRowModel(),

    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return {
    table,

    filters: {
      globalFilter,
      setGlobalFilter,
      columnFilters,
    },

    sorting: {
      sorting,
      setSorting,
    },

    selection: {
      rowSelection,
    },
  };
};

export default useOrdersTable;
