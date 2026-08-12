import { useState } from "react";

const useUserManagement = () => {
  const [addOpen, setAddOpen] = useState(false);

  const [viewUser, setViewUser] = useState(null);

  const [editUser, setEditUser] = useState(null);

  const [statusChangeUser, setStatusChangeUser] = useState(null);

  return {
    addOpen,
    openAddUser: () => setAddOpen(true),

    closeAddUser: () => setAddOpen(false),

    viewUser,
    openViewUser: (user) => setViewUser(user),

    closeViewUser: () => setViewUser(null),

    editUser,
    openEditUser: (user) => setEditUser(user),

    closeEditUser: () => setEditUser(null),

    statusChangeUser,
    openStatusConfirmation: (user) => setStatusChangeUser(user),

    closeStatusConfirmation: () => setStatusChangeUser(null),
  };
};

export default useUserManagement;
