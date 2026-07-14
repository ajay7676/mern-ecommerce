
const OutstandingCard = ({
  amount,
  description,
}) => {
  return (
    <div className="card border border-warning/30 bg-base-100">
      <div className="card-body p-5">
        <p className="text-xs text-base-content/60">
          Total Outstanding Amount
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          ₹{amount.toLocaleString("en-IN")}
        </h2>

        <p className="mt-4 text-sm text-base-content/70 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}

export default OutstandingCard