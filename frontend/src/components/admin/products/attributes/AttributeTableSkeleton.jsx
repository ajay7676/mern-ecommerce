const AttributeTableSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="space-y-4 p-5">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-7 gap-4"
          >
            {Array.from({ length: 7 }).map((__, cellIndex) => (
              <div
                key={cellIndex}
                className="h-5 animate-pulse rounded bg-slate-200"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttributeTableSkeleton;