export const USER_FORM_NAME = {
  login: "login",
  password: "password",
} as const;

export const authKeys = {
  all: ["auth"],
  profile: () => [...authKeys.all, "profile"],
} as const;
