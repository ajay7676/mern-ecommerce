import clsx from "clsx";

const ToolbarButton = ({
  children,
  onClick,
  disabled = false,
  active = false,
  className = "",
}) => {
  return (
     <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "btn btn-sm",
        "h-9 min-h-9",
        "rounded-lg",
        "border border-[#E5E7EB]",
        "bg-white",
        "px-4",
        "text-[13px]",
        "font-medium",
        "normal-case",
        "shadow-none",
        "transition-all duration-200",
        "hover:border-[#2874F0]",
        "hover:bg-[#F8FAFF]",
        "hover:text-[#2874F0]",
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-[#2874F0]/20",
        active &&
          "border-[#2874F0] bg-[#EEF4FF] text-[#2874F0]",
        className
      )}
    >
      {children}
    </button>
  )
};

export default ToolbarButton;
