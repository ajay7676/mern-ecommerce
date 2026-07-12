
import DashboardHeader from "../../../components/admin/dashboard/DashboardHeader";

import SearchSection from "../../../components/admin/dashboard/SearchSection";
import StatsGrid from "../../../components/admin/dashboard/StatsGrid";
import DashboardCardsGrid from "../../../components/admin/dashboard/DashboardCardsGrid";
import ServicesBanner from "../../../components/admin/dashboard/ServicesBanner";

const DashboardPage = () => {
  return (
     <div className="space-y-6">
      {/* Dashboard Header */}
      <DashboardHeader />

      {/* Search */}
      <SearchSection />

      {/* Statistics */}
      <StatsGrid />

      {/* Dashboard Widgets */}
      <DashboardCardsGrid />

      {/* Banner */}
      <ServicesBanner />
    </div>
  )
}

export default DashboardPage