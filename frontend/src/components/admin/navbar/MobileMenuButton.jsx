import { Menu } from "lucide-react";

const MobileMenuButton = () => {
  return (
    <label
      htmlFor="admin-drawer"
      className="btn btn-ghost btn-square lg:hidden"
      aria-label="Open sidebar"
    >
      <Menu size={22} />
    </label>
  )
}

export default MobileMenuButton