import { format } from "date-fns";
import { RefreshCw } from "lucide-react";
import { useState } from "react";

import useAuth from "../../../hooks/queries/useAuth";

const DashboardHeader = () => {
  const { user } = useAuth();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const today = format(new Date(), "EEEE, dd MMMM yyyy");

    const handleRefresh = async () => {
    try {
      setIsRefreshing(true);

      // TODO:
      // Refetch dashboard queries here
      // await queryClient.invalidateQueries(...)

      await new Promise((resolve) => setTimeout(resolve, 600));
    } finally {
      setIsRefreshing(false);
    }
  };


  return (
     <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      {/* Left */}

      <div>
        <h1 className="text-3xl font-bold text-base-content">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-base-content/70">
          Welcome back,{" "}
          <span className="font-semibold">
            {user?.name || "Administrator"}
          </span>
        </p>

        <p className="mt-1 text-xs text-base-content/50">
          {today}
        </p>
      </div>

      {/* Right */}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="btn btn-outline btn-sm"
        >
          <RefreshCw
            size={16}
            className={isRefreshing ? "animate-spin" : ""}
          />

          Refresh
        </button>
      </div>
    </header>
  )
};

export default DashboardHeader;
