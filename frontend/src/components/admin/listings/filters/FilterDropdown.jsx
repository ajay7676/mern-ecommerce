
import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import {
  Check,
  ChevronDown,
  Loader2,
  Search,
} from "lucide-react";

const FilterDropdown = (
  {
  value,
  options = [],
  onChange,
  label="Filter",
  searchable = true,
  loading = false,
  disabled = false,
}
) => {

  const containerRef = useRef(null);
  const searchRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(0);

  const filteredOptions = useMemo(() => {
    if (!keyword.trim()) return options;

    return options.filter((item) =>
      item.label.toLowerCase().includes(keyword.toLowerCase())
    );
  }, [keyword, options]);

  const selectedOption = options.find(
    (item) => item.value === value
  );

  useEffect(() => {
    const handleOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleOutside
      );
  }, []);

  useEffect(() => {
    if (open && searchable) {
      requestAnimationFrame(() => {
        searchRef.current?.focus();
      });
    }
  }, [open, searchable]);

  const selectOption = (option) => {
    if (option.disabled) return;

    onChange(option.value);
    setOpen(false);
    setKeyword("");
  };

  const handleKeyDown = (event) => {
    if (!open) return;
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setFocusedIndex((prev) =>
          Math.min(prev + 1, filteredOptions.length - 1)
        );
        break;

      case "ArrowUp":
        event.preventDefault();
        setFocusedIndex((prev) =>
          Math.max(prev - 1, 0)
        );
        break;

      case "Enter":
        event.preventDefault();

        if (filteredOptions[focusedIndex]) {
          selectOption(filteredOptions[focusedIndex]);
        }

        break;

      case "Escape":
        setOpen(false);
        break;

      default:
        break;
    }
  };
  return (
     <div
      ref={containerRef}
      className="relative w-full sm:w-72"
      onKeyDown={handleKeyDown}
    >
      <button
        type="button"
        disabled={disabled || loading}
        onClick={() => setOpen((prev) => !prev)}
        className={clsx(
          "btn w-full justify-between rounded-lg border",
          "border-slate-200 bg-white font-normal",
          "hover:border-primary hover:bg-white",
          "focus-visible:outline-none",
          "focus-visible:ring-2",
          "focus-visible:ring-primary/30"
        )}
      >
        <span className="truncate">
          {selectedOption?.label || label}
        </span>

        {loading ? (
          <Loader2
            size={16}
            className="animate-spin"
          />
        ) : (
          <ChevronDown
            size={18}
            className={clsx(
              "transition-transform",
              open && "rotate-180"
            )}
          />
        )}
      </button>

      {open && (
        <div
          className="
            absolute
            z-50
            mt-2
            w-full
            rounded-xl
            border
            border-slate-200
            bg-white
            shadow-xl
          "
        >
          {searchable && (
            <div className="border-b p-3">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-3 text-slate-400"
                />

                <input
                  ref={searchRef}
                  value={keyword}
                  onChange={(e) =>
                    setKeyword(e.target.value)
                  }
                  placeholder="Search..."
                  className="
                    input
                    input-bordered
                    w-full
                    pl-9
                  "
                />
              </div>
            </div>
          )}

          <ul className="max-h-72 overflow-y-auto py-2">
            {filteredOptions.length === 0 && (
              <li className="px-4 py-6 text-center text-sm text-slate-500">
                No results found
              </li>
            )}

            {filteredOptions.map((option, index) => (
              <li key={option.value}>
                <button
                  type="button"
                  disabled={option.disabled}
                  onClick={() => selectOption(option)}
                  className={clsx(
                    "flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors",
                    index === focusedIndex &&
                      "bg-slate-100",
                    option.disabled &&
                      "cursor-not-allowed opacity-50",
                    !option.disabled &&
                      "hover:bg-slate-50"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span>{option.label}</span>

                    {option.count !== undefined && (
                      <span className="rounded bg-slate-100 px-2 py-0.5 text-xs">
                        {option.count}
                      </span>
                    )}
                  </div>

                  {value === option.value && (
                    <Check
                      size={16}
                      className="text-primary"
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default FilterDropdown