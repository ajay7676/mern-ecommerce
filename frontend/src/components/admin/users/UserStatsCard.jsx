const UserStatCard = ({
  title,
  value,
  icon: Icon,
  description,
  isLoading = false,
}) => {
  return (
    <div
      className="
        rounded-xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
      "
    >
      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >
        <div>
          <p
            className="
              text-sm
              font-medium
              text-slate-500
            "
          >
            {title}
          </p>

          {isLoading ? (
            <div
              className="
                mt-3
                h-8
                w-16
                animate-pulse
                rounded
                bg-slate-200
              "
            />
          ) : (
            <p
              className="
                mt-2
                text-3xl
                font-bold
                text-slate-900
              "
            >
              {value ?? 0}
            </p>
          )}

          {description && (
            <p
              className="
                mt-2
                text-xs
                text-slate-400
              "
            >
              {description}
            </p>
          )}
        </div>

        <div
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-slate-100
            text-slate-600
          "
        >
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
};

export default UserStatCard;