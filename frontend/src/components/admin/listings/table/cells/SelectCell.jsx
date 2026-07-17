import Checkbox from "./Checkbox";

const SelectCell = ({ row }) => {
  return (
    <Checkbox
      aria-label={`Select row ${row.id}`}
      checked={row.getIsSelected()}
      disabled={!row.getCanSelect()}
      indeterminate={row.getIsSomeSelected()}
      onChange={row.getToggleSelectedHandler()}
    />
  );
};

export default SelectCell;