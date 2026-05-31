import { adminApiFetch, adminApiRequest } from "@/lib/api/client";
import type {
  AdminAuthRole,
  AdminAuthSession,
  AdminAuthSnapshot,
  AdminAuthUser
} from "@/types/admin-auth";

export const adminAuthEndpoints = {
  login: "/v1/admin/auth/login",
  logout: "/v1/admin/auth/logout",
  me: "/v1/admin/auth/me"
} as const;

export type AdminLoginRequest = {
  email: string;
  password: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return isRecord(value) ? value : null;
}

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function asString(value: unknown): string | undefined {
  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number") {
    return String(value);
  }

  return undefined;
}

function normalizePermission(value: unknown): string | null {
  if (typeof value === "string") {
    return value;
  }

  const record = asRecord(value);
  const key = asString(record?.key);

  return key ?? null;
}

function normalizePermissions(values: unknown[]) {
  return Array.from(
    new Set(
      values
        .map(normalizePermission)
        .filter((value): value is string => Boolean(value))
    )
  );
}

function normalizeRole(value: unknown): AdminAuthRole | null {
  if (typeof value === "string") {
    return {
      key: value,
      name: value,
      permissions: []
    };
  }

  const record = asRecord(value);

  if (!record) {
    return null;
  }

  const key = asString(record.key);
  const id = asString(record.id);
  const name = asString(record.name) ?? key ?? id;

  if (!name) {
    return null;
  }

  return {
    id,
    key,
    name,
    permissions: normalizePermissions(asArray(record.permissions))
  };
}

function normalizeRoles(values: unknown[]) {
  return values
    .map(normalizeRole)
    .filter((role): role is AdminAuthRole => Boolean(role));
}

function normalizeUser(value: unknown): AdminAuthUser | null {
  const record = asRecord(value);

  if (!record) {
    return null;
  }

  const email = asString(record.email);
  const id = asString(record.id) ?? email;

  if (!email || !id) {
    return null;
  }

  return {
    displayName: asString(record.displayName) ?? asString(record.name) ?? email,
    email,
    id,
    status: asString(record.status)
  };
}

function sanitizeSession(value: unknown): AdminAuthSession | null {
  const record = asRecord(value);

  if (!record) {
    return null;
  }

  return Object.fromEntries(
    Object.entries(record).filter(([key]) => !key.toLowerCase().includes("token"))
  );
}

function getResponseCsrfToken(data: unknown, headerCsrfToken?: string) {
  const record = asRecord(data);
  const bodyCsrfToken = asString(record?.csrfToken);

  return bodyCsrfToken ?? headerCsrfToken;
}

function normalizeAuthResponse(
  data: unknown,
  headerCsrfToken?: string
): AdminAuthSnapshot {
  const record = asRecord(data) ?? {};
  const session = asRecord(record.session);
  const user = normalizeUser(record.user) ?? normalizeUser(session?.user);
  const roles = normalizeRoles(
    asArray(record.roles).length > 0
      ? asArray(record.roles)
      : asArray(session?.roles)
  );
  const userRecord = asRecord(record.user);
  const directPermissions = asArray(record.permissions).length
    ? asArray(record.permissions)
    : asArray(userRecord?.permissions);
  const rolePermissions = roles.flatMap((role) => role.permissions);
  const permissions = normalizePermissions([
    ...directPermissions,
    ...rolePermissions
  ]);

  return {
    csrfToken: getResponseCsrfToken(data, headerCsrfToken),
    permissions,
    roles,
    session: sanitizeSession(record.session),
    user
  };
}

export async function loginAdmin(
  request: AdminLoginRequest
): Promise<AdminAuthSnapshot> {
  const response = await adminApiFetch<unknown>(adminAuthEndpoints.login, {
    body: JSON.stringify(request),
    includeCsrfToken: false,
    method: "POST"
  });

  return normalizeAuthResponse(response.data, response.csrfToken);
}

export async function getAdminMe(): Promise<AdminAuthSnapshot> {
  const data = await adminApiRequest<unknown>(adminAuthEndpoints.me);

  return normalizeAuthResponse(data);
}

export async function logoutAdmin(): Promise<void> {
  await adminApiRequest<void>(adminAuthEndpoints.logout, {
    includeCsrfToken: false,
    method: "POST"
  });
}
