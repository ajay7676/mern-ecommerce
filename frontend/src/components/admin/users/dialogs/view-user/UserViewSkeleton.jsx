const UserViewSkeleton = () => {
  return (
    <div className="space-y-5">
      <div
        className="
          h-36
          animate-pulse
          rounded-xl
          bg-slate-200
        "
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <div
          className="
            h-40
            animate-pulse
            rounded-xl
            bg-slate-200
          "
        />

        <div
          className="
            h-40
            animate-pulse
            rounded-xl
            bg-slate-200
          "
        />
      </div>

      <div
        className="
          h-28
          animate-pulse
          rounded-xl
          bg-slate-200
        "
      />
    </div>
  );
};

export default UserViewSkeleton;