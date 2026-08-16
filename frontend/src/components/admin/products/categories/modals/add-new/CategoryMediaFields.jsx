import {
  FiImage,
  FiUploadCloud,
  FiX,
} from "react-icons/fi";

const CategoryMediaFields = ({
  image,
  imagePreview,
  icon,
  onImageChange,
  onRemoveImage,
  onIconChange,
  disabled,
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
        <h3 className="text-sm font-semibold text-slate-900">
          Media
        </h3>

        <p className="mt-1 text-xs text-slate-500">
          Add an image or icon to help identify the category.
        </p>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Category Image
          </label>

          {!imagePreview ? (
            <label
              className="
                flex
                min-h-42.5
                cursor-pointer
                flex-col
                items-center
                justify-center
                rounded-xl
                border
                border-dashed
                border-slate-300
                bg-slate-50
                px-5
                text-center
                transition
                hover:border-violet-400
                hover:bg-violet-50/30
              "
            >
              <FiUploadCloud
                size={28}
                className="text-violet-600"
              />

              <p className="mt-3 text-sm font-semibold text-slate-700">
                Upload category image
              </p>

              <p className="mt-1 text-xs text-slate-400">
                PNG, JPG or WEBP
              </p>

              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                disabled={disabled}
                onChange={(event) =>
                  onImageChange(
                    event.target.files?.[0] ??
                      null,
                  )
                }
                className="hidden"
              />
            </label>
          ) : (
            <div
              className="
                relative
                overflow-hidden
                rounded-xl
                border
                border-slate-200
                bg-slate-50
              "
            >
              <img
                src={imagePreview}
                alt="Category preview"
                className="
                  h-42.5
                  w-full
                  object-cover
                "
              />

              <button
                type="button"
                onClick={onRemoveImage}
                disabled={disabled}
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
                  text-slate-700
                  shadow
                  hover:bg-red-50
                  hover:text-red-500
                "
              >
                <FiX />
              </button>
            </div>
          )}

          {image && (
            <p className="mt-2 truncate text-xs text-slate-500">
              {image.name}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Category Icon
          </label>

          <div
            className="
              flex
              min-h-42.5
              flex-col
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              p-5
            "
          >
            <div
              className="
                grid
                h-14
                w-14
                place-items-center
                rounded-xl
                bg-violet-100
                text-violet-600
              "
            >
              <FiImage size={25} />
            </div>

            <input
              value={icon}
              onChange={(event) =>
                onIconChange(
                  event.target.value,
                )
              }
              disabled={disabled}
              placeholder="e.g. FiShirt or icon key"
              className="
                mt-4
                h-10
                w-full
                rounded-lg
                border
                border-slate-200
                bg-white
                px-3
                text-sm
                outline-none
                focus:border-violet-500
                focus:ring-2
                focus:ring-violet-100
              "
            />

            <p className="mt-2 text-xs text-slate-400">
              Store an icon key, not a React component.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryMediaFields;