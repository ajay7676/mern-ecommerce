import {
  AlertTriangle,
  Loader2,
  Trash2,
  X,
} from "lucide-react";

import { createPortal } from "react-dom";

import toast from "react-hot-toast";
import { useDeleteAdminProduct } from "../../../../../hooks/admin/mutations/products/useDeleteAdminProduct";


const DeleteProductConfirmModal = ({
  open,
  product,
  onClose,
}) => {
  const deleteProductMutation =
    useDeleteAdminProduct();

  if (!open || !product) {
    return null;
  }

  const productId =
    product.id ||
    product._id;

  const handleDelete = async () => {
    if (
      !productId ||
      deleteProductMutation.isPending
    ) {
      return;
    }

    try {
      await deleteProductMutation.mutateAsync({
        productId,
      });

      toast.success(
        "Product deleted successfully",
      );

      onClose();
    } catch (error) {
      console.error(
        "Delete product failed:",
        error,
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to delete product",
      );
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-120 flex items-center justify-center bg-black/40 p-4"
      onClick={() => {
        if (
          !deleteProductMutation.isPending
        ) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-product-title"
        onClick={(event) =>
          event.stopPropagation()
        }
        className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-error/10">
            <AlertTriangle className="h-6 w-6 text-error" />
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={
              deleteProductMutation.isPending
            }
            className="btn btn-ghost btn-sm btn-circle"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <h3
          id="delete-product-title"
          className="mt-5 text-xl font-bold text-slate-900"
        >
          Delete Product?
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          You are about to delete{" "}
          <span className="font-semibold text-slate-800">
            {product.productName ||
              product.name}
          </span>
          . This action cannot be undone.
        </p>

        <div className="mt-5 rounded-2xl border border-error/20 bg-error/5 p-4">
          <p className="text-sm text-slate-600">
            Product variants and related product
            assets may also be removed.
          </p>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={
              deleteProductMutation.isPending
            }
            className="btn btn-ghost"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={
              deleteProductMutation.isPending
            }
            className="btn btn-error text-white"
          >
            {deleteProductMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                Delete Product
              </>
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default DeleteProductConfirmModal;