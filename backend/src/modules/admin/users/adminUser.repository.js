import User from "../../../model/userModel.js";

export const findUserById = (userId) => {
  return User.findById(userId);
};

export const findSafeUserById = (userId) => {
  return User.findById(userId)
    .select("-password -resetPasswordToken -resetPasswordExpire")
    .lean();
};

export const findUserByEmail = (email) => {
  return User.findOne({
    email,
  });
};

export const findUserByEmailExceptId = (email, userId) => {
  return User.findOne({
    email,

    _id: {
      $ne: userId,
    },
  });
};

export const createAdminUser = (payload) => {
  return User.create(payload);
};

export const countUsers = (filter) => {
  return User.countDocuments(filter);
};

export const findUsers = ({ filter, skip, limit, sort }) => {
  return User.find(filter)
    .select(
      "name email phone avatar role status createdAt updatedAt lastLoginAt",
    )
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .lean();
};


export const deleteAdminUserById = async (
  userId
) => {
  return User.findByIdAndDelete(userId);
};

export const getAdminUserStatsRepository =
  async () => {
    const [stats] = await User.aggregate([
      {
        $group: {
          _id: null,

          totalUsers: {
            $sum: 1,
          },

          activeUsers: {
            $sum: {
              $cond: [
                {
                  $eq: [
                    "$status",
                    "active",
                  ],
                },
                1,
                0,
              ],
            },
          },

          admins: {
            $sum: {
              $cond: [
                {
                  $eq: [
                    "$role",
                    "admin",
                  ],
                },
                1,
                0,
              ],
            },
          },

          pendingUsers: {
            $sum: {
              $cond: [
                {
                  $eq: [
                    "$status",
                    "pending",
                  ],
                },
                1,
                0,
              ],
            },
          },

          blockedUsers: {
            $sum: {
              $cond: [
                {
                  $eq: [
                    "$status",
                    "blocked",
                  ],
                },
                1,
                0,
              ],
            },
          },
        },
      },

      {
        $project: {
          _id: 0,

          totalUsers: 1,
          activeUsers: 1,
          admins: 1,
          pendingUsers: 1,
          blockedUsers: 1,
        },
      },
    ]);

    return (
      stats || {
        totalUsers: 0,
        activeUsers: 0,
        admins: 0,
        pendingUsers: 0,
        blockedUsers: 0,
      }
    );
  };



