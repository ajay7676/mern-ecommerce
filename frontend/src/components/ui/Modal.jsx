import { FiX } from "react-icons/fi";

const Modal = ({ isOpen, title, children, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="
        fixed inset-0 z-50 flex items-center
        justify-center px-4 py-6
      "
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/40"
      />

      <div
        className="
          relative z-10 max-h-[90vh] w-full
          max-w-lg overflow-y-auto rounded-xl
          bg-white p-6 shadow-2xl
        "
      >
        <div className="flex items-center justify-between">
          <h2 id="modal-title" className="text-lg font-semibold text-slate-950">
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="
              btn btn-circle btn-ghost btn-sm
              text-slate-500
            "
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
