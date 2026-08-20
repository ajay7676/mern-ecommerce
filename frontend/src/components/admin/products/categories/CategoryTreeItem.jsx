import {
  useState,
} from "react";

import {
  FiChevronDown,
  FiChevronRight,
  FiFolder,
} from "react-icons/fi";

const CategoryTreeItem = ({
  item,
  level = 0,
}) => {
  const hasChildren =
    item.children?.length > 0;

  const [
    expanded,
    setExpanded,
  ] = useState(
    level === 0,
  );

  const isInactive =
    item.status ===
    "inactive";

  return (
    <div>
      <div
        className="
          group
          flex
          min-h-7.5
          items-center
          gap-2
          rounded-md
          px-1
          text-[12px]
          transition
          hover:bg-slate-50
        "
        style={{
          paddingLeft:
            level * 18,
        }}
      >
        {hasChildren ? (
          <button
            type="button"
            onClick={() =>
              setExpanded(
                (current) =>
                  !current,
              )
            }
            className="
              grid
              h-5
              w-5
              shrink-0
              place-items-center
              rounded
              text-slate-400
              transition
              hover:bg-slate-100
              hover:text-slate-700
            "
          >
            {expanded ? (
              <FiChevronDown
                size={13}
                className="cursor-pointer"
              />
            ) : (
              <FiChevronRight
                size={13}
              />
            )}
          </button>
        ) : (
          <span className="grid h-5 w-5 place-items-center">
            <FiChevronRight
              size={12}
              className="text-slate-300"
            />
          </span>
        )}

        <FiFolder
          size={14}
          className="
            shrink-0
            text-slate-500
          "
        />

        <span
          className={`
            truncate
            font-medium
            ${
              isInactive
                ? "text-red-500"
                : "text-slate-700"
            }
          `}
        >
          {item.name}
        </span>
      </div>

      {hasChildren &&
        expanded && (
          <div
            className="
              ml-2.5
              border-l
              border-dotted
              border-slate-200
            "
          >
            {item.children.map(
              (child) => (
                <CategoryTreeItem
                  key={
                    child._id
                  }
                  item={child}
                  level={
                    level + 1
                  }
                />
              ),
            )}
          </div>
        )}
    </div>
  );
};

export default CategoryTreeItem;