import { useEffect, useState } from "react";
// import { FiDownload, FiPlus } from "react-icons/fi";

// import UserStatsCard from "../../../components/admin/users/UserStatsCard";
import UserFilters from "../../../components/admin/users/UserFilters";
import UserTable from "../../../components/admin/users/UserTable";
import UserPagination from "../../../components/admin/users/UserPagination";

import useUsers from "../../../hooks/admin/queries/useUsers";
// import { userStats } from "../../../data/admin/users/users.data";
import useDebounce from "../../../utils/useDebounce";
import useUserManagement from "../../../hooks/admin/mutations/users/useUserManagement";
import UserManagementHeader from "../../../components/admin/users/UserManagementHeader";
import UserStats from "../../../components/admin/users/UserStats";
import UserStatusConfirmModal from "../../../components/admin/users/dialogs/UserStatusConfirmModal";
import EditUserModal from "../../../components/admin/users/dialogs/edit-user/EditUserModal";
import ViewUserModal from "../../../components/admin/users/dialogs/view-user/ViewUserModal";
import AddNewUserModal from "../../../components/admin/users/dialogs/add-new/AddNewUserModal";

const UserManagementPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  const [selectedUsers, setSelectedUsers] = useState([]);
  const debouncedSearch = useDebounce(search, 400);

  const management = useUserManagement();
  const { data, isLoading, isFetching, isError, error } = useUsers({
    page,
    limit,
    search: debouncedSearch,
    role,
    status,
  });

  const users = data?.data?.users ?? [];

  const pagination = data?.data?.pagination;

  useEffect(() => {
    setPage(1);
  }, [search, role, status]);

  const handleSelectUser = (userId) => {
    setSelectedUsers((currentUsers) => {
      const alreadySelected = currentUsers.includes(userId);

      if (alreadySelected) {
        return currentUsers.filter((id) => id !== userId);
      }

      return [...currentUsers, userId];
    });
  };

  const handleSelectAll = () => {
    const currentPageIds = users.map((user) => user.id);

    const allSelected =
      currentPageIds.length > 0 &&
      currentPageIds.every((id) => selectedUsers.includes(id));

    if (allSelected) {
      setSelectedUsers((currentUsers) =>
        currentUsers.filter((id) => !currentPageIds.includes(id)),
      );

      return;
    }

    setSelectedUsers((currentUsers) => [
      ...new Set([...currentUsers, ...currentPageIds]),
    ]);
  };

  const handleClearFilters = () => {
    setSearch("");
    setRole("");
    setStatus("");
    setPage(1);
  };

  return (
    <>
      <div
        className="min-h-screen bg-[#f8fafc] px-4 py-7 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-375">
          {/* Header */}

          <UserManagementHeader management={management} />

          {/* Stats */}

          <UserStats users={users} />

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
                <p className="text-sm text-slate-500">Loading users...</p>
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
                  {error?.message ?? "Failed to load users"}
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
                <p className="text-sm text-slate-500">No users found.</p>
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
      </div>
      <AddNewUserModal
        open={management.addOpen}
        onClose={management.closeAddUser}
      />

      <ViewUserModal
        open={Boolean(management.viewUser)}
        userId={management.viewUser?.id}
        onClose={management.closeViewUser}
      />

      <EditUserModal
        open={Boolean(management.editUser)}
        user={management.editUser}
        onClose={management.closeEditUser}
      />

      <UserStatusConfirmModal
        open={Boolean(management.statusChangeUser)}
        user={management.statusChangeUser}
        onClose={management.closeStatusConfirmation}
      />
    </>
  );
};

export default UserManagementPage;
