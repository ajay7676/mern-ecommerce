import { FiDownload, FiPlus } from "react-icons/fi";

const UserManagementHeader = ({management}) => {
     console.log(management)
  return (
    <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <h1 className="text-[28px] font-bold tracking-[-0.02em] text-slate-950">User Management</h1>
        <p className="mt-1 text-sm text-slate-500">
          View, search and manage all users in your system.
        </p>
      </div>
      <div className="flex gap-3">
        <button
          type="button"
          className="flex h-11 items-center gap-2 rounded-lg border border-slate-200
           bg-white px-5 text-sm font-semibold text-slate-700">
          <FiDownload />
          Export ssss
        </button>
        <button
          type="button"
          onClick={management.openAddUser}
          className="flex h-11 items-center gap-2 rounded-lg bg-violet-600 px-5 text-sm font-semibold text-white hover:bg-violet-700"
        >
          <FiPlus size={18} />
          Add New User
        </button>
      </div>
    </div>
  );
};

export default UserManagementHeader;
