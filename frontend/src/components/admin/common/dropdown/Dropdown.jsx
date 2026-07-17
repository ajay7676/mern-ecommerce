import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

const Dropdown = ({
  trigger,
  children,
  placement = "bottom-end",
  className = "",
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  useEffect(() => {
    const handleOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);

    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const placementClasses = {
    "bottom-start": "left-0 top-full mt-2",
    "bottom-end": "right-0 top-full mt-2",
    "top-start": "left-0 bottom-full mb-2",
    "top-end": "right-0 bottom-full mb-2",
  };
  return (
    <div ref={wrapperRef} className={clsx("relative inline-block", className)}>
      <div onClick={() => !disabled && setOpen((prev) => !prev)}>{trigger}</div>

      {open && (
        <div
          className={clsx(
            "absolute z-50",
            "min-w-55",
            "overflow-hidden",
            "rounded-xl",
            "border border-base-300",
            "bg-base-100",
            "shadow-xl",
            placementClasses[placement],
          )}
        >
          {children({ close: () => setOpen(false) })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
