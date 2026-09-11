import { useState } from "react";
import AttributesHeader from "../../../../components/admin/products/attributes/AttributesHeader";
import AttributeFilters from "../../../../components/admin/products/attributes/AttributeFilters";
import AttributeStats from "../../../../components/admin/products/attributes/AttributeStats";
import AttributeTypePanel from "../../../../components/admin/products/attributes/AttributeTypePanel";
import QuickTips from "../../../../components/admin/products/attributes/QuickTips";
import RecentActivity from "../../../../components/admin/products/attributes/RecentActivity";
import AttributeTableCard from "../../../../components/admin/products/attributes/AttributeTableCard";
import AttributeFormModal from "../../../../components/admin/products/attributes/modal/add/AttributeFormModal";
import { useAttributes } from "../../../../hooks/admin/queries/products/attributes/useAttributes";

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
  const { data, isLoading, isFetching, isError, error, refetch } =
    useAttributes(params);

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
    console.log("Edit attribute:", attribute);
  };

  const handleDelete = (attribute) => {
    console.log("Delete attribute:", attribute);
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
              <AttributeStats />

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
              <RecentActivity />
            </aside>
          </div>
        </div>
      </div>

      <AttributeFormModal
       isOpen={isAddModalOpen}
      onClose={hideAddOpenModal} />
    </>
  );
};

export default AttributesPage;
