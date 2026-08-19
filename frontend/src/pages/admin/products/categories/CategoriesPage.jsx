import { useMemo, useState, useEffect } from "react";
import { categoryTree } from "../../../../data/admin/products/categories.data";
import CategoriesHeader from "../../../../components/admin/products/categories/CategoriesHeader";
import CategoryFilters from "../../../../components/admin/products/categories/CategoryFilters";
import CategoryStats from "../../../../components/admin/products/categories/CategoryStats";
import CategoryTableCard from "../../../../components/admin/products/categories/CategoryTableCard";
import CategoryTree from "../../../../components/admin/products/categories/CategoryTree";
import QuickTipsCard from "../../../../components/admin/products/categories/QuickTipsCard";
import BulkActionsCard from "../../../../components/admin/products/categories/BulkActionsCard";
import AddCategoryModal from "../../../../components/admin/products/categories/modals/add-new/AddCategoryModal";
import EditCategoryModal from "../../../../components/admin/products/categories/modals/edit/EditCategoryModal";
import useCategories from "../../../../hooks/admin/queries/products/categories/useCategories";

import useDebounce from "../../../../hooks/useDebounce";
import useCategoryStats from "../../../../hooks/admin/queries/products/categories/useCategoryStats";
import useCategoriesTree from "../../../../hooks/admin/queries/products/categories/useCategoriesTree";
const CategoriesPage = () => {
  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [parentCategory, setParentCategory] = useState("");

  const [page, setPage] = useState(1);

  const [limit, setLimit] = useState(10);

  const [bulkAction, setBulkAction] = useState("");

  const [addCategoryOpen, setAddCategoryOpen] = useState(false);

  const [editingCategory, setEditingCategory] = useState(null);

  const debouncedSearch = useDebounce(search, 400);

  const { data, isLoading, isFetching, isError, error } = useCategories({
    page,
    limit,

    search: debouncedSearch,

    status,

    parentCategory,

    sortBy: "sortOrder",

    sortOrder: "asc",
  });

  const {
    data: statsData,
    isLoading: isStatsLoading,
    isError: isStatsError,
  } = useCategoryStats();
  const {
    data: treeData,
    isLoading: isTreeLoading,
    isError: isTreeError,
  } = useCategoriesTree();

  const categories = data?.data?.categories ?? [];

  const pagination = data?.data?.pagination ?? {};

  const stats = statsData?.data?.stats;

  const categoryTree = treeData?.data?.tree ?? [];

  const handleReset = () => {
    setSearch("");
    setStatus("");
    setParentCategory("");
    setPage(1);
  };

  const handleEdit = (category) => {
    console.log("Edit category", category);
    setEditingCategory(category);
  };

  const handleDelete = (category) => {
    console.log("Delete category", category);
  };

  const handleToggle = (category) => {
    console.log("Toggle category", category);
  };

  const parentCategories = categories
    .filter((category) => category.level === 0)
    .map((category) => ({
      id: category._id,
      name: category.name,
    }));

  const hasActiveFilters = Boolean(search.trim() || status || parentCategory);

  return (
    <>
      <main
        className="
        min-h-screen
        bg-[#fafbfe]
        px-4
        py-5
        sm:px-5
        lg:px-6
      "
      >
        <div className="mx-auto max-w-375">
          <CategoriesHeader
            onExport={() => console.log("Export categories")}
            onAddCategory={() => setAddCategoryOpen(true)}
          />

          <CategoryFilters
            search={search}
            onSearchChange={setSearch}
            status={status}
            onStatusChange={setStatus}
            parent={parent}
            onParentChange={setParentCategory}
            onFilter={() => setPage(1)}
            onReset={handleReset}
          />

          <div
            className="
            mt-4
            grid
            grid-cols-1
            gap-4
            xl:grid-cols-[minmax(0,1fr)_345px]
          "
          >
            {/* LEFT SIDE */}

            <div className="min-w-0 space-y-4">
              <CategoryStats
                stats={stats}
                isLoading={isStatsLoading}
                isError={isStatsError}
              />

              <CategoryTableCard
                categories={categories}
                isLoading={isLoading}
                isFetching={isFetching}
                isError={isError}
                error={error}
                page={pagination.currentPage ?? page}
                limit={pagination.limit ?? limit}
                total={pagination.totalCategories ?? 0}
                totalPages={pagination.totalPages ?? 1}
                hasFilters={hasActiveFilters}
                onPageChange={setPage}
                onLimitChange={(newLimit) => {
                  setLimit(newLimit);
                  setPage(1);
                }}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>

            {/* RIGHT SIDE */}

            <aside
              className="
              grid
              gap-4
              md:grid-cols-2
              xl:grid-cols-1
            "
            >
              <CategoryTree items={categoryTree} />

              <QuickTipsCard />

              <BulkActionsCard
                action={bulkAction}
                onActionChange={setBulkAction}
                onApply={() => console.log("Apply bulk action", bulkAction)}
              />
            </aside>
          </div>
        </div>
      </main>
      <EditCategoryModal
        open={Boolean(editingCategory)}
        category={editingCategory}
        parentCategories={parentCategories}
        isSubmitting={false}
        onClose={() => setEditingCategory(null)}
        mode="edit"
        onSubmit={async ({
          categoryId,
          payload,
          image,
          removeExistingImage,
        }) => {
          console.log("Category ID:", categoryId);

          console.log("Update payload:", payload);

          console.log("New image:", image);

          console.log("Remove old image:", removeExistingImage);

          await new Promise((resolve) => setTimeout(resolve, 800));
        }}
      />
      <AddCategoryModal
        open={addCategoryOpen}
        onClose={() => setAddCategoryOpen(false)}
        parentCategories={parentCategories}
        isSubmitting={false}
        onSubmit={async (payload) => {
          console.log("Create category payload:", payload);

          await new Promise((resolve) => setTimeout(resolve, 800));
        }}
      />
    </>
  );
};

export default CategoriesPage;
