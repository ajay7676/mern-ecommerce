import {
  FiMail,
  FiPhone,
  FiShield,
  FiX,
} from "react-icons/fi";

import useUser from '../../../../../hooks/admin/queries/users/useUser'
import UserStatusBadge from "../../UserStatusBadge";
import UserRoleBadge from "../../UserRoleBadge";

const ViewUserModal = ({
  userId,
  open,
  onClose,
}) => {
  const {
    data,
    isLoading,
    isError,
  } = useUser(userId, {
    enabled: open && Boolean(userId),
  });

  const user = data?.user;

  if (!open) {
    return null;
  }

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
        <header
          className="
            sticky
            top-0
            z-10
            flex
            items-center
            justify-between
            border-b
            border-slate-200
            bg-white
            px-6
            py-5
          "
        >
          <div>
            <h2 className="text-xl font-bold">
              User Details
            </h2>

            <p className="text-sm text-slate-500">
              Account information and activity
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              grid
              h-9
              w-9
              place-items-center
              rounded-lg
              hover:bg-slate-100
            "
          >
            <FiX />
          </button>
        </header>

        {isLoading && (
          <div className="p-6 text-sm text-slate-500">
            Loading user...
          </div>
        )}

        {isError && (
          <div className="p-6 text-sm text-red-500">
            Failed to load user.
          </div>
        )}

        {user && (
          <div className="p-6">
            <div
              className="
                flex
                flex-col
                items-center
                border-b
                border-slate-200
                pb-6
                text-center
              "
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="
                  h-20
                  w-20
                  rounded-full
                  object-cover
                "
              />

              <h3 className="mt-4 text-xl font-bold">
                {user.name}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                ID: #{user?.id}
              </p>

              <div className="mt-3 flex gap-2">
                <UserRoleBadge
                  role={user.role}
                />

                <UserStatusBadge
                  status={user.status}
                />
              </div>
            </div>

            <div className="space-y-5 py-6">
              <div className="flex gap-3">
                <FiMail className="mt-1 text-slate-400" />

                <div>
                  <p className="text-xs text-slate-400">
                    Email
                  </p>

                  <p className="text-sm font-medium">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <FiPhone className="mt-1 text-slate-400" />

                <div>
                  <p className="text-xs text-slate-400">
                    Phone
                  </p>

                  <p className="text-sm font-medium">
                    {user.phone}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <FiShield className="mt-1 text-slate-400" />

                <div>
                  <p className="text-xs text-slate-400">
                    Account Role
                  </p>

                  <p className="text-sm font-medium">
                    {user.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};

export default ViewUserModal;