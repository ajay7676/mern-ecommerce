
const ProfileSkeleton = () => {
  return (
     <div className="rounded-2xl border border-base-300 bg-base-100 p-6">
      <div className="flex items-center gap-4">
        <div className="skeleton h-20 w-20 rounded-full" />

        <div className="space-y-2">
          <div className="skeleton h-5 w-48" />
          <div className="skeleton h-4 w-64" />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
        {[1, 2, 3, 4].map((item) => (
          <div key={item}>
            <div className="skeleton h-3 w-24" />
            <div className="skeleton mt-2 h-5 w-40" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProfileSkeleton