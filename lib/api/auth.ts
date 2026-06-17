import {
  AdminApiClientError,
  adminApiFetch,
  adminApiRequest,
  setAdminApiUnauthorizedRefreshHandler
} from "@/lib/api/client";
import {
  clearAdminCsrfTokens,
  clearAdminRefreshCsrfToken,
  getAdminRefreshCsrfToken,
  setAdminCsrfToken,
  setAdminRefreshCsrfToken
} from "@/lib/auth/csrf-token-store";
import type {
  AdminAuthRole,
  AdminAuthSession,
  AdminAuthSnapshot,
  AdminAuthUser,
  AdminRefreshResponse
} from "@/types/admin-auth";

export const ADMIN_CENTRAL_AUTH_REFRESH_ENABLED_ENV =
  "NEXT_PUBLIC_ADMIN_CENTRAL_AUTH_REFRESH_ENABLED";

export const adminAuthEndpoints = {
  login: "/v1/admin/auth/login",
  logout: "/v1/admin/auth/logout",
  me: "/v1/admin/auth/me",
  refresh: "/v1/admin/auth/refresh"
} as const;

export type AdminLoginRequest = {
  email: string;
  password: string;
};

const forbiddenBrowserAuthKeys = [
  ["access", "Token"].join(""),
  ["refresh", "Handle"].join(""),
  ["raw", "Claims"].join(""),
  "token"
].map((value) => value.toLowerCase());
const allowedBrowserCsrfKeys = ["csrfToken", "refreshCsrfToken"].map((value) =>
  value.toLowerCase()
);

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
    return value.trim() || undefined;
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

function isForbiddenBrowserAuthKey(key: string, allowCsrfProofs = false) {
  const normalizedKey = key.toLowerCase();

  if (allowCsrfProofs && allowedBrowserCsrfKeys.includes(normalizedKey)) {
    return false;
  }

  return (
    normalizedKey.includes("token") ||
    forbiddenBrowserAuthKeys.includes(normalizedKey)
  );
}

function hasForbiddenBrowserAuthFields(value: unknown) {
  const record = asRecord(value);

  if (!record) {
    return false;
  }

  return Object.keys(record).some((key) =>
    isForbiddenBrowserAuthKey(key, true)
  );
}

function sanitizeSession(value: unknown): AdminAuthSession | null {
  const record = asRecord(value);

  if (!record) {
    return null;
  }

  return Object.fromEntries(
    Object.entries(record).filter(([key]) => !isForbiddenBrowserAuthKey(key))
  );
}

function getResponseCsrfToken(data: unknown, headerCsrfToken?: string) {
  const record = asRecord(data);
  const bodyCsrfToken = asString(record?.csrfToken);

  return bodyCsrfToken ?? headerCsrfToken;
}

function getResponseRefreshCsrfToken(
  data: unknown,
  headerRefreshCsrfToken?: string
) {
  const record = asRecord(data);
  const bodyRefreshCsrfToken = asString(record?.refreshCsrfToken);

  return bodyRefreshCsrfToken ?? headerRefreshCsrfToken;
}

function normalizeAuthResponse(
  data: unknown,
  headerCsrfToken?: string,
  headerRefreshCsrfToken?: string
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
    refreshCsrfToken: getResponseRefreshCsrfToken(
      data,
      headerRefreshCsrfToken
    ),
    roles,
    session: sanitizeSession(record.session),
    user
  };
}

function normalizeRefreshResponse(
  data: unknown,
  headerCsrfToken?: string,
  headerRefreshCsrfToken?: string
): AdminRefreshResponse {
  if (hasForbiddenBrowserAuthFields(data)) {
    throw new AdminApiClientError(
      "Admin refresh response included unsafe auth fields.",
      0,
      "unsafe_refresh_response"
    );
  }

  const record = asRecord(data);
  const session = asRecord(record?.session);
  const id = asString(session?.id);
  const expiresAt = asString(session?.expiresAt);
  const csrfToken = getResponseCsrfToken(data, headerCsrfToken);
  const refreshCsrfToken = getResponseRefreshCsrfToken(
    data,
    headerRefreshCsrfToken
  );

  if (
    record?.ok !== true ||
    !csrfToken ||
    !refreshCsrfToken ||
    !id ||
    !expiresAt
  ) {
    throw new AdminApiClientError(
      "Admin refresh response was not browser-safe.",
      0,
      "invalid_refresh_response"
    );
  }

  return {
    csrfToken,
    ok: true,
    refreshCsrfToken,
    session: {
      expiresAt,
      id
    }
  };
}

