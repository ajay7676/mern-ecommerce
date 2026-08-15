import { FiX } from "react-icons/fi"

const UserViewHeader = ({onClose}) => {
  return (
    <header
          className="
            sticky
            top-0
            z-10
            flex
            items-center
            justify-between
            border-b
            border-slate-200
            bg-white
            px-6
            py-5
          "
        >
          <div>
            <h2 className="text-xl font-bold">
              User Details
            </h2>

            <p className="text-sm text-slate-500">
              Account information and activity
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              grid
              h-9
              w-9
              place-items-center
              rounded-lg
              hover:bg-slate-100
            "
          >
            <FiX />
          </button>
        </header>
  )
}

export default UserViewHeader