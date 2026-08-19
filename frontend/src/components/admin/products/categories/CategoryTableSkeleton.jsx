
const SkeletonBlock = ({ className = "" }) => {
  return (
    <div
      className={`
        animate-pulse
        rounded-md
        bg-slate-200/80
        ${className}
      `}
    />
  );
};

const CategoryTableSkeleton = ({
  rows = 8,
}) => {
  return (
    <div
      className="
        overflow-hidden
        bg-white
      "
      aria-label="Loading categories"
      aria-busy="true"
    >
      <div className="overflow-x-auto">
        <table
          className="
            w-full
            min-w-212.5
            border-collapse
          "
        >
          <thead>
            <tr
              className="
                h-11
                border-b
                border-slate-200
                bg-slate-50/80
                text-left
              "
            >
              <th className="w-10.5 px-3" />

              <th className="w-15 px-2">
                <span className="text-[11px] font-semibold text-slate-700">
                  #
                </span>
              </th>

              <th className="min-w-55 px-2">
                <span className="text-[11px] font-semibold text-slate-700">
                  Category Name
                </span>
              </th>

              <th className="min-w-42.5 px-2">
                <span className="text-[11px] font-semibold text-slate-700">
                  Parent Category
                </span>
              </th>

              <th className="w-25 px-2">
                <span className="text-[11px] font-semibold text-slate-700">
                  Products
                </span>
              </th>

              <th className="w-30 px-2">
                <span className="text-[11px] font-semibold text-slate-700">
                  Status
                </span>
              </th>

              <th className="w-27.5 px-2">
                <span className="text-[11px] font-semibold text-slate-700">
                  Sort Order
                </span>
              </th>

              <th className="w-27.5 px-2">
                <span className="text-[11px] font-semibold text-slate-700">
                  Actions
                </span>
              </th>
            </tr>
          </thead>

          <tbody>
            {Array.from({
              length: rows,
            }).map((_, index) => (
              <tr
                key={index}
                className="
                  h-14.5
                  border-b
                  border-slate-100
                "
              >
                <td className="px-3">
                  <SkeletonBlock className="h-4 w-4 rounded" />
                </td>

                <td className="px-2">
                  <SkeletonBlock className="h-3 w-5" />
                </td>

                <td className="px-2">
                  <div className="flex items-center gap-3">
                    <SkeletonBlock className="h-8 w-8 shrink-0 rounded-lg" />

                    <div className="space-y-2">
                      <SkeletonBlock
                        className={`
                          h-3
                          ${
                            index % 3 === 0
                              ? "w-28"
                              : index % 3 === 1
                                ? "w-36"
                                : "w-24"
                          }
                        `}
                      />

                      <SkeletonBlock className="h-2.5 w-20" />
                    </div>
                  </div>
                </td>

                <td className="px-2">
                  <SkeletonBlock
                    className={`
                      h-3
                      ${
                        index % 2 === 0
                          ? "w-20"
                          : "w-28"
                      }
                    `}
                  />
                </td>

                <td className="px-2">
                  <SkeletonBlock className="h-3 w-8" />
                </td>

                <td className="px-2">
                  <SkeletonBlock className="h-6 w-16 rounded-full" />
                </td>

                <td className="px-2">
                  <SkeletonBlock className="h-3 w-7" />
                </td>

                <td className="px-2">
                  <div className="flex items-center gap-3">
                    <SkeletonBlock className="h-7 w-7 rounded-md" />
                    <SkeletonBlock className="h-7 w-7 rounded-md" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        className="
          flex
          flex-col
          gap-4
          border-t
          border-slate-100
          px-5
          py-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <SkeletonBlock className="h-3 w-44" />

        <div className="flex items-center gap-2">
          <SkeletonBlock className="h-8 w-8 rounded-md" />
          <SkeletonBlock className="h-8 w-8 rounded-md" />
          <SkeletonBlock className="h-8 w-8 rounded-md" />
          <SkeletonBlock className="h-8 w-24 rounded-md" />
        </div>
      </div>
    </div>
  )
}

export default CategoryTableSkeleton