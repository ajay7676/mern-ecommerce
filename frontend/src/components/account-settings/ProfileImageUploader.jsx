import {
  FiCamera,
  FiUser,
} from "react-icons/fi";

const ProfileImageUploader = ({
  image,
  error,
  onChange,
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div
          className="
            flex h-28 w-28 items-center
            justify-center overflow-hidden
            rounded-full bg-indigo-50
          "
        >
          {image ? (
            <img
              src={image}
              alt="User profile"
              className="h-full w-full object-cover"
            />
          ) : (
            <FiUser className="h-12 w-12 text-indigo-300" />
          )}
        </div>

        <label
          htmlFor="profileImage"
          className="
            absolute bottom-1 right-0
            flex h-9 w-9 cursor-pointer
            items-center justify-center
            rounded-full border-4 border-white
            bg-indigo-600 text-white
            shadow-sm transition-colors
            hover:bg-indigo-700
          "
        >
          <FiCamera className="h-4 w-4" />

          <input
            id="profileImage"
            type="file"
            accept=".jpg,.jpeg,.png,.gif"
            onChange={onChange}
            className="sr-only"
          />
        </label>
      </div>

      <label
        htmlFor="profileImage"
        className="
          mt-3 cursor-pointer text-sm
          font-medium text-slate-700
          hover:text-indigo-600
        "
      >
        Change Photo
      </label>

      <p className="mt-1 text-center text-[11px] text-slate-500">
        JPG, PNG or GIF. Max size 2MB.
      </p>

      {error && (
        <p className="mt-2 text-center text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default ProfileImageUploader;