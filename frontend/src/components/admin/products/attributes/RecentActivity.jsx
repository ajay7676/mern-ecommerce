import {
  FiCheckCircle,
  FiClock,
  FiPlusCircle,
  FiTrash2,
} from "react-icons/fi";

const activities = [
  {
    text: "Size attribute updated",
    time: "2 hours ago",
    icon: FiCheckCircle,
  },
  {
    text: "New attribute 'Pattern' added",
    time: "5 hours ago",
    icon: FiPlusCircle,
  },
  {
    text: "Color attribute values updated",
    time: "1 day ago",
    icon: FiPlusCircle,
  },
  {
    text: "Fit attribute deactivated",
    time: "2 days ago",
    icon: FiTrash2,
  },
];

const RecentActivity = () => {
  return (
    <section className="rounded-lg border border-slate-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-950">
          Recent Activity
        </h2>

        <FiClock
          size={17}
          className="text-slate-400"
        />
      </div>

      <div className="mt-3">
        {activities.map((activity) => {
          const Icon = activity.icon;

          return (
            <div
              key={activity.text}
              className="
                flex items-start gap-3
                border-b border-slate-100
                py-3 last:border-b-0
              "
            >
              <Icon
                size={15}
                className="mt-0.5 shrink-0 text-violet-600"
              />

              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-[#253875]">
                  {activity.text}
                </p>

                <p className="mt-1 text-[11px] text-slate-400">
                  {activity.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        className="
          mt-4 w-full
          text-center text-xs
          font-semibold text-violet-600
          hover:text-violet-700
        "
      >
        View all activity →
      </button>
    </section>
  );
};

export default RecentActivity;