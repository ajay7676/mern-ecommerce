const ReportStatCard = ({ title, value, active = false, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-full rounded-xl border cursor-pointer p-4 text-left transition-all duration-200
        hover:border-primary hover:shadow-md
        focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
        ${
          active ? "border-primary bg-primary/5" : "border-base-300 bg-base-100"
        }
      `}
    >
      <h3
        className={`text-2xl font-bold ${
          active ? "text-primary" : "text-base-content"
        }`}
      >
        {value}
      </h3>

      <p className="mt-1 text-sm text-base-content/70">{title}</p>
    </button>
  );
};

export default ReportStatCard;
