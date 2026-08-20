import { FiDownload, FiPlus } from "react-icons/fi";

const BrandsHeader = ({ onExport, onAddBrand }) => {
  return (
    <header
      className="
        flex
        flex-col
        gap-4
        md:flex-row
        md:items-start
        md:justify-between
      "
    >
      <div>
        <h1
          className="
            text-[24px]
            font-bold
            tracking-[-0.02em]
            text-slate-950
          "
        >
          Brands
        </h1>

        <p className="mt-1.5 text-[13px] text-slate-500">
          Manage all product brands from one place.
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        <button
          type="button"
          onClick={onExport}
          className="
            inline-flex
            h-10.5
            items-center
            justify-center
            gap-2
            rounded-lg
            border
            border-slate-200
            bg-white
            px-7
            text-sm
            font-semibold
            text-slate-800
            shadow-sm
            transition
            hover:bg-slate-50
          "
        >
          <FiDownload size={17} />
          Export
        </button>

        <button
          type="button"
          onClick={onAddBrand}
          className="
            inline-flex
            h-10.5 
            items-center
            justify-center
            gap-2
            rounded-lg
            bg-violet-600
            px-7
            text-sm
            font-semibold
            text-white
            shadow-sm
            transition
            hover:bg-violet-700
          "
        >
          <FiPlus size={18} />
          Add New Brand
        </button>
      </div>
    </header>
  );
};

export default BrandsHeader;
