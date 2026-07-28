import { useEffect } from "react";
import AddProductHeader from "./product/header/AddProductHeader";

const RightSideModal = ({
  isOpen,
  title = "Add New Product",
  children,
  onClose,
}) => {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 transition ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!isOpen}
    >
      {/* Overlay */}
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className={`
          absolute inset-0 bg-slate-950/40
          transition-opacity duration-300
          ${isOpen ? "opacity-100" : "opacity-0"}
        `}
      />
      {/* Right drawer */}
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        className={`
          absolute right-0 top-0 h-full
          w-full max-w-[90%] bg-white shadow-2xl
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          {/* <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <h2
              id="drawer-title"
              className="text-lg font-semibold text-slate-950"
            >
              {title}
            </h2>

            <button
              type="button"
              onClick={onClose}
              className="btn btn-circle btn-ghost btn-sm"
              aria-label="Close popup"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div> */}
          <AddProductHeader title={title} onCancel={onClose}/>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-5">
             {children}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-slate-200 px-5 py-4">
            <button
              type="button"
              onClick={onClose}
              className="btn border-slate-200 bg-white text-slate-700 shadow-none hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="button"
              className="btn border-none bg-indigo-600 text-white shadow-none hover:bg-indigo-700"
            >
              Save Product
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RightSideModal;
