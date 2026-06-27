const colors = ["bg-rose-300", "bg-blue-300", "bg-yellow-300", "bg-green-300"];

const ColorSelector = () => {
  return (
    <div className="mt-6">
      <p className="text-sm font-bold text-slate-700 mb-3">
        Color: <span className="font-medium text-slate-600">Terracotta Floral</span>
      </p>

      <div className="flex gap-3">
        {colors.map((color, index) => (
          <button
            key={color}
            className={`w-14 h-16 rounded-lg border-2 ${color} ${
              index === 0 ? "border-indigo-500" : "border-transparent"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;