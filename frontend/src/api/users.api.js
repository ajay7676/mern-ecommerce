// import { users } from "../data/admin/users/users.data";
import api from "./axios";

// const delay = (ms) => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   });
// };

// export const getUsers = async ({
//   page = 1,
//   limit = 10,
//   search = "",
//   role = "",
//   status = "",
// }) => {
//   await delay(600);

//   let filteredUsers = [...users];

//   const normalizedSearch = search.trim().toLowerCase();

//   if (normalizedSearch) {
//     filteredUsers = filteredUsers.filter((user) => {
//       return (
//         user.name.toLowerCase().includes(normalizedSearch) ||
//         user.email.toLowerCase().includes(normalizedSearch) ||
//         user.phone.toLowerCase().includes(normalizedSearch)
//       );
//     });
//   }

//   if (role) {
//     filteredUsers = filteredUsers.filter((user) => user.role === role);
//   }

//   if (status) {
//     filteredUsers = filteredUsers.filter((user) => user.status === status);
//   }

//   const totalUsers = filteredUsers.length;

//   const totalPages = Math.ceil(totalUsers / limit);

//   const startIndex = (page - 1) * limit;
//   const endIndex = startIndex + limit;

//   const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

//   return {
//     success: true,

//     data: paginatedUsers,

//     pagination: {
//       currentPage: page,
//       limit,
//       totalUsers,
//       totalPages,
//     },
//   };
// };

export const getUsers = async ({
  page = 1,
  limit = 10,
  search = "",
  role = "",
  status = "",
  joinedFrom = "",
  joinedTo = "",
}) => {
  const response = await api.get("/admin/users", {
    params: {
      page,
      limit,
      search: search || undefined,
      role: role || undefined,
      status: status || undefined,
      joinedFrom: joinedFrom || undefined,
      joinedTo: joinedTo || undefined,
    },
  });
   return response.data;
};

export const getUserById = async (userId) => {
  const response = await api.get(
    `/admin/users/${userId}`,
  );

  return response.data;
};

export const createUser = async (payload) => {
  const response = await api.post(
    "/admin/users",
    payload,
  );

  return response.data;
};

export const updateUser = async ({
  userId,
  payload,
}) => {
  const response = await api.patch(
    `/admin/users/${userId}`,
    payload,
  );

  return response.data;
};

export const updateUserStatus = async ({
  userId,
  status,
}) => {
  const response = await api.patch(
    `/admin/users/${userId}/status`,
    {
      status,
    },
  );

  return response.data;
};
