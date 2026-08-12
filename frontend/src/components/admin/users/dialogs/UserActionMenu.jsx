import { useEffect, useRef, useState } from "react";

import {
  FiEdit2,
  FiEye,
  FiMoreVertical,
  FiSlash,
  FiUnlock,
} from "react-icons/fi";

const UserActionMenu = ({ user, onView, onEdit, onStatusChange }) => {
  const [open, setOpen] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isBlocked = user.status === "Blocked";

  const runAction = (callback) => {
    setOpen(false);

    callback();
  };

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label={`Actions for ${user.name}`}
        aria-expanded={open}
        className="
          grid
          h-9
          w-9
          place-items-center
          rounded-lg
          text-slate-500
          hover:bg-slate-100
        "
      >
        <FiMoreVertical />
      </button>

      {open && (
        <div
          className="
            absolute
            right-0
            top-10
            z-30
            w-44
            overflow-hidden
            rounded-xl
            border
            border-slate-200
            bg-white
            py-1
            shadow-xl
          "
        >
          <button
            type="button"
            onClick={() => runAction(onView)}
            className="
              flex
              w-full
              items-center
              gap-3
              px-4
              py-2.5
              text-left
              text-sm
              hover:bg-slate-50
            "
          >
            <FiEye />
            View User
          </button>

          <button
            type="button"
            onClick={() => runAction(onEdit)}
            className="
              flex
              w-full
              items-center
              gap-3
              px-4
              py-2.5
              text-left
              text-sm
              hover:bg-slate-50
            "
          >
            <FiEdit2 />
            Edit User
          </button>

          <div className="my-1 border-t border-slate-100" />

          <button
            type="button"
            onClick={() => runAction(onStatusChange)}
            className={`
              flex
              w-full
              items-center
              gap-3
              px-4
              py-2.5
              text-left
              text-sm
              ${isBlocked ? "text-emerald-600" : "text-red-600"}
            `}
          >
            {isBlocked ? <FiUnlock /> : <FiSlash />}

            {isBlocked ? "Unblock User" : "Block User"}
          </button>
        </div>
      )}
    </div>
  );
};

export default UserActionMenu;
