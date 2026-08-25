import {
  FiPlus,
  FiSearch,
  FiTag,
} from "react-icons/fi";

const BrandEmptyState = ({
  hasFilters = false,
  onAddBrand,
  onResetFilters,
}) => {
  return (
    <div
      className="
        flex
        min-h-105
        items-center
        justify-center
        px-5
        py-12
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-105
          text-center
        "
      >
        {/* Icon */}

        <div
          className="
            relative
            mx-auto
            grid
            h-18
            w-18
            place-items-center
            rounded-2xl
            bg-violet-50
          "
        >
          {hasFilters ? (
            <FiSearch
              size={28}
              className="text-violet-600"
            />
          ) : (
            <FiTag
              size={28}
              className="text-violet-600"
            />
          )}

          <span
            className="
              absolute
              -right-1
              -top-1
              h-4
              w-4
              rounded-full
              border-[3px]
              border-white
              bg-violet-400
            "
          />
        </div>

        {/* Content */}

        <h3
          className="
            mt-5
            text-[16px]
            font-bold
            text-slate-950
          "
        >
          {hasFilters
            ? "No matching brands found"
            : "No brands yet"}
        </h3>

        <p
          className="
            mx-auto
            mt-2
            max-w-85
            text-[13px]
            leading-6
            text-slate-500
          "
        >
          {hasFilters
            ? "We couldn't find any brands matching your current search or filters."
            : "Create your first brand to organize products and make them easier for customers to discover."}
        </p>

        {/* Actions */}

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
              onClick={onResetFilters}
              className="
                inline-flex
                h-10
                items-center
                justify-center
                gap-2
                rounded-lg
                border
                border-slate-200
                bg-white
                px-5
                text-[13px]
                font-semibold
                text-slate-700
                shadow-sm
                transition
                hover:bg-slate-50
              "
            >
              Reset Filters
            </button>
          ) : (
            <button
              type="button"
              onClick={onAddBrand}
              className="
                inline-flex
                h-10
                items-center
                justify-center
                gap-2
                rounded-lg
                bg-violet-600
                px-5
                text-[13px]
                font-semibold
                text-white
                shadow-sm
                transition
                hover:bg-violet-700
              "
            >
              <FiPlus size={16} />

              Add New Brand
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrandEmptyState;