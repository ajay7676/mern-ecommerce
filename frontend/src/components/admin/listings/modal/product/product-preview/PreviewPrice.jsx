const parsePrice = (value) => {
  if (
    value === "" ||
    value === null ||
    value === undefined
  ) {
    return null;
  }

  const number = Number(value);

  return Number.isFinite(number) && number >= 0
    ? number
    : null;
};

const formatCurrency = (
  amount,
  currency = "INR"
) => {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${currency} ${amount}`;
  }
};

const PreviewPrice = ({
  price,
  discountPrice,
  currency = "INR",
}) => {
  const regularPrice = parsePrice(price);

  const parsedDiscountPrice =
    parsePrice(discountPrice);

  const hasValidDiscount =
    regularPrice !== null &&
    regularPrice > 0 &&
    parsedDiscountPrice !== null &&
    parsedDiscountPrice < regularPrice;

  if (regularPrice === null) {
    return (
      <p className="mt-3 text-sm font-medium text-slate-400">
        Price not added
      </p>
    );
  }

  const finalPrice = hasValidDiscount
    ? parsedDiscountPrice
    : regularPrice;

  const discountPercentage = hasValidDiscount
    ? Math.round(
        ((regularPrice - parsedDiscountPrice) /
          regularPrice) *
          100
      )
    : 0;

  return (
    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
      <span
        className={`text-lg font-black ${
          hasValidDiscount
            ? "text-red-500"
            : "text-slate-900"
        }`}
      >
        {formatCurrency(finalPrice, currency)}
      </span>

      {hasValidDiscount && (
        <>
          <span className="text-sm font-medium text-slate-400 line-through">
            {formatCurrency(
              regularPrice,
              currency
            )}
          </span>

          <span className="text-sm font-bold text-emerald-500">
            ({discountPercentage}% OFF)
          </span>
        </>
      )}
    </div>
  );
};

export default PreviewPrice;