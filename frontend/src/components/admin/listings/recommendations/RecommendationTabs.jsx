import { useRef } from "react";
import RecommendationTab from "./RecommendationTab";


const RecommendationTabs = (
  {
  tabs = [],
  activeTab,
  onChange,
  className = "mt-5",
}
) => {
  
   const containerRef = useRef(null);

  const handleKeyDown = (event, index) => {
    if (!["ArrowRight", "ArrowLeft"].includes(event.key)) return;

    event.preventDefault();

    const nextIndex =
      event.key === "ArrowRight"
        ? (index + 1) % tabs.length
        : (index - 1 + tabs.length) % tabs.length;

    onChange(tabs[nextIndex].id);

    const nextButton =
      containerRef.current?.querySelectorAll("[role='tab']")[nextIndex];

    nextButton?.focus();
  };

  return (
     <section className={className}>
      <div
        ref={containerRef}
        role="tablist"
        aria-label="Recommendation Filters"
        className="
          flex
          gap-3
          overflow-x-auto
          whitespace-nowrap
          pb-2
          scrollbar-thin
        "
      >
        {tabs.map((tab, index) => (
          <div
            key={tab.id}
            onKeyDown={(e) => handleKeyDown(e, index)}
          >
            <RecommendationTab
              {...tab}
              active={activeTab === tab.id}
              onClick={onChange}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecommendationTabs;
