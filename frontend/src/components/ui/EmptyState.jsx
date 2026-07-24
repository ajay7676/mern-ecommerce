import { FiPackage } from "react-icons/fi";

const EmptyState = ({
  title = "No orders found",
  description = "There are no orders available for this status.",
}) => {
  return (
    <div
      className="
        flex min-h-80 flex-col items-center justify-center
        rounded-xl border border-dashed border-slate-300
        bg-white px-6 text-center
      "
    >
      <div
        className="
          flex h-14 w-14 items-center justify-center
          rounded-full bg-indigo-50 text-indigo-600
        "
      >
        <FiPackage className="h-6 w-6" />
      </div>

      <h2 className="mt-4 text-lg font-semibold text-slate-950">
        {title}
      </h2>

      <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
};

export default EmptyState;