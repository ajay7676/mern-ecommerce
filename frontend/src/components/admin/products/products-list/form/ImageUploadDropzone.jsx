
import { useRef, useState } from "react";
import {
  ImagePlus,
  UploadCloud,
} from "lucide-react";

import {
  formatFileSize,
  validateProductImageFile,
  createProductImagePreview,
} from '../../.././../../utils/admin/products/product/productImageUtils'
import { MAX_PRODUCT_IMAGES } from "../../../../../constants/admin/products/product.constants";

const ImageUploadDropzone = ({
  images,
  append,
  setError,
  clearErrors,
}) => {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (selectedFiles) => {
    const files = Array.from(selectedFiles || []);

    if (!files.length) return;

    const availableSlots = MAX_PRODUCT_IMAGES - images.length;

    if (availableSlots <= 0) {
      setError("images", {
        type: "manual",
        message: `You can upload maximum ${MAX_PRODUCT_IMAGES} images`,
      });
      return;
    }

    const validFiles = [];

    for (const file of files.slice(0, availableSlots)) {
      const errorMessage = validateProductImageFile(file);

      if (errorMessage) {
        setError("images", {
          type: "manual",
          message: errorMessage,
        });
        return;
      }

      validFiles.push(file);
    }

    const newImages = validFiles.map((file, index) =>
      createProductImagePreview({
        file,
        index: images.length + index,
        isPrimary: images.length === 0 && index === 0,
      })
    );

    append(newImages);
    clearErrors("images");
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    handleFiles(event.dataTransfer.files);
  };

  return (
    <div>
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`flex min-h-70 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-slate-300 bg-slate-50 hover:border-primary hover:bg-primary/5"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          multiple
          className="hidden"
          onChange={(event) => {
            handleFiles(event.target.files);
            event.target.value = "";
          }}
        />

        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
          <UploadCloud className="h-10 w-10" />
        </div>

        <h4 className="mt-5 text-lg font-bold text-slate-950">
          Drop your product images here
        </h4>

        <p className="mt-2 max-w-md text-sm font-medium text-slate-500">
          Drag and drop images here, or click to browse from your device.
        </p>

        <button
          type="button"
          className="btn btn-primary mt-6 rounded-xl px-6 text-white"
        >
          <ImagePlus className="h-4 w-4" />
          Browse Images
        </button>

        <p className="mt-4 text-xs font-medium text-slate-500">
          PNG, JPG, WEBP up to {formatFileSize(2 * 1024 * 1024)}. Maximum{" "}
          {MAX_PRODUCT_IMAGES} images.
        </p>
      </div>
    </div>
  );
};

export default ImageUploadDropzone;