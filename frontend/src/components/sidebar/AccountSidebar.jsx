import { accountNavigation, logoutNavigation } from "../my-profile/data/accountNavigation";
import PromoCard from "./PromoCard";
import SidebarNavItem from "./SidebarNavItem";
import useLogout from "../../hooks/mutations/useLogout";


const AccountSidebar = ({ onNavigate }) => {
  const LogoutIcon = logoutNavigation.icon;
  const logoutMutation = useLogout();


  return (
    <aside
      className="
        flex h-fit flex-col rounded-xl border border-slate-200
        bg-white p-3 shadow-[0_3px_12px_rgba(15,23,42,0.05)]
        lg:sticky lg:top-5
      "
    >
      <nav aria-label="Account navigation" className="space-y-1">
        {accountNavigation.map((item) => (
          <SidebarNavItem
            key={item.id}
            item={item}
            onClick={onNavigate}
          />
        ))}
      </nav>

      <button
        type="button"
        onClick={() => logoutMutation.mutate()}
        disabled={logoutMutation.isPending}
        className="
          mt-1 flex min-h-11 items-center gap-3 rounded-lg
          px-3 py-2.5 text-left text-sm font-medium
          text-red-500 transition-colors hover:bg-red-50
          disabled:cursor-not-allowed disabled:opacity-60
        "
      >
        <LogoutIcon className="h-4.75 w-4.75" />
        <span>{logoutNavigation.label}</span>
      </button>

      <div className="mt-8">
        <PromoCard />
      </div>
    </aside>
  );
};

export default AccountSidebar;