const PageLoader = ({
  size = "loading-lg",
  text = "Loading...",
}
) => {
  return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-base-100">
      <span
        className={`loading loading-spinner ${size} text-primary`}
      ></span>

      <p className="text-sm text-base-content/70">
        {text}
      </p>
    </div>
  );
};

export default PageLoader;
