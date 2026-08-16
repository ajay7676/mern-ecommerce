import CategoryPagination from "./CategoryPagination";
import CategoryTable from "./CategoryTable";

const CategoryTableCard = ({
  categories,
  page,
  limit,
  total,
  totalPages,
  onEdit,
  onDelete,
  onToggle,
  onPageChange,
  onLimitChange,
}) => {
  return (
    <section
      className="
        min-w-0
        overflow-hidden
        rounded-xl
        border
        border-slate-200
        bg-white
        shadow-[0_1px_4px_rgba(15,23,42,0.03)]
      "
    >
      <CategoryTable
        categories={categories}
        onEdit={onEdit}
        onDelete={onDelete}
        onToggle={onToggle}
      />

      <CategoryPagination
        page={page}
        limit={limit}
        total={total}
        totalPages={totalPages}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
      />
    </section>
  );
};

export default CategoryTableCard;