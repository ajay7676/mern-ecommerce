import {
  FiImage,
  FiUploadCloud,
  FiX,
} from "react-icons/fi";

import BrandFieldError from "./BrandFieldError";

const BrandBannerSection = ({
  banner,
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
          Brand Banner
          <span className="ml-1 text-xs font-normal text-slate-400">
            (Optional)
          </span>
        </h3>

        <p className="mt-1 text-xs text-slate-500">
          Upload a banner image for brand page or promotion.
        </p>
      </div>

      <div className="mt-4 grid gap-5 md:grid-cols-2">
        <label
          className="
            flex
            min-h-32.5
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
            JPG, PNG or WEBP
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Max 5MB
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
            Banner Preview
          </p>

          <div
            className="
              relative
              flex
              min-h-32.5
              items-center
              justify-center
              overflow-hidden
              rounded-xl
              border
              border-slate-200
              bg-slate-50
            "
          >
            {banner?.url ? (
              <>
                <img
                  src={banner.url}
                  alt="Brand banner preview"
                  className="
                    h-full
                    min-h-32.5
                    w-full
                    object-cover
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
                size={38}
                className="text-slate-300"
              />
            )}
          </div>

          <p className="mt-2 text-xs text-slate-400">
            Recommended size: 1200 × 400px
          </p>
        </div>
      </div>

      <BrandFieldError
        message={error}
      />
    </section>
  );
};

export default BrandBannerSection;