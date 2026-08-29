import { FiEdit2, FiStar, FiTrash2 } from "react-icons/fi";

import BrandStatusBadge from "./BrandStatusBadge";

const BrandRow = ({ brand, rowNumber, onEdit, onDelete, onToggleFeatured }) => {
  

  return (
    <tr
      className="
        h-12.75
        border-b
        border-slate-100
        text-[12px]
        text-slate-700
        transition
        hover:bg-slate-50/70
      "
    >
      <td className="w-8 px-2">
        <span className="cursor-grab text-slate-400">⠿</span>
      </td>

      <td className="w-12 px-2">{rowNumber }</td>

      <td className="min-w-45 px-2">
        <div className="flex items-center gap-3">
          <img
            src={brand.logo?.url || "/images/brand-placeholder.png"}
            alt={brand.logo?.alt || `${brand.name} logo`}
            className="
              h-8
              w-11
              rounded-md
              object-contain
            "
          />

          <span className="font-medium text-slate-900">{brand.name}</span>
        </div>
      </td>

      <td className="min-w-32.5 px-2">{brand.slug}</td>

      <td className="w-22.5 px-2">{brand.productCount}</td>

      <td className="w-25 px-2">
        <BrandStatusBadge status={brand.status} />
      </td>

      <td className="w-25 px-2">
        <button
          type="button"
          onClick={() => onToggleFeatured(brand)}
          className="
            grid
            h-8
            w-8
            place-items-center
            rounded-md
            hover:bg-slate-100
          "
        >
          <FiStar
            size={17}
            className={
              brand.isFeatured
                ? "fill-amber-400 text-amber-400"
                : "text-slate-300"
            }
          />
        </button>
      </td>

      <td className="w-25 px-2">{brand.sortOrder}</td>

      <td className="w-27.5 px-2">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onEdit(brand)}
            className="
              text-slate-700
              transition
              hover:text-violet-600
              cursor-pointer
            "
          >
            <FiEdit2 size={15} />
          </button>

          <button
            type="button"
            onClick={() => onDelete(brand)}
            className="
              text-slate-700
              transition
              cursor-pointer
              hover:text-red-500
            "
          >
            <FiTrash2 size={15} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default BrandRow;
