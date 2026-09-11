import { RotateCcw } from "lucide-react";

const AttributeErrorState = ({
  error,
  onRetry,
}) => {
  return (
    <div className="rounded-2xl border border-error/20 bg-error/5 p-8 text-center">
      <h3 className="text-lg font-bold text-error">
        Failed to load attributes
      </h3>

      <p className="mt-2 text-sm text-slate-600">
        {error?.response?.data?.message ||
          error?.message ||
          "Something went wrong while fetching attributes."}
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="btn btn-error btn-sm mt-5"
      >
        <RotateCcw className="h-4 w-4" />
        Try Again
      </button>
    </div>
  );
};

export default AttributeErrorState;