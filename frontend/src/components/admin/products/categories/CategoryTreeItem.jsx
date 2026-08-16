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

  return (
    <div>
      <div
        className="
          flex
          min-h-7.25
          items-center
          gap-2
          text-[12px]
        "
        style={{
          paddingLeft:
            level * 18,
        }}
      >
        {hasChildren ? (
          item.expanded ||
          level === 0 ? (
            <FiChevronDown
              size={13}
              className="text-slate-500"
            />
          ) : (
            <FiChevronRight
              size={13}
              className="text-slate-500"
            />
          )
        ) : (
          <FiChevronRight
            size={12}
            className="text-slate-400"
          />
        )}

        <FiFolder
          size={14}
          className="text-slate-600"
        />

        <span
          className={
            item.danger
              ? "text-red-500"
              : "text-slate-700"
          }
        >
          {item.name}
        </span>
      </div>

      {hasChildren &&
        (item.expanded ||
          level === 0) && (
          <div
            className="
              ml-4.5
              border-l
              border-dotted
              border-slate-200
            "
          >
            {item.children.map(
              (child) => (
                <CategoryTreeItem
                  key={child.id}
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