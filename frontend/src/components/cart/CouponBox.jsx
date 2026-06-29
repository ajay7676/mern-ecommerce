import { FiPercent } from "react-icons/fi";

const CouponBox = () => {
  return (
    <div className="border border-violet-200 bg-violet-50 rounded-2xl p-5 flex items-center gap-4">
      <div className="w-16 h-16 rounded-xl bg-violet-600 text-white flex items-center justify-center">
        <FiPercent className="text-3xl" />
      </div>

      <div className="flex-1">
        <h3 className="font-bold text-violet-700">Have a coupon code?</h3>
        <p className="text-sm text-slate-600">
          Apply code and unlock exciting discounts!
        </p>

        <div className="flex mt-3">
          <input
            type="text"
            placeholder="Enter coupon code"
            className="input input-sm input-bordered bg-white flex-1 rounded-r-none"
          />
          <button className="btn btn-sm bg-violet-600 text-white border-none rounded-l-none">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default CouponBox;