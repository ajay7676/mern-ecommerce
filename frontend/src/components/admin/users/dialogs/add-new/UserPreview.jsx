import { FiMail, FiPhone, FiUser } from "react-icons/fi";


const UserPreview = ({ values }) => {
  const FALLBACK_AVATAR= '/images/user-placeholder.png'
  const avatarUrl =
    values?.profileImage?.url ||
    FALLBACK_AVATAR;

  const roleLabel = values?.role === "admin" ? "Admin" : "User";

  const statusLabel = values?.status || "active";

  return (
    <section
      className="
        rounded-xl
        border
        border-slate-200
        bg-white
        p-5
        sm:p-6
      "
    >
      <div>
        <h3 className="font-semibold text-slate-900">User Preview</h3>

        <p className="mt-1 text-sm text-slate-500">
          This is how the user profile will look.
        </p>
      </div>

      <div
        className="
          mt-7
          flex
          flex-col
          items-center
          text-center
        "
      >
        <div
          className="
            h-24
            w-24
            overflow-hidden
            rounded-full
            border
            border-violet-100
            bg-violet-50
          "
        >
          <img
            src={avatarUrl}
            alt={values?.name || "User avatar"}
            className="
              h-full
              w-full
              object-cover
            "
            onError={(event) => {
              event.currentTarget.src = FALLBACK_AVATAR;
            }}
          />
        </div>

        <h4
          className="
            mt-5
            max-w-full
            truncate
            text-lg
            font-bold
            text-slate-900
          "
        >
          {values?.name?.trim() || "Full Name"}
        </h4>

        <div
          className="
            mt-2
            flex
            flex-wrap
            items-center
            justify-center
            gap-2
          "
        >
          <span
            className="
              rounded-md
              bg-violet-50
              px-3
              py-1
              text-xs
              font-semibold
              text-violet-700
            "
          >
            {roleLabel}
          </span>

          <span
            className={`
              rounded-md
              px-3
              py-1
              text-xs
              font-semibold
              capitalize

              ${
                statusLabel === "active"
                  ? "bg-emerald-50 text-emerald-700"
                  : statusLabel === "blocked"
                    ? "bg-red-50 text-red-700"
                    : "bg-amber-50 text-amber-700"
              }
            `}
          >
            {statusLabel}
          </span>
        </div>

        <div
          className="
            mt-5
            w-full
            space-y-3
            text-sm
            text-slate-500
          "
        >
          <div
            className="
              flex
              items-center
              justify-center
              gap-2
            "
          >
            <FiMail className="shrink-0" size={16} />

            <span className="break-all">
              {values?.email?.trim() || "user@example.com"}
            </span>
          </div>

          <div
            className="
              flex
              items-center
              justify-center
              gap-2
            "
          >
            <FiPhone className="shrink-0" size={16} />

            <span>{values?.phone?.trim() || "+91 98765 43210"}</span>
          </div>
        </div>

        <div
          className="
            mt-6
            w-full
            border-t
            border-slate-100
            pt-5
          "
        >
          <div
            className="
              grid
              grid-cols-2
              gap-3
              text-left
            "
          >
            <div>
              <p className="text-xs text-slate-400">Department</p>

              <p className="mt-1 truncate text-sm font-medium text-slate-700">
                {values?.department?.trim() || "Not assigned"}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400">Designation</p>

              <p className="mt-1 truncate text-sm font-medium text-slate-700">
                {values?.designation?.trim() || "Not assigned"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserPreview;
