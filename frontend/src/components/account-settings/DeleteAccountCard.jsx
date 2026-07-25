import { FiTrash2 } from "react-icons/fi";

const DeleteAccountCard = ({ onDelete }) => {
  return (
    <section
      className="
        rounded-xl border border-slate-200
        bg-white p-5
        shadow-[0_4px_18px_rgba(15,23,42,0.035)]
        sm:p-6
      "
    >
      <h2 className="text-base font-semibold text-slate-950">
        Delete Account
      </h2>

      <p className="mt-2 text-xs leading-5 text-slate-500">
        Once you delete your account, there is no going back.
      </p>

      <button
        type="button"
        onClick={onDelete}
        className="
          btn mt-5 h-11 min-h-11 rounded-md
          border-red-400 bg-white px-5
          text-sm font-medium text-red-500
          shadow-none hover:border-red-500
          hover:bg-red-50
        "
      >
        <FiTrash2 className="h-4.5 w-4.5" />
        Delete My Account
      </button>
    </section>
  );
};

export default DeleteAccountCard;