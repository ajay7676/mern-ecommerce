import { useMemo, useRef } from "react";
import clsx from "clsx";
import { MoreVertical } from "lucide-react";

import ActionMenuItem from "./ActionMenuItem";

const RowActionsMenu = ({
  actions = [],
  align = "end",
  loading = false,
  disabled = false,
  buttonClassName = "",
  menuClassName = "",
}) => {
  const dropdownRef = useRef(null);

  const visibleActions = useMemo(
    () =>
      actions.filter(
        (action) => action.hidden !== true
      ),
    [actions]
  );

  const closeMenu = () => {
    dropdownRef.current?.removeAttribute("open");
  };

  return (
    <details
      ref={dropdownRef}
      className={clsx("dropdown", {
        "dropdown-end": align === "end",
      })}
    >
      <summary
        className={clsx(
          "btn btn-ghost btn-sm btn-circle",
          buttonClassName
        )}
      >
        <MoreVertical size={18} />
      </summary>

      <ul
        className={clsx(
          "menu dropdown-content z-50 mt-2 w-56 rounded-xl border border-base-200 bg-base-100 p-2 shadow-xl",
          menuClassName
        )}
      >
        {visibleActions.map((action) => (
          <ActionMenuItem
            key={action.id}
            {...action}
            loading={loading}
            disabled={
              disabled || action.disabled
            }
            closeMenu={closeMenu}
          />
        ))}
      </ul>
    </details>
  );
};

export default RowActionsMenu;