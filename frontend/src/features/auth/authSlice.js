import {createSlice  } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isAuthChecked: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
   reducers: {
    setUser: (state,action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.isAuthChecked = true;
      state.error = null;
    },
     logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.isAuthChecked = true;
      state.error = null;
    },
    startLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
     stopLoading: (state) => {
      state.isLoading = false;
    },
     setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authChecked: (state) => {
      state.isAuthChecked = true;
    },
    clearAuthError: (state) => {
      state.error = null;
    },

  },
})
export const {
  setUser,
  logout,
  startLoading,
  stopLoading,
  authChecked,
  setError,
  clearAuthError,
} = authSlice.actions;



export default authSlice.reducer;