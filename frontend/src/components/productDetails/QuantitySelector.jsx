const QuantitySelector = ({stock}) => {
  return (
    <div className="mt-6 flex items-center gap-4">
      <p className="text-sm font-bold text-slate-700">Quantity:</p>

      <div className="flex items-center border border-slate-300  rounded-lg overflow-hidden">
        <button className="w-9 h-9 bg-slate-100 hover:bg-slate-200 transition-all duration-300 ease-in-out cursor-pointer">−</button>
        <span className="w-10 text-center text-sm font-semibold">1</span>
        <button className="w-9 h-9 bg-slate-100 hover:bg-slate-200 transition-all duration-300 ease-in-out cursor-pointer">+</button>
      </div>

      <p className="text-sm text-red-500 font-semibold">Only {stock} left in stock!</p>
    </div>
  );
};

export default QuantitySelector;