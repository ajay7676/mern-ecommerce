const RemoveAttributeOptionModal = ({
  open,
  data,
  onCancel,
  onConfirm,
}) => {
  if (!open || !data) {
    return null;
  }

  const {
    attributeName,
    option,
    affectedVariantsCount,
  } = data;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-base-100 p-6 shadow-2xl">
        <h3 className="text-lg font-semibold">
          Remove option?
        </h3>

        <p className="mt-2 text-sm text-base-content/70">
          Remove{" "}
          <strong>
            {option.label}
          </strong>{" "}
          from{" "}
          <strong>
            {attributeName}
          </strong>
          ?
        </p>

        {affectedVariantsCount > 0 && (
          <div className="mt-4 rounded-xl border border-warning/30 bg-warning/10 p-4">
            <p className="text-sm font-medium">
              {affectedVariantsCount} existing{" "}
              {affectedVariantsCount === 1
                ? "variant uses"
                : "variants use"}{" "}
              this option.
            </p>

            <p className="mt-1 text-xs text-base-content/70">
              The variants will not be removed immediately.
              You will regenerate variants before updating
              the product.
            </p>
          </div>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            type="button"
            className="btn btn-error"
            onClick={onConfirm}
          >
            Remove Option
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveAttributeOptionModal;