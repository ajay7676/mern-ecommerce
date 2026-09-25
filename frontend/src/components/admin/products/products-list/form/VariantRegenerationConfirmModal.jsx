import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  AlertTriangle,
  CheckCircle2,
  Plus,
  RefreshCw,
  ShieldCheck,
  Trash2,
  X,
} from "lucide-react";

const VariantRegenerationConfirmModal = ({
  open,
  data,
  isApplying = false,
  onCancel,
  onConfirm,
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !isApplying) {
        onCancel?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    requestAnimationFrame(() => {
      modalRef.current?.focus();
    });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, isApplying, onCancel]);

  if (
    !open ||
    !data ||
    typeof document === "undefined"
  ) {
    return null;
  }

  const {
    report = {},
    preservedVariants = [],
    createdVariants = [],
    removedVariants = [],
    warnings = [],
  } = data;

  const {
    previousTotal = 0,
    total = 0,
    preserved = 0,
    created = 0,
    removed = 0,
  } = report;

  const hasWarnings = warnings.length > 0;
  const hasRemovedVariants = removed > 0;
  const hasCreatedVariants = created > 0;

  const getVariantLabel = (variant) => {
    return (
      variant?.name ||
      variant?.sku ||
      variant?.optionSignature ||
      "Unnamed variant"
    );
  };

  const modal = (
    <div
      className="fixed inset-0 z-10050 flex items-center justify-center bg-black/45 p-4 backdrop-blur-[1px]"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget &&
          !isApplying
        ) {
          onCancel?.();
        }
      }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="variant-regeneration-title"
        tabIndex={-1}
        className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl outline-none"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <RefreshCw className="h-5 w-5" />
            </div>

            <div>
              <h3
                id="variant-regeneration-title"
                className="text-lg font-bold text-slate-900"
              >
                Regenerate product variants?
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Current attributes will be compared with your existing
                variants before any change is applied.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-ghost btn-sm btn-circle shrink-0"
            disabled={isApplying}
            onClick={onCancel}
            aria-label="Close regeneration confirmation"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto px-6 py-5">
          {/* Safety message */}
          <div className="rounded-2xl border border-success/20 bg-success/5 p-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-success" />

              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Existing matching variants are protected
                </p>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Matching combinations keep their existing SKU, price,
                  stock, status, variant ID and image. Only their attribute
                  snapshot and display information are synchronized.
                </p>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <SummaryCard
              label="Final variants"
              value={total}
            />

            <SummaryCard
              label="Preserved"
              value={preserved}
              icon={
                <CheckCircle2 className="h-4 w-4 text-success" />
              }
            />

            <SummaryCard
              label="New"
              value={created}
              icon={
                <Plus className="h-4 w-4 text-info" />
              }
            />

            <SummaryCard
              label="Removed"
              value={removed}
              icon={
                <Trash2 className="h-4 w-4 text-error" />
              }
            />
          </div>

          <div className="mt-3 text-xs text-slate-500">
            Current variants: {previousTotal}
            {" → "}
            Variants after regeneration: {total}
          </div>

          {/* Warnings */}
          {hasWarnings && (
            <div className="mt-5 space-y-2">
              {warnings.map((warning, index) => (
                <div
                  key={`${warning}-${index}`}
                  className="flex items-start gap-3 rounded-2xl border border-warning/30 bg-warning/10 p-4"
                >
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />

                  <p className="text-sm leading-6 text-slate-700">
                    {warning}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Created variants preview */}
          {hasCreatedVariants && (
            <VariantPreviewSection
              title={`${created} new variant${
                created === 1 ? "" : "s"
              } will be created`}
              description="New variants receive generated SKU, default product price, stock and current product image."
              variants={createdVariants}
              type="created"
              getVariantLabel={getVariantLabel}
            />
          )}

          {/* Removed variants preview */}
          {hasRemovedVariants && (
            <VariantPreviewSection
              title={`${removed} variant${
                removed === 1 ? "" : "s"
              } will be removed`}
              description="These combinations are no longer available in the current attribute structure."
              variants={removedVariants}
              type="removed"
              getVariantLabel={getVariantLabel}
            />
          )}

          {/* Preserved info */}
          {preserved > 0 && (
            <VariantPreviewSection
              title={`${preserved} variant${
                preserved === 1 ? "" : "s"
              } will be preserved`}
              description="SKU, price, stock, status, existing images and backend variant IDs remain unchanged."
              variants={preservedVariants}
              type="preserved"
              getVariantLabel={getVariantLabel}
            />
          )}

          {!created && !removed && preserved > 0 && (
            <div className="mt-5 rounded-2xl border border-info/20 bg-info/5 p-4">
              <p className="text-sm font-semibold text-slate-900">
                No variant combinations changed
              </p>

              <p className="mt-1 text-sm text-slate-600">
                Regeneration will only synchronize updated option labels,
                colors and variant attribute snapshots.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-end">
          <button
            type="button"
            className="btn btn-ghost rounded-xl"
            disabled={isApplying}
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            type="button"
            className="btn btn-primary rounded-xl text-white"
            disabled={isApplying}
            onClick={onConfirm}
          >
            {isApplying ? (
              <>
                <span className="loading loading-spinner loading-sm" />
                Applying...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4" />
                Apply Regeneration
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(
    modal,
    document.body
  );
};

const SummaryCard = ({
  label,
  value,
  icon = null,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
      <div className="flex items-center gap-2">
        {icon}

        <p className="text-xs font-medium text-slate-500">
          {label}
        </p>
      </div>

      <p className="mt-2 text-xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
};

const VariantPreviewSection = ({
  title,
  description,
  variants = [],
  type,
  getVariantLabel,
}) => {
  const visibleVariants =
    variants.slice(0, 5);

  const hiddenCount =
    Math.max(
      variants.length -
        visibleVariants.length,
      0
    );

  const getBadgeClass = () => {
    if (type === "created") {
      return "badge-info";
    }

    if (type === "removed") {
      return "badge-error";
    }

    return "badge-success";
  };

  return (
    <div className="mt-5 rounded-2xl border border-slate-200 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="text-sm font-semibold text-slate-900">
            {title}
          </h4>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            {description}
          </p>
        </div>

        <span
          className={`badge badge-sm ${getBadgeClass()}`}
        >
          {variants.length}
        </span>
      </div>

      <div className="mt-3 space-y-2">
        {visibleVariants.map(
          (variant, index) => (
            <div
              key={
                variant.variantId ||
                variant.optionSignature ||
                `${getVariantLabel(
                  variant
                )}-${index}`
              }
              className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 px-3 py-2.5"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-800">
                  {getVariantLabel(
                    variant
                  )}
                </p>

                {variant.sku && (
                  <p className="mt-0.5 truncate text-xs text-slate-500">
                    SKU: {variant.sku}
                  </p>
                )}
              </div>

              <span
                className={`badge badge-outline badge-sm shrink-0 ${getBadgeClass()}`}
              >
                {type}
              </span>
            </div>
          )
        )}
      </div>

      {hiddenCount > 0 && (
        <p className="mt-3 text-xs font-medium text-slate-500">
          +{hiddenCount} more
        </p>
      )}
    </div>
  );
};

export default VariantRegenerationConfirmModal;