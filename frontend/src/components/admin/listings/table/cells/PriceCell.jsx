
const formatPrice = (price = 0) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

const PriceCell = ({ product }) => {
  const {
    listingPrice = 0,
    finalPrice = 0,
  } = product;

  return (
    <div className="min-w-35 space-y-2">
      <div>
        <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
          Listing
        </p>

        <p className="mt-0.5 text-sm font-semibold text-slate-900">
          {formatPrice(listingPrice)}
        </p>
      </div>

      <div>
        <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
          Final
        </p>

        <p className="mt-0.5 text-sm font-semibold text-emerald-600">
          {formatPrice(finalPrice)}
        </p>
      </div>
    </div>
  );
};

export default PriceCell;