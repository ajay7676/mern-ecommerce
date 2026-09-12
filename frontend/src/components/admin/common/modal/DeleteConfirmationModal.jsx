import { AlertTriangle, X } from "lucide-react";

const DeleteConfirmationModal = ({
  isOpen,
  title = "Delete item",
  description = "Are you sure you want to delete this item?",
  itemName,
  warning,
  confirmText = "Delete",
  cancelText = "Cancel",
  isLoading = false,
  isDisabled = false,
  disabledReason,
  onConfirm,
  onClose,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-200 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-error/10 text-error">
              <AlertTriangle className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-950">
                {title}
              </h2>

              <p className="text-sm text-slate-500">
                This action needs confirmation.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="btn btn-ghost btn-sm btn-circle"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-5 py-5">
          <p className="text-sm text-slate-600">
            {description}
          </p>

          {itemName && (
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Selected item
              </p>

              <p className="mt-1 font-bold text-slate-900">
                {itemName}
              </p>
            </div>
          )}

          {warning && (
            <div className="mt-4 rounded-xl border border-warning/30 bg-warning/10 px-4 py-3 text-sm text-warning">
              {warning}
            </div>
          )}

          {isDisabled && disabledReason && (
            <div className="mt-4 rounded-xl border border-error/20 bg-error/5 px-4 py-3 text-sm text-error">
              {disabledReason}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-200 px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="btn btn-outline"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading || isDisabled}
            className="btn btn-error text-white"
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner loading-sm " />
                Deleting...
              </>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;