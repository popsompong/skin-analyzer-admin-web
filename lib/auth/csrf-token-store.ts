const ADMIN_CSRF_TOKEN_KEY = "skin-analyzer-admin-csrf-token";
const ADMIN_REFRESH_CSRF_COOKIE_NAME = "__Host-sa_admin_refresh_csrf";

let memoryAdminCsrfToken: string | undefined;
let memoryAdminRefreshCsrfToken: string | undefined;

type RefreshCsrfReadOptions = {
  includeCookieFallback?: boolean;
};

function normalizeCsrfToken(csrfToken?: string | null) {
  return csrfToken?.trim() || undefined;
}

function getStoredCsrfToken() {
  if (typeof window === "undefined") {
    return undefined;
  }

  try {
    return window.sessionStorage.getItem(ADMIN_CSRF_TOKEN_KEY) ?? undefined;
  } catch {
    return undefined;
  }
}

function readCookieValue(name: string) {
  if (typeof document === "undefined") {
    return undefined;
  }

  const prefix = `${name}=`;
  const cookie = document.cookie
    .split(";")
    .map((value) => value.trim())
    .find((value) => value.startsWith(prefix));

  if (!cookie) {
    return undefined;
  }

  const value = cookie.slice(prefix.length);

  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function getAdminCsrfToken() {
  if (memoryAdminCsrfToken) {
    return memoryAdminCsrfToken;
  }

  memoryAdminCsrfToken = getStoredCsrfToken();

  return memoryAdminCsrfToken;
}

export function setAdminCsrfToken(csrfToken?: string | null) {
  const normalizedToken = normalizeCsrfToken(csrfToken);

  if (!normalizedToken) {
    clearAdminCsrfToken();
    return undefined;
  }

  memoryAdminCsrfToken = normalizedToken;

  if (typeof window !== "undefined") {
    try {
      window.sessionStorage.setItem(ADMIN_CSRF_TOKEN_KEY, normalizedToken);
    } catch {
      // The in-memory token remains available when sessionStorage is blocked.
    }
  }

  return memoryAdminCsrfToken;
}

export function clearAdminCsrfToken() {
  memoryAdminCsrfToken = undefined;

  if (typeof window !== "undefined") {
    try {
      window.sessionStorage.removeItem(ADMIN_CSRF_TOKEN_KEY);
    } catch {
      // Ignore storage failures; memory state has already been cleared.
    }
  }
}

export function getAdminRefreshCsrfToken(
  options: RefreshCsrfReadOptions = {}
) {
  if (memoryAdminRefreshCsrfToken) {
    return memoryAdminRefreshCsrfToken;
  }

  if (options.includeCookieFallback === false) {
    return undefined;
  }

  return normalizeCsrfToken(readCookieValue(ADMIN_REFRESH_CSRF_COOKIE_NAME));
}

export function setAdminRefreshCsrfToken(csrfToken?: string | null) {
  const normalizedToken = normalizeCsrfToken(csrfToken);

  if (!normalizedToken) {
    clearAdminRefreshCsrfToken();
    return undefined;
  }

  memoryAdminRefreshCsrfToken = normalizedToken;

  return memoryAdminRefreshCsrfToken;
}

export function clearAdminRefreshCsrfToken() {
  memoryAdminRefreshCsrfToken = undefined;
}

export function clearAdminCsrfTokens() {
  clearAdminCsrfToken();
  clearAdminRefreshCsrfToken();
}
