import { useState } from "react";
import {
  FiImage,
  FiMoreVertical,
  FiStar,
  FiTrash2,
} from "react-icons/fi";

const ImageThumbnail = ({
  image,
  disabled = false,
  onSetPrimary,
  onRemove,
}) => {
  const [imageFailed, setImageFailed] =
    useState(false);

  const imageSource =
    image.previewUrl || image.url || "";

  const imageAlt =
    image.alt ||
    image.file?.name ||
    "Product image";

  return (
    <article className="relative h-28 w-32 shrink-0 overflow-hidden rounded-md border border-slate-200 bg-white">
      {image.isPrimary && (
        <span className="absolute left-1.5 top-1.5 z-10 rounded-sm bg-violet-600 px-1.5 py-0.5 text-[9px] font-semibold text-white">
          Primary
        </span>
      )}

      {!imageFailed && imageSource ? (
        <img
          src={imageSource}
          alt={imageAlt}
          loading="lazy"
          onError={() => setImageFailed(true)}
          className="h-full w-full object-contain p-1"
        />
      ) : (
        <div className="flex h-full flex-col items-center justify-center bg-slate-50 text-slate-400">
          <FiImage className="text-2xl" />
          <span className="mt-1 text-[10px]">
            Preview unavailable
          </span>
        </div>
      )}

      <details
        className={`dropdown dropdown-end absolute right-1 top-1 z-20 ${
          disabled ? "pointer-events-none opacity-50" : ""
        }`}
      >
        <summary
          aria-label="Open image actions"
          className="btn btn-circle btn-ghost btn-xs list-none bg-white/90 text-slate-600"
        >
          <FiMoreVertical />
        </summary>

        <ul className="menu dropdown-content z-30 mt-1 w-36 rounded-md border border-slate-200 bg-white p-1 text-xs shadow-lg">
          <li>
            <button
              type="button"
              disabled={image.isPrimary}
              onClick={() => onSetPrimary(image.id)}
            >
              <FiStar />
              Set primary
            </button>
          </li>
        </ul>
      </details>

      <button
        type="button"
        disabled={disabled}
        aria-label={`Remove ${imageAlt}`}
        onClick={() => onRemove(image.id)}
        className="btn btn-square btn-xs absolute bottom-1 right-1 z-10
                   border border-red-100 bg-white text-red-500
                   hover:border-red-200 hover:bg-red-50
                   disabled:cursor-not-allowed"
      >
        <FiTrash2 />
      </button>
    </article>
  );
};

export default ImageThumbnail;