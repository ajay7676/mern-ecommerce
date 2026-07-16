import { Wand2 } from "lucide-react";

import Card from "./Card";
import { adRecommendation  } from './dashboardData'

const AdRecommendationCard = () => {
  return (
     <Card
      title={adRecommendation.title}
      icon={Wand2}
      className="min-h-82.5"
    >
      <div className="p-5">

        <div className="flex items-start justify-between">

          <div>

            <h4 className="font-semibold text-[15px]">
              {adRecommendation.heading}
            </h4>

            <p className="mt-2 text-sm text-green-600">
              ↗ {adRecommendation.subtitle}
            </p>

          </div>

          <button className="text-xs font-semibold text-primary hover:underline">
            {adRecommendation.action}
          </button>

        </div>

        <img
          src={adRecommendation.graph}
          alt=""
          className="mt-6 w-full rounded-lg"
        />

      </div>
    </Card>
  )
}

export default AdRecommendationCard