import AccountLayout from '../../../components/my-profile/AccountLayout'

const AccountSettings = () => {
 

  return (
    <AccountLayout>
      <div
        className="
          rounded-xl border border-slate-200 bg-white
          p-3 shadow-[0_4px_16px_rgba(15,23,42,0.04)]
          sm:p-4
        "
      >
        <h1 className="hidden text-xl font-bold text-slate-950 lg:block">
          Account Settings
        </h1>

        <div className="mt-0 space-y-5 lg:mt-5">
          {/* <ProfileHeaderCard
            profile={profile}
            onEdit={handleEditProfile}
            onChangeImage={handleChangeImage}
          /> */}
        </div>
      </div>
    </AccountLayout>
  );
};

export default AccountSettings;
