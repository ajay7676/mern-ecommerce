const OrderImages = ({ products = [] }) => {
  const visibleProducts = products.slice(0, 2);
  const remainingCount = Math.max(products.length - 2, 0);

  return (
    <div className="flex h-23.5 w-23.5 shrink-0 items-center justify-center">
      <div className="flex items-center -space-x-2 sm:-space-x-1">
        {visibleProducts.map((product, index) => (
          <div
            key={product.id}
            className="relative h-19 w-14 overflow-hidden rounded-lg bg-slate-50"
            style={{ zIndex: visibleProducts.length - index }}
          >
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-contain"
            />
          </div>
        ))}

        {remainingCount > 0 && (
          <div
            className="
              relative flex h-10 w-10 items-center justify-center
              rounded-full border-2 border-white bg-slate-900
              text-xs font-semibold text-white
            "
          >
            +{remainingCount}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderImages;