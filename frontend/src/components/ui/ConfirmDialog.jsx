import { FiAlertTriangle } from "react-icons/fi";

const ConfirmDialog = ({
  isOpen,
  title,
  description,
  confirmText = "Confirm",
  isLoading = false,
  onCancel,
  onConfirm,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="
        fixed inset-0 z-50 flex items-center
        justify-center px-4
      "
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        aria-label="Close confirmation dialog"
        onClick={onCancel}
        className="absolute inset-0 bg-slate-950/40"
      />

      <div
        className="
          relative z-10 w-full max-w-md
          rounded-xl bg-white p-6 shadow-2xl
        "
      >
        <div
          className="
            flex h-12 w-12 items-center justify-center
            rounded-full bg-red-50 text-red-500
          "
        >
          <FiAlertTriangle className="h-6 w-6" />
        </div>

        <h2 className="mt-4 text-lg font-semibold text-slate-950">
          {title}
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          {description}
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="
              btn h-11 min-h-11 rounded-md
              border-slate-200 bg-white px-5
              text-slate-700 shadow-none
              hover:bg-slate-50
            "
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={isLoading}
            onClick={onConfirm}
            className="
              btn h-11 min-h-11 rounded-md
              border-none bg-red-500 px-5
              text-white shadow-none hover:bg-red-600
            "
          >
            {isLoading && (
              <span className="loading loading-spinner loading-sm" />
            )}

            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;