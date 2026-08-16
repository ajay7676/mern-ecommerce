import {
  FiChevronDown,
  FiEdit3,
} from "react-icons/fi";

const BulkActionsCard = ({
  action,
  onActionChange,
  onApply,
}) => {
  return (
    <section
      className="
        rounded-xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-[0_1px_4px_rgba(15,23,42,0.03)]
      "
    >
      <div className="flex items-center gap-2">
        <FiEdit3
          size={18}
          className="text-violet-600"
        />

        <h2 className="text-[14px] font-bold text-slate-950">
          Bulk Actions
        </h2>
      </div>

      <div
        className="
          mt-4
          flex
          flex-col
          gap-3
          sm:flex-row
        "
      >
        <div className="relative flex-1">
          <select
            value={action}
            onChange={(event) =>
              onActionChange(
                event.target.value,
              )
            }
            className="
              h-9
              w-full
              appearance-none
              rounded-lg
              border
              border-slate-200
              bg-white
              pl-3
              pr-9
              text-[12px]
              text-slate-600
              outline-none
            "
          >
            <option value="">
              Select Action
            </option>

            <option value="activate">
              Activate
            </option>

            <option value="deactivate">
              Deactivate
            </option>

            <option value="delete">
              Delete
            </option>
          </select>

          <FiChevronDown
            size={13}
            className="
              pointer-events-none
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-slate-500
            "
          />
        </div>

        <button
          type="button"
          onClick={onApply}
          className="
            h-9
            min-w-25
            rounded-lg
            bg-violet-600
            px-5
            text-[12px]
            font-semibold
            text-white
            transition
            hover:bg-violet-700
          "
        >
          Apply
        </button>
      </div>
    </section>
  );
};

export default BulkActionsCard;