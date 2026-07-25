import clsx from "clsx";
import PaymentProviderLogo from "./PaymentProviderLogo";

const PaymentMethodCard = ({
  method,
  onEdit,
  onRemove,
  onSetDefault,
}) => {
  const isUpi = method.type === "upi";

  return (
    <article
      className={clsx(
        "flex min-h-36.25 flex-col gap-5 rounded-xl",
        "border bg-white p-5 sm:flex-row sm:items-center",
        method.isDefault
          ? "border-indigo-300 shadow-[0_5px_20px_rgba(79,70,229,0.05)]"
          : "border-slate-200",
      )}
    >
      <PaymentProviderLogo type={method.type} />

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-[15px] font-semibold text-slate-950">
            {isUpi
              ? "UPI"
              : `${method.brand} ${method.maskedNumber}`}
          </h3>

          {method.isDefault && (
            <span
              className="
                rounded-md bg-indigo-50 px-3 py-1
                text-xs font-semibold text-indigo-600
              "
            >
              Default
            </span>
          )}
        </div>

        {isUpi ? (
          <div className="mt-3 space-y-1 text-sm text-slate-600">
            <p>{method.upiId}</p>
            <p>{method.description}</p>
          </div>
        ) : (
          <div className="mt-3 space-y-1 text-sm text-slate-600">
            <p>Expires {method.expiryDate}</p>
            <p>{method.holderName}</p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-8 sm:self-end">
        {!method.isDefault && (
          <button
            type="button"
            onClick={() => onSetDefault(method.id)}
            className="
              text-sm font-medium text-indigo-600
              hover:text-indigo-700
            "
          >
            Set Default
          </button>
        )}

        <button
          type="button"
          onClick={() => onEdit(method)}
          className="
            text-sm font-medium text-indigo-600
            hover:text-indigo-700
          "
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() => onRemove(method.id)}
          className="
            text-sm font-medium text-red-500
            hover:text-red-600
          "
        >
          Remove
        </button>
      </div>
    </article>
  );
};

export default PaymentMethodCard;