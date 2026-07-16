import { AlertTriangle } from "lucide-react";

import { criticalAction } from './dashboardData'
import Card from "./Card";


const CriticalActionsCard = () => {
  return (
    <Card
      title={criticalAction.title}
      icon={AlertTriangle}
      className="min-h-82.5"
    >
      <div className="p-5">
        <div className="rounded-xl border border-[#F8D7DA] bg-[#FFF4F5] p-4">
          <div className="flex items-start justify-between gap-4">
            <p className="text-[13px] leading-6 text-slate-700">
              {criticalAction.alert.message}
            </p>

            <button className="whitespace-nowrap text-xs font-semibold text-[#2563EB] hover:underline">
              {criticalAction.alert.action}
            </button>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default CriticalActionsCard