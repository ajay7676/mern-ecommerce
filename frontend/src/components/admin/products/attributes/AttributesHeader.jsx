import { FiDownload, FiPlus } from "react-icons/fi";

const AttributesHeader = ({ onAddAttribute }) => {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
          Attributes
        </h1>

        <p className="mt-1 text-sm text-[#253875]">
          Create and manage product attributes for your store.
        </p>
      </div>

      <div className="flex w-full gap-3 sm:w-auto">
        <button
          type="button"
          className="
            flex h-11 flex-1 items-center justify-center gap-2
            rounded-lg border border-slate-200 bg-white
            px-5 text-sm font-semibold text-slate-900
            shadow-sm transition
            hover:border-violet-200 hover:bg-violet-50
            sm:flex-none
          "
        >
          <FiDownload size={17} />
          Export
        </button>

        <button
          type="button"
          onClick={onAddAttribute}
          className="
            flex h-11 flex-1 items-center justify-center gap-2
            rounded-lg bg-violet-600 px-5
            text-sm font-semibold text-white
            shadow-sm transition
            hover:bg-violet-700
            focus:outline-none focus:ring-2
            focus:ring-violet-200
            sm:flex-none
          "
        >
          <FiPlus size={18} />
          Add New Attribute
        </button>
      </div>
    </div>
  );
};

export default AttributesHeader;