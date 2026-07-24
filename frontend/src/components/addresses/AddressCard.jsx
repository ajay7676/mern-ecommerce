import {
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";
import clsx from "clsx";
import AddressTypeIcon from "./AddressTypeIcon";

const AddressCard = ({
  address,
  onSelect,
  onEdit,
  onDelete,
}) => {
  return (
    <article
      className={clsx(
        "relative flex min-h-62.5 flex-col rounded-xl",
        "border bg-white p-5 transition-all duration-200",
        address.isDefault
          ? "border-indigo-300 shadow-[0_5px_20px_rgba(79,70,229,0.07)]"
          : "border-slate-200 hover:border-slate-300",
      )}
    >
      <button
        type="button"
        onClick={() => onSelect(address.id)}
        aria-label={`Set ${address.label} as default address`}
        className={clsx(
          "absolute left-5 top-5 h-4 w-4 rounded-full border",
          "transition-colors",
          address.isDefault
            ? "border-indigo-600 bg-indigo-600 ring-4 ring-indigo-50"
            : "border-slate-400 bg-white",
        )}
      />

      <div className="flex gap-4 pl-1 pt-1">
        <div className="ml-5">
          <AddressTypeIcon type={address.type} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-[15px] font-semibold text-slate-950">
              {address.label}
            </h2>

            {address.isDefault && (
              <span
                className="
                  inline-flex min-h-7 items-center rounded-md
                  bg-indigo-50 px-3 text-xs font-semibold
                  text-indigo-600
                "
              >
                Default
              </span>
            )}
          </div>

          <div className="mt-4 space-y-1.5 text-sm leading-6 text-slate-600">
            <p>{address.fullName}</p>
            <p>{address.addressLine1}</p>

            <p>
              {address.addressLine2 && `${address.addressLine2}, `}
              {address.city} - {address.pincode}
            </p>

            <p>
              {address.state}, {address.country}
            </p>

            <p className="pt-1">
              Phone: {address.phone}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between pt-7 pl-[62px]">
        <button
          type="button"
          onClick={() => onEdit(address)}
          className="
            inline-flex items-center gap-2 text-sm
            font-medium text-indigo-600
            transition-colors hover:text-indigo-700
          "
        >
          <FiEdit2 className="h-4 w-4" />
          Edit
        </button>

        <button
          type="button"
          onClick={() => onDelete(address.id)}
          className="
            inline-flex items-center gap-2 text-sm
            font-medium text-red-500
            transition-colors hover:text-red-600
          "
        >
          <FiTrash2 className="h-4 w-4" />
          Delete
        </button>
      </div>
    </article>
  );
};

export default AddressCard;