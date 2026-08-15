const FALLBACK_AVATAR =
  "/images/user-placeholder.png";

const UserAvatar = ({ user }) => {
  return (
    <img
      src={
        user?.avatar?.url ||
        FALLBACK_AVATAR
      }
      alt={user?.name || "User"}
      onError={(event) => {
        event.currentTarget.onerror = null;
        event.currentTarget.src =
          FALLBACK_AVATAR;
      }}
      className="h-10 w-10 rounded-full object-cover"
    />
  );
};

export default UserAvatar;