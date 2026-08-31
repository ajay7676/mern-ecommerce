const AttributeStatCard = ({
  icon,
  value,
  title,
  subtitle,
  iconClassName,
}) => {
  return (
    <div
      className="
        flex min-h-25.5 items-center gap-4
        rounded-lg border border-slate-100
        bg-white px-4 py-4
        shadow-sm
      "
    >
      <div
        className={`
          flex h-12 w-12 shrink-0 items-center justify-center
          rounded-full
          ${iconClassName}
        `}
      >
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-2xl font-bold leading-none text-slate-950">
          {value}
        </p>

        <p className="mt-2 text-sm font-medium text-[#253875]">
          {title}
        </p>

        {subtitle && (
          <p className="mt-1 text-xs text-slate-500">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default AttributeStatCard;