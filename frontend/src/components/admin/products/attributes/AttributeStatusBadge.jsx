const AttributeStatusBadge = ({ status }) => {
  const isActive = status === "active";

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        rounded-md px-2.5 py-1
        text-xs font-medium
        ${
          isActive
            ? "bg-emerald-100 text-emerald-700"
            : "bg-red-100 text-red-600"
        }
      `}
    >
      <span
        className={`
          h-1.5 w-1.5 rounded-full
          ${isActive ? "bg-emerald-500" : "bg-red-500"}
        `}
      />

      {isActive ? "Active" : "Inactive"}
    </span>
  );
};

export default AttributeStatusBadge;