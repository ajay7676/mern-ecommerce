import PaymentsTableHeader from "./PaymentsTableHeader";
import PaymentsTableRow from "./PaymentsTableRow";
const rows = [
  {
    id: 1,
    paymentType: "Prepaid Orders",
    detail: "Collected from customers",
    prepaid: 22,
    postpaid: 18,
    amount: 5897,
  },
  {
    id: 2,
    paymentType: "Postpaid Orders",
    detail: "COD settlements",
    prepaid: 14,
    postpaid: 18,
    amount: 8889,
  },
  {
    id: 3,
    paymentType: "Shipping Charges",
    detail: "Deducted",
    prepaid: 2,
    postpaid: 8,
    amount: -650,
  },
];
const PaymentsTable = () => {
  return (
    <section className="rounded-xl border border-base-300 bg-base-100 shadow-sm">
      <div className="overflow-x-auto">
        <table className="table w-full">
          <PaymentsTableHeader />

          <tbody>
            {rows.map((row) => (
              <PaymentsTableRow
                key={row.id}
                row={row}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PaymentsTable;