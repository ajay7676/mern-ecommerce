
import { CheckCircle2, Circle, CircleDot } from "lucide-react";

const steps = [
  {
    id: 1,
    label: "Basic Information",
    status: "completed",
  },
  {
    id: 2,
    label: "Pricing & Inventory",
    status: "completed",
  },
  {
    id: 3,
    label: "Images & Media",
    status: "completed",
  },
  {
    id: 4,
    label: "Attributes & Variations",
    status: "completed",
  },
  {
    id: 5,
    label: "Additional Details",
    status: "active",
  },
  {
    id: 6,
    label: "Review & Publish",
    status: "pending",
  },
];

const CompletionStatusCard = () => {
  const completionPercentage = 83;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-bold text-slate-950">
        Completion Status
      </h3>

      <p className="mt-1 text-sm font-medium text-slate-500">
        You're doing great!
      </p>

      <div className="mt-5 flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-primary"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>

        <span className="text-sm font-bold text-slate-600">
          {completionPercentage}%
        </span>
      </div>

      <div className="mt-5 space-y-3">
        {steps.map((step) => (
          <div
            key={step.id}
            className="flex items-center gap-3 text-sm font-medium"
          >
            {step.status === "completed" && (
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            )}

            {step.status === "active" && (
              <CircleDot className="h-4 w-4 text-primary" />
            )}

            {step.status === "pending" && (
              <Circle className="h-4 w-4 text-slate-300" />
            )}

            <span
              className={
                step.status === "active"
                  ? "rounded-lg bg-primary/10 px-2 py-1 font-bold text-primary"
                  : step.status === "completed"
                    ? "text-slate-700"
                    : "text-slate-400"
              }
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompletionStatusCard;