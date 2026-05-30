export type AdminApiRequestOptions = RequestInit & {
  csrfToken?: string;
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

export async function adminApiRequest<T>(
  path: string,
  options: AdminApiRequestOptions = {}
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL;

  if (!baseUrl) {
    throw new AdminApiClientError(
      "Admin API base URL is not configured. Scaffold v1 does not call the backend.",
      0,
      "admin_api_not_configured"
    );
  }

  const method = options.method ?? "GET";
  const headers = new Headers(options.headers);
  const mutating = !["GET", "HEAD", "OPTIONS"].includes(method.toUpperCase());

  if (!headers.has("Content-Type") && options.body) {
    headers.set("Content-Type", "application/json");
  }

  if (mutating && options.csrfToken) {
    headers.set("X-CSRF-Token", options.csrfToken);
  }

  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    credentials: "include",
    headers,
    method
  });

  if (!response.ok) {
    throw new AdminApiClientError(
      `Admin API request failed with status ${response.status}.`,
      response.status
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}
