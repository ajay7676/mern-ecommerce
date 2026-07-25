import { useState } from "react";
import {
  ALLOWED_PROFILE_IMAGE_TYPES,
  MAX_PROFILE_IMAGE_SIZE,
} from "../../../constants/account-settings/accountSettings.constants";
import {
  initialEmailPreferences,
  initialPasswordData,
  initialProfileData,
} from "../../../constants/account-settings/accountSettings.js";


const wait = (milliseconds) =>
  new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });

const useAccountSettings = () => {
  const [profileForm, setProfileForm] = useState(initialProfileData);
  const [profileErrors, setProfileErrors] = useState({});
  const [passwordForm, setPasswordForm] = useState(initialPasswordData);
  const [passwordErrors, setPasswordErrors] = useState({});
  const [emailPreferences, setEmailPreferences] = useState(
    initialEmailPreferences,
  );

  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleProfileChange = (event) => {
    const { name, value } = event.target;

    setProfileForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    setProfileErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!ALLOWED_PROFILE_IMAGE_TYPES.includes(file.type)) {
      setProfileErrors((currentErrors) => ({
        ...currentErrors,
        avatar: "Only JPG, PNG and GIF files are allowed.",
      }));

      return;
    }

    if (file.size > MAX_PROFILE_IMAGE_SIZE) {
      setProfileErrors((currentErrors) => ({
        ...currentErrors,
        avatar: "Image size must be less than 2MB.",
      }));

      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setProfileForm((currentForm) => ({
      ...currentForm,
      avatar: previewUrl,
      avatarFile: file,
    }));

    setProfileErrors((currentErrors) => ({
      ...currentErrors,
      avatar: "",
    }));
  };

  const validateProfile = () => {
    const nextErrors = {};

    if (!profileForm.fullName.trim()) {
      nextErrors.fullName = "Full name is required.";
    }

    if (!/^\S+@\S+\.\S+$/.test(profileForm.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    const normalizedPhone = profileForm.phone.replace(/\D/g, "").slice(-10);

    if (!/^[6-9]\d{9}$/.test(normalizedPhone)) {
      nextErrors.phone = "Enter a valid Indian phone number.";
    }

    if (!profileForm.dateOfBirth) {
      nextErrors.dateOfBirth = "Date of birth is required.";
    }

    setProfileErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const saveProfile = async (event) => {
    event.preventDefault();

    if (!validateProfile()) {
      return;
    }

    try {
      setIsSavingProfile(true);

      // Replace with update profile API.
      await wait(500);
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;

    setPasswordForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    setPasswordErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));
  };

  const validatePassword = () => {
    const nextErrors = {};

    if (!passwordForm.currentPassword) {
      nextErrors.currentPassword = "Current password is required.";
    }

    if (passwordForm.newPassword.length < 8) {
      nextErrors.newPassword =
        "New password must contain at least 8 characters.";
    }

    if (
      passwordForm.newPassword !==
      passwordForm.confirmPassword
    ) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    setPasswordErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const updatePassword = async (event) => {
    event.preventDefault();

    if (!validatePassword()) {
      return;
    }

    try {
      setIsUpdatingPassword(true);

      // Replace with update password API.
      await wait(500);

      setPasswordForm(initialPasswordData);
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const changeEmailPreference = (preferenceId, enabled) => {
    setEmailPreferences((currentPreferences) =>
      currentPreferences.map((preference) =>
        preference.id === preferenceId
          ? {
              ...preference,
              enabled,
            }
          : preference,
      ),
    );

    // Call preference update API here.
  };

  const openDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const deleteAccount = async () => {
    try {
      setIsDeletingAccount(true);

      // Replace with delete account API.
      await wait(600);

      closeDeleteDialog();
    } finally {
      setIsDeletingAccount(false);
    }
  };

  return {
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
  };
};

export default useAccountSettings;