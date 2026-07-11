export const selectAuth = (state) => state.auth;

export const selectUser = (state) => state.auth.user;

export const selectIsAuthenticated = (state) =>
  state.auth.isAuthenticated;

export const selectIsLoading = (state) =>
  state.auth.isLoading;

export const selectIsAuthChecked = (state) =>
  state.auth.isAuthChecked;

export const selectAuthError = (state) =>
  state.auth.error;