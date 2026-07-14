import PaymentAmountCell from "./PaymentAmountCell";

const PaymentsTableRow = ({ row }) => {
   console.log(row)
  return (
    <tr className="border-b border-base-200 hover:bg-base-200/50 transition-colors">
      <td className="px-6 py-4">
        <div>
          <h4 className="font-medium text-base-content">
            {row.paymentType}
          </h4>
        </div>
      </td>
      <td className="px-6 py-4 text-center">
        {row.detail}
      </td>
      <td className="px-6 py-4 text-center">
        {row.prepaid}
      </td>
      <td className="px-6 py-4 text-center">
        {row.postpaid}
      </td>

      <td className="px-6 py-4 text-right">
        <PaymentAmountCell
          amount={row.amount}
          positive={row.amount >= 0}
        />
      </td>
    </tr>
  );
};

export default PaymentsTableRow;