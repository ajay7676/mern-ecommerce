import {
  Box,
  CheckSquare,
  Grid2X2,
  Hash,
  RotateCcw,
  Type,
} from "lucide-react";
import AttributeTypeSummarySkeleton from "./AttributeTypeSummarySkeleton";

const typeIconMap = {
  dropdown: Grid2X2,
  switch: Box,
  text: Type,
  number: Hash,
  boolean: CheckSquare,
};

const typeDescriptionMap = {
  dropdown: "Predefined options like size",
  switch: "Color or visual selection",
  text: "Custom text input",
  number: "Numeric product value",
  boolean: "True or false option",
};


const AttributeTypePanel = (
  {
  summary,
  isLoading,
  isError,
  onRetry,
}
) => {

  if (isLoading) {
    return <AttributeTypeSummarySkeleton />;
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-error/20 bg-error/5 p-5">
        <h3 className="text-lg font-bold text-error">
          Failed to load type summary
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Attribute type summary could not be fetched.
        </p>

        <button
          type="button"
          onClick={onRetry}
          className="btn btn-error btn-sm mt-4"
        >
          <RotateCcw className="h-4 w-4" />
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <h3 className="text-lg font-bold text-slate-900">
          Attribute Types
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Summary of attributes by type.
        </p>
      </div>

      <div className="mt-5 space-y-3">
        {summary?.map((item) => {
          const Icon = typeIconMap[item.type] || Grid2X2;

          return (
            <div
              key={item.type}
              className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>

                <div>
                  <p className="font-semibold text-slate-900">
                    {item.label}
                  </p>

                  <p className="text-xs text-slate-500">
                    {typeDescriptionMap[item.type]}
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-slate-900 shadow-sm">
                {item.count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AttributeTypePanel;