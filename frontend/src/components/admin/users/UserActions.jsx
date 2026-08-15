import {
  FiEye,
  FiEdit2,
  // FiMoreVertical,
  FiTrash,
} from "react-icons/fi";

const ActionButton  = ({
  children,
  label,
  onClick,
}) => {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="
        flex
        h-8
        w-8
        items-center
        justify-center
        rounded-md
        text-slate-500
        transition
        hover:bg-slate-100
        hover:text-slate-900
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-violet-500
        cursor-pointer
      "
    >
      {children}
    </button>
  );
}

const UserActions = ({user , handleDeleteClick , handleEditUser}) => {
  return (
    <div className="flex items-center gap-1">
      <ActionButton
        label={`View ${user.name}`}
        onClick={() => console.log("View", user)}
      >
        <FiEye size={17} />
      </ActionButton>

      <ActionButton
        label={`Edit ${user.name}`}
        onClick={() => handleEditUser(user)}
      >
        <FiEdit2 size={16} />
      </ActionButton>
      <ActionButton
        label={`Delete ${user.name}`}
        onClick={() => handleDeleteClick(user)}
      >
        <FiTrash size={16} />
      </ActionButton>

      {/* <ActionButton
        label={`More actions for ${user.name}`}
        onClick={() => console.log("More", user)}
      >
        <FiMoreVertical size={17} />
      </ActionButton> */}
    </div>
  )
}

export default UserActions