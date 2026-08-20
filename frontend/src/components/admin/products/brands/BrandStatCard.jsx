import {
  FiBox,
  FiPackage,
  FiSlash,
  FiTag,
} from "react-icons/fi";

const config = {
  total: {
    icon: FiTag,
    className:
      "bg-violet-100 text-violet-600",
  },

  active: {
    icon: FiBox,
    className:
      "bg-emerald-100 text-emerald-600",
  },

  inactive: {
    icon: FiSlash,
    className:
      "bg-orange-100 text-orange-500",
  },

  products: {
    icon: FiPackage,
    className:
      "bg-blue-100 text-blue-600",
  },
};

const BrandStatCard = ({
  value,
  label,
  type,
}) => {
  const item =
    config[type] ??
    config.total;

  const Icon =
    item.icon;

  return (
    <article
      className="
        flex
        min-h-21.5
        items-center
        gap-4
        rounded-xl
        border
        border-slate-200
        bg-white
        px-5
        shadow-[0_1px_4px_rgba(15,23,42,0.03)]
      "
    >
      <div
        className={`
          grid
          h-11
          w-11
          shrink-0
          place-items-center
          rounded-xl
          ${item.className}
        `}
      >
        <Icon size={20} />
      </div>

      <div>
        <p className="text-[21px] font-bold leading-none text-slate-950">
          {value}
        </p>

        <p className="mt-2 text-[12px] text-slate-600">
          {label}
        </p>
      </div>
    </article>
  );
};

export default BrandStatCard;