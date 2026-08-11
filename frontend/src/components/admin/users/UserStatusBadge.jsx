
const styles = {
  Active: "bg-emerald-50 text-emerald-600",
  Pending: "bg-orange-50 text-orange-500",
  Blocked: "bg-rose-50 text-rose-500",
};

const dotStyles = {
  Active: "bg-emerald-500",
  Pending: "bg-orange-500",
  Blocked: "bg-rose-500",
};

const UserStatusBadge = ({ status }) => {
  return (
    <span
      className={`
        inline-flex
        items-center
        gap-2
        rounded-md
        px-2.5
        py-1
        text-xs
        font-medium
        ${styles[status]}
      `}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${dotStyles[status]}`}
      />

      {status}
    </span>
  )
}

export default UserStatusBadge