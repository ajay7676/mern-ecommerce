import { AlertTriangle, RefreshCw } from "lucide-react";

const REASON_MESSAGES = {
  "attribute-added":
    "An attribute was added, so new variant combinations may be required.",

  "attribute-removed":
    "An attribute was removed, so some existing variant combinations are no longer valid.",

  "option-added":
    "A new option was added, so new variant combinations may be required.",

  "option-removed":
    "An option was removed, so some existing variants may no longer be valid.",

  "option-updated":
    "An option was updated, so variant snapshots need to be synchronized.",
};

const VariantsRegenerationWarning = ({
  visible,
  reason,
  onRegenerate,
}) => {
  if (!visible) return null;

  const message =
    REASON_MESSAGES[reason] ||
    "Attributes have changed. Regenerate variants before continuing.";

  return (
    <div className="rounded-2xl border border-warning/30 bg-warning/10 p-4">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 rounded-full bg-warning/15 p-2">
          <AlertTriangle className="h-4 w-4 text-warning" />
        </div>

        <div className="min-w-0 flex-1">
          <h4 className="font-semibold text-slate-900">
            Variants need regeneration
          </h4>

          <p className="mt-1 text-sm text-slate-600">
            {message}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Your existing variant data has not been deleted.
            Matching variants will be preserved during safe regeneration.
          </p>

          <button
            type="button"
            onClick={onRegenerate}
            className="btn btn-warning btn-sm mt-3 rounded-xl"
          >
            <RefreshCw className="h-4 w-4" />
            Regenerate Variants
          </button>
        </div>
      </div>
    </div>
  );
};

export default VariantsRegenerationWarning;