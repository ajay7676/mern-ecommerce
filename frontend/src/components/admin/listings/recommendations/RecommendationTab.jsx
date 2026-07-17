import clsx from "clsx";

const RecommendationTab = (
  {
  id,
  label,
  count,
  active,
  disabled = false,
  onClick,
}
) => {

  return(
    <button
      type="button"
      role="tab"
      aria-selected={active}
      aria-controls={`recommendation-panel-${id}`}
      id={`recommendation-tab-${id}`}
      disabled={disabled}
      onClick={() => onClick(id)}
      className={clsx(
        "inline-flex shrink-0 items-center gap-1.5 cursor-pointer",
        "rounded-full border",
        "px-4 py-2",
        "text-[13px] font-medium",
        "transition-all duration-200",
        "focus:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-[#2874F0]",
        "focus-visible:ring-offset-2",

        active
          ? [
              "border-[#D6E4FF]",
              "bg-[#EEF4FF]",
              "text-[#2874F0]",
            ]
          : [
              "border-[#E8ECF2]",
              "bg-white",
              "text-slate-700",
              "hover:border-[#2874F0]",
              "hover:bg-[#F8FAFF]",
            ],

        disabled && "cursor-not-allowed opacity-50"
      )}
    >
      <span>{label}</span>

      <span className="font-semibold">({count})</span>
    </button>
  )
};

export default RecommendationTab;
