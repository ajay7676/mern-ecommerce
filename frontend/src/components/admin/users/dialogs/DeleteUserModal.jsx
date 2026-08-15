import { FiAlertTriangle, FiX } from "react-icons/fi";

const DeleteUserModal = ({ open, user, isPending, onConfirm, onClose }) => {
  if (!open || !user) {
    return null;
  }

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-slate-950/50
        p-4
        backdrop-blur-[2px]
      "
    >
      <div
        className="
          w-full max-w-md
          rounded-2xl
          bg-white
          shadow-2xl
        "
      >
        <div className="flex items-start justify-between p-6">
          <div
            className="
              flex h-12 w-12
              items-center justify-center
              rounded-full
              bg-red-50
              text-red-600
            "
          >
            <FiAlertTriangle size={22} />
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="
              flex h-9 w-9
              items-center justify-center
              rounded-lg
              text-slate-500
              hover:bg-slate-100
              cursor-pointer
            "
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="px-6 pb-6">
          <h2 className="text-lg font-bold text-slate-900">Delete User?</h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-slate-800">{user.name}</span>?
            This action cannot be undone.
          </p>
        </div>

        <div
          className="
            flex justify-end gap-3
            border-t border-slate-200
            bg-slate-50
            px-6 py-4
          "
        >
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="
              h-10 rounded-lg
              border border-slate-300
              bg-white px-5
              text-sm font-semibold
              text-slate-700
              cursor-pointer
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isPending}
            className="
              h-10 min-w-28
              rounded-lg
              bg-red-600
              px-5
              text-sm font-semibold
              text-white
              hover:bg-red-700
              disabled:opacity-60
              cursor-pointer
            "
          >
            {isPending ? "Deleting..." : "Delete User"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
