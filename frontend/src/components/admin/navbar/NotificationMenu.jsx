import { Bell } from "lucide-react";

const NotificationMenu = () => {
  return (
     <button className="btn btn-ghost btn-circle">

      <div className="indicator">

        <Bell size={20} />

        <span className="badge badge-xs badge-primary indicator-item">
          3
        </span>

      </div>

    </button>
  )
}

export default NotificationMenu