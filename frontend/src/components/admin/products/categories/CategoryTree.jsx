import { FiChevronDown, FiFolder } from "react-icons/fi";
import CategoryTreeItem from "./CategoryTreeItem";
import CategoryTreeSkeleton from './CategoryTreeSkeleton'

const CategoryTree = ({
   tree = [],
  isLoading = false,
  isError = false,
}) => {
 return (
    <section
      className="
        rounded-xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-[0_4px_18px_rgba(15,23,42,0.04)]
      "
    >
      <h2
        className="
          text-[15px]
          font-bold
          tracking-[-0.01em]
          text-slate-950
        "
      >
        Category Tree
      </h2>

      <div className="mt-4">
        {isLoading ? (
          <CategoryTreeSkeleton />
        ) : isError ? (
          <div
            className="
              rounded-lg
              border
              border-red-100
              bg-red-50
              px-4
              py-5
              text-center
            "
          >
            <p className="text-xs font-medium text-red-600">
              Failed to load category tree.
            </p>
          </div>
        ) : tree.length === 0 ? (
          <div
            className="
              flex
              min-h-45
              flex-col
              items-center
              justify-center
              text-center
            "
          >
            <div
              className="
                grid
                h-11
                w-11
                place-items-center
                rounded-xl
                bg-violet-50
                text-violet-600
              "
            >
              <FiFolder
                size={20}
              />
            </div>

            <p className="mt-3 text-sm font-semibold text-slate-800">
              No categories found
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Create a category to start building your hierarchy.
            </p>
          </div>
        ) : (
          <div>
            <div
              className="
                flex
                min-h-7.5
                items-center
                gap-2
                text-[12px]
                font-medium
                text-slate-700
              "
            >
              <FiChevronDown
                size={13}
                className="text-slate-400 cursor-pointer"
              />

              <FiFolder
                size={14}
                className="text-slate-500"
              />

              All Categories
            </div>

            <div
              className="
                ml-2.25
                border-l
                border-dotted
                border-slate-200
              "
            >
              {tree.map(
                (item) => (
                  <CategoryTreeItem
                    key={
                      item._id
                    }
                    item={
                      item
                    }
                    level={1}
                  />
                ),
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryTree;