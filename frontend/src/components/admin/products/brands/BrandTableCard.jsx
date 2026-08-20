import BrandPagination from "./BrandPagination";
import BrandTable from "./BrandTable";

const BrandTableCard = ({
  brands,
  page,
  limit,
  total,
  totalPages,
  onPageChange,
  onLimitChange,
  onEdit,
  onDelete,
  onToggleFeatured,
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
        shadow-[0_2px_12px_rgba(15,23,42,0.03)]
      "
    >
      <BrandTable
        brands={brands}
        onEdit={onEdit}
        onDelete={onDelete}
        onToggleFeatured={
          onToggleFeatured
        }
      />

      <BrandPagination
        page={page}
        limit={limit}
        total={total}
        totalPages={totalPages}
        onPageChange={
          onPageChange
        }
        onLimitChange={
          onLimitChange
        }
      />
    </section>
  );
};

export default BrandTableCard;