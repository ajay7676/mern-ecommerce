import { FiEdit2, FiTrash2 } from "react-icons/fi";

import CategoryStatusBadge from "./CategoryStatusBadge";

const CategoryRow = ({ category, onEdit, onDelete, index, page, limit }) => {
  const isChild = category.level > 0;
  const rowNumber = (page - 1) * limit + index + 1;
  const isSubcategory = Boolean(category.parentCategory);
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

      <td className="w-13.75 px-2">{rowNumber}</td>

      {/* <td className="min-w-52.5 px-2">
        <div
          className="flex items-center gap-2.5"
          style={{
            paddingLeft: category.level * 18,
          }}
        >
          {category.parentCategory ? (
            <button
              type="button"
              onClick={() => onToggle(category)}
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

          <FiFolder size={15} className="shrink-0 text-slate-600" />

          <span
            className="
              whitespace-nowrap
              font-medium
              text-slate-800
            "
          >
            {category.name}
          </span>
          <span
            className="
              whitespace-nowrap
              font-medium
              text-slate-800
            "
          >
            {category.slug}
          </span>
        </div>
      </td> */}
      <td className="px-5 py-4 text-sm text-slate-600">
        <div>
          <p className="font-medium text-slate-900">{category.name}</p>

          <p className="mt-0.5 text-xs text-slate-400">
            {isSubcategory
              ? `Under ${category.parentCategory.name}`
              : "Top-level category"}
          </p>
        </div>
      </td>
      <td className="px-5 py-4 text-sm text-slate-600">
        {category.parentCategory?.name ?? "—"}
      </td>
      <td className="w-22.5 px-2">{category.productCount ?? 0}</td>

      <td className="w-27.5 px-2">
        <CategoryStatusBadge status={category.status} />
      </td>

      <td className="w-25 px-2">{category.sortOrder ?? 0}</td>

      <td className="w-26.25 px-2">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => onEdit(category)}
            aria-label={`Edit ${category.name}`}
            className="
              text-slate-700
              transition
              cursor-pointer
              hover:text-violet-600
            "
          >
            <FiEdit2 size={15} />
          </button>

          <button
            type="button"
            onClick={() => onDelete(category)}
            aria-label={`Delete ${category.name}`}
            className="
              text-slate-700
              transition
              hover:text-red-500
              cursor-pointer
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
