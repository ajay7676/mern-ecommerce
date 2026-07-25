import { FiPlus } from "react-icons/fi";

const PaymentHeader = ({ onAddCard }) => {
  return (
    <header
      className="
        flex flex-col gap-5
        sm:flex-row sm:items-start sm:justify-between
      "
    >
      <div>
        <h1 className="text-2xl font-bold text-slate-950">
          Payment Methods
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Manage your saved payment methods for a faster and secure checkout.
        </p>
      </div>

      <button
        type="button"
        onClick={onAddCard}
        className="
          btn h-11 min-h-11 rounded-md border-none
          bg-indigo-600 px-5 text-sm font-medium
          text-white shadow-none hover:bg-indigo-700
        "
      >
        <FiPlus className="h-4.5 w-4.5" />
        Add New Card
      </button>
    </header>
  );
};

export default PaymentHeader;