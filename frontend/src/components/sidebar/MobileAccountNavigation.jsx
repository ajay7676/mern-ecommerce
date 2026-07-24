import { FiMenu } from "react-icons/fi";

const MobileAccountNavigation = ({ onOpen }) => {
  return (
    <div className="mb-4 flex items-center justify-between lg:hidden">
      <h1 className="text-xl font-bold text-slate-950">My Profile</h1>

      <button
        type="button"
        onClick={onOpen}
        className="
          btn btn-square btn-ghost btn-sm
          border border-slate-200 bg-white
        "
        aria-label="Open account navigation"
      >
        <FiMenu className="h-5 w-5" />
      </button>
    </div>
  );
};

export default MobileAccountNavigation;