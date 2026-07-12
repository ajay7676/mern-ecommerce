import { Link, NavLink } from "react-router-dom";
import clsx from "clsx";

const UserDropdownItem = ({ item, onAction, onClose }) => {
  // Divider
  if (item.divider) {
    return <div className="my-1 border-t border-base-300" />;
  }

  const Icon = item.icon;

  // Button Action (Logout, Theme, etc.)

  if (item.action) {
    return (
      <button
        type="button"
        onClick={() => {
          onAction?.(item.action);
          onClose?.();
        }}
        className={clsx(
          "flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm transition-colors cursor-pointer",
          {
            "text-error hover:bg-error/10": item.danger,
            "text-base-content hover:bg-base-200": !item.danger,
          },
        )}
      >
        <Icon size={18} />

        <span>{item.label}</span>
      </button>
    );
  }
  // External Link
  if (item.target === "_blank") {
    return (
      <Link
        to={item.path}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClose}
        className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-base-content transition-colors hover:bg-base-200"
      >
        <Icon size={18} />

        <span>{item.label}</span>
      </Link>
    );
  }
  // Internal Route
  return (
    <NavLink
      to={item.path}
      onClick={onClose}
      className={({ isActive }) =>
        clsx(
          "flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-colors",
          {
            "bg-primary text-primary-content": isActive,
            "text-base-content hover:bg-base-200": !isActive,
          },
        )
      }
    >
      <Icon size={18} />

      <span>{item.label}</span>
    </NavLink>
  );
};

export default UserDropdownItem;
