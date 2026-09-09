// import profileAvatar from '../../../assets/images/profile-avatar.webp';
import { useState } from "react";
import AccountLayout from "../../../components/my-profile/AccountLayout";
import EmailPreferencesCard from "../../../components/my-profile/EmailPreferencesCard";
import PersonalInformationCard from "../../../components/my-profile/PersonalInformationCard";
import ProfileHeaderCard from "../../../components/my-profile/ProfileHeaderCard";

import { emailPreferences } from "../../../components/my-profile/data/profileData";
import EditProfileModal from "../../../components/my-profile/modal/EditProfileModal";
import useProfile from "../../../hooks/queries/user/useProfile";
import ProfileSkeleton from "./ProfileSkeleton";

const Profile = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const {
    data: profileData,
    isLoading,
    isError,
    error,
    refetch,
  } = useProfile();
  const handleEditProfile = () => {
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
            {isLoading ? (
              <ProfileSkeleton />
            ) : isError ? (
              <div className="rounded-xl border border-error/20 bg-error/5 p-6">
                <h2 className="font-semibold text-error">
                  Failed to load profile
                </h2>

                <p className="mt-1 text-sm text-base-content/70">
                  {error?.response?.data?.message ||
                    "Something went wrong while loading your profile."}
                </p>

                <button
                  type="button"
                  onClick={() => refetch()}
                  className="btn btn-sm btn-error mt-4"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <>
                <ProfileHeaderCard
                  profile={profileData}
                  onEdit={handleEditProfile}
                  onChangeImage={handleChangeImage}
                />

                <PersonalInformationCard profile={profileData} />

                <EmailPreferencesCard preferences={emailPreferences} />
              </>
            )}
          </div>
        </div>
      </AccountLayout>
    </>
  );
};

export default Profile;
