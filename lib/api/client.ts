import { getAdminCsrfToken } from "@/lib/auth/csrf-token-store";

export type AdminApiRequestOptions = RequestInit & {
  csrfToken?: string;
  includeCsrfToken?: boolean;
};

export type AdminApiResponse<T> = {
  csrfToken?: string;
  data: T;
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

export async function adminApiFetch<T>(
  path: string,
  options: AdminApiRequestOptions = {}
): Promise<AdminApiResponse<T>> {
  const method = options.method ?? "GET";
  const headers = new Headers(options.headers);
  const mutating = !["GET", "HEAD", "OPTIONS"].includes(method.toUpperCase());

  if (!headers.has("Content-Type") && options.body) {
    headers.set("Content-Type", "application/json");
  }

  const requestCsrfToken =
    options.includeCsrfToken === false
      ? undefined
      : options.csrfToken ?? getAdminCsrfToken();

  if (mutating && requestCsrfToken) {
    headers.set("X-CSRF-Token", requestCsrfToken);
  }

  const fetchOptions = { ...options };
  delete fetchOptions.csrfToken;
  delete fetchOptions.includeCsrfToken;

  const response = await fetch(getAdminApiUrl(path), {
    ...fetchOptions,
    credentials: "include",
    headers,
    method
  });

  const json = await readJsonSafely(response);

  if (!response.ok) {
    const error = getSafeApiError(json, response.status);

    throw new AdminApiClientError(error.message, response.status, error.code);
  }

  const responseCsrfToken = response.headers.get("X-CSRF-Token") ?? undefined;

  return {
    csrfToken: responseCsrfToken,
    data: json as T,
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
