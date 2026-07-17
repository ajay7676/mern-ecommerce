
import { useState } from "react";
import StatusTab from "./StatusTab";
import  { statusTabs } from '../listingsData';

const StatusTabs = () => {
  const [activeTab, setActiveTab] = useState("active");
  return (
    <section className="border-b border-[#E8ECF2] bg-white">
      <div
        className="
          flex
          overflow-x-auto
          scrollbar-hide
          whitespace-nowrap
        "
      >
        {statusTabs.map((tab) => (
          <StatusTab
            key={tab.id}
            {...tab}
            active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          />
        ))}
      </div>
    </section>
  )
}

export default StatusTabs