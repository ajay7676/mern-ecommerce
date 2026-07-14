import PAYMENT_COLUMNS from "./columns";

const PaymentsTableHeader = () => {
  return (
    <thead className="bg-base-200">
      <tr>
        {PAYMENT_COLUMNS.map((column) => (
          <th
            key={column.key}
            className={`
              px-6 py-4
              text-xs
              font-semibold
              uppercase
              tracking-wide
              text-base-content/70
              ${
                column.align === "right"
                  ? "text-right"
                  : column.align === "center"
                  ? "text-center"
                  : "text-left"
              }
            `}
          >
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default PaymentsTableHeader;