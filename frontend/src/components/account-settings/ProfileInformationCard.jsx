import AccountFormField from '../ui/AccountFormField';
import SelectField from '../ui/SelectField';
import {
  GENDER_OPTIONS,
  LANGUAGE_OPTIONS,
} from '../../constants/account-settings/accountSettings.constants'
import ProfileImageUploader from './ProfileImageUploader';
const ProfileInformationCard = ({
  form,
  errors,
  isSaving,
  onChange,
  onImageChange,
  onSubmit,
}) => {
  return (
    <section
      className="
        rounded-xl border border-slate-200
        bg-white p-5
        shadow-[0_4px_18px_rgba(15,23,42,0.035)]
        sm:p-6
      "
    >
      <h2 className="text-base font-semibold text-slate-950">
        Profile Information
      </h2>

      <p className="mt-1 text-xs text-slate-500">
        Update your personal details and profile information.
      </p>

      <form
        onSubmit={onSubmit}
        className="
          mt-6 grid gap-7
          md:grid-cols-[120px_minmax(0,1fr)]
        "
        noValidate
      >
        <ProfileImageUploader
          image={form.avatar}
          error={errors.avatar}
          onChange={onImageChange}
        />

        <div>
          <div
            className="
              grid grid-cols-1 gap-x-6 gap-y-5
              sm:grid-cols-2
            "
          >
            <AccountFormField
              id="fullName"
              name="fullName"
              label="Full Name"
              value={form.fullName}
              placeholder="Enter full name"
              error={errors.fullName}
              onChange={onChange}
            />

            <AccountFormField
              id="email"
              name="email"
              label="Email Address"
              value={form.email}
              type="email"
              placeholder="Enter email address"
              error={errors.email}
              onChange={onChange}
            />

            <AccountFormField
              id="phone"
              name="phone"
              label="Phone Number"
              value={form.phone}
              placeholder="Enter phone number"
              error={errors.phone}
              onChange={onChange}
            />

            <AccountFormField
              id="dateOfBirth"
              name="dateOfBirth"
              label="Date of Birth"
              value={form.dateOfBirth}
              type="date"
              error={errors.dateOfBirth}
              onChange={onChange}
            />

            <SelectField
              id="gender"
              name="gender"
              label="Gender"
              value={form.gender}
              options={GENDER_OPTIONS}
              error={errors.gender}
              onChange={onChange}
            />

            <SelectField
              id="language"
              name="language"
              label="Language"
              value={form.language}
              options={LANGUAGE_OPTIONS}
              error={errors.language}
              onChange={onChange}
            />
          </div>

          <div className="mt-5 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="
                btn h-11 min-h-11 rounded-md
                border-none bg-indigo-600 px-7
                text-sm font-medium text-white
                shadow-none hover:bg-indigo-700
              "
            >
              {isSaving && (
                <span className="loading loading-spinner loading-sm" />
              )}

              Save Changes
            </button>
          </div>
        </div>
      </form>
    </section>
  )
}

export default ProfileInformationCard