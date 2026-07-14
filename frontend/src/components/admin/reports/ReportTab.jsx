
const ReportTab = ({
  label,
  value,
  active,
  onClick,
}) => {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={() => onClick(value)}
      className={`
        whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium
        transition-all duration-200 cursor-pointer
        focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
        ${
          active
            ? "border-primary bg-primary text-primary-content shadow-sm"
            : "border-base-300 bg-base-100 text-base-content hover:border-primary hover:text-primary"
        }
      `}
    >
      {label}
    </button>
  )
}

export default ReportTab