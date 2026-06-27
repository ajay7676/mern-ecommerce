import { FiMapPin, FiRefreshCcw, FiShield, FiLock } from "react-icons/fi";

const DeliveryInfo = () => {
  return (
    <aside className="border border-slate-200 rounded-2xl p-6 h-fit">
      <div className="flex justify-between">
        <p className="font-bold text-slate-700">Delivery to</p>
        <button className="text-indigo-600 text-sm font-semibold">Change</button>
      </div>

      <div className="flex gap-3 mt-5">
        <FiMapPin className="text-xl" />
        <div>
          <p className="font-bold text-slate-700">Mumbai, 400001</p>
          <p className="text-sm text-slate-500">Maharashtra</p>
        </div>
      </div>

      <div className="border-t border-slate-200 mt-5 pt-5 space-y-6">
        <div>
          <p className="font-bold text-slate-700">Delivery by</p>
          <p className="text-sm mt-1">
            Wed, 28 May <span className="text-green-600 font-bold">FREE Delivery</span>
          </p>
        </div>

        <div className="flex gap-3">
          <FiRefreshCcw className="text-xl" />
          <div>
            <p className="font-bold text-slate-700">Easy 7-Day Returns</p>
            <p className="text-sm text-slate-500">Hassle-free returns</p>
          </div>
        </div>

        <div className="flex gap-3">
          <FiShield className="text-xl" />
          <div>
            <p className="font-bold text-slate-700">100% Quality Assured</p>
            <p className="text-sm text-slate-500">StyleHive Quality Check</p>
          </div>
        </div>

        <div className="flex gap-3">
          <FiLock className="text-xl" />
          <div>
            <p className="font-bold text-slate-700">Secure Checkout</p>
            <p className="text-sm text-slate-500">Safe & encrypted payments</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DeliveryInfo;