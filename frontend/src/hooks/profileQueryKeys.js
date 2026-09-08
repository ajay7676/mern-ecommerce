export const profileQueryKeys = {
  all: ["profile"],

  detail: () => [...profileQueryKeys.all, "detail"],
};