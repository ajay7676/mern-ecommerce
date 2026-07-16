import clsx from "clsx";

const Card = ({
  title,
  icon: Icon,
  rightContent,
  children,
  className = "",
}) => {
  return(
    <section
      className={clsx(
        "rounded-2xl",
        "border border-[#E8ECF2]",
        "bg-white",
        "shadow-[0_2px_6px_rgba(15,23,42,.05)]",
        "transition-all duration-300",
        "hover:shadow-[0_8px_24px_rgba(15,23,42,.08)]",
        className
      )}
    >
      <header className="flex items-center justify-between border-b border-[#EEF2F7] px-5 py-4">
        <div className="flex items-center gap-3">
          {Icon && (
            <Icon
              size={18}
              className="text-slate-500"
              strokeWidth={2}
            />
          )}

          <h3 className="text-[15px] font-semibold text-slate-700">
            {title}
          </h3>
        </div>

        {rightContent}
      </header>

      <div>{children}</div>

    </section>
  )
};

export default Card;
