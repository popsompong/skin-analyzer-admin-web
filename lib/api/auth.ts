import type { AdminSession } from "@/types/admin";

export const adminAuthEndpoints = {
  login: "/v1/admin/auth/login",
  logout: "/v1/admin/auth/logout",
  me: "/v1/admin/auth/me"
} as const;

export type AdminLoginRequest = {
  email: string;
  password: string;
};

export type AdminLoginResponse = {
  session: AdminSession;
};
