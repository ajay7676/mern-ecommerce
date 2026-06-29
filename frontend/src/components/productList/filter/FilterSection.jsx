import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const FilterSection = ({
  title,
  children,
  defaultOpen = true,
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-slate-200 py-5">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between"
      >
        <h3 className="text-sm font-bold uppercase text-slate-900">
          {title}
        </h3>

        {isOpen ? (
          <FiChevronUp className="text-lg text-slate-600" />
        ) : (
          <FiChevronDown className="text-lg text-slate-600" />
        )}
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen
            ? "max-h-125 opacity-100 mt-4"
            : "max-h-0 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  )
}

export default FilterSection