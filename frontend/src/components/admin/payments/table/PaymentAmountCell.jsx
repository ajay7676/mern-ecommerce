const PaymentAmountCell = ({
  amount = 0,
  currency = "INR",
  positive = true,
}) => {
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  });

  return (
    <span
      className={`font-semibold ${
        positive ? "text-success" : "text-error"
      }`}
    >
      {formatter.format(amount)}
    </span>
  );
};

export default PaymentAmountCell;