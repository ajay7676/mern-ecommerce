import clsx from "clsx";
import { ORDER_FILTERS }  from '../../constants/orders/order.constants'

const OrderFilters = ({ activeFilter, onChange }) => {
  return (
    <div className="overflow-x-auto border-b border-slate-200">
      <div
        role="tablist"
        aria-label="Order filters"
        className="flex min-w-max items-center gap-8 sm:gap-12"
      >
        {ORDER_FILTERS.map((filter) => {
          const isActive = activeFilter === filter.id;

          return (
            <button
              key={filter.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(filter.id)}
              className={clsx(
                "relative min-h-14 px-1 text-sm font-medium",
                "transition-colors duration-200",
                isActive
                  ? "text-indigo-600"
                  : "text-slate-800 hover:text-indigo-600",
              )}
            >
              {filter.label}

              <span
                className={clsx(
                  "absolute inset-x-0 bottom-0 h-0.5",
                  "rounded-full bg-indigo-600",
                  "transition-opacity duration-200",
                  isActive ? "opacity-100" : "opacity-0",
                )}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default OrderFilters;