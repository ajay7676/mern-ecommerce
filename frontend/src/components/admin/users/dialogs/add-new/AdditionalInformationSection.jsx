import {
  FiBriefcase,
  FiCalendar,
  FiClock,
  FiMapPin,
  FiUserCheck,
} from "react-icons/fi";

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

const errorInputClass = `
  border-red-300
  focus:border-red-500
  focus:ring-red-100
`;

const AdditionalInformationSection = ({
  values,
  errors = {},
  onChange,
  onAddressChange,
  disabled = false,
}) => {
  const addressErrors = errors.address || {};

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
        <h3 className="font-semibold text-slate-900">Additional Information</h3>

        <p className="mt-1 text-sm text-slate-500">
          Add optional work and address details for the user.
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
        {/* Department */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Department
          </label>

          <div className="relative">
            <FiBriefcase
              className="
                pointer-events-none
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
              size={17}
            />

            <input
              type="text"
              value={values.department}
              onChange={(event) => onChange("department", event.target.value)}
              disabled={disabled}
              placeholder="Enter department"
              maxLength={100}
              className={`
                ${inputClass}
                ${errors.department ? errorInputClass : ""}
              `}
            />
          </div>

          {errors.department && (
            <p className="mt-1.5 text-xs font-medium text-red-500">
              {errors.department}
            </p>
          )}
        </div>

        {/* Designation */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Designation
          </label>

          <div className="relative">
            <FiUserCheck
              className="
                pointer-events-none
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
              size={17}
            />

            <input
              type="text"
              value={values.designation}
              onChange={(event) => onChange("designation", event.target.value)}
              disabled={disabled}
              placeholder="Enter designation"
              maxLength={100}
              className={`
                ${inputClass}
                ${errors.designation ? errorInputClass : ""}
              `}
            />
          </div>

          {errors.designation && (
            <p className="mt-1.5 text-xs font-medium text-red-500">
              {errors.designation}
            </p>
          )}
        </div>

        {/* Street */}

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Street Address
          </label>

          <div className="relative">
            <FiMapPin
              className="
                pointer-events-none
                absolute
                left-3
                top-3.5
                text-slate-400
              "
              size={17}
            />

            <textarea
              value={values.address?.street || ""}
              onChange={(event) =>
                onAddressChange("street", event.target.value)
              }
              disabled={disabled}
              placeholder="Enter street address"
              rows={3}
              maxLength={200}
              className={`
                w-full
                resize-none
                rounded-lg
                border
                border-slate-200
                bg-white
                py-3
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

                ${addressErrors.street ? errorInputClass : ""}
              `}
            />
          </div>

          {addressErrors.street && (
            <p className="mt-1.5 text-xs font-medium text-red-500">
              {addressErrors.street}
            </p>
          )}
        </div>

        {/* City */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            City
          </label>

          <input
            type="text"
            value={values.address?.city || ""}
            onChange={(event) => onAddressChange("city", event.target.value)}
            disabled={disabled}
            placeholder="Enter city"
            maxLength={100}
            className={`
              ${inputClass}
              pl-3

              ${addressErrors.city ? errorInputClass : ""}
            `}
          />

          {addressErrors.city && (
            <p className="mt-1.5 text-xs font-medium text-red-500">
              {addressErrors.city}
            </p>
          )}
        </div>

        {/* State */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            State
          </label>

          <input
            type="text"
            value={values.address?.state || ""}
            onChange={(event) => onAddressChange("state", event.target.value)}
            disabled={disabled}
            placeholder="Enter state"
            maxLength={100}
            className={`
              ${inputClass}
              pl-3

              ${addressErrors.state ? errorInputClass : ""}
            `}
          />

          {addressErrors.state && (
            <p className="mt-1.5 text-xs font-medium text-red-500">
              {addressErrors.state}
            </p>
          )}
        </div>

        {/* Country */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Country
          </label>

          <input
            type="text"
            value={values.address?.country || "India"}
            onChange={(event) => onAddressChange("country", event.target.value)}
            disabled={disabled}
            placeholder="Enter country"
            maxLength={100}
            className={`
              ${inputClass}
              pl-3

              ${addressErrors.country ? errorInputClass : ""}
            `}
          />

          {addressErrors.country && (
            <p className="mt-1.5 text-xs font-medium text-red-500">
              {addressErrors.country}
            </p>
          )}
        </div>

        {/* Pin Code */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Pin Code
          </label>

          <input
            type="text"
            inputMode="numeric"
            value={values.address?.pinCode || ""}
            onChange={(event) => onAddressChange("pinCode", event.target.value)}
            disabled={disabled}
            placeholder="Enter 6 digit pin code"
            maxLength={6}
            className={`
              ${inputClass}
              pl-3

              ${addressErrors.pinCode ? errorInputClass : ""}
            `}
          />

          {addressErrors.pinCode && (
            <p className="mt-1.5 text-xs font-medium text-red-500">
              {addressErrors.pinCode}
            </p>
          )}
        </div>

        {/* Joined On */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Joined On
          </label>

          <div
            className="
              flex
              h-11
              items-center
              gap-3
              rounded-lg
              border
              border-slate-200
              bg-slate-50
              px-3
              text-sm
              text-slate-500
            "
          >
            <FiCalendar />
            Set automatically after creation
          </div>
        </div>

        {/* Last Login */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Last Login
          </label>

          <div
            className="
              flex
              h-11
              items-center
              gap-3
              rounded-lg
              border
              border-slate-200
              bg-slate-50
              px-3
              text-sm
              text-slate-500
            "
          >
            <FiClock />
            Never
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdditionalInformationSection;
