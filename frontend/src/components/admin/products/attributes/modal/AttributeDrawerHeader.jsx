import {
  FiArrowLeft,
  FiSave,
  FiX,
} from "react-icons/fi";

const AttributeDrawerHeader = ({
  onClose,
  onSubmit,
}) => {
  return (
    <header className="shrink-0 border-b border-slate-200 bg-white">
      <div className="flex min-h-19 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-lg
              border
              border-slate-200
              text-slate-700
              transition
              hover:bg-slate-50
              focus:outline-none
              focus:ring-2
              focus:ring-violet-200
            "
          >
            <FiArrowLeft size={19} />
          </button>

          <div className="min-w-0">
            <h2 className="truncate text-lg font-bold text-slate-900 sm:text-xl">
              Add New Attribute
            </h2>

            <div className="hidden items-center gap-2 text-xs text-slate-500 sm:flex">
              <span>Dashboard</span>
              <span>›</span>
              <span>Attributes</span>
              <span>›</span>
              <span className="text-slate-700">
                Add New Attribute
              </span>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            className="
              hidden
              h-10
              items-center
              gap-2
              rounded-lg
              border
              border-slate-200
              bg-white
              px-4
              text-sm
              font-medium
              text-slate-700
              hover:bg-slate-50
              sm:inline-flex
            "
          >
            <FiX size={16} />
            Cancel
          </button>

          <button
            type="submit"
            onClick={onSubmit}
            className="
              inline-flex
              h-10
              items-center
              gap-2
              rounded-lg
              bg-violet-600
              px-4
              text-sm
              font-semibold
              text-white
              shadow-sm
              transition
              hover:bg-violet-700
              focus:outline-none
              focus:ring-2
              focus:ring-violet-300
              sm:px-5
            "
          >
            <FiSave size={16} />
            <span className="hidden sm:inline">
              Save Attribute
            </span>
            <span className="sm:hidden">Save</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AttributeDrawerHeader;