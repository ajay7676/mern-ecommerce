export const TAX_RATE_MAP = {
  gst0: 0,
  gst5: 5,
  gst12: 12,
  gst18: 18,
  gst28: 28,
};

export const TAX_LABEL_MAP = {
  gst0: "GST 0%",
  gst5: "GST 5%",
  gst12: "GST 12%",
  gst18: "GST 18%",
  gst28: "GST 28%",
};

export const toNumber = (value) => {
  const number = Number(value);

  if (Number.isNaN(number)) {
    return 0;
  }

  return number;
};

export const formatCurrency = (value) => {
  return `₹${toNumber(value).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const calculatePricing = ({
  sellingPrice,
  discountType,
  discountValue,
  taxClass,
}) => {
  const price = toNumber(sellingPrice);
  const discount = toNumber(discountValue);
  const taxRate = TAX_RATE_MAP[taxClass] ?? 0;

  let discountAmount = 0;

  if (discountType === "percentage") {
    discountAmount = (price * discount) / 100;
  }

  if (discountType === "fixed") {
    discountAmount = discount;
  }

  if (discountType === "none") {
    discountAmount = 0;
  }

  const finalSellingPrice = Math.max(price - discountAmount, 0);

  const taxAmount =
    taxRate > 0
      ? finalSellingPrice - finalSellingPrice / (1 + taxRate / 100)
      : 0;

  const priceExcludingTax = finalSellingPrice - taxAmount;

  return {
    price,
    discount,
    discountAmount,
    finalSellingPrice,
    taxRate,
    taxAmount,
    priceExcludingTax,
  };
};

export const getStockStatus = ({
  stockQuantity,
  lowStockThreshold,
}) => {
  const stock = toNumber(stockQuantity);
  const threshold = toNumber(lowStockThreshold);

  if (stock <= 0) {
    return {
      label: "Out of Stock",
      className: "bg-rose-100 text-rose-700",
    };
  }

  if (threshold > 0 && stock <= threshold) {
    return {
      label: "Low Stock",
      className: "bg-orange-100 text-orange-700",
    };
  }

  return {
    label: "In Stock",
    className: "bg-emerald-100 text-emerald-700",
  };
};