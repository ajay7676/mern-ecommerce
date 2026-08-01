import {
  useRef,
  useState,
} from "react";
import { FiUploadCloud } from "react-icons/fi";

const ACCEPTED_IMAGE_TYPES =
  "image/jpeg,image/png,image/webp";

const ImageDropzone = ({
  disabled = false,
  onFilesSelect,
}) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (files) => {
    const selectedFiles = Array.from(files ?? []);

    if (selectedFiles.length > 0) {
      onFilesSelect(selectedFiles);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();

    if (disabled) return;

    setIsDragging(false);
    handleFiles(event.dataTransfer.files);
  };

  const handleKeyDown = (event) => {
    if (disabled) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      fileInputRef.current?.click();
    }
  };

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label="Upload more product images"
      aria-disabled={disabled}
      onClick={() => {
        if (!disabled) {
          fileInputRef.current?.click();
        }
      }}
      onKeyDown={handleKeyDown}
      onDragEnter={(event) => {
        event.preventDefault();

        if (!disabled) {
          setIsDragging(true);
        }
      }}
      onDragOver={(event) => {
        event.preventDefault();
      }}
      onDragLeave={(event) => {
        event.preventDefault();

        if (
          !event.currentTarget.contains(
            event.relatedTarget
          )
        ) {
          setIsDragging(false);
        }
      }}
      onDrop={handleDrop}
      className={`flex h-28 w-32 shrink-0 cursor-pointer
                  flex-col items-center justify-center rounded-md
                  border-2 border-dashed px-2 text-center transition
                  focus:outline-none focus:ring-2 focus:ring-violet-200
                  ${
                    isDragging
                      ? "border-violet-500 bg-violet-50"
                      : "border-violet-200 bg-white hover:border-violet-400 hover:bg-violet-50"
                  }
                  ${
                    disabled
                      ? "cursor-not-allowed opacity-50"
                      : ""
                  }`}
    >
      <FiUploadCloud className="text-2xl text-slate-500" />

      <p className="mt-1 text-xs font-bold text-violet-600">
        Upload More
      </p>

      <p className="text-[10px] text-slate-500">
        or drag &amp; drop
      </p>

      <p className="mt-1 text-[9px] text-slate-400">
        JPG, PNG, WebP up to 5MB
      </p>

      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_IMAGE_TYPES}
        multiple
        hidden
        disabled={disabled}
        onChange={(event) => {
          handleFiles(event.target.files);
          event.target.value = "";
        }}
      />
    </div>
  );
};

export default ImageDropzone;