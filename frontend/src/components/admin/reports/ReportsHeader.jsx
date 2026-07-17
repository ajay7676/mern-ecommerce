import { FiFileText, FiPlus } from "react-icons/fi";

const ReportsHeader = ({
  title = "Reports",
  description = "Generate and download your business reports.",
}) => {
  const onRequestReport = () => {
  }
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-2">
          <FiFileText className="text-primary" size={24} aria-hidden="true" />

          <h1 className="text-2xl font-bold text-base-content">{title}</h1>
        </div>

        <p className="mt-1 text-sm text-base-content/70">{description}</p>
      </div>
      <button
        type="button"
        onClick={onRequestReport}
        className="btn btn-primary w-full sm:w-auto"
      >
        <FiPlus size={18} />

        <span>Request New Report</span>
      </button>
    </header>
  );
};

export default ReportsHeader;
