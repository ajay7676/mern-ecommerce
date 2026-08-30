const BrandStatsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-4 rounded-xl border border-base-200 bg-base-100 p-5 shadow-sm"
        >
          {/* Icon skeleton */}
          <div className="skeleton h-12 w-12 shrink-0 rounded-xl" />

          {/* Content skeleton */}
          <div className="flex-1 space-y-2">
            <div className="skeleton h-7 w-16 rounded-md" />
            <div className="skeleton h-4 w-28 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BrandStatsSkeleton;