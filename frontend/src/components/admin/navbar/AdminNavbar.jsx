import MobileMenuButton from "./MobileMenuButton";
import SearchBox from "./SearchBox";
import NotificationMenu from "./NotificationMenu";
import UserDropdown from "./UserDropdown";
const AdminNavbar = () => {
  return (
    <header className="sticky top-0 z-30 border-b border-base-300 bg-base-100">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <MobileMenuButton />

          {/* <SearchBox /> */}
        </div>

        <div className="flex items-center gap-2">
          <NotificationMenu />

          <UserDropdown />
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
