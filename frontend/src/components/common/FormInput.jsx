const FormInput = ({ label, icon: Icon, error, ...props }) => {
  return (
    <label className="form-control">
        <span className="label-text font-semibold text-slate-700">
        {label}
        </span>
        <div className="input input-bordered flex items-center gap-3 bg-white w-full mt-2 mb-2">
            {Icon && <Icon className="text-slate-500" />}
            <input {...props} className="grow" />
        </div>
        {error && <span className="text-xs text-red-500 mt-1">{error}</span>}

    </label>
  );
};

export default FormInput;
