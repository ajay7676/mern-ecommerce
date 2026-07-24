import { FiCalendar, FiMail, FiPhone } from "react-icons/fi";
import SectionCard from "../ui/SectionCard";
import ProfileAvatar from "./ProfileAvatar";

const ProfileHeaderCard = ({ profile, onEdit, onChangeImage }) => {
  return (
    <SectionCard className="px-5 py-7 sm:px-8 lg:px-14 lg:py-9">
      <div
        className="
          flex flex-col items-center gap-7
          md:flex-row md:items-center
        "
      >
        <ProfileAvatar
          src={profile.avatar}
          name={profile.fullName}
          onChangeImage={onChangeImage}
        />

        <div className="min-w-0 flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-slate-950 sm:text-[26px]">
            {profile.fullName}
          </h2>

          <div className="mt-5 space-y-4">
            <ProfileMetaItem icon={FiMail}>
              {profile.email}
            </ProfileMetaItem>

            <ProfileMetaItem icon={FiPhone}>
              {profile.phone}
            </ProfileMetaItem>

            <ProfileMetaItem icon={FiCalendar}>
              Joined on {profile.joinedAt}
            </ProfileMetaItem>
          </div>
        </div>

        <button
          type="button"
          onClick={onEdit}
          className="
            self-center rounded-md border border-slate-200
            bg-white px-4 py-2 text-sm font-medium
            text-indigo-600 transition-colors
            hover:border-indigo-200 hover:bg-indigo-50
            md:self-start
          "
        >
          Edit Profile
        </button>
      </div>
    </SectionCard>
  );
};

const ProfileMetaItem = ({ icon: Icon, children }) => {
  return (
    <div
      className="
        flex items-center justify-center gap-3
        text-sm text-slate-600 md:justify-start
      "
    >
      <Icon className="h-4.5 w-4.5 shrink-0 text-slate-500" />
      <span className="truncate">{children}</span>
    </div>
  );
};

export default ProfileHeaderCard;