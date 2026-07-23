import { useMemo } from "react";
import { FiInfo, FiLock } from "react-icons/fi";
import PaymentMethods from "./PaymentMethods";

const EMPTY_ITEMS = [];

const safeNumber = (value) => {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : 0;
};

const formatMoney = (amount, currency = "INR") => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(safeNumber(amount));
};

const OrderSummary = ({ cart }) => {
  const items = cart?.items ?? EMPTY_ITEMS;
  const currency = items[0]?.pricing?.current?.currency || "INR";
  const summary = useMemo(() => {
    const mrpTotal = items.reduce((total, item) => {
      return (
        total +
        safeNumber(item?.pricing?.current?.price) * safeNumber(item.quantity)
      );
    }, 0);

    const sellingTotal = items.reduce((total, item) => {
      return total + safeNumber(item?.pricing?.current?.finalPrice) * safeNumber(item.quantity);
    }, 0);

    const discount = Math.max(mrpTotal - sellingTotal, 0);
    const hasBackendTotal =
      cart?.totalAmount !== undefined &&
      cart?.totalAmount !== null &&
      Number.isFinite(Number(cart.totalAmount));
    return {
      mrpTotal,
      discount,
      totalAmount: hasBackendTotal
        ? safeNumber(cart.totalAmount)
        : sellingTotal,
    };
  }, [items, cart]);
  return (
    <div className="border border-slate-200 rounded-2xl p-5 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900">Order Summary</h3>
      <div className="space-y-4 mt-5 text-sm">
        <SummaryRow
          label={`MRP (${items.length} Items)`}
          value={formatMoney(summary.mrpTotal, currency)}
          // value={`₹${mrpTotal}`}
        />
        <SummaryRow
          label="Discount on MRP"
          value={`- ${formatMoney(summary.discount, currency)}`}
          success
        />
        {/* <SummaryRow
          label="Valid Super Store Cash Applied"
          value="- ₹350"
          success
        /> */}
        <SummaryRow
          label={
            <span className="flex items-center gap-1">
              Shipping <FiInfo />
            </span>
          }
          value="FREE"
          success
        />
      </div>

      <div className="divider" />

      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-black text-slate-900">Total Amount</h3>
          <p className="text-xs text-slate-500">Inclusive of all taxes</p>
        </div>

        <p className="text-3xl font-black text-slate-900">{formatMoney(summary.totalAmount, currency)}</p>
      </div>
       {summary.discount > 0 && (
      <div className="alert bg-green-50 border border-green-100 text-green-700 mt-5 py-3">
        <FiInfo />
        <span className="text-sm font-semibold">
          You are saving  <strong>{formatMoney(summary.discount, currency)}</strong> on this order
        </span>
      </div>
        )}
      <div className="mt-5">
        <PaymentMethods />
      </div>
      <button 
      type="button"
       disabled={items.length === 0}
      className="btn w-full bg-red-500 hover:bg-red-600 text-white border-none mt-5">
        <FiLock />
        Proceed To Checkout
      </button>

      <p className="flex items-center justify-center gap-2 text-xs text-slate-500 mt-3">
        <FiLock />
        100% Secure Payments
      </p>
    </div>
  );
};

const SummaryRow = ({ label, value, success }) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-600">{label}</span>
      <span
        className={`font-bold ${success ? "text-green-600" : "text-slate-900"}`}
      >
        {value}
      </span>
    </div>
  );
};

export default OrderSummary;
