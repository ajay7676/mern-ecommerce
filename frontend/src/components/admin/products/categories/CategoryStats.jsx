import CategoryStatCard from "./CategoryStatCard";

const CategoryStats = ({
  stats,
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
      {stats.map((item) => (
        <CategoryStatCard
          key={item.id}
          {...item}
        />
      ))}
    </section>
  );
};

export default CategoryStats;