import { useRef, useState } from "react";

import { FiCamera, FiTrash2, FiUploadCloud } from "react-icons/fi";

import useUploadUserAvatar from "../../../../../hooks/admin/mutations/users/useUploadUserAvatar";
import useDeleteTemporaryUserAvatar from "../../../../../hooks/admin/mutations/users/useDeleteTemporaryUserAvatar";

import {
  validateUserAvatar,
  USER_AVATAR_ALLOWED_TYPES,
} from "../../../../../utils/userAvatarValidation";

const UserAvatarUploader = ({ value, onChange, disabled = false }) => {
  const inputRef = useRef(null);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const { mutateAsync: uploadAvatar, isPending } = useUploadUserAvatar();
  const { mutateAsync: deleteAvatar, isPending: isDeleting } =
    useDeleteTemporaryUserAvatar();

  const handleFile = async (file) => {
    if (!file) {
      return;
    }

    setError("");

    const validationError = validateUserAvatar(file);

    if (validationError) {
      setError(validationError);
      return;
    }

    /*
     * Temporary browser preview.
     */
    const previewUrl = URL.createObjectURL(file);

    try {
      /*
       * Show preview immediately.
       */
      onChange({
        file,
        previewUrl,
        uploading: true,
      });

      const response = await uploadAvatar(file);

      const uploadedImage = response?.data;

      if (!uploadedImage?.url || !uploadedImage?.publicId) {
        throw new Error("Invalid image upload response");
      }

      /*
       * Replace temporary data with
       * Cloudinary image information.
       */
      onChange({
        url: uploadedImage.url,
        publicId: uploadedImage.publicId,
        width: uploadedImage.width,
        height: uploadedImage.height,
        uploading: false,
      });

      URL.revokeObjectURL(previewUrl);
    } catch (error) {
      URL.revokeObjectURL(previewUrl);

      onChange(null);

      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to upload profile image",
      );
    }
  };

  const handleInputChange = (event) => {
    const file = event.target.files?.[0];

    handleFile(file);

    /*
     * Allows selecting same image again.
     */
    event.target.value = "";
  };

  const handleDrop = (event) => {
    event.preventDefault();

    setIsDragging(false);

    if (disabled || isPending) {
      return;
    }

    const file = event.dataTransfer.files?.[0];

    handleFile(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();

    if (!disabled && !isPending) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleRemove = async () => {
    try {
      if (value?.publicId) {
        await deleteAvatar(value.publicId);
      }

      if (value?.previewUrl) {
        URL.revokeObjectURL(value.previewUrl);
      }

      onChange(null);
    } catch (error) {
      setError(
        error?.response?.data?.message || "Failed to remove profile image",
      );
    }
  };

  const imageUrl = value?.url || value?.previewUrl;

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        Profile Picture
      </label>

      {imageUrl ? (
        <div
          className="
            flex
            min-h-28
            items-center
            justify-between
            gap-4
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            p-4
          "
        >
          <div className="flex min-w-0 items-center gap-4">
            <div
              className="
                relative
                h-20
                w-20
                shrink-0
                overflow-hidden
                rounded-full
                border
                border-slate-200
                bg-white
              "
            >
              <img
                src={imageUrl}
                alt="User avatar preview"
                className="
                  h-full
                  w-full
                  object-cover
                "
              />
              {/* <UserAvatarUploader
                value={imageUrl.profileImage}
                onChange={(image) => onChange("profileImage", image)}
                disabled={disabled}
              /> */}

              {isPending && (
                <div
                  className="
                    absolute
                    inset-0
                    flex
                    items-center
                    justify-center
                    bg-slate-950/40
                    text-xs
                    font-medium
                    text-white
                  "
                >
                  Uploading
                </div>
              )}
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-800">
                Profile image
              </p>

              <p className="mt-1 text-xs text-slate-500">
                PNG, JPG or WEBP · Max 2 MB
              </p>

              {isPending && (
                <p className="mt-1 text-xs font-medium text-violet-600">
                  Uploading Profile Image...
                </p>
              )}
              {isDeleting && (
                <p className="mt-1 text-xs font-medium text-violet-600">
                  Removing Profile Image...
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleRemove}
            disabled={disabled || isPending || isDeleting}
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-lg
              border
              border-red-200
              text-red-500
              transition
              hover:bg-red-50
              cursor-pointer
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
            aria-label="Remove profile image"
          >
            <FiTrash2 size={17} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          disabled={disabled || isPending}
          className={`
            flex
            min-h-28
            w-full
            flex-col
            items-center
            justify-center
            rounded-xl
            border
            border-dashed
            px-4
            py-5
            text-center
            transition

            ${
              isDragging
                ? "border-violet-500 bg-violet-50"
                : "border-slate-300 bg-slate-50 hover:border-violet-400 hover:bg-violet-50/40"
            }

            disabled:cursor-not-allowed
            disabled:opacity-60
          `}
        >
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-violet-100
              text-violet-600
            "
          >
            {isDragging ? <FiCamera size={20} /> : <FiUploadCloud size={20} />}
          </div>

          <p className="mt-2 text-sm font-semibold text-violet-600">
            {isDragging ? "Drop image here" : "Upload Image"}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            PNG, JPG or WEBP (Max 2MB)
          </p>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={USER_AVATAR_ALLOWED_TYPES.join(",")}
        onChange={handleInputChange}
        hidden
      />

      {error && (
        <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>
      )}
    </div>
  );
};

export default UserAvatarUploader;
