
import { BarChart3 } from "lucide-react";

import Card from "./Card";
import { settlementHub } from './dashboardData'

const SettlementHubCard = () => {
  return (
     <Card
      title={settlementHub.title}
      icon={BarChart3}
      className="min-h-82.5"
    >
      <div className="p-5">

        <div className="inline-flex items-center gap-2 rounded-full bg-[#F3E8FF] px-3 py-1">
          <span className="text-[11px] font-medium">
            {settlementHub.badge}
          </span>

          <span className="font-semibold text-[#7C3AED]">
            {settlementHub.value}
          </span>
        </div>

        <div className="mt-4 flex gap-4">

          <div className="flex-1">

            <h4 className="font-semibold text-[15px] leading-6">
              {settlementHub.heading}
            </h4>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              {settlementHub.description}
            </p>

          </div>

          <img
            src={settlementHub.image}
            alt=""
            className="h-28 w-24 rounded-xl object-cover"
          />

        </div>

      </div>
    </Card>
  )
}

export default SettlementHubCard