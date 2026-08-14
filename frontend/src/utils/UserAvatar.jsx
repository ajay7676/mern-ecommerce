import Fallback from '../../public/images/user-placeholder.png'
const UserAvatar = ({ user, size = "40px" }) => {
  return (
    <img
      src={user?.avatar?.url || Fallback}
      alt={user?.name || "User"}
      onError={(event) => {
        event.currentTarget.src = Fallback;
      }}
      className="rounded-full object-cover w-12 h-12"
    />
  );
};

export default UserAvatar;