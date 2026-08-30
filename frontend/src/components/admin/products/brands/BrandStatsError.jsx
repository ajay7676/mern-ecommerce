const BrandStatsError = ({ onRetry }) => {
  return (
    <div className="rounded-xl border border-error/20 bg-error/5 p-6">
      <div className="flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:text-left">
        {/* Error icon */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-error/10 text-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v4m0 4h.01M10.29 3.86l-7.4 12.82A2 2 0 004.63 19.7h14.74a2 2 0 001.74-3.02l-7.4-12.82a2 2 0 00-3.42 0z"
            />
          </svg>
        </div>

        {/* Error message */}
        <div className="flex-1">
          <h3 className="font-semibold text-base-content">
            Unable to load brand statistics
          </h3>

          <p className="mt-1 text-sm text-base-content/60">
            We couldn't fetch the latest brand statistics. Please try again.
          </p>
        </div>

        {/* Retry */}
        <button
          type="button"
          onClick={onRetry}
          className="btn btn-sm btn-error btn-outline"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default BrandStatsError;