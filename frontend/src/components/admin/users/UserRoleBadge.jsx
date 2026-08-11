const styles = {
  Admin: "bg-violet-100 text-violet-700",
  SuperAdmin: "bg-blue-100 text-blue-600",
  Editor: "bg-amber-50 text-amber-500",
  User: "bg-slate-100 text-slate-600",
};

const UserRoleBadge = ({ role }) => {
  return (
     <span
      className={`
        inline-flex
        rounded-md
        px-2.5
        py-1
        text-xs
        font-medium
        ${styles[role] ?? styles.User}
      `}
    >
      {role}
    </span>
  )
}

export default UserRoleBadge