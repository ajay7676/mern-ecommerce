import { FiEdit2, FiEye } from "react-icons/fi";

import UserRoleBadge from "./UserRoleBadge";
import UserStatusBadge from "./UserStatusBadge";
import UserActionMenu from "./UserActionMenu";

const UserRow = ({
  user,
  selected,
  onSelect,
  onView,
  onEdit,
  onStatusChange,
}) => {
  return (
    <tr
      className="
        h-16
        border-b
        border-slate-100
        text-sm
        text-slate-700
        hover:bg-slate-50/60
      "
    >
      <td className="px-5">
        <input type="checkbox" checked={selected} onChange={onSelect} />
      </td>

      <td>
        <div className="flex items-center gap-3">
          <img
            src={user?.avatar}
            alt=""
            className="
              h-9
              w-9
              rounded-full
              object-cover
            "
          />

          <div>
            <p className="font-semibold text-slate-900">{user.name}</p>

            {/* <p className="text-xs text-slate-500">ID: #{user.id}</p> */}
          </div>
        </div>
      </td>

      <td>{user.email}</td>

      <td>{user.phone}</td>

      <td>
        <UserRoleBadge role={user.role} />
      </td>

      <td>
        <UserStatusBadge status={user.status} />
      </td>

      <td>{user.joinedOn}</td>

      <td>{user.lastLogin}</td>

      <td>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onView}
            className="
              grid
              h-8
              w-8
              place-items-center
              rounded-md
              hover:bg-slate-100
            "
          >
            <FiEye />
          </button>

          <button
            type="button"
            onClick={onEdit}
            className="
              grid
              h-8
              w-8
              place-items-center
              rounded-md
              hover:bg-slate-100
            "
          >
            <FiEdit2 />
          </button>

          <UserActionMenu
            user={user}
            onView={onView}
            onEdit={onEdit}
            onStatusChange={onStatusChange}
          />
        </div>
      </td>
    </tr>
  );
};

export default UserRow;
