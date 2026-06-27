const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

const SizeSelector = () => {
  return (
    <div className="mt-6">
      <div className="flex justify-between mb-3">
        <p className="text-sm font-bold text-slate-700">Size:</p>
        <button className="text-sm text-indigo-600 font-semibold">Size Guide</button>
      </div>

      <div className="flex flex-wrap gap-3">
        {sizes.map((size) => (
          <button
            key={size}
            className={`w-12 h-10 rounded-lg border text-sm font-semibold ${
              size === "L"
                ? "border-indigo-500 bg-slate-100 text-indigo-600"
                : "border-slate-300 text-slate-700"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;