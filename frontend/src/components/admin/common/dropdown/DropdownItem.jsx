import clsx from "clsx";
import { Check } from "lucide-react";
const DropdownItem = ({
  children,
  icon,
  active = false,
  danger = false,
  disabled = false,
  onClick,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "flex w-full items-center gap-3 cursor-pointer",
        "px-4 py-2.5",
        "text-left text-sm",
        "transition-colors",

        active && "bg-primary/10 text-primary",

        danger && "text-error",

        !disabled && "hover:bg-base-200",

        disabled && "cursor-not-allowed opacity-50"
      )}
    >
      <div className="flex items-center gap-3">

        {icon}

        <span>{children}</span>

    </div>

    {active && (
        <Check
            size={16}
            className="text-primary"
        />
    )}
    </button>
  );
};

export default DropdownItem;