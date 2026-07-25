import {
  FiCheckCircle,
  FiLock,
  FiShield,
} from "react-icons/fi";

const SecurePaymentBanner = () => {
  return (
    <section
      className="
        flex flex-col gap-5 rounded-xl
        bg-linear-to-r from-indigo-50
        via-violet-50 to-indigo-50
        px-5 py-5
        sm:flex-row sm:items-center
        sm:justify-between
      "
    >
      <div className="flex items-center gap-4">
        <div
          className="
            flex h-12 w-12 items-center justify-center
            rounded-full bg-white text-indigo-600
          "
        >
          <FiShield className="h-6 w-6" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-950">
            100% Secure Payments
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Your payment information is encrypted and safe with us.
          </p>
        </div>
      </div>

      <div
        className="
          inline-flex w-fit items-center gap-2
          rounded-md bg-white/70 px-3 py-2
          text-xs font-medium text-slate-600
        "
      >
        <FiLock className="h-4 w-4" />
        PCI DSS Compliant
        <FiCheckCircle className="h-4 w-4 text-emerald-600" />
      </div>
    </section>
  );
};

export default SecurePaymentBanner;