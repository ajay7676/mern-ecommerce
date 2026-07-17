import { useState } from "react";
import InfoBanner from "../../../components/admin/listings/banner/InfoBanner";
import ListingsHeader from "../../../components/admin/listings/ListingsHeader";
import RecommendationTabs from "../../../components/admin/listings/recommendations/RecommendationTabs";
import StatusTabs from "../../../components/admin/listings/statustabs/StatusTabs";
import { recommendationTabs } from "../../../components/admin/listings/listingsData";
import FilterOption from "../../../components/admin/listings/filters/FilterOption";
import ActionButtons from "../../../components/admin/listings/filters/ActionButtons";
import ListingsTable from "../../../components/admin/listings/table/ListingsTable";
import listings from './data/listings'

const ListingPage = () => {
  const [activeRecommendation, setActiveRecommendation] = useState("all");
  const handleRecommendationChange = (id) => {
    setActiveRecommendation(id);
  };
  return (
    <div className="space-y-6">
      <ListingsHeader />
      <div className="w-full">
        <StatusTabs />
        <InfoBanner />
        <RecommendationTabs
          tabs={recommendationTabs}
          activeTab={activeRecommendation}
          onChange={handleRecommendationChange}
        />
        <div className="flex items-center justify-between">
            <div className="flex">
              <FilterOption />
            </div>
            <ActionButtons
                onSort={() => console.log("Sort")}
                onDownload={() => console.log("Download")}
                onUpload={() => console.log("Upload")}
                onAction={() => console.log("Action")}
            />
        </div>
        <ListingsTable data={listings}/>
      </div>
    </div>
  );
};

export default ListingPage;
