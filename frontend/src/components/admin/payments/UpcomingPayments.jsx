import { useState } from "react";
import PaymentEstimateCard from "./PaymentEstimateCard";
import OutstandingCard from "./OutstandingCard";

const UpcomingPayments = ({
    payments
}) => {
    const [selectedPayment, setSelectedPayment] = useState(1);

  return (
     <section className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-2xl font-bold">
            Upcoming Payments
          </h2>

          <span className="text-sm text-base-content/60">
            Updated at 10:14 AM
          </span>
        </div>

        <p className="mt-2 text-sm text-base-content/60">
          Click a payment card to view its details.
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-5 lg:grid-cols-4 md:grid-cols-2">
        {payments.map((payment) => (
          <PaymentEstimateCard
            key={payment.id}
            {...payment}
            active={selectedPayment === payment.id}
            onClick={() => setSelectedPayment(payment.id)}
          />
        ))}

        <OutstandingCard
          amount={109338}
          description="New orders reflect within 2 days after dispatch."
        />
      </div>
    </section>
  )
}

export default UpcomingPayments