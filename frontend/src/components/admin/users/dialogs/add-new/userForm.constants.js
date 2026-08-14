export const INITIAL_USER_VALUES = {
  name: "",
  email: "",
  phone: "",

  profileImage: null,

  role: "user",
  status: "active",

  password: "",
  confirmPassword: "",

  department: "",
  designation: "",
  address: "",
};

export const ROLE_PERMISSIONS = {
  admin: [
    "View Dashboard",
    "View Listings",
    "Manage Profile",
    "Manage Inventory",
    "Process Orders",
    "Manage Users",
  ],

  superadmin: [
    "View Dashboard",
    "Manage Listings",
    "Manage Inventory",
    "Process Orders",
    "Manage Payments",
    "View Reports",
    "Manage Users",
    "Settings",
  ],
};