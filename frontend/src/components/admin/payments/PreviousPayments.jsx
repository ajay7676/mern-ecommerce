import PaymentDateChip from "./PaymentDateChip";

const PreviousPayments = ({
  payments = [],
  selectedPaymentId,
  onSelectPayment,
  onViewAll,
}) => {
  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            Previous Payments
          </h2>

          <p className="mt-1 text-sm text-base-content/60">
            Select a settlement date to view payment details.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={onViewAll}
        >
          View All →
        </button>
      </div>

      {/* Date Chips */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {payments.map((payment) => (
          <PaymentDateChip
            key={payment.id}
            label={payment.date}
            amount={payment.total}
            active={payment.id === selectedPaymentId}
            onClick={() => onSelectPayment(payment.id)}
          />
        ))}
      </div>

      {/* Success Message */}
      <div className="rounded-lg border border-success/20 bg-success/10 px-4 py-3">
        <p className="text-sm font-medium text-success text-center">
          Payment has been completed successfully.
        </p>
      </div>
    </section>
  )
}

export default PreviousPayments