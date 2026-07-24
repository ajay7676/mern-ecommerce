import { FiCamera } from "react-icons/fi";

const ProfileAvatar = ({ src, name, onChangeImage }) => {
  return (
    <div className="relative shrink-0">
      <div
        className="
          h-32 w-32 overflow-hidden rounded-full
          bg-indigo-100 sm:h-37.5 sm:w-37.5
        "
      >
        <img
          src={src}
          alt={`${name}'s profile`}
          className="h-full w-full object-cover"
        />
      </div>

      <button
        type="button"
        onClick={onChangeImage}
        className="
          absolute bottom-1 right-0 flex h-10 w-10
          items-center justify-center rounded-full
          border-4 border-white bg-indigo-600
          text-white shadow-sm transition-colors
          hover:bg-indigo-700
          focus:outline-none focus:ring-2
          focus:ring-indigo-500 focus:ring-offset-2
        "
        aria-label="Change profile picture"
      >
        <FiCamera className="h-4.5 w-4.5" />
      </button>
    </div>
  );
};

export default ProfileAvatar;