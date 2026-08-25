const Skeleton = ({ className = "" }) => {
  return (
    <div
      className={`
        animate-pulse
        rounded-md
        bg-slate-200
        ${className}
      `}
    />
  );
};

const BrandTableSkeleton = ({
  rows = 8,
}) => {
  return (
    <div
      className="
        w-full
        overflow-hidden
        bg-white
      "
      aria-label="Loading brands"
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
          {/* Header */}

          <thead>
            <tr
              className="
                h-11
                border-b
                border-slate-200
                bg-slate-50/70
              "
            >
              <th className="w-8 px-2" />

              <th className="w-12 px-2 text-left">
                <Skeleton className="h-3 w-4" />
              </th>

              <th className="min-w-45 px-2 text-left">
                <Skeleton className="h-3 w-12" />
              </th>

              <th className="min-w-32.5 px-2 text-left">
                <Skeleton className="h-3 w-9" />
              </th>

              <th className="w-22.5 px-2 text-left">
                <Skeleton className="h-3 w-14" />
              </th>

              <th className="w-25 px-2 text-left">
                <Skeleton className="h-3 w-11" />
              </th>

              <th className="w-25 px-2 text-left">
                <Skeleton className="h-3 w-14" />
              </th>

              <th className="w-25 px-2 text-left">
                <Skeleton className="h-3 w-16" />
              </th>

              <th className="w-27.5 px-2 text-left">
                <Skeleton className="h-3 w-12" />
              </th>
            </tr>
          </thead>

          {/* Rows */}

          <tbody>
            {Array.from({
              length: rows,
            }).map((_, index) => (
              <tr
                key={index}
                className="
                  h-12.75
                  border-b
                  border-slate-100
                  last:border-b-0
                "
              >
                {/* Drag */}

                <td className="w-8 px-2">
                  <Skeleton className="h-4 w-3" />
                </td>

                {/* Number */}

                <td className="w-12 px-2">
                  <Skeleton className="h-3 w-4" />
                </td>

                {/* Brand */}

                <td className="min-w-45 px-2">
                  <div className="flex items-center gap-3">
                    <Skeleton
                      className="
                        h-8
                        w-11
                        shrink-0
                      "
                    />

                    <Skeleton className="h-3.5 w-24" />
                  </div>
                </td>

                {/* Slug */}

                <td className="min-w-32.5 px-2">
                  <Skeleton className="h-3 w-20" />
                </td>

                {/* Products */}

                <td className="w-22.5 px-2">
                  <Skeleton className="h-3 w-7" />
                </td>

                {/* Status */}

                <td className="w-25 px-2">
                  <Skeleton
                    className="
                      h-6
                      w-14.5
                      rounded-md
                    "
                  />
                </td>

                {/* Featured */}

                <td className="w-25 px-2">
                  <Skeleton
                    className="
                      h-7
                      w-7
                      rounded-md
                    "
                  />
                </td>

                {/* Sort Order */}

                <td className="w-25 px-2">
                  <Skeleton className="h-3 w-6" />
                </td>

                {/* Actions */}

                <td className="w-27.5 px-2">
                  <div className="flex items-center gap-3">
                    <Skeleton
                      className="
                        h-7
                        w-7
                        rounded-md
                      "
                    />

                    <Skeleton
                      className="
                        h-7
                        w-7
                        rounded-md
                      "
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Fake pagination */}

      <div
        className="
          flex
          flex-col
          gap-4
          border-t
          border-slate-200
          px-5
          py-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <Skeleton className="h-3 w-40" />

        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8" />

          <Skeleton className="h-8 w-8" />

          <Skeleton className="h-8 w-8" />

          <Skeleton className="h-8 w-8" />

          <Skeleton className="ml-2 h-8 w-24" />
        </div>
      </div>
    </div>
  );
};

export default BrandTableSkeleton;