import CategoryStatCard from "./CategoryStatCard";

const CategoryStats = ({ stats, isLoading = false, isError = false }) => {
  const items = [
    {
      id: "total",
      label: "Total Categories",
      value: stats?.totalCategories ?? 0,
      type: "total",
    },

    {
      id: "active",
      label: "Active Categories",
      value: stats?.activeCategories ?? 0,
      type: "active",
    },

    {
      id: "inactive",
      label: "Inactive Categories",
      value: stats?.inactiveCategories ?? 0,
      type: "inactive",
    },

    {
      id: "products",
      label: "Products in Categories",
      value: stats?.productsInCategories ?? 0,
      type: "products",
    },
  ];

  if (isLoading) {
    return (
      <section
        className="
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >
        {Array.from({
          length: 4,
        }).map((_, index) => (
          <div
            key={index}
            className="
              flex
              min-h-[82px]
              items-center
              gap-4
              rounded-xl
              border
              border-slate-200
              bg-white
              px-5
            "
          >
            <div
              className="
                h-11
                w-11
                animate-pulse
                rounded-full
                bg-slate-200
              "
            />

            <div className="space-y-2">
              <div
                className="
                  h-5
                  w-12
                  animate-pulse
                  rounded
                  bg-slate-200
                "
              />

              <div
                className="
                  h-3
                  w-24
                  animate-pulse
                  rounded
                  bg-slate-200
                "
              />
            </div>
          </div>
        ))}
      </section>
    );
  }
  if (isError) {
    return (
      <div
        className="
          rounded-xl
          border
          border-red-100
          bg-red-50
          px-5
          py-4
          text-sm
          text-red-600
        "
      >
        Failed to load category statistics.
      </div>
    );
  }

  return (
    <section
      className="
        grid
        grid-cols-1
        gap-4
        sm:grid-cols-2
        xl:grid-cols-4
      "
    >
      {items.map((item) => (
        <CategoryStatCard key={item.id} {...item} />
      ))}
    </section>
  );
};

export default CategoryStats;
