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
  address: {
    street: "",
    city: "",
    state: "",
    country: "India",
    pinCode: "",
  },
};

export const ALL_PERMISSIONS = [
  "View Dashboard",
  "Manage Listings",
  "Manage Inventory",
  "Process Orders",
  "Manage Payments",
  "View Reports",
  "Manage Users",
  "Settings",
];

export const ROLE_PERMISSIONS = {
  user: [
    "View Dashboard",
    "View Listings",
  ],

  admin: ALL_PERMISSIONS,
};


