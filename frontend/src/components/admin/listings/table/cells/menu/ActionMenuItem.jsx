import clsx from "clsx";

const ActionMenuItem = ({
  icon: Icon,
  label,
  onClick,
  danger = false,
  disabled = false,
  loading = false,
  closeMenu,
}) => {
  const handleClick = () => {
    if (disabled || loading) return;

    onClick?.();

    closeMenu?.();
  };

  return (
    <li>
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled || loading}
        className={clsx(
          "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",

          danger
            ? "text-red-600 hover:bg-red-50"
            : "text-slate-700 hover:bg-slate-100",

          (disabled || loading) &&
            "cursor-not-allowed opacity-50"
        )}
      >
        {Icon && <Icon size={16} />}

        <span>{label}</span>
      </button>
    </li>
  );
};

export default ActionMenuItem;