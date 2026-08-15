const DetailsCard = ({
  title,
  items = [],
}) => {
  return (
    <section
      className="
        rounded-xl
        border
        border-slate-200
        bg-white
        p-5
      "
    >
      <h3 className="font-semibold text-slate-900">
        {title}
      </h3>

      <div className="mt-4 space-y-4">
        {items.map(
          ({
            label,
            value,
            icon: Icon,
          }) => (
            <div
              key={label}
              className="
                flex
                items-start
                gap-3
              "
            >
              <Icon
                className="
                  mt-0.5
                  shrink-0
                  text-slate-400
                "
                size={17}
              />

              <div>
                <p className="text-xs text-slate-400">
                  {label}
                </p>

                <p className="mt-1 text-sm font-medium text-slate-700">
                  {value}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default DetailsCard;