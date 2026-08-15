
import {
  FiUsers,
  FiUserCheck,
  FiUser,
  FiUserX,
  FiSlash,
  FiArrowUp,
  FiArrowDown,
} from "react-icons/fi";

const config = {
  total: {
    icon: FiUsers,
    boxClass: "bg-violet-50 text-violet-600",
  },
  active: {
    icon: FiUserCheck,
    boxClass: "bg-emerald-50 text-emerald-600",
  },
  admin: {
    icon: FiUser,
    boxClass: "bg-amber-50 text-amber-500",
  },
  pending: {
    icon: FiUserX,
    boxClass: "bg-blue-50 text-blue-600",
  },
  blocked: {
    icon: FiSlash,
    boxClass: "bg-rose-50 text-rose-500",
  },
};

const UserStatsCard = (
  {
  title,
  value,
  change,
  direction,
  type,
}
) => {
   const Icon = config[type].icon;

  const isUp = direction === "up";
  return (
    <article
      className="
        flex
        min-h-29
        items-center
        gap-4
        rounded-xl
        border
        border-slate-200
        bg-white
        px-5
        shadow-[0_2px_10px_rgba(15,23,42,0.03)]
      "
    >
      <div
        className={`
          flex
          h-14
          w-14
          shrink-0
          items-center
          justify-center
          rounded-xl
          ${config[type].boxClass}
        `}
      >
        <Icon size={28} strokeWidth={1.8} />
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-800">
          {title}
        </p>

        <p className="mt-1 text-[25px] font-bold leading-none text-slate-950">
          {value}
        </p>

        <div className="mt-3 flex items-center gap-1 text-xs text-slate-500">
          <span
            className={`flex items-center font-medium ${
              isUp ? "text-emerald-500" : "text-rose-500"
            }`}
          >
            {isUp ? (
              <FiArrowUp size={13} />
            ) : (
              <FiArrowDown size={13} />
            )}

            {change}
          </span>

          {/* <span>vs last month</span> */}
        </div>
      </div>
    </article>
  );
}

export default UserStatsCard