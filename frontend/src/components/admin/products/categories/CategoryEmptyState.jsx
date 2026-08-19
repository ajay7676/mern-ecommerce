import {
  FiFolderPlus,
  FiRefreshCw,
  FiSearch,
} from "react-icons/fi";

const CategoryEmptyState = ({
  hasFilters = false,
  onAddCategory,
  onClearFilters,
}) => {
  return (
    <div
      className="
        flex
        min-h-107.5
        items-center
        justify-center
        bg-white
        px-5
        py-12
      "
    >
      <div
        className="
          w-full
          max-w-117.5
          text-center
        "
      >
        <div className="relative mx-auto w-fit">
          <div
            className="
              grid
              h-20
              w-20
              place-items-center
              rounded-2xl
              border
              border-violet-100
              bg-linear-to-br
              from-violet-50
              to-indigo-50
              text-violet-600
              shadow-[0_10px_30px_rgba(124,58,237,0.08)]
            "
          >
            {hasFilters ? (
              <FiSearch
                size={32}
                strokeWidth={1.7}
              />
            ) : (
              <FiFolderPlus
                size={34}
                strokeWidth={1.7}
              />
            )}
          </div>

          <span
            className="
              absolute
              -bottom-2
              -right-2
              h-5
              w-5
              rounded-full
              border-4
              border-white
              bg-emerald-400
            "
          />
        </div>

        <h3
          className="
            mt-6
            text-lg
            font-bold
            tracking-[-0.01em]
            text-slate-950
          "
        >
          {hasFilters
            ? "No matching categories found"
            : "No categories yet"}
        </h3>

        <p
          className="
            mx-auto
            mt-2
            max-w-97.5
            text-sm
            leading-6
            text-slate-500
          "
        >
          {hasFilters
            ? "We couldn't find any categories matching your current search or filters. Try changing them."
            : "Create your first category to start organizing products into a clear category hierarchy."}
        </p>

        <div
          className="
            mt-6
            flex
            flex-col
            items-center
            justify-center
            gap-3
            sm:flex-row
          "
        >
          {hasFilters ? (
            <button
              type="button"
              onClick={onClearFilters}
              className="
                inline-flex
                h-10
                w-full
                items-center
                justify-center
                gap-2
                rounded-lg
                border
                border-slate-200
                bg-white
                px-5
                text-sm
                font-semibold
                text-slate-700
                shadow-sm
                transition
                hover:border-slate-300
                hover:bg-slate-50
                sm:w-auto
              "
            >
              <FiRefreshCw size={16} />

              Clear Filters
            </button>
          ) : (
            <button
              type="button"
              onClick={onAddCategory}
              className="
                inline-flex
                h-10
                w-full
                items-center
                justify-center
                gap-2
                rounded-lg
                bg-violet-600
                px-5
                text-sm
                font-semibold
                text-white
                shadow-[0_6px_16px_rgba(124,58,237,0.18)]
                transition
                hover:bg-violet-700
                active:scale-[0.98]
                sm:w-auto
              "
            >
              <FiFolderPlus size={17} />

              Add First Category
            </button>
          )}
        </div>

        {!hasFilters && (
          <div
            className="
              mx-auto
              mt-8
              grid
              max-w-105
              grid-cols-1
              gap-2
              text-left
              sm:grid-cols-3
            "
          >
            {[
              "Create hierarchy",
              "Assign products",
              "Control visibility",
            ].map((item) => (
              <div
                key={item}
                className="
                  rounded-lg
                  border
                  border-slate-100
                  bg-slate-50/70
                  px-3
                  py-2.5
                  text-center
                  text-[11px]
                  font-medium
                  text-slate-500
                "
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryEmptyState;