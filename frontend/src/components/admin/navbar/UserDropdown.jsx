import { useRef } from "react";
import { ChevronDown } from "lucide-react";

import useAuth from '../../../hooks/queries/useAuth'
import useLogout from "../../../hooks/mutations/useLogout";

import { getInitials } from "../../../utils/getInitials";

import UserDropdownHeader from "./UserDropdownHeader";
import UserDropdownItem from "./UserDropdownItem";
import { userDropdownMenu } from "./userDropdownMenu";

const UserDropdown = () => {
  const { user } = useAuth();

  const logoutMutation = useLogout();

  const dropdownRef = useRef(null);
  const closeDropdown = () => {
    dropdownRef.current?.blur();
  };

  const handleAction = (action) => {
    switch (action) {
      case "logout":
        logoutMutation.mutate();
        break;

      default:
        break;
    }
  };
  return (
     <div className="dropdown dropdown-end">

      <button
        ref={dropdownRef}
        tabIndex={0}
        className="btn btn-ghost gap-3"
      >
        <div className="avatar placeholder">

          <div className="bg-primary text-primary-content w-10 flex justify-center items-center rounded-full">
            <span className="font-semibold">
              {getInitials(user?.name)}
            </span>

          </div>

        </div>

        <div className="hidden text-left lg:block">

          <p className="text-sm font-semibold">
            {user?.name}
          </p>

          <p className="text-xs text-base-content/60 capitalize">
            {user?.role}
          </p>

        </div>

        <ChevronDown size={18} />

      </button>

      <div
        tabIndex={0}
        className="dropdown-content mt-3 w-72 rounded-2xl border border-base-300 bg-base-100 p-2 shadow-xl"
      >
        <UserDropdownHeader />

        <div className="mt-2 space-y-1">

          {userDropdownMenu.map((item, index) => (
            <UserDropdownItem
              key={item.id ?? index}
              item={item}
              onAction={handleAction}
              onClose={closeDropdown}
            />
          ))}

        </div>

      </div>

    </div>
  );
};

export default UserDropdown;
