
import {
  FiUsers,
  FiUserCheck,
  FiShield,
  FiClock,
  FiUserX,
} from "react-icons/fi";
import useUserStats from '../../../hooks/admin/queries/users/useUserStats'
import UserStatsCard from "./UserStatsCard";

const UserStats = () => {
   const {
    data: stats,
    isLoading,
    isError,
  } = useUserStats();
if (isError) {
    return (
      <div
        className="
          rounded-xl
          border
          border-red-200
          bg-red-50
          p-4
          text-sm
          text-red-600
        "
      >
        Failed to load user statistics.
      </div>
    );
  }

  const cards = [
    {
      key: "total",
      title: "Total Users",
      value: stats?.totalUsers,
      icon: FiUsers,
      description:
        "All registered users",
    },

    {
      key: "active",
      title: "Active Users",
      value: stats?.activeUsers,
      icon: FiUserCheck,
      description:
        "Users with active accounts",
    },

    {
      key: "admins",
      title: "Admins",
      value: stats?.admins,
      icon: FiShield,
      description:
        "Users with admin access",
    },

    {
      key: "pending",
      title: "Pending Users",
      value: stats?.pendingUsers,
      icon: FiClock,
      description:
        "Accounts awaiting activation",
    },

    {
      key: "blocked",
      title: "Blocked Users",
      value: stats?.blockedUsers,
      icon: FiUserX,
      description:
        "Users currently blocked",
    },
  ];

  return (
    <div
      className="
        grid
        grid-cols-1
        gap-4
        sm:grid-cols-2
        xl:grid-cols-5
      "
    >
      {cards.map((card) => (
        <UserStatsCard
          key={card.key}
          title={card.title}
          value={card.value}
          icon={card.icon}
          description={card.description}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};


export default UserStats;
