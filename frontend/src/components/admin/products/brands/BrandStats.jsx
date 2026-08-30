import BrandStatCard from "./BrandStatCard";
import BrandStatsSkeleton from './BrandStatsSkeleton';
import BrandStatsError from './BrandStatsError'

const BrandStats = ({
  stats = [],
  isStatsLoading,
  isStatsError,
  refetch
}) => {
   console.log(stats)

   const statsItems = [
    {
      id: "total",
      label: "Total Brands",
      value: stats?.totalBrands ?? 0,
      type: "total",
    },

    {
      id: "active",
      label: "Active Brands",
      value: stats?.activeBrands ?? 0,
      type: "active",
    },

    {
      id: "inactive",
      label: "Inactive Brands",
      value: stats?.inactiveBrands ?? 0,
      type: "inactive",
    },

    {
      id: "products",
      label: "Products in Brands",
      value: stats?.productsUsingBrands ?? 0,
      type: "products",
    },
  ]; 
  if (isStatsLoading) {
    return (
     <BrandStatsSkeleton />
    );
  }
  if (isStatsError) {
    return (
      <BrandStatsError onRetry={refetch}/>
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
      {statsItems.map((stat) => (
        <BrandStatCard
          key={stat.id}
          {...stat}
        />
      ))}
    </section>
  );
};

export default BrandStats;