import PaymentMethodCard from "./PaymentMethodCard";

const PaymentMethodList = ({
  methods = [],
  onEdit,
  onRemove,
  onSetDefault,
}) => {
  return (
    <section>
      <h2 className="text-base font-semibold text-slate-950">
        Saved Cards
      </h2>

      <div className="mt-4 space-y-5">
        {methods.map((method) => (
          <PaymentMethodCard
            key={method.id}
            method={method}
            onEdit={onEdit}
            onRemove={onRemove}
            onSetDefault={onSetDefault}
          />
        ))}
      </div>
    </section>
  );
};

export default PaymentMethodList;