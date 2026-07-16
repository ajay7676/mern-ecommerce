import SearchHero from "../../../components/admin/dashboard/SearchHero"
import StatsCards from "../../../components/admin/dashboard/StatsCards"
import WidgtCardContainer from "../../../components/admin/dashboard/WidgtCardContainer"



const DashboardPage = () => {
  return (
    <div className="space-y-6">
       <SearchHero />
       <StatsCards />
       <WidgtCardContainer />
    </div>
  )
}

export default DashboardPage