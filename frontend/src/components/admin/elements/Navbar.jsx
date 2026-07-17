import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";
import useLogout from "../../../hooks/mutations/useLogout";
const Navbar = () => {
  const logoutMutation = useLogout();
   const { user } = useSelector(
    (state) => state.auth
  );
  return (
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
      <div className="navbar px-4 lg:px-6 min-h-16">
        <div className="flex-none lg:hidden">
          <label htmlFor="admin-drawer" className="btn btn-square btn-ghost">
            ☰
          </label>
        </div>

        <div className="flex-1">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-800">
            Dashboard
          </h2>
        </div>

        <div className="hidden md:block mr-3">
          <label className="input input-bordered input-sm flex items-center gap-2 bg-gray-50">
            <input
              type="text"
              className="grow"
              placeholder="Search..."
            />
            <span>🔍</span>
          </label>
        </div>

        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <span className="text-xl">🔔</span>
            <span className="badge badge-xs badge-error indicator-item"></span>
          </div>
        </button>

        <div className="dropdown dropdown-end ml-2">
          <div tabIndex={0} role="button" className="avatar placeholder">
            <div className="bg-blue-600 text-white rounded-full w-10 flex justify-center items-center">
              <span className="font-bold ">A</span>
            </div>
          </div>

          <ul
            tabIndex={0}
            className="dropdown-content menu bg-white rounded-box z-50 w-52 p-2 shadow border border-gray-200"
          >
            <li>
              <Link>Profile</Link>
            </li>
            <li>
              <Link>Settings</Link>
            </li>
            <li>
              <Link 
              className="text-red-500"
               onClick={() => logoutMutation.mutate()}
              disabled={logoutMutation.isPending}
              >Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Navbar