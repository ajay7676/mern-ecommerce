import { FiAlertTriangle, FiTrash2, FiX } from "react-icons/fi";
import useDeleteCategory from "../../../../../../hooks/admin/mutations/products/categories/useDeleteCategory";
import { getCategoryApiErrorMessage } from "../../../../../../utils/admin/products/category/categoryApiError";

const DeleteCategoryModal = ({ open, category, onClose }) => {
  const { mutateAsync, isPending, error, reset } = useDeleteCategory();

  if (!open || !category) {
    return null;
  }

  const categoryId = category._id ?? category.id;

  const handleClose = () => {
    if (isPending) {
      return;
    }

    reset();
    onClose();
  };

  const handleDelete = async () => {
    try {
      await mutateAsync(categoryId);

      reset();
      onClose();
    } catch {
      // Keep modal open.
      // Mutation hook already shows toast.
    }
  };

  const errorMessage = error
    ? getCategoryApiErrorMessage(error, "Unable to delete category")
    : "";

  const dependencyError = error?.response?.data?.errors?.category;

  return (
    <div
      className="
        fixed
        inset-0
        z-80
        grid
        place-items-center
        bg-slate-950/40
        p-4
        backdrop-blur-[2px]
      "
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-category-title"
    >
      <button
        type="button"
        aria-label="Close delete category modal"
        onClick={handleClose}
        className="absolute inset-0"
      />

      <div
        className="
          relative
          z-10
          w-full
          max-w-115
          overflow-hidden
          rounded-2xl
          bg-white
          shadow-[0_24px_70px_rgba(15,23,42,0.22)]
        "
      >
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div
              className="
                grid
                h-12
                w-12
                shrink-0
                place-items-center
                rounded-full
                bg-red-50
                text-red-600
              "
            >
              <FiAlertTriangle
                size={22}
              />
            </div>

            <button
              type="button"
              onClick={handleClose}
              disabled={isPending}
              className="
                grid
                h-9
                w-9
                place-items-center
                rounded-lg
                text-slate-400
                transition
                cursor-pointer
                hover:bg-slate-100
                hover:text-slate-700
                disabled:opacity-50
              "
            >
              <FiX size={19} />
            </button>
          </div>

          <h2
            id="delete-category-title"
            className="
              mt-5
              text-xl
              font-bold
              text-slate-950
            "
          >
            Delete Category?
          </h2>

          <p
            className="
              mt-2
              text-sm
              leading-6
              text-slate-500
            "
          >
            Are you sure you want to permanently delete{" "}
            <span className="font-semibold text-slate-800">
              {category.name}
            </span>
            ? This action cannot be undone.
          </p>

          <div
            className="
              mt-4
              rounded-lg
              border
              border-amber-100
              bg-amber-50
              px-4
              py-3
            "
          >
            <p className="text-xs leading-5 text-amber-700">
              Categories with subcategories or assigned products cannot be deleted. Deactivate them instead.
            </p>
          </div>

          {error && (
            <div
              className="
                mt-4
                rounded-lg
                border
                border-red-100
                bg-red-50
                px-4
                py-3
              "
            >
              <p className="text-sm font-medium text-red-700">
                {errorMessage}
              </p>

              {dependencyError && (
                <p className="mt-1 text-xs leading-5 text-red-600">
                  {dependencyError}
                </p>
              )}
            </div>
          )}
        </div>

        <div
          className="
            flex
            flex-col-reverse
            gap-3
            border-t
            border-slate-200
            bg-slate-50
            px-6
            py-4
            sm:flex-row
            sm:justify-end
          "
        >
          <button
            type="button"
            onClick={handleClose}
            disabled={isPending}
            className="
              h-10
              rounded-lg
              border
              border-slate-200
              bg-white
              px-5
              text-sm
              font-semibold
              text-slate-700
              transition
              hover:bg-slate-50
              disabled:opacity-50
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="
              inline-flex
              h-10
              items-center
              justify-center
              gap-2
              rounded-lg
              bg-red-600
              px-5
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-red-700
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            <FiTrash2 size={16} />

            {isPending
              ? "Deleting..."
              : "Delete Category"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCategoryModal;
