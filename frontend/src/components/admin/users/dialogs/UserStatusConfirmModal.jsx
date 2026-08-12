import { FiAlertTriangle } from "react-icons/fi";

import useUpdateUserStatus from "../../../../hooks/admin/mutations/users/useUpdateUserStatus";

const UserStatusConfirmModal = ({ user, open, onClose }) => {
  const { mutateAsync, isPending } = useUpdateUserStatus();

  if (!open || !user) {
    return null;
  }

  const isBlocked = user.status === "Blocked";

  const nextStatus = isBlocked ? "Active" : "Blocked";

  const handleConfirm = async () => {
    await mutateAsync({
      userId: user.id,
      status: nextStatus,
    });

    onClose();
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-60
        grid
        place-items-center
        bg-slate-950/40
        p-4
      "
    >
      <div
        className="
          w-full
          max-w-110
          rounded-2xl
          bg-white
          p-6
          shadow-2xl
        "
      >
        <div
          className="
            grid
            h-12
            w-12
            place-items-center
            rounded-full
            bg-amber-50
            text-amber-500
          "
        >
          <FiAlertTriangle size={24} />
        </div>

        <h2 className="mt-5 text-xl font-bold text-slate-900">
          {isBlocked ? "Unblock User?" : "Block User?"}
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          {isBlocked
            ? `${user.name} will be able to access their account again.`
            : `${user.name} will no longer be able to access their account.`}
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="
              h-10
              rounded-lg
              border
              border-slate-200
              px-4
              font-medium
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={isPending}
            className={`
              h-10
              rounded-lg
              px-4
              font-semibold
              text-white
              disabled:opacity-50
              ${isBlocked ? "bg-emerald-600" : "bg-red-600"}
            `}
          >
            {isPending
              ? "Updating..."
              : isBlocked
                ? "Unblock User"
                : "Block User"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserStatusConfirmModal;
