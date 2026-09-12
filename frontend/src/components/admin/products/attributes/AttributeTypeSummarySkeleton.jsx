
const AttributeTypeSummarySkeleton = () => {
  return (
     <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="h-5 w-40 animate-pulse rounded bg-slate-200" />
      <div className="mt-2 h-4 w-56 animate-pulse rounded bg-slate-200" />

      <div className="mt-5 space-y-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-200" />

              <div>
                <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
                <div className="mt-2 h-3 w-36 animate-pulse rounded bg-slate-200" />
              </div>
            </div>

            <div className="h-7 w-10 animate-pulse rounded-full bg-slate-200" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default AttributeTypeSummarySkeleton