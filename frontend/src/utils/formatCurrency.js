export const formatCurrency = (
  amount,
  currency = "INR",
  locale = "en-IN",
) => {
  const safeAmount = Number(amount);

  if (!Number.isFinite(safeAmount)) {
    return "₹0";
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(safeAmount);
};