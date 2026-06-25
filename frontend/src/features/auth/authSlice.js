import {createSlice  } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
   reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
  },
})
export const { clearAuthError } = authSlice.actions;


export default authSlice.reducer;