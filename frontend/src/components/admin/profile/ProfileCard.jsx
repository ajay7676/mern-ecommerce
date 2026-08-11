const ProfileCard = ({
  title,
  action,
  onAction,
  children,
  className = "",
}) => {
  return (
    <section
      className={`
        rounded-[10px]
        border
        border-[#d9dde2]
        bg-white
        shadow-[0_1px_4px_rgba(0,0,0,0.12)]
        ${className}
      `}
    >
      <div className="flex items-center justify-between px-5 pt-5">
        <h2 className="text-[17px] font-semibold text-[#32383f]">
          {title}
        </h2>

        {action && (
          <button
            type="button"
            onClick={onAction}
            className="
              text-[12px]
              font-semibold
              uppercase
              tracking-[0.02em]
              text-[#1976b9]
              transition-colors
              hover:text-[#125d91]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#1976b9]
              focus-visible:ring-offset-2
            "
          >
            {action}
          </button>
        )}
      </div>

      <div className="px-5 pb-5 pt-3">
        {children}
      </div>
    </section>
  );
};

export default ProfileCard;