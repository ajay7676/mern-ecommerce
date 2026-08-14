import { FiChevronsUp } from "react-icons/fi";

import UserRoleBadge from "./UserRoleBadge";
import UserStatusBadge from "./UserStatusBadge";
import UserActions from "./UserActions";
import UserAvatar from "../../../utils/UserAvatar";

const SortHeader = ({ children }) => {
  return (
    <div className="flex items-center gap-1.5">
      {children}
      <FiChevronsUp
        size={13}
        className="rotate-90 text-slate-400"
      />
    </div>
  );
};

const UserTable = ({
  users,
  selectedUsers,
  onSelectUser,
  onSelectAll,
}) => {
  const allSelected =
    users.length > 0 &&
    users.every((user) => selectedUsers.includes(user.id));

     console.log(users)

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-295 border-collapse">
        <thead>
          <tr
            className="
              h-13
              border-b
              border-slate-200
              bg-slate-50/70
              text-left
              text-xs
              font-semibold
              text-slate-800
            "
          >
            <th className="w-15 px-5">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={onSelectAll}
                className="
                  h-4
                  w-4
                  rounded
                  border-slate-300
                  accent-violet-600
                "
              />
            </th>

            <th className="min-w-47.5 px-2">
              <SortHeader>User</SortHeader>
            </th>

            <th className="min-w-50 px-3">
              Email
            </th>

            <th className="min-w-42.5 px-3">
              Phone
            </th>

            <th className="min-w-31.25 px-3">
              <SortHeader>Role</SortHeader>
            </th>

            <th className="min-w-31.25 px-3">
              <SortHeader>Status</SortHeader>
            </th>

            <th className="min-w-36.25 px-3">
              <SortHeader>Joined On</SortHeader>
            </th>

            <th className="min-w-45 px-3">
              <SortHeader>Last Login</SortHeader>
            </th>

            <th className="w-32.5 px-3">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          { users.length > 0  && users.map((user) => {
            const isSelected =
              selectedUsers.includes(user._id);

            return (
              <tr
                key={user._id}
                className="
                  h-16
                  border-b
                  border-slate-100
                  text-sm
                  text-slate-700
                  transition
                  hover:bg-slate-50/70
                "
              >
                <td className="px-5">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onSelectUser(user.id)}
                    className="
                      h-4
                      w-4
                      rounded
                      border-slate-300
                      accent-violet-600
                    "
                  />
                </td>

                <td className="px-2">
                  <div className="flex items-center gap-3">
                    {/* <img
                      src={user?.avatar?.url}
                      alt=""
                      className="
                        h-12
                        w-12
                        rounded-full
                        object-cover
                      "
                    /> */}
                    <UserAvatar user={user} size={40} />

                    <div>
                      <p className="font-semibold text-slate-800">
                        {user.name}
                      </p>

                      {/* <p className="mt-0.5 text-xs text-slate-500">
                        ID: #{user.id}
                      </p> */}
                    </div>
                  </div>
                </td>

                <td className="px-3">
                  {user.email}
                </td>

                <td className="px-3">
                  {user.phone}
                </td>

                <td className="px-3">
                  <UserRoleBadge role={user.role} />
                </td>

                <td className="px-3">
                  <UserStatusBadge status={user.status} />
                </td>

                <td className="px-3">
                  {user.joinedOn}
                </td>

                <td className="px-3">
                  {user.lastLogin}
                </td>

                <td className="px-3">
                  <UserActions user={user} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;