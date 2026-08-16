import {
  FiBox,
  FiFolder,
  FiPackage,
  FiSlash,
} from "react-icons/fi";

const config = {
  total: {
    icon: FiFolder,
    iconClass:
      "bg-violet-100 text-violet-600",
  },

  active: {
    icon: FiBox,
    iconClass:
      "bg-emerald-100 text-emerald-600",
  },

  inactive: {
    icon: FiSlash,
    iconClass:
      "bg-orange-100 text-orange-500",
  },

  products: {
    icon: FiPackage,
    iconClass:
      "bg-blue-100 text-blue-600",
  },
};

const CategoryStatCard = ({
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
        min-h-20.5
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
          rounded-full
          ${item.iconClass}
        `}
      >
        <Icon
          size={19}
          strokeWidth={1.8}
        />
      </div>

      <div>
        <p className="text-[20px] font-bold leading-none text-slate-950">
          {value}
        </p>

        <p className="mt-2 text-[12px] text-slate-600">
          {label}
        </p>
      </div>
    </article>
  );
};

export default CategoryStatCard;