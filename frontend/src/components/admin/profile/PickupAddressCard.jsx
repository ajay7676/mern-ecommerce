import {
  FiCheck,
  FiX,
} from "react-icons/fi";

import ProfileCard from "./ProfileCard";
import ProfileField from "./ProfileField";

const PickupAddressCard = ({
  address,
  onEdit,
}) => {
  return (
    <ProfileCard
      title="Pick up Address"
      action="Edit"
      onAction={onEdit}
      className="h-full min-h-157"
    >
      <div
        className="
          mb-6
          flex
          min-h-15.5
          items-center
          justify-between
          rounded-[10px]
          border
          border-[#a5e2b7]
          bg-[#ecfbf0]
          px-4
        "
      >
        <div className="flex items-center gap-3">
          <span
            className="
              flex
              h-5.5
              w-5.5
              items-center
              justify-center
              rounded-full
              bg-[#38ad60]
              text-white
            "
          >
            <FiCheck size={14} strokeWidth={3} />
          </span>

          <p className="text-[13px] font-medium text-[#3f4741]">
            Address updated on {address.lastUpdated}
          </p>
        </div>

        <button
          type="button"
          aria-label="Dismiss notification"
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-md
            text-[#58605b]
            transition
            hover:bg-[#d9f4e1]
          "
        >
          <FiX size={20} />
        </button>
      </div>

      <div className="space-y-5">
        <ProfileField label="Address Line 1">
          {address.addressLine1}
        </ProfileField>

        <ProfileField label="Address Line 2">
          {address.addressLine2}
        </ProfileField>

        <ProfileField label="Pin code">
          {address.pinCode}
        </ProfileField>

        <ProfileField label="Your pickup city">
          {address.city}
        </ProfileField>
      </div>
    </ProfileCard>
  );
};

export default PickupAddressCard;