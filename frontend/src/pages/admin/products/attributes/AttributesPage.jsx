import { useState } from "react";
import AttributesHeader from "../../../../components/admin/products/attributes/AttributesHeader";
import AttributeFilters from "../../../../components/admin/products/attributes/AttributeFilters";
import AttributeStats from "../../../../components/admin/products/attributes/AttributeStats";
import AttributeTypePanel from "../../../../components/admin/products/attributes/AttributeTypePanel";
import QuickTips from "../../../../components/admin/products/attributes/QuickTips";
// import RecentActivity from "../../../../components/admin/products/attributes/RecentActivity";
import AttributeTableCard from "../../../../components/admin/products/attributes/AttributeTableCard";
import AttributeFormModal from "../../../../components/admin/products/attributes/modal/add/AttributeFormModal";
import { useAttributes } from "../../../../hooks/admin/queries/products/attributes/useAttributes";
import EditAttributeModal from "../../../../components/admin/products/attributes/modal/edit/EditAttributeModal";
import { useDeleteAttribute } from "../../../../hooks/admin/mutations/attributes/useDeleteAttribute";

import DeleteConfirmationModal from "../../../../components/admin/common/modal/DeleteConfirmationModal";
import { useAttributeStats } from "../../../../hooks/admin/queries/products/attributes/useAttributeStats";
const DEFAULT_PARAMS = {
  page: 1,
  limit: 10,
  search: "",
  type: "all",
  status: "all",
  sortBy: "createdAt",
  sortOrder: "desc",
};

const DEFAULT_FILTERS = {
  search: "",
  type: "all",
  status: "all",
};

const AttributesPage = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedAttributeId, setSelectedAttributeId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    attribute: null,
  });

  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    search: "",
    type: "all",
    status: "all",
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    status: "all",
  });
  const { data, isLoading, isFetching } = useAttributes(params);

  const deleteAttributeMutation = useDeleteAttribute();

  const {
    data: stats,
    isLoading: isStatsLoading,
    isError: isStatsError,
    refetch: refetchStats,
  } = useAttributeStats();

  const isDeleteBlocked = Number(deleteModal.attribute?.productCount || 0) > 0;

  const attributes = data?.items || [];
  const pagination = data?.pagination;

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApplyFilters = () => {
    setParams((prev) => ({
      ...prev,
      page: 1,
      search: filters.search.trim(),
      type: filters.type,
      status: filters.status,
    }));
  };

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setParams(DEFAULT_PARAMS);
  };

  const handleSort = (nextSortBy) => {
    setParams((prev) => ({
      ...prev,
      page: 1,
      sortBy: nextSortBy,
      sortOrder:
        prev.sortBy === nextSortBy && prev.sortOrder === "asc" ? "desc" : "asc",
    }));
  };

  const handlePageChange = (page) => {
    setParams((prev) => ({
      ...prev,
      page,
    }));
  };

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };
  const hideAddOpenModal = () => {
    setIsAddModalOpen(false);
  };

  const handleEdit = (attribute) => {
    setSelectedAttributeId(attribute.id);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedAttributeId(null);
  };

  const handleDelete = (attribute) => {
    setDeleteModal({
      isOpen: true,
      attribute,
    });
  };

  const handleCloseDeleteModal = () => {
    if (deleteAttributeMutation.isPending) {
      return;
    }

    setDeleteModal({
      isOpen: false,
      attribute: null,
    });
  };

  const handleConfirmDelete = async () => {
    const attributeId = deleteModal.attribute?.id;

    if (!attributeId) {
      return;
    }

    try {
      await deleteAttributeMutation.mutateAsync(attributeId);

      setDeleteModal({
        isOpen: false,
        attribute: null,
      });
    } catch (error) {
      // Toast already handled inside mutation hook
      console.error("Delete attribute failed:", error);
    }
  };

  return (
    <>
      <div className="min-h-full bg-[#fcfcff]">
        <div className="mx-auto max-w-[1600px] space-y-5 p-4 sm:p-5 lg:p-6">
          {/* Header */}
          <AttributesHeader onAddAttribute={handleOpenAddModal} />

          {/* Filters */}
          <AttributeFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onApplyFilters={handleApplyFilters}
            onResetFilters={handleResetFilters}
            isFetching={isFetching}
          />

          {/* Main Content */}
          <div
            className="
            grid items-start gap-5
            xl:grid-cols-[minmax(0,1fr)_320px]
          "
          >
            {/* LEFT */}
            <div className="min-w-0 space-y-5">
              <AttributeStats
                stats={stats}
                isLoading={isStatsLoading}
                isError={isStatsError}
                onRetry={refetchStats}
              />

              <div className="overflow-hidden rounded-lg">
                <AttributeTableCard
                  attributes={attributes}
                  isLoading={isLoading}
                  hasFilters={handleApplyFilters}
                  onAddAttribute={handleOpenAddModal}
                  onClearFilters={handleResetFilters}
                  sortBy={params.sortBy}
                  sortOrder={params.sortOrder}
                  onSort={handleSort}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  isFetching={isFetching}
                  pagination={pagination}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
            {/* RIGHT */}
            <aside className="space-y-5">
              <AttributeTypePanel />
              <QuickTips />
              {/* <RecentActivity /> */}
            </aside>
          </div>
        </div>
      </div>

      <AttributeFormModal isOpen={isAddModalOpen} onClose={hideAddOpenModal} />

      <EditAttributeModal
        isOpen={isEditModalOpen}
        attributeId={selectedAttributeId}
        onClose={handleCloseEditModal}
      />
      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        title="Delete Attribute"
        description="Are you sure you want to delete this attribute? This action cannot be undone."
        itemName={deleteModal.attribute?.name}
        warning="If this attribute is already used in products, deletion will be blocked by the server."
        disabledReason={
          isDeleteBlocked
            ? `This attribute is used by ${deleteModal.attribute?.productCount} products. Please deactivate it instead of deleting.`
            : ""
        }
        confirmText="Delete Attribute"
        isLoading={deleteAttributeMutation.isPending}
        onConfirm={handleConfirmDelete}
        onClose={handleCloseDeleteModal}
      />
    </>
  );
};

export default AttributesPage;
