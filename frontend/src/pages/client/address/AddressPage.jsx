import AddressForm from '../../../components/addresses/AddressForm';
import AddressHeader from '../../../components/addresses/AddressHeader';
import AddressList from '../../../components/addresses/AddressList';
import AccountLayout from '../../../components/my-profile/AccountLayout'
import useAddresses from '../../../hooks/queries/addresses/useAddresses';

const AddressPage = () => {
  const {
    addresses,
    form,
    errors,
    isEditing,
    isSubmitting,
    handleChange,
    startAddAddress,
    startEditAddress,
    cancelEditing,
    saveAddress,
    setDefaultAddress,
    deleteAddress,
  } = useAddresses();

  return (
    <AccountLayout>
      <div
        className="
          rounded-xl border border-slate-200 bg-white
          p-3 shadow-[0_4px_16px_rgba(15,23,42,0.04)]
          sm:p-4
        "
      >
        <AddressHeader onAddAddress={startAddAddress} />


        <div className="mt-0 space-y-5 lg:mt-5">
           <div className="mt-9">
          <AddressList
            addresses={addresses}
            onSelect={setDefaultAddress}
            onEdit={startEditAddress}
            onDelete={deleteAddress}
          />
        </div>

        <div className="mt-7">
          <AddressForm
            form={form}
            errors={errors}
            isEditing={isEditing}
            isSubmitting={isSubmitting}
            onChange={handleChange}
            onCancel={cancelEditing}
            onSubmit={saveAddress}
          />
        </div>
        </div>
      </div>
    </AccountLayout>
  );
};

export default AddressPage;
