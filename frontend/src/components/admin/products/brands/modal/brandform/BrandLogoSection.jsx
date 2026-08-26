import {
  FiImage,
  FiUploadCloud,
  FiX,
} from "react-icons/fi";

import BrandFieldError from "./BrandFieldError";

const BrandLogoSection = ({
  logo,
  error,
  isUploading = false,
  onUpload,
  onRemove,
}) => {
  return (
    <section
      className="
        border-t
        border-slate-200
        pt-6
      "
    >
      <div>
        <h3 className="text-sm font-semibold text-slate-950">
          Brand Logo
        </h3>

        <p className="mt-1 text-xs text-slate-500">
          Upload a high-quality logo to represent this brand.
        </p>
      </div>

      <div className="mt-4 grid gap-5 md:grid-cols-2">
        <label
          className="
            flex
            min-h-37.5
            cursor-pointer
            flex-col
            items-center
            justify-center
            rounded-xl
            border
            border-dashed
            border-violet-300
            bg-violet-50/20
            px-5
            text-center
            transition
            hover:bg-violet-50
          "
        >
          <FiUploadCloud
            size={28}
            className="text-violet-600"
          />

          <p className="mt-3 text-sm font-semibold text-violet-700">
            {isUploading
              ? "Uploading..."
              : "Click to upload"}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            PNG, JPG or WEBP
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Max 2MB
          </p>

          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            disabled={isUploading}
            onChange={(event) =>
              onUpload(
                event.target.files?.[0] ??
                  null,
              )
            }
            className="hidden"
          />
        </label>

        <div>
          <p className="mb-2 text-xs font-medium text-slate-600">
            Logo Preview
          </p>

          <div
            className="
              relative
              flex
              min-h-37.5
              items-center
              justify-center
              overflow-hidden
              rounded-xl
              border
              border-slate-200
              bg-slate-50
            "
          >
            {logo?.url ? (
              <>
                <img
                  src={logo.url}
                  alt="Brand logo preview"
                  className="
                    h-30
                    w-30
                    object-contain
                  "
                />

                <button
                  type="button"
                  onClick={onRemove}
                  className="
                    absolute
                    right-3
                    top-3
                    grid
                    h-8
                    w-8
                    cursor-pointer
                    place-items-center
                    rounded-full
                    bg-white
                    text-slate-600
                    shadow
                    hover:text-red-500
                  "
                >
                  <FiX />
                </button>
              </>
            ) : (
              <FiImage
                size={36}
                className="text-slate-300"
              />
            )}
          </div>

          <p className="mt-2 text-xs text-slate-400">
            Recommended size: 500 × 500px
          </p>
        </div>
      </div>

      <BrandFieldError
        message={error}
      />
    </section>
  );
};

export default BrandLogoSection;