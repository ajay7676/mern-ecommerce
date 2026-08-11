import ProfileCard from "./ProfileCard";

const DeleteAccountCard = ({
  onDelete,
}) => {
  return (
    <ProfileCard
      title="Delete Account"
      action="Delete Account"
      onAction={onDelete}
      className="min-h-82.5"
    >
      <div className="mt-2">
        <p className="text-[13px] font-medium text-[#4b5055]">
          Account can be deleted only when:
        </p>

        <div className="mt-5 space-y-1 text-[13px] leading-[1.45] text-[#5e6266]">
          <p>
            There are no actively pending orders
            (Forward and return)
          </p>

          <p>
            There are no pending settlements.
          </p>
        </div>
      </div>
    </ProfileCard>
  );
};

export default DeleteAccountCard;