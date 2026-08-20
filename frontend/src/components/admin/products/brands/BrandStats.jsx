import BrandStatCard from "./BrandStatCard";

const BrandStats = ({
  stats = [],
}) => {
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
      {stats.map((stat) => (
        <BrandStatCard
          key={stat.id}
          {...stat}
        />
      ))}
    </section>
  );
};

export default BrandStats;