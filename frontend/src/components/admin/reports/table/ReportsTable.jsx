
import ReportsTableHeader from "./ReportsTableHeader";
import ReportsTableRow from "./ReportsTableRow";
import EmptyReports from "./EmptyReports";
import {reports} from '../data/reports'

const ReportsTable = ({
  loading = false,
}) => {
   if (!loading && reports.length === 0) {
    return <EmptyReports />;
  }
  return (
      <div className="overflow-hidden rounded-xl border border-base-300 bg-base-100">
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <ReportsTableHeader />

          <tbody>
            {reports.map((report) => (
              <ReportsTableRow
                key={report.id}
                report={report}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ReportsTable