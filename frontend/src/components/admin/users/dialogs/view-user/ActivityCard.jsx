const ActivityCard = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div
      className="
        flex
        items-center
        gap-4
        rounded-xl
        border
        border-slate-200
        bg-white
        p-5
      "
    >
      <div
        className="
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-lg
          bg-violet-50
          text-violet-600
        "
      >
        <Icon size={19} />
      </div>

      <div>
        <p className="text-xs text-slate-400">
          {label}
        </p>

        <p className="mt-1 text-sm font-semibold text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
};


export default ActivityCard;