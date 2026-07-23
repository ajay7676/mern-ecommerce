import { FiMinus, FiPlus } from "react-icons/fi";

const QuantitySelector = ({ value, onChange, max, disabled = false }) => {
  return (
    <div className="mt-6 flex items-center gap-4">
      <p className="text-sm font-bold text-slate-700">Quantity:</p>

      <div className="flex items-center border border-slate-300  rounded-lg overflow-hidden">
        <button
           type="button"
          disabled={disabled || value <= 1}
          onClick={() => onChange(value - 1)}
          className="w-9 h-9 bg-slate-100 hover:bg-slate-200 flex justify-center items-center
         transition-all text-center duration-300 ease-in-out cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
           aria-label="Decrease quantity"
        >
          <FiMinus />
        </button>
        {/* <span className="w-10 text-center text-sm font-semibold">{value}</span> */}
         <input
          id="product-quantity"
          type="number"
          min="1"
          max={max}
          value={value}
          disabled={disabled}
          onChange={(event) =>
            onChange(
              event.target.value
            )
          }
          className="h-9 w-14 border-x border-slate-300 text-center outline-none cursor"
        />
        <button
           type="button"
          disabled={
            disabled ||
            value >= max
          }
          onClick={() =>
            onChange(value + 1)
          }
          className="w-9 h-9 bg-slate-100 hover:bg-slate-200 flex justify-center items-center
         transition-all duration-300 ease-in-out cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
        >
          <FiPlus />
        </button>
      </div>

      <p
        className={`text-sm font-semibold  ${
           max > 0 && max <= 5  ? "text-red-500" : "text-green-600"
        }`}
      >
        { max <= 0 
          ? "Out of stock"
          : max > 0 && max <= 5
            ? `Only ${max} left in stock!`
            : "In stock"}
      </p>
    </div>
  );
};

export default QuantitySelector;
