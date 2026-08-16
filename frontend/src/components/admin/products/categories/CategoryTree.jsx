import CategoryTreeItem from "./CategoryTreeItem";

const CategoryTree = ({
  items,
}) => {
  return (
    <section
      className="
        rounded-xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-[0_1px_4px_rgba(15,23,42,0.03)]
      "
    >
      <h2 className="mb-3 text-[15px] font-bold text-slate-950">
        Category Tree
      </h2>

      <div>
        {items.map((item) => (
          <CategoryTreeItem
            key={item.id}
            item={item}
          />
        ))}
      </div>
    </section>
  );
};

export default CategoryTree;