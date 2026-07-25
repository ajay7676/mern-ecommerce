
const PaymentProviderLogo = ({ type }) => {
  if (type === "visa") {
    return (
      <div
        className="
          flex h-14 w-19 items-center justify-center
          rounded-md bg-linear-to-br
          from-blue-900 to-blue-700
          text-xl font-black italic text-white
        "
      >
        VISA
      </div>
    );
  }

  if (type === "mastercard") {
    return (
      <div
        className="
          flex h-14 w-19 items-center justify-center
          rounded-md border border-slate-200 bg-white
        "
      >
        <div className="flex -space-x-2">
          <span className="h-8 w-8 rounded-full bg-red-500" />
          <span className="h-8 w-8 rounded-full bg-orange-400/90" />
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        flex h-14 w-19 items-center justify-center
        rounded-md border border-slate-200 bg-white
        text-lg font-black italic text-slate-600
      "
    >
      UPI
    </div>
  );
};

export default PaymentProviderLogo;