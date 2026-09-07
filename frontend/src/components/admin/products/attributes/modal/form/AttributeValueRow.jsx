import {
  FiGrid,
  FiTrash2,
} from "react-icons/fi";

const AttributeValueRow = ({
  item,
  onChange,
  onRemove,
  onMakeDefault,
}) => {
  return (
    <div
      className="
        flex
        items-center
        gap-2
        rounded-lg
        border
        border-slate-200
        bg-white
        p-2
      "
    >
      {/* Drag */}
      <button
        type="button"
        className="shrink-0 cursor-grab p-1 text-slate-300 hover:text-slate-500"
        aria-label="Drag value"
      >
        <FiGrid size={14} />
      </button>

      {/* Color */}
      <input
        type="color"
        value={item.color || "#000000"}
        onChange={(e) =>
          onChange(item.id, "color", e.target.value)
        }
        className="
          h-7
          w-7
          shrink-0
          cursor-pointer
          rounded-full
          border-0
          bg-transparent
          p-0
        "
      />

      {/* Value */}
      <input
        value={item.value}
        onChange={(e) =>
          onChange(item.id, "value", e.target.value)
        }
        placeholder="Enter value"
        className="
          h-9
          min-w-0
          flex-1
          rounded-md
          border
          border-slate-200
          px-2
          text-xs
          text-slate-700
          outline-none
          focus:border-violet-500
          focus:ring-1
          focus:ring-violet-100
        "
      />

      {/* Default */}
      <button
        type="button"
        onClick={() => onMakeDefault(item.id)}
        className={`
          hidden
          h-7
          shrink-0
          rounded-md
          px-2
          text-[10px]
          font-semibold
          sm:inline-flex
          sm:items-center
          ${
            item.isDefault
              ? "bg-violet-50 text-violet-600"
              : "bg-slate-50 text-slate-400"
          }
        `}
      >
        {item.isDefault ? "Primary" : "Default"}
      </button>

      {/* Delete */}
      <button
        type="button"
        onClick={() => onRemove(item.id)}
        className="
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-md
          text-slate-400
          transition
          hover:bg-red-50
          hover:text-red-500
        "
        aria-label="Remove value"
      >
        <FiTrash2 size={15} />
      </button>
    </div>
  );
};

export default AttributeValueRow;