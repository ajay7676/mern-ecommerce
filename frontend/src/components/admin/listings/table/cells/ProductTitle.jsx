 
import clsx from "clsx";

const ProductTitle = ({
  name,
  sku,
  brand,
  className = "",
}) => {
  return (
    <div
      className={clsx(
        "min-w-0 flex-1",
        className
      )}
    >
      <h3
        title={name}
        className="
          truncate
          text-sm
          font-semibold
          leading-5
          text-slate-900
        "
      >
        {name}
      </h3>

      {sku && (
        <p
          title={sku}
          className="
            mt-1
            truncate
            text-xs
            text-slate-500
          "
        >
          SKU : {sku}
        </p>
      )}

      {brand && (
        <p className="mt-1 text-xs text-slate-500">
          Brand :{" "}
          <span className="font-medium">
            {brand}
          </span>
        </p>
      )}
    </div>
  );
};

export default ProductTitle;