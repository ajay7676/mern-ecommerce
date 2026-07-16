
import {
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import Card from "./Card";
import { customerInsight   } from './dashboardData';

const CustomerCard = () => {
  return (
      <Card
      title={customerInsight.title}
      icon={MessageSquare}
      className="min-h-82.5"
    >
      <div className="flex h-full flex-col justify-between p-5">

        <div className="space-y-5">

          <div className="flex items-center gap-3">

            <AlertCircle
              size={18}
              className="text-red-500"
            />

            <div>

              <p className="font-semibold">
                {customerInsight.listings} Listings
              </p>

              <p className="text-sm text-slate-500">
                {customerInsight.additionalInfo}
              </p>

            </div>

          </div>

          <div>

            <p className="font-medium">
              {customerInsight.product}
            </p>

          </div>

        </div>

       

      </div>
    </Card>
  )
}

export default CustomerCard