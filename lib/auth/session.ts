import type { AdminSession } from "@/types/admin";

export const ADMIN_AUTH_PLACEHOLDER =
  "Scaffold only: real session bootstrap must load /v1/admin/auth/me from the Admin Backend.";

export function getScaffoldSession(): AdminSession | null {
  return null;
}
