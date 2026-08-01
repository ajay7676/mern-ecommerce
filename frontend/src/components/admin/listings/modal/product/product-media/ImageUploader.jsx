import {
  useId,
  useRef,
  useState,
} from "react";
import {
  FiLink,
  FiUpload,
  FiX,
} from "react-icons/fi";


import { ACCEPTED_IMAGE_TYPES } from "../../../../../../constants/admin/products/product.constants";


const ImageUploader = ({
  disabled = false,
  onFilesSelect,
  onUrlAdd,
}) => {
  const fileInputRef = useRef(null);
  const dialogRef = useRef(null);

  const urlInputId = useId();

  const [imageUrl, setImageUrl] = useState("");
  const [urlError, setUrlError] = useState("");

  const handleFileInputChange = (event) => {
    const files = Array.from(event.target.files ?? []);

    if (files.length > 0) {
      onFilesSelect(files);
    }

    // Allows user to select the same file again.
    event.target.value = "";
  };

  const openUrlDialog = () => {
     console.log("OPEN ADD URL MODAL")
    setImageUrl("");
    setUrlError("");
    dialogRef.current?.showModal();
  };

  const closeUrlDialog = () => {
    dialogRef.current?.close();
  };

  const handleUrlSubmit = (event) => {
    event.preventDefault();

    const trimmedUrl = imageUrl.trim();

    try {
      const parsedUrl = new URL(trimmedUrl);

      if (
        parsedUrl.protocol !== "http:" &&
        parsedUrl.protocol !== "https:"
      ) {
        throw new Error();
      }

      const wasAccepted = onUrlAdd(trimmedUrl);

      if (wasAccepted === false) return;

      setImageUrl("");
      setUrlError("");
      closeUrlDialog();
    } catch {
      setUrlError(
        "Enter a valid HTTP or HTTPS image URL."
      );
    }
  };

  //  console.log(disabled);
   console.log(imageUrl)

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          disabled={disabled}
          onClick={openUrlDialog}
          className="btn h-10 min-h-10 rounded-md border-slate-200
                     bg-white px-5 text-sm font-semibold text-violet-600
                     shadow-none hover:border-violet-300 hover:bg-violet-50
                     disabled:cursor-not-allowed"
        >
          <FiLink />
          Add from URL
        </button>

        <button
          type="button"
          disabled={disabled}
          onClick={() => fileInputRef.current?.click()}
          className="btn h-10 min-h-10 rounded-md border-none
                     bg-violet-600 px-5 text-sm font-semibold text-white
                     shadow-sm hover:bg-violet-700
                     disabled:cursor-not-allowed"
        >
          <FiUpload />
          Upload Images
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_IMAGE_TYPES}
          multiple
          hidden
          onChange={handleFileInputChange}
        />
      </div>

      <dialog
        ref={dialogRef}
        className="modal"
        onClose={() => {
          setImageUrl("");
          setUrlError("");
        }}
      >
        <div className="modal-box max-w-md rounded-xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Add image from URL
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Enter a public image URL.
              </p>
            </div>

            <button
              type="button"
              aria-label="Close URL dialog"
              onClick={closeUrlDialog}
              className="btn btn-circle btn-ghost btn-sm"
            >
              <FiX />
            </button>
          </div>

          <form
            onSubmit={handleUrlSubmit}
            className="mt-5"
          >
            <label
              htmlFor={urlInputId}
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Image URL
            </label>

            <input
              id={urlInputId}
              type="url"
              value={imageUrl}
              autoFocus
              placeholder="https://example.com/product.webp"
              aria-invalid={Boolean(urlError)}
              onChange={(event) => {
                setImageUrl(event.target.value);
                setUrlError("");
              }}
              className={`input input-bordered w-full ${
                urlError ? "input-error" : ""
              }`}
            />

            {urlError && (
              <p
                role="alert"
                className="mt-1.5 text-xs text-red-500"
              >
                {urlError}
              </p>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeUrlDialog}
                className="btn btn-ghost"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={!imageUrl.trim()}
                className="btn border-none bg-violet-600 text-white hover:bg-violet-700"
              >
                Add Image
              </button>
            </div>
          </form>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button aria-label="Close dialog">close</button>
        </form>
      </dialog>
    </>
  );
};

export default ImageUploader;




