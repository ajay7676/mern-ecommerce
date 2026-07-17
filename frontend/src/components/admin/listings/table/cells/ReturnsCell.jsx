
import clsx from "clsx";

const statusStyles = {
  NA: "bg-slate-100 text-slate-700",
  Low: "bg-green-100 text-green-700",
  Medium: "bg-amber-100 text-amber-700",
  High: "bg-red-100 text-red-700",
};

const ReturnsCell = ({ value = "NA" }) => {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        statusStyles[value] || statusStyles.NA
      )}
    >
      {value}
    </span>
  );
};

export default ReturnsCell;