import useAuth  from '../../../hooks/queries/useAuth';
import { getInitials } from "../../../utils/getInitials";

const UserDropdownHeader = () => {
    const { user } = useAuth();
    const initials = getInitials(user?.name);
  return (
    <div className="flex items-center gap-3 border-b border-base-300 px-4 py-4">
      {/* Avatar */}
      <div className="avatar placeholder shrink-0">
        <div className="bg-primary text-primary-content h-12 w-12 flex justify-center items-center rounded-full">
          <span className="text-base font-semibold">
            {initials}
          </span>
        </div>
      </div>

      {/* User Info */}
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-semibold text-base-content">
          {user?.name || "Administrator"}
        </h3>

        <p className="truncate text-xs text-base-content/70">
          {user?.email || "admin@example.com"}
        </p>

        <span className="badge badge-primary badge-sm mt-2 capitalize">
          {user?.role || "Admin"}
        </span>
      </div>
    </div>
  )
}

export default UserDropdownHeader