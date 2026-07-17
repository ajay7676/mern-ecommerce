
import clsx from "clsx";

const StatsCard = ({columns, className }) => {
  return (
     <div
      className={clsx(
        "rounded-xl",
        "border border-[#E5E7EB]",
        "bg-white",
        "shadow-[0_1px_3px_rgba(15,23,42,0.06)]",
        "overflow-hidden",
        className
      )}
    >
        <div
        className="grid h-full"
        style={{
          gridTemplateColumns: `repeat(${columns.length}, minmax(0,1fr))`,
        }}
      >
        {columns.map((item, index) => (
          <div
            key={index}
            className={clsx(
              "px-14 py-4",
              index !== columns.length - 1 &&
                "border-r border-[#ECEEF2]"
            )}
          >
            <p className="text-[11px] text-[#7B8794] whitespace-nowrap">
              {item.title}
            </p>

            <h3 className="mt-2 text-[31px] font-semibold leading-none text-[#1F2937]">
              {item.value}
            </h3>

            <p className="mt-4 text-[11px] text-[#7B8794] whitespace-nowrap">
              {item.subtitle}
            </p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default StatsCard