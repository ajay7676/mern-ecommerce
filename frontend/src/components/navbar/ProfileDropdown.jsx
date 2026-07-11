import { NavLink } from "react-router-dom";
import { guestMenu, userMenu } from "../../constants/profileMenu";
import useLogout from "../../hooks/mutations/useLogout";

const ProfileDropdown = ({
  isAuthenticated = false,
  user = null,
  onClose,
}) => {
     const logoutMutation = useLogout();
    const baseMenus  = isAuthenticated ? userMenu : guestMenu;
    const menus = baseMenus.filter((item) => {
    // Menu is visible to everyone
    if (!item.access) {
        return true;
    }
    // Menu is role-based
    return item.access.includes(user?.role);
    });

  return (
        <div className="mt-3 w-72 rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-100">
                <h3 className="font-bold text-lg text-slate-900">
                    {
                        isAuthenticated 
                        ? `Hello, ${user?.name}`
                        :  "Welcome"
                    }
                </h3>
                    <p className="text-sm text-slate-500 mt-1">
                    {
                        isAuthenticated
                        ? user?.email
                        : "Login to access your account"
                    }
                </p>
                {

                    !isAuthenticated && (
                        <NavLink
                            to="/login"
                            onClick={onClose}
                            className="btn btn-sm bg-red-500 hover:bg-red-600 border-none text-white rounded-full mt-4 w-full"
                        >
                            Login / Register
                        </NavLink>
                    )
                }
            </div>
                {/* Menu */}

            <div className="py-2">

                {menus.map((item) => {
                const Icon = item.icon;

                if (item.action === "logout") {
                    return (
                        <button
                        key={item.label}
                        type="button"
                        onClick={() => logoutMutation.mutate()}
                        disabled={logoutMutation.isPending}
                        className="flex w-full cursor-pointer items-center gap-4 px-6 py-3 text-red-500 hover:bg-red-50 transition"
                        >
                        <Icon className="text-lg" />

                        <span className="text-sm font-medium">
                            {item.label}
                        </span>
                        </button>
                    );
                }
                // if (item.type === "button") {
                // // Render button
                // } else {
                // // Render NavLink
                // }
                return (
                    <NavLink
                    key={item.label}
                    to={item.path}
                    onClick={onClose}
                    className={`flex items-center gap-4 px-6 py-3 transition-colors
                    ${
                        item.danger
                        ? "text-red-500 hover:bg-red-50"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                    >
                    <Icon className="text-lg" />

                    <span className="text-sm font-medium">
                        {item.label}
                    </span>
                    </NavLink>
                );
                })}
            </div>

            {/* Footer */}

            <div className="border-t border-slate-100 px-6 py-4 bg-slate-50">

                <p className="text-xs text-slate-500">
                Need help?
                </p>

                <NavLink
                to="/contact"
                onClick={onClose}
                className="text-sm font-semibold text-red-500 hover:underline"
                >
                Contact Support
                </NavLink>

            </div>
        </div>
  )
}

export default ProfileDropdown