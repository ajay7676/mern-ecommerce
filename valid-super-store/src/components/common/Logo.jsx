import Link from "next/link";
import { Box } from "lucide-react";
import { clsx } from "clsx";

const Logo = ({ showText = true, className = "" }) => {
  return (
    <Link
      href="/"
      aria-label="Valid Super Store homepage"
      className={`focus-ring inline-flex shrink-0 items-center gap-2 rounded-lg ${className}`}
    >
      <span
        className={`flex size-8 shrink-0 items-center justify-center
          rounded-[10px] bg-[#ff3047] text-white
          sm:size-9`}
      >
        <Box aria-hidden="true" size={18} strokeWidth={2} />
      </span>

      {showText ? (
        <span
          className={`whitespace-nowrap text-[17px] font-black
            tracking-[-0.045em] text-[#101828]
            sm:text-[19px]`}
        >
          Valid Super Store
        </span>
      ) : null}
    </Link>
  );
};

export default Logo;
