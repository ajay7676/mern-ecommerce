import AttributeEmptyState from "./AttributeEmptyState";
import AttributePagination from "./AttributePagination";
import AttributeTable from "./AttributeTable";
import AttributeTableSkeleton from "./AttributeTableSkeleton";

const AttributeTableCard = ({
  attributes,
  isLoading,
  hasFilters,
  onAddAttribute,
  onClearFilters,
}) => {
  return (
    <>
      {isLoading ? (
        <AttributeTableSkeleton rows={6} />
      ) : attributes.length === 0 ? (
        <AttributeEmptyState
          hasFilters={hasFilters}
          onAddAttribute={onAddAttribute}
          onClearFilter={onClearFilters}
        />
      ) : (
        <>
          <AttributeTable attributes={attributes} />

          <div className="rounded-b-lg border-x border-b border-slate-100 bg-white">
            <AttributePagination />
          </div>
        </>
      )}
    </>
  );
};

export default AttributeTableCard;
