import clsx from "clsx";

const StatusTab = ({ label, count, active = false, onClick }) => {

  return (
     <button
      onClick={onClick}
      className={clsx(
        "relative flex items-center gap-2",
        "border-b-2 cursor-pointer",
        "px-3 py-3",
        "transition-all duration-200",

        active
          ? "border-[#2874F0]"
          : "border-transparent hover:border-gray-300"
      )}
    >
      <span
        className={clsx(
          "text-[14px]",
          active
            ? "font-semibold text-[#2874F0]"
            : "text-gray-700"
        )}
      >
        {label}
      </span>

      <span
        className="
          rounded
          bg-[#F1F5F9]
          px-2
          py-0.5
          text-[12px]
          text-gray-700
        "
      >
        {count}
      </span>
    </button>
  )
};

export default StatusTab;
