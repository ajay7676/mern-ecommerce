// import profileAvatar from '../../../assets/images/profile-avatar.webp';
import { useState } from "react";
import AccountLayout from "../../../components/my-profile/AccountLayout";
import EmailPreferencesCard from "../../../components/my-profile/EmailPreferencesCard";
import PersonalInformationCard from "../../../components/my-profile/PersonalInformationCard";
import ProfileHeaderCard from "../../../components/my-profile/ProfileHeaderCard";

import useAuthProfile from "../../../hooks/queries/useAuthProfile";

import { emailPreferences } from "../../../components/my-profile/data/profileData";
import EditProfileModal from "../../../components/my-profile/modal/EditProfileModal";

const Profile = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { data, isLoading, isPending } = useAuthProfile();

  console.log(data);

  const profileData = data?.user;

  const handleEditProfile = () => {
    console.log("Open edit profile form");
    setIsEditModalOpen(true);
  };

  const handleChangeImage = () => {
    console.log("Open profile image uploader");
  };

  return (
    <>
      {isEditModalOpen && (
        <EditProfileModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          user={profileData}
        />
      )}
      <AccountLayout>
        <div
          className="
          rounded-xl border border-slate-200 bg-white
          p-3 shadow-[0_4px_16px_rgba(15,23,42,0.04)]
          sm:p-4
        "
        >
          <h1 className="hidden text-xl font-bold text-slate-950 lg:block">
            My Profile
          </h1>

          <div className="mt-0 space-y-5 lg:mt-5">
            <ProfileHeaderCard
              profile={profileData}
              onEdit={handleEditProfile}
              onChangeImage={handleChangeImage}
            />

            <PersonalInformationCard profile={profileData} />

            <EmailPreferencesCard preferences={emailPreferences} />
          </div>
        </div>
      </AccountLayout>
    </>
  );
};

export default Profile;
