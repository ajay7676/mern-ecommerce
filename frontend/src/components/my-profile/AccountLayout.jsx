import { useState } from "react";
import { FiX } from "react-icons/fi";
import AccountSidebar from "./AccountSidebar";
import MobileAccountNavigation from "./MobileAccountNavigation";

const AccountLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    console.log("Logout user");
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] px-3 py-4 sm:px-5 lg:px-2">
      <div
        className="
          mx-auto grid w-full max-w-360 gap-5
          lg:grid-cols-[290px_minmax(0,1fr)]
        "
      >
        <div className="hidden lg:block">
          <AccountSidebar onLogout={handleLogout} />
        </div>

        <main className="min-w-0">
          <MobileAccountNavigation
            onOpen={() => setIsSidebarOpen(true)}
          />

          {children}
        </main>
      </div>

      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation overlay"
            onClick={closeSidebar}
            className="absolute inset-0 bg-slate-950/40"
          />

          <div
            className="
              relative h-full w-72.5 max-w-[85vw]
              overflow-y-auto bg-[#f8f9fc] p-3 shadow-2xl
            "
          >
            <div className="mb-3 flex justify-end">
              <button
                type="button"
                onClick={closeSidebar}
                className="btn btn-circle btn-ghost btn-sm"
                aria-label="Close account navigation"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            <AccountSidebar
              onNavigate={closeSidebar}
              onLogout={handleLogout}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountLayout;