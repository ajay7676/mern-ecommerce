
import { ChevronDown } from "lucide-react";

const SortButton = ({
  label = "Sort By",
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        btn btn-sm
        h-9 min-h-9
        rounded-lg
        border
        border-[#E5E7EB]
        bg-white
        px-4
        font-medium
        normal-case
        shadow-none
        hover:border-[#2874F0]
        hover:bg-[#F8FAFF]
      "
    >
      <span>{label}</span>

      <ChevronDown size={16} />
    </button>
  );
};

export default SortButton;