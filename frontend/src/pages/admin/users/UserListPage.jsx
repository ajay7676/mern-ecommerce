import { useEffect , useState } from "react";
import {
  FiDownload,
  FiPlus,
} from "react-icons/fi";

import UserStatsCard from '../../../components/admin/users/UserStatsCard'
import UserFilters from "../../../components/admin/users/UserFilters";
import UserTable from "../../../components/admin/users/UserTable";
import UserPagination from "../../../components/admin/users/UserPagination";

import useUsers  from '../../../hooks/admin/queries/useUsers';
import {
  userStats,
} from '../../../data/admin/users/users.data';

const UserManagementPage = () => {
   const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  const [selectedUsers, setSelectedUsers] = useState([]);

   const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
  } = useUsers({
    page,
    limit,
    search,
    role,
    status,
  });

  const users = data?.data ?? [];

  const pagination = data?.pagination;

  useEffect(() => {
    setPage(1);
  }, [search, role, status]);

  const handleSelectUser = (userId) => {
    setSelectedUsers((currentUsers) => {
      const alreadySelected =
        currentUsers.includes(userId);

      if (alreadySelected) {
        return currentUsers.filter(
          (id) => id !== userId
        );
      }

      return [
        ...currentUsers,
        userId,
      ];
    });
  };

  const handleSelectAll = () => {
    const currentPageIds = users.map(
      (user) => user.id
    );

    const allSelected =
      currentPageIds.length > 0 &&
      currentPageIds.every((id) =>
        selectedUsers.includes(id)
      );

    if (allSelected) {
      setSelectedUsers((currentUsers) =>
        currentUsers.filter(
          (id) => !currentPageIds.includes(id)
        )
      );

      return;
    }

    setSelectedUsers((currentUsers) => [
      ...new Set([
        ...currentUsers,
        ...currentPageIds,
      ]),
    ]);
  };

  const handleClearFilters = () => {
    setSearch("");
    setRole("");
    setStatus("");
    setPage(1);
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

        {/* Header */}

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
              View, search and manage all users in
              your system.
            </p>
          </div>

          <div className="flex gap-3">
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
              "
            >
              <FiDownload />
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
                hover:bg-violet-700
              "
            >
              <FiPlus size={18} />
              Add New User
            </button>
          </div>
        </div>

        {/* Stats */}

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

        {/* Users */}

        <section
          className="
            mt-6
            overflow-hidden
            rounded-xl
            border
            border-slate-200
            bg-white
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

          {isLoading ? (
            <div
              className="
                flex
                min-h-100
                items-center
                justify-center
              "
            >
              <p className="text-sm text-slate-500">
                Loading users...
              </p>
            </div>
          ) : isError ? (
            <div
              className="
                flex
                min-h-100
                items-center
                justify-center
              "
            >
              <p className="text-sm text-red-500">
                {error?.message ??
                  "Failed to load users"}
              </p>
            </div>
          ) : users.length === 0 ? (
            <div
              className="
                flex
                min-h-100
                items-center
                justify-center
              "
            >
              <p className="text-sm text-slate-500">
                No users found.
              </p>
            </div>
          ) : (
            <UserTable
              users={users}
              selectedUsers={selectedUsers}
              onSelectUser={handleSelectUser}
              onSelectAll={handleSelectAll}
            />
          )}

          {isFetching && !isLoading && (
            <div
              className="
                border-t
                border-slate-100
                py-2
                text-center
                text-xs
                text-slate-400
              "
            >
              Updating users...
            </div>
          )}

          <UserPagination
            page={page}
            limit={limit}
            pagination={pagination}
            onPageChange={setPage}
            onLimitChange={(newLimit) => {
              setLimit(newLimit);
              setPage(1);
            }}
          />
        </section>
      </div>
    </main>
  );
};

export default UserManagementPage;