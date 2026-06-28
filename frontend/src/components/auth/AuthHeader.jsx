const AuthHeader = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-7">
      <div className="flex items-center justify-center gap-2">
        <div className="w-8 h-8 rounded bg-blue-600 text-white flex items-center justify-center font-bold">
          V
        </div>
        <h2 className="text-2xl font-bold text-blue-600">Valid India</h2>
      </div>

      <h1 className="text-2xl font-bold text-slate-900 mt-7">{title}</h1>
      <p className="text-sm text-slate-500 mt-2">{subtitle}</p>
    </div>
  );
};

export default AuthHeader;
