import ProfileCard from "./ProfileCard";
import ProfileField from "./ProfileField";
import VerifiedValue from "./VerifiedValue";

const LoginDetailsCard = ({
  login,
  onChangePassword,
  onEditPhone,
  onEditEmail,
}) => {
  return (
    <ProfileCard
      title="Login Details"
      action="Change Password"
      onAction={onChangePassword}
      className="min-h-70"
    >
      <div className="space-y-4">
        <ProfileField label="Display Name">
          <VerifiedValue>
            {login.displayName}
          </VerifiedValue>
        </ProfileField>

        <div className="flex items-end justify-between gap-4">
          <ProfileField
            label="Your Mobile Number"
            className="min-w-0"
          >
            <VerifiedValue>
              {login.phone}
            </VerifiedValue>
          </ProfileField>

          <button
            type="button"
            onClick={onEditPhone}
            className="
              shrink-0
              text-[12px]
              font-semibold
              uppercase
              text-[#1976b9]
              hover:text-[#125d91]
            "
          >
            Edit
          </button>
        </div>

        <div className="flex items-end justify-between gap-4">
          <ProfileField
            label="Your Email address"
            className="min-w-0"
          >
            <VerifiedValue>
              <span className="break-all">
                {login.email}
              </span>
            </VerifiedValue>
          </ProfileField>

          <button
            type="button"
            onClick={onEditEmail}
            className="
              shrink-0
              text-[12px]
              font-semibold
              uppercase
              text-[#1976b9]
              hover:text-[#125d91]
            "
          >
            Edit
          </button>
        </div>

        <ProfileField label="Password">
          <span className="tracking-[2px]">
            •••••
          </span>
        </ProfileField>
      </div>
    </ProfileCard>
  );
};

export default LoginDetailsCard;