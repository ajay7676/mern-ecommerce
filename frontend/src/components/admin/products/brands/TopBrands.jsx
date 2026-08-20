const TopBrands = ({
  brands,
  onViewAll,
}) => {
  return (
    <section
      className="
        rounded-xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-[0_2px_12px_rgba(15,23,42,0.03)]
      "
    >
      <div className="flex items-center justify-between">
        <h2 className="text-[15px] font-bold text-slate-950">
          Top Brands
        </h2>

        <button
          type="button"
          onClick={onViewAll}
          className="
            rounded-md
            border
            border-slate-200
            bg-white
            px-3
            py-1.5
            text-[10px]
            font-semibold
            text-slate-700
            hover:bg-slate-50
          "
        >
          View All
        </button>
      </div>

      <div className="mt-5 space-y-4">
        {brands.map(
          (brand, index) => (
            <div
              key={brand.id}
              className="
                grid
                grid-cols-[24px_40px_minmax(0,1fr)_auto]
                items-center
                gap-3
              "
            >
              <span className="text-xs font-semibold text-slate-800">
                {index + 1}.
              </span>

              <img
                src={brand.logo}
                alt={brand.name}
                className="
                  h-7
                  w-10
                  object-contain
                "
              />

              <span className="truncate text-[12px] font-medium text-slate-800">
                {brand.name}
              </span>

              <span className="whitespace-nowrap text-[11px] text-slate-600">
                {brand.productCount} Products
              </span>
            </div>
          ),
        )}
      </div>
    </section>
  );
};

export default TopBrands;