import { useMemo, useState } from "react";
import {
  FiDownload,
  FiPlus,
} from "react-icons/fi";

import UserStatsCard from '../../../components/admin/users/UserStatsCard'
import UserFilters from "../../../components/admin/users/UserFilters";
import UserTable from "../../../components/admin/users/UserTable";
import UserPagination from "../../../components/admin/users/UserPagination";

import {
  users,
  userStats,
} from '../../../data/admin/users/users.data';

const UserManagementPage = () => {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const filteredUsers = useMemo(() => {
    const query = search.toLowerCase().trim();

    return users.filter((user) => {
      const matchesSearch =
        !query ||
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.phone.toLowerCase().includes(query);

      const matchesRole =
        !role || user.role === role;

      const matchesStatus =
        !status || user.status === status;

      return (
        matchesSearch &&
        matchesRole &&
        matchesStatus
      );
    });
  }, [search, role, status]);

  const handleSelectUser = (userId) => {
    setSelectedUsers((current) =>
      current.includes(userId)
        ? current.filter((id) => id !== userId)
        : [...current, userId]
    );
  };

  const handleSelectAll = () => {
    const allSelected =
      filteredUsers.length > 0 &&
      filteredUsers.every((user) =>
        selectedUsers.includes(user.id)
      );

    if (allSelected) {
      setSelectedUsers((current) =>
        current.filter(
          (id) =>
            !filteredUsers.some(
              (user) => user.id === id
            )
        )
      );

      return;
    }

    setSelectedUsers((current) => [
      ...new Set([
        ...current,
        ...filteredUsers.map((user) => user.id),
      ]),
    ]);
  };

  const handleClearFilters = () => {
    setSearch("");
    setRole("");
    setStatus("");
  };

  return (
    <main
      className="
        min-h-screen
        bg-[#f8fafc]
        px-4
        py-7
        sm:px-6
        lg:px-8
      "
    >
      <div className="mx-auto max-w-375">
        <div
          className="
            mb-7
            flex
            flex-col
            gap-4
            lg:flex-row
            lg:items-start
            lg:justify-between
          "
        >
          <div>
            <h1
              className="
                text-[28px]
                font-bold
                tracking-[-0.02em]
                text-slate-950
              "
            >
              User Management
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              View, search and manage all users in your system.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="
                flex
                h-11
                items-center
                gap-2
                rounded-lg
                border
                border-slate-200
                bg-white
                px-5
                text-sm
                font-semibold
                text-slate-700
                shadow-sm
                transition
                hover:bg-slate-50
              "
            >
              <FiDownload size={17} />
              Export
            </button>

            <button
              type="button"
              className="
                flex
                h-11
                items-center
                gap-2
                rounded-lg
                bg-violet-600
                px-5
                text-sm
                font-semibold
                text-white
                shadow-sm
                transition
                hover:bg-violet-700
              "
            >
              <FiPlus size={19} />
              Add New User
            </button>
          </div>
        </div>

        <section
          className="
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-2
            xl:grid-cols-5
          "
        >
          {userStats.map((stat) => (
            <UserStatsCard
              key={stat.title}
              {...stat}
            />
          ))}
        </section>

        <section
          className="
            mt-6
            overflow-hidden
            rounded-xl
            border
            border-slate-200
            bg-white
            shadow-[0_2px_12px_rgba(15,23,42,0.03)]
          "
        >
          <UserFilters
            search={search}
            setSearch={setSearch}
            role={role}
            setRole={setRole}
            status={status}
            setStatus={setStatus}
            onClear={handleClearFilters}
          />

          <UserTable
            users={filteredUsers}
            selectedUsers={selectedUsers}
            onSelectUser={handleSelectUser}
            onSelectAll={handleSelectAll}
          />

          <UserPagination />
        </section>
      </div>
    </main>
  );
};

export default UserManagementPage;