import { userStats } from "../../../data/admin/users/users.data";
import UserStatsCard from "./UserStatsCard";

const UserStats = ({users}) => {
  return (
    <section
      className="
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-2
            xl:grid-cols-5
          "
    >
      {userStats.map((stat) => (
        <UserStatsCard key={stat.title} {...stat} users={users} />
      ))}
    </section>
  );
};

export default UserStats;
