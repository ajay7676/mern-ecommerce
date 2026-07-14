
const columns = [
  "Report Type",
  "Date Range",
  "Request Type",
  "Requested On",
  "Generated On",
  "Status",
  "Download",
];

const ReportsTableHeader = () => {
  return (
     <thead>
      <tr>
        {columns.map((column) => (
          <th
            key={column}
            className="bg-base-200 text-xs font-semibold uppercase tracking-wide text-base-content"
          >
            {column}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default ReportsTableHeader