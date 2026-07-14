import { FiCheck } from "react-icons/fi";

const PaymentDateChip = ({
  label,
  amount,
  active = false,
  onClick,
}
) => {
  return (
   <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`
        flex items-center gap-2 rounded-full border px-4 py-2
        text-sm font-medium whitespace-nowrap transition-all duration-200
        focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
        ${
          active
            ? "border-primary bg-primary text-primary-content shadow"
            : "border-base-300 bg-base-100 text-base-content hover:border-primary hover:text-primary"
        }
      `}
    >
      {active && <FiCheck className="text-base" />}

      <span>{label}</span>

      <span className="opacity-80">
        (₹{amount.toLocaleString("en-IN")})
      </span>
    </button>
  )
}

export default PaymentDateChip