const STATUS_CONFIG = {
  generated: {
    label: "Generated",
    className: "badge badge-success badge-outline",
  },
  processing: {
    label: "Processing",
    className: "badge badge-warning badge-outline",
  },
  pending: {
    label: "Pending",
    className: "badge badge-info badge-outline",
  },
  failed: {
    label: "Failed",
    className: "badge badge-error badge-outline",
  },
  cancelled: {
    label: "Cancelled",
    className: "badge badge-neutral badge-outline",
  },
};

const DEFAULT_STATUS = {
  label: "Unknown",
  className: "badge badge-ghost",
};

const ReportStatusBadge = ({ status }) => {
   const config = STATUS_CONFIG[status?.toLowerCase()] ?? DEFAULT_STATUS;
  return (
      <span
      className={`${config.className} font-medium`}
      aria-label={`Report status: ${config.label}`}
    >
      {config.label}
    </span>
  )
}

export default ReportStatusBadge