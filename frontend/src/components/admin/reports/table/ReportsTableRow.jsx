import ReportStatusBadge from "./ReportStatusBadge";
import DownloadButton from "./DownloadButton";

const ReportsTableRow = ({report}) => {
  return (
     <tr className="hover">
      <td>
        <div>
          <p className="font-medium">
            {report.reportType}
          </p>

          <p className="text-xs text-base-content/60 capitalize">
            {report.category}
          </p>
        </div>
      </td>

      <td>{report.dateRange}</td>

      <td>{report.requestType}</td>

      <td>{report.requestedOn}</td>

      <td>{report.generatedOn}</td>

      <td>
        <ReportStatusBadge
          status={report.status}
        />
      </td>

      <td>
        <DownloadButton
          url={report.downloadUrl}
        />
      </td>
    </tr>
  )
}

export default ReportsTableRow