import AttributeEmptyState from "./AttributeEmptyState";
import AttributePagination from "./AttributePagination";
import AttributeTable from "./AttributeTable";
import AttributeTableSkeleton from "./AttributeTableSkeleton";
import {useUpdateAttributeStatus} from "../../../../hooks/admin/mutations/attributes/useUpdateAttributeStatus";

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
  onPageChange,
}) => {
  const updateStatusMutation = useUpdateAttributeStatus();

  const handleStatusChange = (attribute) => {
    const nextStatus = attribute.status === "active" ? "inactive" : "active";

    updateStatusMutation.mutate({
      attributeId: attribute.id,
      status: nextStatus,
    });
  };

  return (
    <>
      {isLoading ? (
        <AttributeTableSkeleton rows={6} />
      ) : attributes.length === 0 ? (
        <AttributeEmptyState onAddAttribute={onAddAttribute} />
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
            onStatusChange={handleStatusChange}
            statusChangingId={updateStatusMutation.variables?.attributeId}
            isStatusChanging={updateStatusMutation.isPending}
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
