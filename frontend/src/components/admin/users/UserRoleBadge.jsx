const styles = {
  admin: "bg-violet-100 text-violet-700",
  superAdmin: "bg-blue-100 text-blue-600",
  editor: "bg-amber-50 text-amber-500",
  user: "bg-green-100 text-slate-600",
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
        ${styles[role] ?? styles.user}
      `}
    >
      {role}
    </span>
  )
}

export default UserRoleBadge