const styles = {
  active:
    "bg-emerald-100 text-emerald-700",

  inactive:
    "bg-rose-100 text-rose-600",
};

const CategoryStatusBadge = ({
  status,
}) => {
  const normalizedStatus =
    status?.toLowerCase();

  const label =
    normalizedStatus === "active"
      ? "Active"
      : "Inactive";

  return (
    <span
      className={`
        inline-flex
        rounded-md
        px-2.5
        py-1
        text-[11px]
        font-medium
        ${styles[normalizedStatus]}
      `}
    >
      {label}
    </span>
  );
};

export default CategoryStatusBadge;