const BrandFooter = ({ onSubmit , onClose, disabled=false, isPending }) => {
  return (
    <div
      className="
          flex shrink-0 items-center justify-end gap-3
             border-t border-slate-200 bg-white px-5 py-4
          "
    >
      <button
        type="button"
        onClick={onClose}
        disabled={disabled}
        className="h-10 rounded-lg border border-slate-200 bg-white cursor-pointer px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
      >
        Cancel
      </button>

      <button
        type="button"
        disabled={disabled}
        onClick={onSubmit}
        className="h-10 rounded-lg bg-violet-600 px-6 text-sm cursor-pointer
         font-semibold text-white transition hover:bg-violet-700"

      >
        {isPending ? "Saving..." : "Save Brand"}
      </button>
    </div>
  );
};

export default BrandFooter;
