import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  AlertTriangle,
  ImageOff,
  Loader2,
  Package,
  RefreshCcw,
  X,
} from "lucide-react";


const DRAWER_ANIMATION_MS = 300;

import {useAdminProductDetail} from '../../../../../hooks/admin/queries/products/product-list/useAdminProductDetail';
import { getProductDetailErrorMessage } from '../../../../../utils/admin/products/product/productDetailErrorUtils';
const formatCurrency = (value) => {
  return `₹${Number(value || 0).toLocaleString("en-IN")}`;
};

const getStatusBadgeClass = (status) => {
  if (status === "active") return "badge-success";
  if (status === "draft") return "badge-warning";
  if (status === "inactive") return "badge-ghost";

  return "badge-ghost";
};

const ProductDetailDrawerSkeleton = () => {
  return (
    <div className="space-y-5">
      <div className="rounded-3xl border border-base-300 bg-base-100 p-5">
        <div className="flex items-start gap-4">
          <div className="skeleton h-24 w-24 rounded-2xl" />

          <div className="flex-1 space-y-3">
            <div className="skeleton h-5 w-64 rounded-md" />
            <div className="skeleton h-4 w-40 rounded-md" />
            <div className="skeleton h-6 w-24 rounded-full" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="skeleton h-28 rounded-3xl" />
        <div className="skeleton h-28 rounded-3xl" />
        <div className="skeleton h-28 rounded-3xl" />
      </div>

      <div className="rounded-3xl border border-base-300 bg-base-100 p-5">
        <div className="skeleton mb-4 h-5 w-40 rounded-md" />

        <div className="space-y-3">
          <div className="skeleton h-4 w-full rounded-md" />
          <div className="skeleton h-4 w-10/12 rounded-md" />
          <div className="skeleton h-4 w-8/12 rounded-md" />
        </div>
      </div>
    </div>
  );
};

