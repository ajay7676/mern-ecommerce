import {
  FiCheck,
  FiInfo,
  FiLock,
} from "react-icons/fi";

import {
  ALL_PERMISSIONS,
  ROLE_PERMISSIONS,
} from "./userForm.constants";

const AssignedPermissions = ({ role }) => {
  const allowedPermissions =
    ROLE_PERMISSIONS[role] || [];

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
      <h3 className="font-semibold text-slate-900">
        Assigned Permissions
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        Permissions will be based on the selected role.
      </p>

      <div className="mt-5 space-y-3">
        {ALL_PERMISSIONS.map(
          (permission) => {
            const isAllowed =
              allowedPermissions.includes(
                permission,
              );

            return (
              <div
                key={permission}
                className="
                  flex
                  items-center
                  justify-between
                  gap-3
                "
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`
                      flex
                      h-5
                      w-5
                      items-center
                      justify-center
                      rounded-full

                      ${
                        isAllowed
                          ? "bg-emerald-100 text-emerald-600"
                          : "bg-slate-100 text-slate-400"
                      }
                    `}
                  >
                    {isAllowed ? (
                      <FiCheck size={12} />
                    ) : (
                      <FiLock size={11} />
                    )}
                  </span>

                  <span
                    className={`
                      text-sm

                      ${
                        isAllowed
                          ? "text-slate-600"
                          : "text-slate-400"
                      }
                    `}
                  >
                    {permission}
                  </span>
                </div>

                {!isAllowed && (
                  <FiLock
                    size={13}
                    className="text-slate-300"
                  />
                )}
              </div>
            );
          },
        )}
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-lg bg-blue-50 p-4 text-sm text-blue-700">
        <FiInfo
          size={17}
          className="mt-0.5 shrink-0"
        />

        <p>
          Permissions are automatically assigned
          based on the selected role.
        </p>
      </div>
    </section>
  );
};

export default AssignedPermissions;