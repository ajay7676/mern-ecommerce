import { FiMail, FiPhone, FiUser } from "react-icons/fi";

import UserAvatarUploader from "./UserAvatarUploader";

const inputClass = `
  h-11
  w-full
  rounded-lg
  border
  border-slate-200
  bg-white
  pl-10
  pr-3
  text-sm
  text-slate-800
  outline-none
  transition
  placeholder:text-slate-400
  focus:border-violet-500
  focus:ring-2
  focus:ring-violet-100
  disabled:cursor-not-allowed
  disabled:bg-slate-50
  disabled:text-slate-500
`;

const BasicInformationSection = ({ values, errors, onChange, disabled }) => {
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
        <h3 className="font-semibold text-slate-900">Basic Information</h3>

        <p className="mt-1 text-sm text-slate-500">
          Enter the basic details of the user.
        </p>
      </div>

      <div
        className="
          mt-6
          grid
          grid-cols-1
          gap-x-6
          gap-y-5
          md:grid-cols-2
        "
      >
        {/* Full Name */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Full Name
            <span className="ml-1 text-red-500">*</span>
          </label>

          <div className="relative">
            <FiUser
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="text"
              value={values.name}
              onChange={(event) => onChange("name", event.target.value)}
              disabled={disabled}
              placeholder="Enter full name"
              autoComplete="name"
              className={inputClass}
            />
          </div>

          {errors.name && (
            <p className="mt-1.5 text-xs font-medium text-red-500">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Email Address
            <span className="ml-1 text-red-500">*</span>
          </label>

          <div className="relative">
            <FiMail
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="email"
              value={values.email}
              onChange={(event) => onChange("email", event.target.value)}
              disabled={disabled}
              placeholder="Enter email address"
              autoComplete="email"
              className={inputClass}
            />
          </div>

          {errors.email && (
            <p className="mt-1.5 text-xs font-medium text-red-500">
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Phone Number
          </label>

          <div className="relative">
            <FiPhone
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="tel"
              value={values.phone}
              onChange={(event) => onChange("phone", event.target.value)}
              disabled={disabled}
              placeholder="Enter phone number"
              autoComplete="tel"
              className={inputClass}
            />
          </div>

          {errors.phone && (
            <p className="mt-1.5 text-xs font-medium text-red-500">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Profile image */}

        <UserAvatarUploader
          value={values.profileImage}
          onChange={(image) => onChange("profileImage", image)}
          disabled={disabled}
        />
      </div>
    </section>
  );
};

export default BasicInformationSection;
