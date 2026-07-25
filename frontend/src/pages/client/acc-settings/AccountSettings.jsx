import AccountSettingsHeader from '../../../components/account-settings/AccountSettingsHeader';
import ChangePasswordCard from '../../../components/account-settings/ChangePasswordCard';
import DeleteAccountCard from '../../../components/account-settings/DeleteAccountCard';
import EmailPreferencesCard from '../../../components/account-settings/EmailPreferencesCard';
import ProfileInformationCard from '../../../components/account-settings/ProfileInformationCard';
import AccountLayout from '../../../components/my-profile/AccountLayout'
import ConfirmDialog from '../../../components/ui/ConfirmDialog';
import useAccountSettings from '../../../hooks/queries/accountsettings/useAccountSettings';

const AccountSettings = () => {
   const {
    profileForm,
    profileErrors,
    passwordForm,
    passwordErrors,
    emailPreferences,
    isSavingProfile,
    isUpdatingPassword,
    isDeletingAccount,
    isDeleteDialogOpen,
    handleProfileChange,
    handleImageChange,
    saveProfile,
    handlePasswordChange,
    updatePassword,
    changeEmailPreference,
    openDeleteDialog,
    closeDeleteDialog,
    deleteAccount,
  } = useAccountSettings();

  return (
    <AccountLayout>
      <div
        className="
          rounded-xl border border-slate-200 bg-white
          p-3 shadow-[0_4px_16px_rgba(15,23,42,0.04)]
          sm:p-4
        "
      >
         <AccountSettingsHeader />

        <div className="mt-0 space-y-5 lg:mt-5">
           <div
          className="
            mt-8 grid items-start gap-6
            lg:grid-cols-[minmax(0,1fr)_380px]
          "
        >
          <div className="min-w-0 space-y-5">
            <ProfileInformationCard
              form={profileForm}
              errors={profileErrors}
              isSaving={isSavingProfile}
              onChange={handleProfileChange}
              onImageChange={handleImageChange}
              onSubmit={saveProfile}
            />

            <EmailPreferencesCard
              preferences={emailPreferences}
              onChange={changeEmailPreference}
            />
          </div>

          <div className="space-y-5">
            <ChangePasswordCard
              form={passwordForm}
              errors={passwordErrors}
              isUpdating={isUpdatingPassword}
              onChange={handlePasswordChange}
              onSubmit={updatePassword}
            />

            <DeleteAccountCard
              onDelete={openDeleteDialog}
            />
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        title="Delete your account?"
        description="This action is permanent. Your profile, addresses, orders and saved information may be removed."
        confirmText="Delete Account"
        isLoading={isDeletingAccount}
        onCancel={closeDeleteDialog}
        onConfirm={deleteAccount}
      />
        </div>
    </AccountLayout>
  );
};

export default AccountSettings;
