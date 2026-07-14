import ReportTab from "./ReportTab";

const DEFAULT_TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Fulfilment",
    value: "fulfilment",
  },
  {
    label: "Invoices",
    value: "invoices",
  },
  {
    label: "Listings",
    value: "listings",
  },
  {
    label: "Payment",
    value: "payment",
  },
  {
    label: "Tax",
    value: "tax",
  },
];

const ReportTabs = (
  {  
    tabs = DEFAULT_TABS,
    activeTab,
    onChange 
  }) => {
 
  return (
    <section aria-label="Report categories">
      <div
        role="tablist"
        className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
      >
        {tabs.map((tab) => (
          <ReportTab
            key={tab.value}
            {...tab}
            active={activeTab === tab.value}
            onClick={onChange}
          />
        ))}       
      </div>
    </section>
  );
};

export default ReportTabs;
