import { FiInbox } from "react-icons/fi";

const EmptyReports = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-base-300 bg-base-100 px-6 py-16">
      <FiInbox
        size={48}
        className="text-base-content/40"
      />

      <h3 className="mt-4 text-lg font-semibold">
        No reports found
      </h3>

      <p className="mt-2 text-center text-sm text-base-content/60">
        Reports will appear here once they are generated.
      </p>
    </div>
  );
};

export default EmptyReports;