const ProductDetailDrawerError = ({ message, onRetry, onClose }) => {
  return (
    <div className="flex min-h-105 items-center justify-center">
      <div className="max-w-md rounded-3xl border border-error/20 bg-error/5 p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-error/10 text-error">
          <AlertTriangle className="h-8 w-8" />
        </div>

        <h3 className="mt-5 text-lg font-bold text-base-content">
          Unable to load product
        </h3>

        <p className="mt-2 text-sm leading-6 text-base-content/60">
          {message}
        </p>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onRetry}
            className="btn btn-error rounded-xl text-white"
          >
            <RefreshCcw className="h-4 w-4" />
            Retry
          </button>

          <button
            type="button"
            onClick={onClose}
            className="btn btn-outline rounded-xl"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductDetailPreview = ({ product }) => {
  const name = product?.basicInformation?.name || "Untitled product";
  const status = product?.basicInformation?.status || "draft";
  const productType = product?.basicInformation?.productType || "-";

  const primaryImage =
    product?.media?.primaryImage || product?.media?.images?.[0] || null;

  const pricing = product?.pricing || {};
  const inventory = product?.inventory || {};

  return (
    <div className="space-y-5">
      {/* Top summary */}
      <div className="rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-base-200">
            {primaryImage?.url ? (
              <img
                src={primaryImage.url}
                alt={primaryImage.altText || name}
                className="h-full w-full object-cover"
              />
            ) : (
              <ImageOff className="h-9 w-9 text-base-content/30" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl font-bold text-base-content">{name}</h3>

              <span className={`badge ${getStatusBadgeClass(status)}`}>
                {status}
              </span>
            </div>

            <p className="mt-2 text-sm text-base-content/60">
              {product?.basicInformation?.shortDescription ||
                "No short description added."}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="badge badge-outline">
                Type: {productType}
              </span>

              <span className="badge badge-outline">
                SKU: {inventory.sku || "-"}
              </span>

              <span className="badge badge-outline">
                Variants: {product?.variants?.length || 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase text-base-content/50">
            Final Price
          </p>

          <p className="mt-2 text-2xl font-bold text-base-content">
            {formatCurrency(pricing.finalPrice)}
          </p>

          <p className="mt-1 text-xs text-base-content/50">
            Selling: {formatCurrency(pricing.sellingPrice)}
          </p>
        </div>

        <div className="rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase text-base-content/50">
            Stock
          </p>

          <p className="mt-2 text-2xl font-bold text-base-content">
            {inventory.stockQuantity || 0}
          </p>

          <p className="mt-1 text-xs text-base-content/50">
            Status: {inventory.stockStatus || "-"}
          </p>
        </div>

        <div className="rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase text-base-content/50">
            Discount
          </p>

          <p className="mt-2 text-2xl font-bold text-base-content">
            {pricing.discountType === "percentage"
              ? `${pricing.discountValue || 0}%`
              : pricing.discountType === "fixed"
                ? formatCurrency(pricing.discountValue)
                : "None"}
          </p>

          <p className="mt-1 text-xs text-base-content/50">
            Type: {pricing.discountType || "none"}
          </p>
        </div>
      </div>

      {/* Basic refs */}
      <div className="rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm">
        <h4 className="font-bold text-base-content">Product References</h4>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <p className="text-xs font-semibold text-base-content/50">
              Category
            </p>
            <p className="mt-1 font-semibold text-base-content">
              {product?.category?.name || "-"}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold text-base-content/50">
              Sub Category
            </p>
            <p className="mt-1 font-semibold text-base-content">
              {product?.subCategory?.name || "-"}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold text-base-content/50">
              Brand
            </p>
            <p className="mt-1 font-semibold text-base-content">
              {product?.brand?.name || "-"}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-info/10 px-4 py-3 text-sm text-info">
        Detail data connected successfully. In the next phases we will replace
        this preview with full images, pricing, inventory, and variants sections.
      </div>
    </div>
  );
};

const ProductDetailDrawer = ({ isOpen = false, productId = null, onClose }) => {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);

  const {
    data: product,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useAdminProductDetail(productId, {
    enabled: isOpen && Boolean(productId),
  });

  const productName = product?.basicInformation?.name;

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);

      const frameId = requestAnimationFrame(() => {
        setIsVisible(true);
      });

      return () => cancelAnimationFrame(frameId);
    }

    setIsVisible(false);

    const timeoutId = setTimeout(() => {
      setShouldRender(false);
    }, DRAWER_ANIMATION_MS);

    return () => clearTimeout(timeoutId);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleEscapeKey);

    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!shouldRender) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-detail-drawer-title"
    >
      {/* Overlay */}
      <button
        type="button"
        aria-label="Close product detail drawer"
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 backdrop-blur-[1px] transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-4xl flex-col bg-base-100 shadow-2xl transition-transform duration-300 ease-out ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-base-300 px-5 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Package className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <h2
                id="product-detail-drawer-title"
                className="truncate text-lg font-bold text-base-content"
              >
                {productName || "Product Details"}
              </h2>

              <p className="truncate text-xs text-base-content/50">
                {productId
                  ? `Product ID: ${productId}`
                  : "No product selected"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isFetching && !isLoading && (
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
            )}

            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost btn-sm rounded-xl"
              aria-label="Close drawer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto bg-base-200/40 px-5 py-5">
          {!productId && (
            <ProductDetailDrawerError
              message="Product id is missing. Please select a product again."
              onRetry={() => {}}
              onClose={onClose}
            />
          )}

          {productId && isLoading && <ProductDetailDrawerSkeleton />}

          {productId && isError && (
            <ProductDetailDrawerError
              message={getProductDetailErrorMessage(error)}
              onRetry={refetch}
              onClose={onClose}
            />
          )}

          {productId && !isLoading && !isError && product && (
            <ProductDetailPreview product={product} />
          )}
        </div>
      </aside>
    </div>,
    document.body
  );
};

export default ProductDetailDrawer;