export function isAdminCentralAuthRefreshEnabled() {
  return process.env.NEXT_PUBLIC_ADMIN_CENTRAL_AUTH_REFRESH_ENABLED
    ?.trim()
    .toLowerCase() === "true";
}

function handleRefreshFailure(error: unknown) {
  if (!(error instanceof AdminApiClientError)) {
    return;
  }

  if (error.status === 401) {
    clearAdminCsrfTokens();
    return;
  }

  if (error.status === 403) {
    clearAdminRefreshCsrfToken();
  }
}

export async function loginAdmin(
  request: AdminLoginRequest
): Promise<AdminAuthSnapshot> {
  const response = await adminApiFetch<unknown>(adminAuthEndpoints.login, {
    body: JSON.stringify(request),
    includeCsrfToken: false,
    method: "POST"
  });

  return normalizeAuthResponse(
    response.data,
    response.csrfToken,
    response.refreshCsrfToken
  );
}

export async function getAdminMe(): Promise<AdminAuthSnapshot> {
  const response = await adminApiFetch<unknown>(adminAuthEndpoints.me);

  return normalizeAuthResponse(
    response.data,
    response.csrfToken,
    response.refreshCsrfToken
  );
}

export async function refreshAdminSession(): Promise<AdminRefreshResponse> {
  if (!isAdminCentralAuthRefreshEnabled()) {
    throw new AdminApiClientError(
      "Admin Central Auth refresh is disabled.",
      0,
      "admin_refresh_disabled"
    );
  }

  const refreshCsrfToken = getAdminRefreshCsrfToken();

  if (!refreshCsrfToken) {
    throw new AdminApiClientError(
      "Admin refresh CSRF proof is unavailable.",
      0,
      "admin_refresh_csrf_unavailable"
    );
  }

  try {
    const response = await adminApiFetch<unknown>(adminAuthEndpoints.refresh, {
      includeCsrfToken: false,
      includeRefreshCsrfToken: true,
      method: "POST",
      refreshCsrfToken
    });
    const refreshResponse = normalizeRefreshResponse(
      response.data,
      response.csrfToken,
      response.refreshCsrfToken
    );

    setAdminCsrfToken(refreshResponse.csrfToken);
    setAdminRefreshCsrfToken(refreshResponse.refreshCsrfToken);

    return refreshResponse;
  } catch (error) {
    handleRefreshFailure(error);
    throw error;
  }
}

export async function getAdminMeWithRefresh(): Promise<AdminAuthSnapshot> {
  try {
    return await getAdminMe();
  } catch (error) {
    const canAttemptRefresh =
      error instanceof AdminApiClientError &&
      error.status === 401 &&
      isAdminCentralAuthRefreshEnabled() &&
      Boolean(getAdminRefreshCsrfToken());

    if (!canAttemptRefresh) {
      throw error;
    }

    try {
      await refreshAdminSession();
    } catch (refreshError) {
      if (
        refreshError instanceof AdminApiClientError &&
        refreshError.status === 409
      ) {
        return getAdminMe();
      }

      throw refreshError;
    }

    return getAdminMe();
  }
}

export async function logoutAdmin(): Promise<void> {
  await adminApiRequest<void>(adminAuthEndpoints.logout, {
    includeCsrfToken: false,
    method: "POST"
  });
}

setAdminApiUnauthorizedRefreshHandler(async () => {
  if (!isAdminCentralAuthRefreshEnabled() || !getAdminRefreshCsrfToken()) {
    return false;
  }

  try {
    await refreshAdminSession();
    return true;
  } catch {
    return false;
  }
});
