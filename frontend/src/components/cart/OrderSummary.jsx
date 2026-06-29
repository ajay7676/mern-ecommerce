
import { FiInfo, FiLock } from "react-icons/fi";
import PaymentMethods from "./PaymentMethods";

const OrderSummary = () => {
  return (
    <div className="border border-slate-200 rounded-2xl p-5 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900">Order Summary</h3>
        <div className="space-y-4 mt-5 text-sm">
        <SummaryRow label="MRP (3 Items)" value="₹8,997" />
        <SummaryRow label="Discount on MRP" value="- ₹3,598" success />
        <SummaryRow label="Valid Super Store Cash Applied" value="- ₹350" success />
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

        <p className="text-3xl font-black text-slate-900">₹5,049</p>
      </div>

      <div className="alert bg-green-50 border border-green-100 text-green-700 mt-5 py-3">
        <FiInfo />
        <span className="text-sm font-semibold">
          You are saving ₹3,948 on this order
        </span>
      </div>
        <div className="mt-5">
            <PaymentMethods />
        </div>
        <button className="btn w-full bg-red-500 hover:bg-red-600 text-white border-none mt-5">
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
        className={`font-bold ${
          success ? "text-green-600" : "text-slate-900"
        }`}
      >
        {value}
      </span>
    </div>
  );
};

export default OrderSummary