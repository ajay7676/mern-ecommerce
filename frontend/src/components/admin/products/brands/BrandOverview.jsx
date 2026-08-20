const BrandOverview = ({
  overview,
}) => {
  const {
    totalBrands,
    active,
    inactive,
    withoutProducts,
  } = overview;

  const getPercent = (
    value,
  ) => {
    if (!totalBrands) {
      return 0;
    }

    return (
      (value /
        totalBrands) *
      100
    ).toFixed(1);
  };

  const activePercent =
    getPercent(active);

  const inactivePercent =
    getPercent(inactive);

  const withoutPercent =
    getPercent(
      withoutProducts,
    );

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
      <h2 className="text-[15px] font-bold text-slate-950">
        Brand Overview
      </h2>

      <div
        className="
          mt-6
          flex
          flex-col
          items-center
          gap-6
          sm:flex-row
          xl:flex-row
        "
      >
        <div
          className="
            relative
            h-35
            w-35
            shrink-0
            rounded-full
          "
          style={{
            background: `
              conic-gradient(
                #22c55e 0 ${activePercent}%,
                #f59e0b ${activePercent}% ${Number(activePercent) + Number(inactivePercent)}%,
                #7c3aed ${Number(activePercent) + Number(inactivePercent)}% 100%
              )
            `,
          }}
        >
          <div
            className="
              absolute
              inset-5.5
              grid
              place-items-center
              rounded-full
              bg-white
              text-center
            "
          >
            <div>
              <p className="text-2xl font-bold text-slate-950">
                {totalBrands}
              </p>

              <p className="text-[10px] text-slate-600">
                Total
                <br />
                Brands
              </p>
            </div>
          </div>
        </div>

        <div className="w-full space-y-4">
          <OverviewItem
            label="Active"
            value={`${active} (${activePercent}%)`}
            dotClass="bg-emerald-500"
          />

          <OverviewItem
            label="Inactive"
            value={`${inactive} (${inactivePercent}%)`}
            dotClass="bg-amber-500"
          />

          <OverviewItem
            label="No Products"
            value={`${withoutProducts} (${withoutPercent}%)`}
            dotClass="bg-violet-600"
          />
        </div>
      </div>
    </section>
  );
};

const OverviewItem = ({
  label,
  value,
  dotClass,
}) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <span
          className={`h-3 w-3 rounded-full ${dotClass}`}
        />

        <span className="text-[11px] text-slate-700">
          {label}
        </span>
      </div>

      <span className="text-[11px] text-slate-500">
        {value}
      </span>
    </div>
  );
};

export default BrandOverview;