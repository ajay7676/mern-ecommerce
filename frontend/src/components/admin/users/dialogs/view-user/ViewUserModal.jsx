import {
  FiMail,
  FiPhone,
  FiBriefcase,
  FiMapPin,
  FiCalendar,
  FiClock,
  FiShield,
} from "react-icons/fi";

import useAdminUser from '../../../../../hooks/admin/queries/users/useAdminUser'
import UserAvatar from "../../../../../utils/UserAvatar";
import UserViewSkeleton from "./UserViewSkeleton";
import UserStatusBadge from "../../UserStatusBadge";
import { formatUserAddress } from "../../../../../utils/fromatAddress";
import ActivityCard from "./ActivityCard";
import { formatLastLogin, formatUserDate } from "../../../../../utils/dateFormatter";
import DetailsCard from "./DetailsCard";
import { ROLE_PERMISSIONS } from "../add-new/userForm.constants";
import UserViewHeader from "./UserViewHeader";

const ViewUserModal = ({
  userId,
  open,
  onClose,
}) => {
   const {
    data,
    isLoading,
    isError,
    error,
  } = useAdminUser(userId, open);

  if (!open) {
    return null;
  }
  const user = data?.data?.user;
   const permissions =
    ROLE_PERMISSIONS[user?.role] || [];
  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close user details"
        onClick={onClose}
        className="
          absolute
          inset-0
          bg-slate-950/30
        "
      />

      <aside
        className="
          absolute
          right-0
          top-0
          h-full
          w-full
          max-w-120
          overflow-y-auto
          bg-white
          shadow-2xl
        "
      >
        {/* /Header */}
        <UserViewHeader onClose={onClose} />
         {/* Body */}

        <div className="flex-1 overflow-y-auto p-6">
          {isLoading && (
            <UserViewSkeleton />
          )}

          {isError && (
            <div
              className="
                rounded-xl
                border
                border-red-200
                bg-red-50
                p-5
                text-sm
                text-red-700
              "
            >
              {error?.response?.data?.message ||
                "Failed to load user details"}
            </div>
          )}

          {!isLoading && !isError && user && (
            <div className="space-y-5">

              {/* Profile Summary */}

              <section
                className="
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  p-6
                "
              >
                <div
                  className="
                    flex
                    flex-col
                    gap-5
                    sm:flex-row
                    sm:items-center
                  "
                >
                  <UserAvatar
                    user={user}
                    size={88}
                  />

                  <div className="min-w-0 flex-1">
                    <h3
                      className="
                        truncate
                        text-xl
                        font-bold
                        text-slate-900
                      "
                    >
                      {user.name}
                    </h3>

                    <div
                      className="
                        mt-3
                        flex
                        flex-wrap
                        gap-2
                      "
                    >
                      <span
                        className="
                          rounded-md
                          bg-violet-50
                          px-3
                          py-1
                          text-xs
                          font-semibold
                          capitalize
                          text-violet-700
                        "
                      >
                        {user.role}
                      </span>

                      <UserStatusBadge
                        status={user.status}
                      />
                    </div>

                    <div
                      className="
                        mt-4
                        flex
                        flex-col
                        gap-2
                        text-sm
                        text-slate-500
                        sm:flex-row
                        sm:gap-5
                      "
                    >
                      <span className="flex items-center gap-2">
                        <FiMail />
                        {user.email}
                      </span>

                      <span className="flex items-center gap-2">
                        <FiPhone />
                        {user.phone || "Not provided"}
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Details grid */}

              <div className="grid gap-5 lg:grid-cols-2">

                <DetailsCard
                  title="Basic Information"
                  items={[
                    {
                      label: "Department",
                      value:
                        user.department ||
                        "Not assigned",
                      icon: FiBriefcase,
                    },
                    {
                      label: "Designation",
                      value:
                        user.designation ||
                        "Not assigned",
                      icon: FiBriefcase,
                    },
                  ]}
                />

                <DetailsCard
                  title="Account Information"
                  items={[
                    {
                      label: "Role",
                      value: user.role,
                      icon: FiShield,
                    },
                    {
                      label: "Status",
                      value: user.status,
                      icon: FiShield,
                    },
                  ]}
                />

              </div>

              {/* Address */}

              <section
                className="
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  p-5
                "
              >
                <h3 className="font-semibold text-slate-900">
                  Address
                </h3>

                <div
                  className="
                    mt-4
                    flex
                    items-start
                    gap-3
                    text-sm
                    text-slate-600
                  "
                >
                  <FiMapPin
                    className="mt-0.5 shrink-0"
                  />

                  <p>
                    {formatUserAddress(
                      user.address
                    )}
                  </p>
                </div>
              </section>

              {/* Activity */}

              <div className="grid gap-5 sm:grid-cols-2">
                <ActivityCard
                  icon={FiCalendar}
                  label="Joined On"
                  value={formatUserDate(
                    user.createdAt
                  )}
                />

                <ActivityCard
                  icon={FiClock}
                  label="Last Login"
                  value={formatLastLogin(
                    user.lastLoginAt
                  )}
                />
              </div>

              {/* Permissions */}

              <section
                className="
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  p-5
                "
              >
                <h3 className="font-semibold text-slate-900">
                  Assigned Permissions
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Permissions are based on the user's role.
                </p>

                <div
                  className="
                    mt-4
                    grid
                    gap-3
                    sm:grid-cols-2
                  "
                >
                  {permissions.map(
                    (permission) => (
                      <div
                        key={permission}
                        className="
                          rounded-lg
                          bg-slate-50
                          px-3
                          py-2
                          text-sm
                          text-slate-600
                        "
                      >
                        {permission}
                      </div>
                    )
                  )}
                </div>
              </section>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default ViewUserModal;