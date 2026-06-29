import { FiCheckCircle } from "react-icons/fi";

const DeliveryAddress = () => {
  return (
    <div className="border border-slate-200 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-900">Delivery Address</h3>
        <button className="text-sm font-semibold text-indigo-600">Edit</button>
      </div>

      <div className="mt-5">
        <p className="font-bold text-slate-900">
          Ajay Chauhan{" "}
          <span className="badge badge-sm bg-violet-100 text-violet-600 border-none">
            HOME
          </span>
        </p>

        <p className="text-sm text-slate-600 mt-3 leading-6">
          2th Floor, 458, Park Avenue, Koramangala 4th Block, Bengaluru,
          Karnataka 560034
        </p>

        <p className="text-sm text-slate-600 mt-2">+91 98765 43210</p>

        <p className="flex items-center gap-2 text-sm text-green-600 font-semibold mt-4">
          <FiCheckCircle />
          Deliver to this address
        </p>
      </div>
    </div>
  );
};

export default DeliveryAddress;
