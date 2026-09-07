import { useEffect } from "react";

const useModalScroller = ({open, onClose}) => {
  // ESC key
    useEffect(() => {
      if (!open) return;
  
      const handleKeyDown = (event) => {
        if (event.key === "Escape") {
          onClose();
        }
      };
  
      window.addEventListener("keydown", handleKeyDown);
  
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [open, onClose]);
  
    // Prevent background scrolling
    useEffect(() => {
      if (!open) return;
  
      const previousOverflow = document.body.style.overflow;
  
      document.body.style.overflow = "hidden";
  
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }, [open]);
}

export default useModalScroller;