import { Check, ChevronDown, Loader2, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { FormError } from "./FormField";

export const SelectPickerField = ({
  label,
  required = false,
  helper,
  error,

  value,
  onChange,
  onBlur,

  options = [],
  placeholder = "Select option",
  searchPlaceholder = "Search...",
  emptyMessage = "No options found",

  disabled = false,
  isLoading = false,
  clearable = true,

  maxMenuHeight = 260,
}) => {
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [menuStyle, setMenuStyle] = useState({});

  const selectedOption = useMemo(() => {
    return options.find((option) => String(option.value) === String(value));
  }, [options, value]);

  const filteredOptions = useMemo(() => {
    const keyword = searchText.trim().toLowerCase();

    if (!keyword) return options;

    return options.filter((option) => {
      return (
        option.label?.toLowerCase().includes(keyword) ||
        String(option.value).toLowerCase().includes(keyword)
      );
    });
  }, [options, searchText]);

  const updateMenuPosition = () => {
    if (!triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();

    setMenuStyle({
      position: "fixed",
      top: rect.bottom + 8,
      left: rect.left,
      width: rect.width,
      zIndex: 9999,
    });
  };

  const openMenu = () => {
    if (disabled || isLoading) return;

    updateMenuPosition();
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setSearchText("");
    onBlur?.();
  };

  const handleSelect = (option) => {
    if (option.disabled) return;

    onChange(option.value);
    closeMenu();
  };

  const handleClear = (event) => {
    event.stopPropagation();

    onChange("");
    setSearchText("");
  };

  useEffect(() => {
    if (!isOpen) return;

    updateMenuPosition();

    const handleClickOutside = (event) => {
      const isTriggerClick = triggerRef.current?.contains(event.target);
      const isMenuClick = menuRef.current?.contains(event.target);

      if (!isTriggerClick && !isMenuClick) {
        closeMenu();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    window.addEventListener("resize", updateMenuPosition);
    window.addEventListener("scroll", updateMenuPosition, true);
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("resize", updateMenuPosition);
      window.removeEventListener("scroll", updateMenuPosition, true);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const menu = isOpen
    ? createPortal(
        <div
          ref={menuRef}
          style={menuStyle}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
        >
          <div className="border-b border-slate-100 p-2">
            <div className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3">
              <Search className="h-4 w-4 text-slate-400" />

              <input
                autoFocus
                type="text"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder={searchPlaceholder}
                className="h-full flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          <div
            className="overflow-y-auto p-1"
            style={{ maxHeight: maxMenuHeight }}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2 px-3 py-6 text-sm text-slate-500">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading...
              </div>
            ) : filteredOptions.length === 0 ? (
              <div className="px-3 py-6 text-center text-sm text-slate-500">
                {emptyMessage}
              </div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected =
                  String(option.value) === String(value);

                return (
                  <button
                    key={option.value}
                    type="button"
                    disabled={option.disabled}
                    onClick={() => handleSelect(option)}
                    className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                      isSelected
                        ? "bg-primary/10 font-semibold text-primary"
                        : "text-slate-700 hover:bg-slate-100"
                    } ${
                      option.disabled
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    }`}
                  >
                    <span className="min-w-0">
                      <span className="block truncate">
                        {option.label}
                      </span>

                      {option.description && (
                        <span className="block truncate text-xs font-normal text-slate-400">
                          {option.description}
                        </span>
                      )}
                    </span>

                    {isSelected && <Check className="h-4 w-4 shrink-0" />}
                  </button>
                );
              })
            )}
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <div>
      {label && (
        <label className="mb-2 block text-sm font-bold text-slate-800">
          {label}
          {required && <span className="text-error"> *</span>}
        </label>
      )}

      <button
        ref={triggerRef}
        type="button"
        disabled={disabled || isLoading}
        onClick={() => {
          if (isOpen) {
            closeMenu();
          } else {
            openMenu();
          }
        }}
        className={`flex h-11 min-h-11 w-full items-center justify-between gap-3 rounded-xl border bg-white px-3 text-left text-sm transition focus:border-primary focus:outline-none ${
          error ? "border-error" : "border-slate-200"
        } ${
          disabled || isLoading
            ? "cursor-not-allowed bg-slate-100 text-slate-400"
            : "text-slate-800"
        }`}
      >
        <span
          className={`min-w-0 flex-1 truncate ${
            selectedOption ? "text-slate-900" : "text-slate-400"
          }`}
        >
          {isLoading
            ? "Loading..."
            : selectedOption?.label || placeholder}
        </span>

        <span className="flex items-center gap-2">
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}

          {clearable && value && !disabled && !isLoading && (
            <span
              role="button"
              tabIndex={0}
              onClick={handleClear}
              className="rounded-full p-1 hover:bg-slate-100"
            >
              <X className="h-3.5 w-3.5 text-slate-400" />
            </span>
          )}

          <ChevronDown
            className={`h-4 w-4 text-slate-400 transition ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </span>
      </button>

      <FormError message={error} />

      {helper && (
        <p className="mt-1 text-xs font-medium text-slate-500">
          {helper}
        </p>
      )}

      {menu}
    </div>
  );
};