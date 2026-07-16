import { dashboardStats } from "./dashboardData";
import StatsCard from "./StatsCard";

const StatsCards = () => {
  return (
    <section className="relative z-20 -mt-45">
      <div className="mx-auto max-w-330 px-6">
        <div className="flex flex-wrap items-start gap-4">
           <StatsCard
            columns={dashboardStats[0].columns}
            className="flex-[2.2]"
          />

          <StatsCard
            columns={dashboardStats[1].columns}
            className="flex-[1.4]"
          />

          <StatsCard
            columns={dashboardStats[2].columns}
            className="w-45]"
          />
        </div>
      </div>
    </section>
  );
};

export default StatsCards;
