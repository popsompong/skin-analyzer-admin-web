const ADMIN_CSRF_TOKEN_KEY = "skin-analyzer-admin-csrf-token";

let memoryAdminCsrfToken: string | undefined;

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

export function getAdminCsrfToken() {
  if (memoryAdminCsrfToken) {
    return memoryAdminCsrfToken;
  }

  memoryAdminCsrfToken = getStoredCsrfToken();

  return memoryAdminCsrfToken;
}

export function setAdminCsrfToken(csrfToken?: string | null) {
  const normalizedToken = csrfToken?.trim();

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
