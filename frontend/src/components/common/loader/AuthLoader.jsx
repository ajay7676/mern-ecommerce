const AuthLoader = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-base-100">
      <span className="loading loading-spinner loading-lg text-primary"></span>

      <h2 className="mt-4 text-lg font-semibold text-base-content">
        Checking authentication...
      </h2>

      <p className="mt-1 text-sm text-base-content/70">Please wait a moment.</p>
    </div>
  );
};

export default AuthLoader;
