import { FiDownload } from "react-icons/fi";
import { Link } from 'react-router-dom'

const DownloadButton = (
  {
  url,
  loading = false,
  disabled = false,
  fileName,
}
) => {
    const isDisabled = disabled || loading || !url;
  return (
    <Link
      to={isDisabled ? undefined : url}
      download={fileName}
      target="_blank"
      rel="noopener noreferrer"
      aria-disabled={isDisabled}
      className={`
        btn btn-sm btn-outline btn-primary
        ${isDisabled ? "btn-disabled pointer-events-none" : ""}
      `}
    >
      {loading ? (
        <>
          <span className="loading loading-spinner loading-xs" />
          Downloading...
        </>
      ) : (
        <>
          <FiDownload size={16} />
          Download
        </>
      )}
    </Link>
  )
}

export default DownloadButton