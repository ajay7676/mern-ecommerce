import {
  FiPlus,
  FiSearch,
  FiSliders,
  FiX,
} from "react-icons/fi";

const AttributeEmptyState = ({
  hasFilters = false,
  onAddAttribute,
  onClearFilters,
}) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto flex max-w-md flex-col items-center text-center">
        {/* Icon */}
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
          {hasFilters ? (
            <FiSearch size={28} />
          ) : (
            <FiSliders size={28} />
          )}
        </div>

        {/* Heading */}
        <h3 className="mt-5 text-base font-semibold text-slate-900 sm:text-lg">
          {hasFilters
            ? "No attributes found"
            : "No attributes yet"}
        </h3>

        {/* Description */}
        <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
          {hasFilters
            ? "We couldn't find any attributes matching your current search or filters. Try changing your filters."
            : "Create your first product attribute to start managing options such as size, color, material, and brand."}
        </p>

        {/* Actions */}
        <div className="mt-6 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          {hasFilters ? (
            <>
              <button
                type="button"
                onClick={onClearFilters}
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
                  px-4
                  text-sm
                  font-medium
                  text-slate-700
                  transition
                  hover:bg-slate-50
                  focus:outline-none
                  focus:ring-2
                  focus:ring-violet-200
                "
              >
                <FiX size={16} />
                Clear Filters
              </button>

              <button
                type="button"
                onClick={onAddAttribute}
                className="
                  inline-flex
                  h-10
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  bg-violet-600
                  px-4
                  text-sm
                  font-medium
                  text-white
                  shadow-sm
                  transition
                  hover:bg-violet-700
                  focus:outline-none
                  focus:ring-2
                  focus:ring-violet-200
                "
              >
                <FiPlus size={16} />
                Add Attribute
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={onAddAttribute}
              className="
                inline-flex
                h-10
                items-center
                justify-center
                gap-2
                rounded-lg
                bg-violet-600
                px-5
                text-sm
                font-medium
                text-white
                shadow-sm
                transition
                hover:bg-violet-700
                focus:outline-none
                focus:ring-2
                focus:ring-violet-200
              "
            >
              <FiPlus size={17} />
              Add New Attribute
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttributeEmptyState;