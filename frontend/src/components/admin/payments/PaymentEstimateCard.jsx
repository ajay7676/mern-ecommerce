import { FiChevronRight } from "react-icons/fi";

const PaymentEstimateCard = ({
  paymentDate,
  estimate,
  prepaid,
  postpaid,
  active = false,
  onClick,
}) => {
  return (
   <button
      type="button"
      onClick={onClick}
      className={`
        card w-full border transition-all duration-200
        hover:border-primary hover:shadow-md
        focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
        ${
          active
            ? "border-primary bg-primary/5"
            : "border-base-300 bg-base-100"
        }
      `}
    >
      <div className="card-body p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-base-content/60">
              Payment Estimate
            </p>

            <h3 className="mt-1 text-3xl font-bold">
              ₹{estimate.toLocaleString("en-IN")}
            </h3>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-base-200 px-3 py-1 text-xs font-semibold">
            {paymentDate}
            <FiChevronRight />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-base-content/60">
              Prepaid
            </p>

            <p className="font-semibold">
              ₹{prepaid.toLocaleString("en-IN")}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-base-content/60">
              Postpaid
            </p>

            <p className="font-semibold">
              ₹{postpaid.toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </div>
    </button>
  )
}

export default PaymentEstimateCard