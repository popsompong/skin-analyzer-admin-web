import {
  getAdminCsrfToken,
  getAdminRefreshCsrfToken
} from "@/lib/auth/csrf-token-store";

export type AdminApiRequestOptions = RequestInit & {
  csrfToken?: string;
  hasTriedRefresh?: boolean;
  includeCsrfToken?: boolean;
  includeRefreshCsrfToken?: boolean;
  refreshCsrfToken?: string;
  retryReadOnUnauthorized?: boolean;
};

export type AdminApiResponse<T> = {
  csrfToken?: string;
  data: T;
  refreshCsrfToken?: string;
  response: Response;
};

export class AdminApiClientError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code?: string
  ) {
    super(message);
    this.name = "AdminApiClientError";
  }
}

export function isAdminSessionEndedError(
  error: unknown
): error is AdminApiClientError {
  return (
    error instanceof AdminApiClientError &&
    error.status === 401 &&
    error.code === "session_ended"
  );
}

export function isAdminServiceUnavailableError(
  error: unknown
): boolean {
  return error instanceof AdminApiClientError && error.status === 503;
}

type AdminApiUnauthorizedRefreshHandler = () => Promise<boolean>;

let unauthorizedRefreshHandler:
  | AdminApiUnauthorizedRefreshHandler
  | undefined;

export function setAdminApiUnauthorizedRefreshHandler(
  handler?: AdminApiUnauthorizedRefreshHandler
) {
  unauthorizedRefreshHandler = handler;
}

function getAdminApiBaseUrl() {
  const baseUrl = process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL?.trim();

  if (!baseUrl) {
    throw new AdminApiClientError(
      "Admin API base URL is not configured.",
      0,
      "admin_api_not_configured"
    );
  }

  return baseUrl.replace(/\/+$/, "");
}

function getAdminApiUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${getAdminApiBaseUrl()}${normalizedPath}`;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

async function readJsonSafely(response: Response): Promise<unknown> {
  if (response.status === 204) {
    return undefined;
  }

  try {
    return await response.json();
  } catch {
    return undefined;
  }
}

function getSafeApiError(json: unknown, fallbackStatus: number) {
  if (!isRecord(json) || !isRecord(json.error)) {
    return {
      code: undefined,
      message: `Admin API request failed with status ${fallbackStatus}.`
    };
  }

  const code =
    typeof json.error.code === "string" ? json.error.code : undefined;
  const message =
    typeof json.error.message === "string"
      ? json.error.message
      : `Admin API request failed with status ${fallbackStatus}.`;

  return { code, message };
}

function isReadMethod(method: string) {
  return ["GET", "HEAD", "OPTIONS"].includes(method.toUpperCase());
}

function shouldRetryUnauthorizedRead(
  method: string,
  options: AdminApiRequestOptions,
  includeRefreshCsrfToken: boolean
) {
  return (
    responseCanRefresh(options) &&
    isReadMethod(method) &&
    !includeRefreshCsrfToken &&
    Boolean(unauthorizedRefreshHandler)
  );
}

function responseCanRefresh(options: AdminApiRequestOptions) {
  return (
    options.retryReadOnUnauthorized === true &&
    options.hasTriedRefresh !== true
  );
}

export async function adminApiFetch<T>(
  path: string,
  options: AdminApiRequestOptions = {}
): Promise<AdminApiResponse<T>> {
  const method = options.method ?? "GET";
  const headers = new Headers(options.headers);
  const mutating = !isReadMethod(method);
  const includeRefreshCsrfToken = options.includeRefreshCsrfToken === true;

  if (!headers.has("Content-Type") && options.body) {
    headers.set("Content-Type", "application/json");
  }

  const requestCsrfToken =
    includeRefreshCsrfToken || options.includeCsrfToken === false
      ? undefined
      : options.csrfToken ?? getAdminCsrfToken();
  const requestRefreshCsrfToken = includeRefreshCsrfToken
    ? options.refreshCsrfToken ?? getAdminRefreshCsrfToken()
    : undefined;

  if (mutating && requestCsrfToken) {
    headers.set("X-CSRF-Token", requestCsrfToken);
  }

  if (includeRefreshCsrfToken && requestRefreshCsrfToken) {
    headers.set("X-Refresh-CSRF-Token", requestRefreshCsrfToken);
  }

  const fetchOptions = { ...options };
  delete fetchOptions.csrfToken;
  delete fetchOptions.hasTriedRefresh;
  delete fetchOptions.includeCsrfToken;
  delete fetchOptions.includeRefreshCsrfToken;
  delete fetchOptions.refreshCsrfToken;
  delete fetchOptions.retryReadOnUnauthorized;

  const response = await fetch(getAdminApiUrl(path), {
    ...fetchOptions,
    credentials: "include",
    headers,
    method
  });

  const json = await readJsonSafely(response);

  if (!response.ok) {
    const error = getSafeApiError(json, response.status);
    const clientError = new AdminApiClientError(
      error.message,
      response.status,
      error.code
    );

    if (isAdminSessionEndedError(clientError)) {
      throw clientError;
    }

    if (
      response.status === 401 &&
      shouldRetryUnauthorizedRead(method, options, includeRefreshCsrfToken) &&
      (await unauthorizedRefreshHandler?.().catch(() => false))
    ) {
      return adminApiFetch<T>(path, {
        ...options,
        hasTriedRefresh: true
      });
    }

    throw clientError;
  }

  const responseCsrfToken = response.headers.get("X-CSRF-Token") ?? undefined;
  const responseRefreshCsrfToken =
    response.headers.get("X-Refresh-CSRF-Token") ?? undefined;

  return {
    csrfToken: responseCsrfToken,
    data: json as T,
    refreshCsrfToken: responseRefreshCsrfToken,
    response
  };
}

export async function adminApiRequest<T>(
  path: string,
  options: AdminApiRequestOptions = {}
): Promise<T> {
  const result = await adminApiFetch<T>(path, options);

  return result.data;
}

export async function adminApiRequestWithRefresh<T>(
  path: string,
  options: AdminApiRequestOptions = {}
): Promise<T> {
  return adminApiRequest<T>(path, {
    ...options,
    retryReadOnUnauthorized: true
  });
}
