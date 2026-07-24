import clsx from "clsx";

const IconButton = ({
  icon: Icon,
  label,
  onClick,
  active = false,
  className = "",
}) => {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={clsx(
        "inline-flex items-center justify-center",
        "transition-all duration-200",
        "focus:outline-none focus:ring-2",
        "focus:ring-indigo-500 focus:ring-offset-2",
        active
          ? "text-indigo-600"
          : "text-slate-500 hover:text-indigo-600",
        className,
      )}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
};

export default IconButton;