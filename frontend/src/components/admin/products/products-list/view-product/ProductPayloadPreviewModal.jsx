
import { CheckCircle2, Copy, X } from "lucide-react";

const ProductPayloadPreviewModal = ({
  isOpen,
  title,
  payload,
  onClose,
}) => {
  if (!isOpen || !payload) return null;

  const handleCopyPayload = async () => {
    try {
      await navigator.clipboard.writeText(
        JSON.stringify(payload, null, 2)
      );
    } catch (error) {
      console.error("Copy payload failed:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-120 flex items-center justify-center bg-black/50 p-4">
      <div className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex flex-none items-start justify-between border-b border-slate-200 px-5 py-4">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-5 w-5" />
            </div>

            <div>
              <h3 className="text-lg font-extrabold text-slate-950">
                {title}
              </h3>

              <p className="mt-1 text-sm font-medium text-slate-500">
                This is local dummy preview payload. Backend API will use this structure.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="btn btn-ghost btn-sm btn-circle"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-5">
          <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
            <div className="space-y-4">
              <SummaryBox
                label="Product Name"
                value={payload.basicInformation.name}
              />

              <SummaryBox
                label="SKU"
                value={payload.basicInformation.sku}
              />

              <SummaryBox
                label="Mode"
                value={payload.mode}
              />

              <SummaryBox
                label="Status"
                value={payload.publishing.status}
              />

              <SummaryBox
                label="Images"
                value={`${payload.media.images.length} uploaded`}
              />

              <SummaryBox
                label="Variants"
                value={`${payload.attributesAndVariations.variants.length} variants`}
              />
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950">
              <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
                <p className="text-sm font-bold text-white">
                  Final Backend Payload
                </p>

                <button
                  type="button"
                  onClick={handleCopyPayload}
                  className="btn btn-sm rounded-xl border-slate-700 bg-slate-900 text-white hover:bg-slate-800"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </button>
              </div>

              <pre className="max-h-130 overflow-auto p-4 text-xs leading-6 text-slate-100">
                {JSON.stringify(payload, null, 2)}
              </pre>
            </div>
          </div>
        </div>

        <div className="flex flex-none justify-end gap-3 border-t border-slate-200 px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-primary rounded-xl text-white"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

const SummaryBox = ({ label, value }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="mt-2 wrap-break-word text-sm font-extrabold text-slate-950">
        {value || "-"}
      </p>
    </div>
  );
};

export default ProductPayloadPreviewModal;