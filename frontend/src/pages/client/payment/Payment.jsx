import AccountLayout from "../../../components/my-profile/AccountLayout";
import AddCardModal from "../../../components/payments/AddCardModal";
import PaymentHeader from "../../../components/payments/PaymentHeader";
import PaymentMethodList from "../../../components/payments/PaymentMethodList";
import PaymentOptionsPanel from "../../../components/payments/PaymentOptionsPanel";
import SecurePaymentBanner from "../../../components/payments/SecurePaymentBanner";
import usePaymentMethods from "../../../hooks/queries/payments/usePaymentMethods";

const Payment = () => {
  const {
    methods,
    form,
    errors,
    isModalOpen,
    isEditing,
    isSubmitting,
    openAddCardModal,
    closeModal,
    handleChange,
    editMethod,
    saveMethod,
    removeMethod,
    setDefaultMethod,
  } = usePaymentMethods();

  return (
    <AccountLayout>
      <div
        className="
          rounded-xl border border-slate-200 bg-white
          p-3 shadow-[0_4px_16px_rgba(15,23,42,0.04)]
          sm:p-4
        "
      >
        <PaymentHeader onAddCard={openAddCardModal} />
        <div
          className="
            mt-9 grid gap-6
            lg:grid-cols-[minmax(0,1fr)_360px]
          "
        >
          <div className="min-w-0">
            <PaymentMethodList
              methods={methods}
              onEdit={editMethod}
              onRemove={removeMethod}
              onSetDefault={setDefaultMethod}
            />

            <div className="mt-7">
              <SecurePaymentBanner />
            </div>
          </div>

          <PaymentOptionsPanel />
        </div>
        <AddCardModal
          isOpen={isModalOpen}
          form={form}
          errors={errors}
          isEditing={isEditing}
          isSubmitting={isSubmitting}
          onChange={handleChange}
          onClose={closeModal}
          onSubmit={saveMethod}
        />
      </div>
    </AccountLayout>
  );
};

export default Payment;
