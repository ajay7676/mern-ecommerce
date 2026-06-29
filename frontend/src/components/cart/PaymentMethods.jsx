import { FiCreditCard } from "react-icons/fi";
import { BsWallet2 } from "react-icons/bs";
import { RiBankCardLine } from "react-icons/ri";

const methods = [
  { label: "Cards", icon: FiCreditCard },
  { label: "UPI", icon: RiBankCardLine },
  { label: "Wallet", icon: BsWallet2 },
  { label: "COD", icon: FiCreditCard },
];

const PaymentMethods = () => {
  return (
    <div>
      <p className="text-sm font-bold text-slate-900 mb-3">We Accept</p>
      <div className="flex flex-wrap gap-2">
        {methods.map((method) => {
          const Icon = method.icon;

          return (
            <div
              key={method.label}
              className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold text-slate-700"
            >
              <Icon />
              {method.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentMethods;
