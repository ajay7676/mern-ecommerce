const ProductCardSkeleton = () => {
  return (
    <div className="bg-base-100 border border-base-200 rounded-xl overflow-hidden shadow-sm">
      {/* Image */}
    <div className="skeletonw-full h-44 bg-slate-100 overflow-hidden" />
      <div className="p-4 space-y-3">
          {/* Product Name */}
        <div className="skeleton h-4 w-full" />
        {/* Brand */}
        <div className="skeleton h-4 w-24" />
        {/* Price */}
        <div className=" flex items-center gap-2 mt-2">
            <div className="skeleton  h-4 w-12" />
            <div className="skeleton  h-4 w-12" />
            <div className=" skeleton  h-4 w-12" />
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-2">
          <div className="skeleton h-4 w-12" />
          <div className="skeleton h-4 w-16" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;