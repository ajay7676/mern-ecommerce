import {
  FiCheckCircle,
  FiDatabase,
  FiLayers,
  FiSlash,
} from "react-icons/fi";

import AttributeStatCard from "./AttributeStatCard";

const AttributeStats = () => {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <AttributeStatCard
        icon={<FiLayers size={21} />}
        value="24"
        title="Total Attributes"
        subtitle="Across 5 types"
        iconClassName="bg-violet-100 text-violet-600"
      />

      <AttributeStatCard
        icon={<FiCheckCircle size={21} />}
        value="22"
        title="Active Attributes"
        subtitle="91.7% of total"
        iconClassName="bg-emerald-100 text-emerald-600"
      />

      <AttributeStatCard
        icon={<FiSlash size={21} />}
        value="2"
        title="Inactive Attributes"
        subtitle="8.3% of total"
        iconClassName="bg-orange-100 text-orange-500"
      />

      <AttributeStatCard
        icon={<FiDatabase size={21} />}
        value="156"
        title="Products Using"
        subtitle="These attributes"
        iconClassName="bg-blue-100 text-blue-600"
      />
    </div>
  );
};

export default AttributeStats;