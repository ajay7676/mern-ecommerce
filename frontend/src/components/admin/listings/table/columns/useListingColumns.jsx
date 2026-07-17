import { createColumnHelper } from "@tanstack/react-table";
import HeaderCheckbox from "../cells/HeaderCheckbox";
import SelectCell from "../cells/SelectCell";
import ProductCell from "../cells/ProductCell";
import PriceCell from "../cells/PriceCell";
import StockCell from "../cells/StockCell";
import ReturnsCell from "../cells/ReturnsCell";
import QualityCell from '../cells/QualityCell';
import AdditionalInfoCell from '../cells/AdditionalInfoCell';
import ActionsCell from '../cells/ActionsCell';

const columnHelper = createColumnHelper();

export const useListingColumns = () => {
  return [
    columnHelper.display({
      id: "select",

      size: 50,

      enableSorting: false,
      enableResizing: false,
      enableHiding: false,

      header: ({ table }) => <HeaderCheckbox table={table} />,

      cell: ({ row }) => <SelectCell row={row} />,
    }),
    columnHelper.display({
      id: "product",

      header: "Product Details",

      size: 320,

      enableSorting: true,

      cell: ({ row }) => <ProductCell product={row.original} />,
    }),
    columnHelper.display({
      id: "pricing",

      header: "Price & Settlement",

      size: 320,

      enableSorting: true,

      cell: ({ row }) => <PriceCell product={row.original} />,
    }),
    columnHelper.display({
      id: "stock",

      header: "Stock",

      size: 320,

      enableSorting: true,

      cell: ({ row }) => <StockCell product={row.original} />,
    }),
    columnHelper.display({
      id: "return",

      header: "Returns",

      size: 320,

      enableSorting: true,

      cell: ({ row }) => <ReturnsCell product={row.original} />,
    }),
    columnHelper.display({
      id: "quality",

      header: "Listing Quality",

      cell: ({ row }) => <QualityCell product={row.original} />,
    }),

    columnHelper.display({
      id: "additionalinfo",

      header: "Additional Info",

      cell: ({ row }) => <AdditionalInfoCell product={row.original} />,
    }),

    columnHelper.display({
      id: "actions",

      header: "Actions",

      size: 70,

      enableSorting: false,

      cell: ({ row }) => <ActionsCell product={row.original} />,
    }),
  ];
};
