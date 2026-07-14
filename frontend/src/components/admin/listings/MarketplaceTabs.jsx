import clsx from "clsx";
import { marketplaceTabs } from "./listingsData";

const MarketplaceTabs = () => {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="inline-flex min-w-max rounded-lg border border-base-300 bg-base-100 shadow-sm">
        {marketplaceTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={clsx(
              "flex items-center gap-2 whitespace-nowrap border-r border-base-300 px-4 py-2 text-sm font-medium transition-all duration-200 last:border-r-0",
              tab.active
                ? "bg-primary/10 text-primary"
                : "text-base-content hover:bg-base-200"
            )}
          >
            <span>{tab.icon}</span>

            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MarketplaceTabs;