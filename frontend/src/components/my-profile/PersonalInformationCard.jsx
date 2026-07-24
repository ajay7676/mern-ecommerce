import SectionCard from "../ui/SectionCard";
import ProfileField from "./ProfileField";

const PersonalInformationCard = ({ profile }) => {
  return (
    <SectionCard className="p-5 sm:p-6">
      <h2 className="text-base font-semibold text-slate-950">
        Personal Information
      </h2>

      <div
        className="
          mt-6 grid grid-cols-1 gap-x-8 gap-y-5
          md:grid-cols-2
          xl:grid-cols-4
        "
      >
        <ProfileField
          id="fullName"
          label="Full Name"
          value={profile.fullName}
          className="xl:col-span-2"
        />

        <ProfileField
          id="email"
          label="Email Address"
          value={profile.email}
          type="email"
          className="xl:col-span-2"
        />

        <ProfileField
          id="phone"
          label="Phone Number"
          value={profile.phone}
          className="xl:col-span-2"
        />

        <ProfileField
          id="dateOfBirth"
          label="Date of Birth"
          value={profile.dateOfBirth}
        />

        <ProfileField
          id="gender"
          label="Gender"
          value={profile.gender}
        />
      </div>
    </SectionCard>
  );
};

export default PersonalInformationCard;