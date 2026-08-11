import ProfileCard from "./ProfileCard";
import ProfileField from "./ProfileField";
import VerifiedValue from "./VerifiedValue";

const DisplayInformationCard = ({
  profile,
  onEdit,
}) => {
  return (
    <ProfileCard
      title="Display information"
      action="Edit"
      onAction={onEdit}
      className="min-h-70"
    >
      <div className="space-y-5">
        <ProfileField label="Display Name">
          <VerifiedValue>
            {profile.displayName}
          </VerifiedValue>
        </ProfileField>

        <ProfileField label="Business Description">
          {profile.businessDescription}
        </ProfileField>
      </div>
    </ProfileCard>
  );
};

export default DisplayInformationCard;