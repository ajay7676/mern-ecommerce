import { useState } from 'react'
import ReportsHeader from '../../../components/admin/reports/ReportsHeader'
import ReportStats  from '../../../components/admin/reports/ReportStats'
import ReportTabs from '../../../components/admin/reports/ReportTabs'
import ReportsTable  from '../../../components/admin/reports/table/ReportsTable'

const ReportsPage = () => {
 const [activeTab, setActiveTab] = useState("all");

  return (
     <section className="min-h-screen bg-base-200">
      <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <ReportsHeader />

        {/* Statistics */}
        <ReportStats />

        {/* Filter Tabs */}
        <ReportTabs
          activeTab={activeTab}
          onChange={setActiveTab} 
        />

        {/* Reports Table */}
        <ReportsTable />
      </div>
    </section>
  )
}

export default ReportsPage