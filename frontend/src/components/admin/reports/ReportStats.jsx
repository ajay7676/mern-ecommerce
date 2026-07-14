import { useState } from "react";
import ReportStatCard from "./ReportStatCard";

const statsData = [
  {
    id: "requested",
    title: "Requested",
    value: 4,
  },
  {
    id: "scheduled",
    title: "Scheduled",
    value: 0,
  },
];

const ReportStats = () => {
  const [activeCard, setActiveCard] = useState("requested");

  return (
     <section aria-label="Report statistics">
        <div className="grid grid-cols-2 gap-4 sm:max-w-sm">
          {
            statsData.map((stat) => (
              <ReportStatCard
               key={stat.id}
               title={stat.title}
               value={stat.value}
               active={activeCard === stat.id}
               onClick={() => setActiveCard(stat.id) }
              />
            ))
          }

        </div>

     </section>
  )
}

export default ReportStats