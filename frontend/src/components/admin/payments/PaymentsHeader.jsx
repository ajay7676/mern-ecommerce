import {
  FiDownload,
  FiFileText,
  FiArrowRight,
} from "react-icons/fi";

const PaymentsHeader = (
    {
  title = "Payments Overview",
  downloadLabel = "Download Invoice / Reports",
  statementsLabel = "View Statements",
  settlementsLabel = "View Order-wise Settlements",

  onDownload,
  onViewStatements,
  onViewSettlements,
}
) => {
  return (
      <header className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      {/* Left */}
      <div>
        <h1 className="text-3xl font-bold text-base-content">
          {title}
        </h1>

        <p className="mt-2 text-sm text-base-content/70">
          Monitor upcoming payouts, settlement history, invoices,
          and downloadable payment reports.
        </p>
      </div>

      {/* Right */}
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap  lg:justify-end">
        <button
          type="button"
          className="btn btn-outline btn-primary"
          onClick={onDownload}
        >
          <FiDownload className="text-base" />
          {downloadLabel}
        </button>

        <button
          type="button"
          className="btn btn-outline"
          onClick={onViewStatements}
        >
          <FiFileText className="text-base" />
          {statementsLabel}
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={onViewSettlements}
        >
          {settlementsLabel}
          <FiArrowRight className="text-base" />
        </button>
      </div>
    </header>
  )
}

export default PaymentsHeader