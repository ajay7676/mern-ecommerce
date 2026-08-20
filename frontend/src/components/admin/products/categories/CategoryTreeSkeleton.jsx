const SkeletonLine = ({
  width = "w-24",
  level = 0,
}) => {
  return (
    <div
      className="
        flex
        h-7.5
        items-center
        gap-2
      "
      style={{
        paddingLeft:
          level * 18,
      }}
    >
      <div
        className="
          h-3
          w-3
          animate-pulse
          rounded
          bg-slate-200
        "
      />

      <div
        className="
          h-4
          w-4
          animate-pulse
          rounded
          bg-slate-200
        "
      />

      <div
        className={`
          h-3
          animate-pulse
          rounded
          bg-slate-200
          ${width}
        `}
      />
    </div>
  );
};

const CategoryTreeSkeleton =
  () => {
    return (
      <div>
        <SkeletonLine
          width="w-28"
        />

        <div
          className="
            ml-2.25
            border-l
            border-dotted
            border-slate-200
          "
        >
          <SkeletonLine
            width="w-16"
            level={1}
          />

          <SkeletonLine
            width="w-20"
            level={1}
          />

          <SkeletonLine
            width="w-24"
            level={1}
          />

          <SkeletonLine
            width="w-16"
            level={2}
          />

          <SkeletonLine
            width="w-20"
            level={2}
          />

          <SkeletonLine
            width="w-32"
            level={2}
          />

          <SkeletonLine
            width="w-16"
            level={1}
          />
        </div>
      </div>
    );
  };

export default CategoryTreeSkeleton;