
import { forwardRef, useEffect, useRef } from "react";
import clsx from "clsx";

const Checkbox = forwardRef(
  (
    {
      checked = false,
      indeterminate = false,
      disabled = false,
      className = "",
      onChange,
      "aria-label": ariaLabel,
    },
    ref
  ) => {
    const internalRef = useRef(null);

    const resolvedRef = ref || internalRef;

    useEffect(() => {
      if (resolvedRef.current) {
        resolvedRef.current.indeterminate =
          indeterminate && !checked;
      }
    }, [checked, indeterminate, resolvedRef]);

    return (
      <input
        ref={resolvedRef}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        aria-label={ariaLabel}
        className={clsx(
          "checkbox checkbox-sm",
          "rounded",
          "border-slate-300",
          "transition-colors",
          "focus-visible:outline-none",
          "focus-visible:ring-2",
          "focus-visible:ring-primary/30",
          className
        )}
      />
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;