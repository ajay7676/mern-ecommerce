const AttributeTableSkeleton = ({ rows = 10 }) => {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white">
      {/* Desktop / tablet table */}
      <div className="hidden min-w-225 md:block">
        {/* Header */}
        <div className="grid grid-cols-[50px_1.3fr_1fr_2fr_1fr_1fr_1fr_100px] items-center border-b border-slate-100 bg-slate-50/50 px-4 py-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonBox
              key={index}
              className={
                index === 0
                  ? "h-4 w-4"
                  : index === 7
                  ? "h-4 w-16"
                  : "h-4 w-20"
              }
            />
          ))}
        </div>

        {/* Rows */}
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="grid grid-cols-[50px_1.3fr_1fr_2fr_1fr_1fr_1fr_100px] items-center border-b border-slate-100 px-4 py-5 last:border-b-0"
          >
            {/* Drag handle */}
            <SkeletonBox className="h-5 w-3" />

            {/* Attribute name */}
            <div className="space-y-2">
              <SkeletonBox className="h-4 w-24" />
              <SkeletonBox className="h-3 w-16" />
            </div>

            {/* Type */}
            <SkeletonBox className="h-6 w-20 rounded-full" />

            {/* Values */}
            <div className="flex gap-2">
              <SkeletonBox className="h-4 w-16" />
              <SkeletonBox className="h-4 w-16" />
              <SkeletonBox className="h-4 w-16" />
            </div>

            {/* Products */}
            <SkeletonBox className="h-4 w-10" />

            {/* Status */}
            <SkeletonBox className="h-6 w-16 rounded-full" />

            {/* Sort */}
            <SkeletonBox className="h-4 w-8" />

            {/* Actions */}
            <div className="flex items-center gap-4">
              <SkeletonBox className="h-5 w-5" />
              <SkeletonBox className="h-5 w-5" />
            </div>
          </div>
        ))}
      </div>

      {/* Mobile */}
      <div className="space-y-0 md:hidden">
        {Array.from({ length: Math.min(rows, 6) }).map((_, index) => (
          <div
            key={index}
            className="border-b border-slate-100 p-4 last:border-b-0"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 flex-1 items-start gap-3">
                <SkeletonBox className="mt-1 h-10 w-10 shrink-0 rounded-lg" />

                <div className="min-w-0 flex-1 space-y-2">
                  <SkeletonBox className="h-4 w-32" />
                  <SkeletonBox className="h-3 w-20" />
                </div>
              </div>

              <SkeletonBox className="h-5 w-5 shrink-0" />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <SkeletonBox className="h-3 w-14" />
                <SkeletonBox className="h-6 w-20 rounded-full" />
              </div>

              <div className="space-y-2">
                <SkeletonBox className="h-3 w-16" />
                <SkeletonBox className="h-4 w-12" />
              </div>

              <div className="space-y-2">
                <SkeletonBox className="h-3 w-16" />
                <SkeletonBox className="h-4 w-24" />
              </div>

              <div className="space-y-2">
                <SkeletonBox className="h-3 w-16" />
                <SkeletonBox className="h-6 w-16 rounded-full" />
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <SkeletonBox className="h-8 w-8 rounded-lg" />
              <SkeletonBox className="h-8 w-8 rounded-lg" />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination skeleton */}
      <div className="flex flex-col gap-4 border-t border-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <SkeletonBox className="h-4 w-40" />

        <div className="flex items-center gap-2">
          <SkeletonBox className="h-9 w-9 rounded-lg" />
          <SkeletonBox className="h-9 w-9 rounded-lg" />
          <SkeletonBox className="h-9 w-9 rounded-lg" />
          <SkeletonBox className="h-9 w-9 rounded-lg" />
          <SkeletonBox className="h-9 w-9 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

const SkeletonBox = ({ className = "" }) => {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-md bg-slate-200 ${className}`}
    />
  );
};

export default AttributeTableSkeleton;