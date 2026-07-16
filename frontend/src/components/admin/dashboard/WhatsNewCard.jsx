import {
  Rocket,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import Card from "./Card";
import {whatsNew} from './dashboardData'

const WhatsNewCard = () => {
  return (
     <Card
      title={whatsNew.title}
      icon={Rocket}
      className="min-h-82.5"
      rightContent={
        <div className="flex items-center gap-2">
          <button className="btn btn-circle btn-xs btn-ghost">
            <ChevronLeft size={15} />
          </button>

          <span className="text-xs font-medium text-slate-500">
            1 / 2
          </span>

          <button className="btn btn-circle btn-xs btn-ghost">
            <ChevronRight size={15} />
          </button>
        </div>
      }
    >
      <div className="space-y-4 p-5">
       <div className="flex items-center justify-between flex-wrap">
          <p className="text-sm leading-6 text-slate-600">
          {whatsNew.description}
        </p>
        <button className="btn btn-outline btn-primary btn-sm rounded-lg normal-case">
          {whatsNew.buttonText}
        </button>
       </div>
        <div className="overflow-hidden rounded-xl">
          <img
            src={whatsNew.image}
            alt=""
            className="h-44 w-full object-cover"
          />
        </div>
      </div>
    </Card>
  )
}

export default WhatsNewCard