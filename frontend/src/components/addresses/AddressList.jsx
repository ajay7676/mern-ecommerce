import AddressCard from "./AddressCard";

const AddressList = ({
  addresses = [],
  onSelect,
  onEdit,
  onDelete,
}) => {
  return (
    <div
      className="
        grid grid-cols-1 gap-5
        md:grid-cols-2
        xl:grid-cols-3
      "
    >
      {addresses.map((address) => (
        <AddressCard
          key={address.id}
          address={address}
          onSelect={onSelect}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default AddressList;