import { FiShield } from "react-icons/fi";
import  { morePaymentOptions } from '.././../constants/payments/paymentMethods.data'
import PaymentOptionItem from "./PaymentOptionItem";

const PaymentOptionsPanel = () => {
  return (
    <aside
      className="
        rounded-xl border border-slate-200
        bg-white p-6
        shadow-[0_4px_18px_rgba(15,23,42,0.035)]
      "
    >
      <h2 className="text-base font-semibold text-slate-950">
        More Payment Options
      </h2>

      <div className="mt-7 space-y-7">
        {morePaymentOptions.map((option) => (
          <PaymentOptionItem
            key={option.id}
            {...option}
          />
        ))}
      </div>

      <div className="mt-8 border-t border-slate-200 pt-6">
        <div className="flex items-start gap-3">
          <FiShield className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600" />

          <p className="text-xs leading-5 text-slate-500">
            We do not store your CVV or full card details.
            All transactions are secure and encrypted.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default PaymentOptionsPanel;