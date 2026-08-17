import { useMemo, useState } from "react";
import {
  categories,
  categoryStats,
  categoryTree,
} from "../../../../data/admin/products/categories.data";
import CategoriesHeader from "../../../../components/admin/products/categories/CategoriesHeader";
import CategoryFilters from "../../../../components/admin/products/categories/CategoryFilters";
import CategoryStats from "../../../../components/admin/products/categories/CategoryStats";
import CategoryTableCard from "../../../../components/admin/products/categories/CategoryTableCard";
import CategoryTree from "../../../../components/admin/products/categories/CategoryTree";
import QuickTipsCard from "../../../../components/admin/products/categories/QuickTipsCard";
import BulkActionsCard from "../../../../components/admin/products/categories/BulkActionsCard";
import AddCategoryModal from "../../../../components/admin/products/categories/modals/add-new/AddCategoryModal";
import EditCategoryModal from "../../../../components/admin/products/categories/modals/edit/EditCategoryModal";
const CategoriesPage = () => {
  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [parent, setParent] = useState("");

  const [page, setPage] = useState(1);

  const [limit, setLimit] = useState(10);

  const [bulkAction, setBulkAction] = useState("");

  const [addCategoryOpen, setAddCategoryOpen] = useState(false);

  const [editingCategory, setEditingCategory] = useState(null);

  console.log(editingCategory);

  const filteredCategories = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return categories.filter((category) => {
      const matchesSearch =
        !normalizedSearch ||
        category.name.toLowerCase().includes(normalizedSearch);

      const matchesStatus = !status || category.status === status;

      const matchesParent =
        !parent || category.parentCategory?.toLowerCase() === parent;

      return matchesSearch && matchesStatus && matchesParent;
    });
  }, [search, status, parent]);

  const paginatedCategories = useMemo(() => {
    const start = (page - 1) * limit;

    return filteredCategories.slice(start, start + limit);
  }, [filteredCategories, page, limit]);

  const totalPages = Math.max(Math.ceil(filteredCategories.length / limit), 1);

  const handleReset = () => {
    setSearch("");
    setStatus("");
    setParent("");
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
      id: category.id,
      name: category.name,
    }));
  console.log("editingCategory", editingCategory);
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
            onParentChange={setParent}
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
              <CategoryStats stats={categoryStats} />

              <CategoryTableCard
                categories={paginatedCategories}
                page={page}
                limit={limit}
                total={filteredCategories.length}
                totalPages={totalPages}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggle={handleToggle}
                onPageChange={setPage}
                onLimitChange={(value) => {
                  setLimit(value);
                  setPage(1);
                }}
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
