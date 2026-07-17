import { useState } from "react";
import clsx from "clsx";
import { ImageOff } from "lucide-react";

const ProductImage = (
    {
  src,
  alt,
  className = "",
}
) => {
    const [hasError, setHasError] = useState(false);
  return (
     <div
      className={clsx(
        "flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50",
        className
      )}
    >
      {!hasError && src ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setHasError(true)}
          className="h-full w-full object-contain"
        />
      ) : (
        <ImageOff
          size={22}
          className="text-slate-400"
        />
      )}
    </div>
  )
}

export default ProductImage