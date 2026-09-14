// components/UserManualUploadBox.jsx

import { useRef } from "react";
import { FileText, Trash2, UploadCloud } from "lucide-react";
import { useWatch } from "react-hook-form";

const MAX_MANUAL_SIZE = 5 * 1024 * 1024;

const allowedManualTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const formatFileSize = (size = 0) => {
  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};

const UserManualUploadBox = ({
  control,
  setValue,
  setError,
  clearErrors,
  error,
}) => {
  const inputRef = useRef(null);

  const userManual = useWatch({
    control,
    name: "userManual",
  });

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!allowedManualTypes.includes(file.type)) {
      setError("userManual", {
        type: "manual",
        message: "Only PDF, DOC and DOCX files are allowed",
      });

      event.target.value = "";
      return;
    }

    if (file.size > MAX_MANUAL_SIZE) {
      setError("userManual", {
        type: "manual",
        message: "Manual file size must be less than 5MB",
      });

      event.target.value = "";
      return;
    }

    setValue(
      "userManual",
      {
        name: file.name,
        size: file.size,
        type: file.type,
        file,
      },
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    );

    clearErrors("userManual");
    event.target.value = "";
  };

  const handleRemove = () => {
    setValue("userManual", null, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-800">
        User Manual / Instructions{" "}
        <span className="font-medium text-slate-500">(Optional)</span>
      </label>

      {!userManual ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex min-h-33.75 w-full flex-col items-center justify-center rounded-xl border border-dashed border-primary/40 bg-primary/5 px-5 py-6 text-center hover:bg-primary/10"
        >
          <UploadCloud className="h-9 w-9 text-primary" />

          <span className="mt-3 text-sm font-bold text-primary">
            Click to upload
          </span>

          <span className="mt-1 text-xs font-medium text-slate-500">
            PDF, DOC, DOCX up to 5MB
          </span>
        </button>
      ) : (
        <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FileText className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-slate-900">
                {userManual.name}
              </p>

              <p className="text-xs font-medium text-slate-500">
                {formatFileSize(userManual.size)}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRemove}
            className="btn btn-ghost btn-sm btn-circle text-error"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        onChange={handleFileChange}
      />

      {error && (
        <p className="mt-1 text-xs font-medium text-error">
          {error}
        </p>
      )}
    </div>
  );
};

export default UserManualUploadBox;