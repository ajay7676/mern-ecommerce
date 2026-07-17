
import Checkbox from "./Checkbox";

const HeaderCheckbox = ({ table }) => {
  return (
    <Checkbox
      aria-label="Select all rows"
      checked={table.getIsAllRowsSelected()}
      indeterminate={table.getIsSomeRowsSelected()}
      onChange={table.getToggleAllRowsSelectedHandler()}
    />
  );
};

export default HeaderCheckbox;