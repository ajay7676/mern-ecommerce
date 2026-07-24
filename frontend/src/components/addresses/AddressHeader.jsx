import { FiPlus } from "react-icons/fi";

const AddressHeader = ({ onAddAddress }) => {
  return (
    <header
      className="
        flex flex-col gap-5
        sm:flex-row sm:items-start sm:justify-between
      "
    >
      <div>
        <h1 className="text-2xl font-bold tracking-[-0.02em] text-slate-950">
          My Addresses
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Manage your saved addresses for a faster checkout experience.
        </p>
      </div>

      <button
        type="button"
        onClick={onAddAddress}
        className="
          btn h-11 min-h-11 rounded-md border-none
          bg-indigo-600 px-5 text-sm font-medium
          text-white shadow-none hover:bg-indigo-700
        "
      >
        <FiPlus className="h-[18px] w-[18px]" />
        Add New Address
      </button>
    </header>
  );
};

export default AddressHeader;