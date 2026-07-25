import PaymentFormField from '../ui/PaymentFormField'
import Modal from "../ui/Modal";

const AddCardModal = ({
  isOpen,
  form,
  errors,
  isEditing,
  isSubmitting,
  onChange,
  onClose,
  onSubmit,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      title={isEditing ? "Edit Card" : "Add New Card"}
      onClose={onClose}
    >
      <form onSubmit={onSubmit} noValidate>
        <div className="space-y-5">
          <PaymentFormField
            id="cardHolderName"
            name="cardHolderName"
            label="Cardholder Name"
            value={form.cardHolderName}
            placeholder="Enter cardholder name"
            error={errors.cardHolderName}
            onChange={onChange}
          />

          <PaymentFormField
            id="cardNumber"
            name="cardNumber"
            label="Card Number"
            value={form.cardNumber}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            error={errors.cardNumber}
            onChange={onChange}
          />

          <div className="grid grid-cols-2 gap-4">
            <PaymentFormField
              id="expiryDate"
              name="expiryDate"
              label="Expiry Date"
              value={form.expiryDate}
              placeholder="MM/YY"
              maxLength={5}
              error={errors.expiryDate}
              onChange={onChange}
            />

            <PaymentFormField
              id="cvv"
              name="cvv"
              label="CVV"
              value={form.cvv}
              placeholder="123"
              type="password"
              maxLength={4}
              error={errors.cvv}
              onChange={onChange}
            />
          </div>

          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              name="setAsDefault"
              checked={form.setAsDefault}
              onChange={onChange}
              className="checkbox checkbox-sm checkbox-primary rounded"
            />

            <span className="text-sm text-slate-700">
              Set as default card
            </span>
          </label>
        </div>

        <div className="mt-7 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="
              btn h-11 min-h-11 rounded-md
              border-slate-200 bg-white px-5
              text-indigo-600 shadow-none
            "
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="
              btn h-11 min-h-11 rounded-md
              border-none bg-indigo-600 px-6
              text-white shadow-none hover:bg-indigo-700
            "
          >
            {isSubmitting && (
              <span className="loading loading-spinner loading-sm" />
            )}

            {isEditing ? "Update Card" : "Save Card"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddCardModal;