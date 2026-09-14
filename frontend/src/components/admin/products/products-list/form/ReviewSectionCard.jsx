// components/ReviewSectionCard.jsx

import { Edit3 } from "lucide-react";

const ReviewSectionCard = ({
  icon,
  title,
  children,
  onEdit,
}) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            {icon}
          </div>

          <h3 className="text-base font-extrabold text-slate-950">
            {title}
          </h3>
        </div>

        <button
          type="button"
          onClick={onEdit}
          className="btn btn-outline btn-sm rounded-xl"
        >
          <Edit3 className="h-4 w-4" />
          Edit
        </button>
      </div>

      {children}
    </section>
  );
};

export const ReviewRow = ({ label, value }) => {
  return (
    <div className="grid gap-1 sm:grid-cols-[160px_1fr]">
      <span className="text-xs font-bold text-slate-500">
        {label}
      </span>

      <span className="text-sm font-semibold text-slate-800">
        {value || "-"}
      </span>
    </div>
  );
};

export default ReviewSectionCard;