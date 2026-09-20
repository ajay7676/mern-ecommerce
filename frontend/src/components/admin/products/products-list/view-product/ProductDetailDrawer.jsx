import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Package, X } from "lucide-react";

const DRAWER_ANIMATION_MS = 300;

const ProductDetailDrawer = ({ isOpen = false, productId = null, onClose }) => {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);

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
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Package className="h-5 w-5" />
            </div>

            <div>
              <h2
                id="product-detail-drawer-title"
                className="text-lg font-bold text-base-content"
              >
                Product Details
              </h2>

              <p className="text-xs text-base-content/50">
                View product information, pricing, inventory, and variants
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="btn btn-ghost btn-sm rounded-xl"
            aria-label="Close drawer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          <div className="rounded-3xl border border-dashed border-base-300 bg-base-200/60 p-6">
            <p className="text-sm font-semibold text-base-content">
              Product detail drawer opened successfully.
            </p>

            <p className="mt-2 text-xs text-base-content/60">
              Selected Product ID:
            </p>

            <code className="mt-2 block break-all rounded-xl bg-base-100 p-3 text-xs text-base-content">
              {productId || "No product selected"}
            </code>

            <p className="mt-4 text-xs leading-5 text-base-content/60">
              In the next phase, we will connect this drawer with{" "}
              <span className="font-semibold">useAdminProductDetail</span> and
              show real product information.
            </p>
          </div>
        </div>
      </aside>
    </div>,
    document.body
  );
};

export default ProductDetailDrawer;