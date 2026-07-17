import { ArrowDownWideNarrow, ChevronDown } from "lucide-react";

import Dropdown from '../../common/dropdown/Dropdown';
import DropdownMenu from '../../common/dropdown/DropdownMenu';
import DropdownItem from '../../common/dropdown/DropdownItem';

const SortButton = ({
  options = [],
  value,
  onChange,
  loading = false,
  disabled = false,
}) => {
  const selected =
    options.find((item) => item.id === value) || null;

  return (
    <Dropdown
      disabled={disabled || loading}
      trigger={
        <button
          className="
            btn btn-sm
            h-9
            w-50
            rounded-lg
            border
            border-base-300
            bg-white
            px-4
            normal-case
            shadow-none
            hover:bg-base-100
          "
        >
          <ArrowDownWideNarrow size={16} />

          <span className="mx-1">
            {selected ? selected.label : "Sort By"}
          </span>

          <ChevronDown size={16} />
        </button>
      }
    >
      {({ close }) => (
        <DropdownMenu>
          {options.map((option) => (
            <DropdownItem
              key={option.id}
              active={option.id === value}
              icon={
                option.icon && (
                  <option.icon size={16} />
                )
              }
              onClick={() => {
                onChange(option.id);

                close();
              }}
            >
              {option.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </Dropdown>
  );
};

export default SortButton;