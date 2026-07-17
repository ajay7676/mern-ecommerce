
import clsx from "clsx";

const StockCell = ({ product }) => {
  const {
    stock = 0,
    doh = 0,
  } = product;

  const lowStock = stock < 10;

  return (
    <div className="min-w-30">
      <p
        className={clsx(
          "text-sm font-semibold",
          lowStock ? "text-red-600" : "text-slate-900"
        )}
      >
        {stock} Units
      </p>

      <p className="mt-1 text-xs text-slate-500">
        DoH &gt; {doh} Days
      </p>
    </div>
  );
};

export default StockCell;