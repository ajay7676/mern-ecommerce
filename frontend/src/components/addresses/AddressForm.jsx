import FormField from '../ui/FormField'
import SelectField from "../ui/SelectField";
import {
  ADDRESS_TYPE_OPTIONS,
  INDIAN_STATES,
} from '../../constants/address/address.constants';

const AddressForm = ({
  form,
  errors,
  isEditing,
  isSubmitting,
  onChange,
  onCancel,
  onSubmit,
}) => {
  return (
    <section
      id="address-form"
      className="
        rounded-xl border border-slate-200 bg-white
        p-5 shadow-[0_4px_18px_rgba(15,23,42,0.035)]
        sm:p-7
      "
    >
      <h2 className="text-base font-semibold text-slate-950">
        {isEditing ? "Edit Address" : "Add New Address"}
      </h2>

      <form
        onSubmit={onSubmit}
        className="mt-6"
        noValidate
      >
        <div
          className="
            grid grid-cols-1 gap-x-8 gap-y-5
            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          <FormField
            id="fullName"
            name="fullName"
            label="Full Name"
            value={form.fullName}
            placeholder="Enter full name"
            error={errors.fullName}
            onChange={onChange}
          />

          <FormField
            id="phone"
            name="phone"
            label="Phone Number"
            value={form.phone}
            placeholder="Enter phone number"
            error={errors.phone}
            onChange={onChange}
          />

          <FormField
            id="pincode"
            name="pincode"
            label="Pincode"
            value={form.pincode}
            placeholder="Enter pincode"
            error={errors.pincode}
            onChange={onChange}
          />

          <FormField
            id="addressLine1"
            name="addressLine1"
            label="Address Line 1"
            value={form.addressLine1}
            placeholder="House no., Building, Street"
            error={errors.addressLine1}
            onChange={onChange}
            className="xl:col-span-2"
          />

          <FormField
            id="addressLine2"
            name="addressLine2"
            label="Address Line 2 (Optional)"
            value={form.addressLine2}
            placeholder="Area, Landmark"
            onChange={onChange}
          />

          <FormField
            id="city"
            name="city"
            label="City"
            value={form.city}
            placeholder="Enter city"
            error={errors.city}
            onChange={onChange}
          />

          <SelectField
            id="state"
            name="state"
            label="State"
            value={form.state}
            options={INDIAN_STATES}
            error={errors.state}
            onChange={onChange}
          />

          <SelectField
            id="type"
            name="type"
            label="Address Type"
            value={form.type}
            options={ADDRESS_TYPE_OPTIONS}
            error={errors.type}
            onChange={onChange}
          />
        </div>

        <div
          className="
            mt-7 flex flex-col gap-5
            sm:flex-row sm:items-center sm:justify-between
          "
        >
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              name="isDefault"
              checked={form.isDefault}
              onChange={onChange}
              className="
                checkbox checkbox-sm rounded
                border-slate-300
                [--chkbg:theme(colors.indigo.600)]
                [--chkfg:white]
              "
            />

            <span className="text-sm font-medium text-slate-700">
              Set as Default Address
            </span>
          </label>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="
                btn h-11 min-h-11 rounded-md
                border-slate-200 bg-white px-6
                text-sm font-medium text-indigo-600
                shadow-none hover:border-indigo-200
                hover:bg-indigo-50
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="
                btn h-11 min-h-11 min-w-37.5
                rounded-md border-none bg-indigo-600
                px-6 text-sm font-medium text-white
                shadow-none hover:bg-indigo-700
              "
            >
              {isSubmitting && (
                <span className="loading loading-spinner loading-sm" />
              )}

              {isEditing ? "Update Address" : "Save Address"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default AddressForm;