
import { ImagePlus, Loader2, UploadCloud } from "lucide-react";

const ImageUploadDropzone = ({
  onFilesSelected,
  isUploading = false,
  remainingSlots = 8,
}) => {
  const handleChange = (event) => {
    const files = Array.from(event.target.files || []);

    if (files.length) {
      onFilesSelected(files);
    }

    event.target.value = "";
  };

  const handleDrop = (event) => {
    event.preventDefault();

    if (isUploading) return;

    const files = Array.from(event.dataTransfer.files || []);

    if (files.length) {
      onFilesSelected(files);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center transition hover:border-primary hover:bg-primary/5"
    >
      <input
        id="product-images"
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp"
        onChange={handleChange}
        disabled={isUploading || remainingSlots <= 0}
        className="hidden"
      />

      <label
        htmlFor="product-images"
        className={`flex cursor-pointer flex-col items-center justify-center gap-3 ${
          isUploading || remainingSlots <= 0 ? "pointer-events-none opacity-60" : ""
        }`}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
          {isUploading ? (
            <Loader2 className="h-7 w-7 animate-spin text-primary" />
          ) : (
            <UploadCloud className="h-7 w-7 text-primary" />
          )}
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-900">
            {isUploading ? "Uploading images..." : "Upload product images"}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            JPEG, PNG, WEBP. Maximum 2MB each.
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Remaining slots: {remainingSlots}
          </p>
        </div>

        <span className="btn btn-primary btn-sm rounded-xl text-white">
          <ImagePlus className="h-4 w-4" />
          Choose Images
        </span>
      </label>
    </div>
  );
};

export default ImageUploadDropzone;