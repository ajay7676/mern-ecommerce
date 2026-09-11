import AttributeEmptyState from "./AttributeEmptyState";
import AttributePagination from "./AttributePagination";
import AttributeTable from "./AttributeTable";
import AttributeTableSkeleton from "./AttributeTableSkeleton";

const AttributeTableCard = ({
  attributes,
  sortBy,
  sortOrder,
  onSort,
  onEdit,
  onDelete,
  isFetching,
  isLoading,
  onAddAttribute,
  pagination,
  onPageChange
}) => {
  return (
    <>
      {isLoading ? (
        <AttributeTableSkeleton rows={6} />
      ) : attributes.length === 0 ? (
        <AttributeEmptyState
          onAddAttribute={onAddAttribute}
        />
      ) : (
        <>
          <AttributeTable
            attributes={attributes}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={onSort}
            onEdit={onEdit}
            onDelete={onDelete}
            isFetching={isFetching}
          />

          <div className="rounded-b-lg border-x border-b border-slate-100 bg-white">
            
            <AttributePagination
              pagination={pagination}
              onPageChange={onPageChange}
              isFetching={isFetching}
            />
          </div>
        </>
      )}
    </>
  );
};

export default AttributeTableCard;
