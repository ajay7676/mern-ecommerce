const BrandStatusBadge = ({
  status,
}) => {
  const isActive =
    status === "active";

  return (
    <span
      className={`
        inline-flex
        rounded-md
        px-2.5
        py-1
        text-[11px]
        font-medium

        ${
          isActive
            ? "bg-emerald-100 text-emerald-700"
            : "bg-red-100 text-red-600"
        }
      `}
    >
      {isActive
        ? "Active"
        : "Inactive"}
    </span>
  );
};

export default BrandStatusBadge;