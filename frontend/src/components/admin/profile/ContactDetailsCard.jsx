import ProfileCard from "./ProfileCard";
import ProfileField from "./ProfileField";
import VerifiedValue from "./VerifiedValue";

const ContactDetailsCard = ({
  contact,
  onEdit,
}) => {
  return (
    <ProfileCard
      title="Contact Details"
      action="Edit"
      onAction={onEdit}
      className="min-h-82.5"
    >
      <div className="space-y-4">
        <ProfileField label="Your Name">
          {contact.name}
        </ProfileField>

        <ProfileField label="Your Mobile Number">
          <VerifiedValue>
            {contact.phone}
          </VerifiedValue>
        </ProfileField>

        <ProfileField label="Your Email address">
          <VerifiedValue>
            {contact.email}
          </VerifiedValue>
        </ProfileField>

        <ProfileField label="Preferred Time slot for calls">
          {contact.preferredCallTime}
        </ProfileField>

        <ProfileField label="Preferred Language">
          {contact.preferredLanguage}
        </ProfileField>
      </div>
    </ProfileCard>
  );
};

export default ContactDetailsCard;