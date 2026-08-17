import {
  FiChevronDown,
  FiChevronRight,
  FiEdit2,
  FiFolder,
  FiTrash2,
} from "react-icons/fi";

import CategoryStatusBadge from "./CategoryStatusBadge";

const CategoryRow = ({
  category,
  onEdit,
  onDelete,
  onToggle,
}) => {
  const isChild =
    category.level > 0;

  return (
    <tr
      className="
        h-10.75
        border-b
        border-slate-100
        text-[12px]
        text-slate-700
        transition
        hover:bg-slate-50
      "
    >
      <td className="w-7 px-3">
        {!isChild && (
          <span
            className="
              cursor-grab
              text-[15px]
              tracking-[-3px]
              text-slate-400
            "
          >
            ⠿
          </span>
        )}
      </td>

      <td className="w-13.75 px-2">
        {category.number}
      </td>

      <td className="min-w-52.5 px-2">
        <div
          className="flex items-center gap-2.5"
          style={{
            paddingLeft:
              category.level * 18,
          }}
        >
          {category.hasChildren ? (
            <button
              type="button"
              onClick={() =>
                onToggle(category)
              }
              className="
                grid
                h-5
                w-5
                place-items-center
                rounded
                text-slate-600
                hover:bg-slate-100
              "
            >
              {category.expanded ? (
                <FiChevronDown
                  size={13}
                />
              ) : (
                <FiChevronRight
                  size={13}
                />
              )}
            </button>
          ) : (
            <span className="w-5">
              {isChild && (
                <span
                  className="
                    block
                    h-px
                    w-3
                    bg-slate-200
                  "
                />
              )}
            </span>
          )}

          <FiFolder
            size={15}
            className="shrink-0 text-slate-600"
          />

          <span
            className="
              whitespace-nowrap
              font-medium
              text-slate-800
            "
          >
            {category.name}
          </span>
        </div>
      </td>

      <td className="min-w-41.25 px-2">
        {category.parentCategory ? (
          category.parentCategory
        ) : (
          <span>
            — (Top Level)
          </span>
        )}
      </td>

      <td className="w-22.5 px-2">
        {category.products}
      </td>

      <td className="w-27.5 px-2">
        <CategoryStatusBadge
          status={category.status}
        />
      </td>

      <td className="w-25 px-2">
        {category.sortOrder}
      </td>

      <td className="w-26.25 px-2">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() =>
              onEdit(category)
            }
            aria-label={`Edit ${category.name}`}
            className="
              text-slate-700
              cursor-pointer
              transition
              hover:text-violet-600
            "
          >
            <FiEdit2 size={15} />
          </button>

          <button
            type="button"
            onClick={() =>
              onDelete(category)
            }
            aria-label={`Delete ${category.name}`}
            className="
              text-slate-700
              transition
              cursor-pointer
              hover:text-red-500
            "
          >
            <FiTrash2 size={15} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CategoryRow;