import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  clearAdminCentralAuthLogoutGuard,
  getAdminMe,
  loginAdmin,
  logoutAdmin,
  refreshAdminSession
} from "@/lib/api/auth";
import {
  AdminApiClientError,
  adminApiRequest,
  adminApiRequestWithRefresh
} from "@/lib/api/client";
import {
  clearAdminCsrfToken,
  clearAdminRefreshCsrfToken,
  getAdminCsrfToken,
  getAdminRefreshCsrfToken,
  setAdminRefreshCsrfToken,
  setAdminCsrfToken
} from "@/lib/auth/csrf-token-store";

function createJsonResponse(
  body: unknown,
  init: ResponseInit = {}
): Response {
  const headers = new Headers(init.headers);

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  return new Response(JSON.stringify(body), {
    ...init,
    headers,
    status: init.status ?? 200
  });
}

function createEmptyResponse(init: ResponseInit = {}): Response {
  return new Response(null, {
    ...init,
    status: init.status ?? 204
  });
}

function getFetchCall(
  fetchMock: ReturnType<typeof vi.fn>,
  index = 0
): [RequestInfo | URL, RequestInit | undefined] {
  return fetchMock.mock.calls[index] as [
    RequestInfo | URL,
    RequestInit | undefined
  ];
}

function getHeader(init: RequestInit | undefined, name: string) {
  return new Headers(init?.headers).get(name);
}

describe("admin auth API client", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL = "https://admin-api.test";
    process.env.NEXT_PUBLIC_ADMIN_CENTRAL_AUTH_LOGOUT_ENABLED = "false";
    process.env.NEXT_PUBLIC_ADMIN_CENTRAL_AUTH_REFRESH_ENABLED = "false";
    clearAdminCentralAuthLogoutGuard();
    clearAdminCsrfToken();
    clearAdminRefreshCsrfToken();
    window.sessionStorage.clear();
  });

  it("loginAdmin posts to the login endpoint with credentials included and no csrf requirement", async () => {
    const fetchMock = vi.fn(async () =>
      createJsonResponse(
        {
          csrfToken: "test-csrf-token",
          permissions: ["dashboard.view"],
          refreshCsrfToken: "test-refresh-csrf-token",
          roles: [{ key: "admin", name: "Admin" }],
          session: { id: "session-1" },
          user: { email: "admin@example.com", id: "admin-1" }
        },
        {
          headers: {
            "X-CSRF-Token": "header-csrf-token"
          }
        }
      )
    );
    vi.stubGlobal("fetch", fetchMock);

    const snapshot = await loginAdmin({
      email: "admin@example.com",
      password: "fake-password"
    });
    const [url, init] = getFetchCall(fetchMock);

    expect(url).toBe("https://admin-api.test/v1/admin/auth/login");
    expect(init?.method).toBe("POST");
    expect(init?.credentials).toBe("include");
    expect(getHeader(init, "X-CSRF-Token")).toBeNull();
    expect(JSON.parse(String(init?.body))).toEqual({
      email: "admin@example.com",
      password: "fake-password"
    });
    expect(snapshot.csrfToken).toBe("test-csrf-token");
    expect(snapshot.refreshCsrfToken).toBe("test-refresh-csrf-token");
    expect(snapshot.user?.email).toBe("admin@example.com");
    expect(snapshot.permissions).toEqual(["dashboard.view"]);
  });

  it("getAdminMe gets the current session endpoint with credentials included and no csrf header on GET", async () => {
    setAdminCsrfToken("test-csrf-token");
    const fetchMock = vi.fn(async () =>
      createJsonResponse({
        csrfToken: "me-csrf-token",
        permissions: ["dashboard.view"],
        refreshCsrfToken: "me-refresh-csrf-token",
        roles: [],
        session: { id: "session-1" },
        user: { email: "admin@example.com", id: "admin-1" }
      })
    );
    vi.stubGlobal("fetch", fetchMock);

    const snapshot = await getAdminMe();
    const [url, init] = getFetchCall(fetchMock);

    expect(url).toBe("https://admin-api.test/v1/admin/auth/me");
    expect(init?.method).toBe("GET");
    expect(init?.credentials).toBe("include");
    expect(getHeader(init, "X-CSRF-Token")).toBeNull();
    expect(snapshot.csrfToken).toBe("me-csrf-token");
    expect(snapshot.refreshCsrfToken).toBe("me-refresh-csrf-token");
  });

  it("logout feature flag disabled preserves existing logout request behavior", async () => {
    setAdminCsrfToken("test-csrf-token");
    setAdminRefreshCsrfToken("test-refresh-csrf-token");
    const fetchMock = vi.fn(async () => createEmptyResponse());
    vi.stubGlobal("fetch", fetchMock);

    await logoutAdmin();
    const [url, init] = getFetchCall(fetchMock);

    expect(url).toBe("https://admin-api.test/v1/admin/auth/logout");
    expect(init?.method).toBe("POST");
    expect(init?.credentials).toBe("include");
    expect(init?.body).toBeUndefined();
    expect(getHeader(init, "X-CSRF-Token")).toBeNull();
    expect(getHeader(init, "X-Refresh-CSRF-Token")).toBeNull();
    expect(getHeader(init, "Authorization")).toBeNull();
  });

  it("Central Auth logout sends credentials and the access csrf proof first", async () => {
    process.env.NEXT_PUBLIC_ADMIN_CENTRAL_AUTH_LOGOUT_ENABLED = "true";
    setAdminCsrfToken("test-csrf-token");
    setAdminRefreshCsrfToken("test-refresh-csrf-token");
    const fetchMock = vi.fn(async () => createJsonResponse({ ok: true }));
    vi.stubGlobal("fetch", fetchMock);

    await logoutAdmin();
    const [url, init] = getFetchCall(fetchMock);

    expect(url).toBe("https://admin-api.test/v1/admin/auth/logout");
    expect(init?.method).toBe("POST");
    expect(init?.credentials).toBe("include");
    expect(init?.body).toBeUndefined();
    expect(getHeader(init, "X-CSRF-Token")).toBe("test-csrf-token");
    expect(getHeader(init, "X-Refresh-CSRF-Token")).toBeNull();
    expect(getHeader(init, "Authorization")).toBeNull();
    expect(getAdminCsrfToken()).toBeUndefined();
    expect(
      getAdminRefreshCsrfToken({ includeCookieFallback: false })
    ).toBeUndefined();
  });

  it("Central Auth logout falls back to refresh csrf proof without sending both headers", async () => {
    process.env.NEXT_PUBLIC_ADMIN_CENTRAL_AUTH_LOGOUT_ENABLED = "true";
    setAdminRefreshCsrfToken("test-refresh-csrf-token");
    const fetchMock = vi.fn(async () => createJsonResponse({ ok: true }));
    vi.stubGlobal("fetch", fetchMock);

    await logoutAdmin();
    const [url, init] = getFetchCall(fetchMock);

    expect(url).toBe("https://admin-api.test/v1/admin/auth/logout");
    expect(init?.credentials).toBe("include");
    expect(init?.body).toBeUndefined();
    expect(getHeader(init, "X-CSRF-Token")).toBeNull();
    expect(getHeader(init, "X-Refresh-CSRF-Token")).toBe(
      "test-refresh-csrf-token"
    );
    expect(getHeader(init, "Authorization")).toBeNull();
  });

  it("Central Auth logout with no csrf proof fails closed locally without a backend call", async () => {
    process.env.NEXT_PUBLIC_ADMIN_CENTRAL_AUTH_LOGOUT_ENABLED = "true";
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    await logoutAdmin();

    expect(fetchMock).not.toHaveBeenCalled();
    expect(getAdminCsrfToken()).toBeUndefined();
    expect(
      getAdminRefreshCsrfToken({ includeCookieFallback: false })
    ).toBeUndefined();
  });

  it.each([401, 403, 409, 429, 503])(
    "Central Auth logout status %i clears csrf state without refreshing",
    async (status) => {
      process.env.NEXT_PUBLIC_ADMIN_CENTRAL_AUTH_LOGOUT_ENABLED = "true";
      process.env.NEXT_PUBLIC_ADMIN_CENTRAL_AUTH_REFRESH_ENABLED = "true";
      setAdminCsrfToken("test-csrf-token");
      setAdminRefreshCsrfToken("test-refresh-csrf-token");
      const fetchMock = vi.fn(async () =>
        createJsonResponse({ error: {} }, { status })
      );
      vi.stubGlobal("fetch", fetchMock);

      await expect(logoutAdmin()).resolves.toBeUndefined();

      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(getFetchCall(fetchMock)[0]).toBe(
        "https://admin-api.test/v1/admin/auth/logout"
      );
      expect(getAdminCsrfToken()).toBeUndefined();
      expect(
        getAdminRefreshCsrfToken({ includeCookieFallback: false })
      ).toBeUndefined();
    }
  );

  it("Central Auth logout network failure clears csrf state without retrying refresh", async () => {
    process.env.NEXT_PUBLIC_ADMIN_CENTRAL_AUTH_LOGOUT_ENABLED = "true";
    process.env.NEXT_PUBLIC_ADMIN_CENTRAL_AUTH_REFRESH_ENABLED = "true";
    setAdminCsrfToken("test-csrf-token");
    setAdminRefreshCsrfToken("test-refresh-csrf-token");
    const fetchMock = vi.fn(async () => {
      throw new TypeError("Network unavailable");
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(logoutAdmin()).resolves.toBeUndefined();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(getAdminCsrfToken()).toBeUndefined();
    expect(
      getAdminRefreshCsrfToken({ includeCookieFallback: false })
    ).toBeUndefined();
  });

  it("Central Auth logout blocks new refresh attempts once logout starts", async () => {
    process.env.NEXT_PUBLIC_ADMIN_CENTRAL_AUTH_LOGOUT_ENABLED = "true";
    process.env.NEXT_PUBLIC_ADMIN_CENTRAL_AUTH_REFRESH_ENABLED = "true";
    setAdminCsrfToken("test-csrf-token");
    setAdminRefreshCsrfToken("test-refresh-csrf-token");
    let resolveLogout: (response: Response) => void = () => undefined;
    const fetchMock = vi.fn(
      () =>
        new Promise<Response>((resolve) => {
          resolveLogout = resolve;
        })
    );
    vi.stubGlobal("fetch", fetchMock);

    const logoutPromise = logoutAdmin();

    await expect(refreshAdminSession()).rejects.toMatchObject({
      code: "admin_logout_in_progress"
    } satisfies Partial<AdminApiClientError>);
    expect(fetchMock).toHaveBeenCalledTimes(1);

    resolveLogout(createEmptyResponse());
    await logoutPromise;
  });

  it("pending refresh success after logout starts does not restore csrf state", async () => {
    process.env.NEXT_PUBLIC_ADMIN_CENTRAL_AUTH_LOGOUT_ENABLED = "true";
    process.env.NEXT_PUBLIC_ADMIN_CENTRAL_AUTH_REFRESH_ENABLED = "true";
    setAdminRefreshCsrfToken("old-refresh-csrf-token");
    let resolveRefresh: (response: Response) => void = () => undefined;
    const fetchMock = vi
      .fn()
      .mockImplementationOnce(
        () =>
          new Promise<Response>((resolve) => {
            resolveRefresh = resolve;
          })
      )
      .mockResolvedValueOnce(createEmptyResponse());
    vi.stubGlobal("fetch", fetchMock);

    const refreshPromise = refreshAdminSession();
    await Promise.resolve();

    setAdminCsrfToken("logout-csrf-token");
    setAdminRefreshCsrfToken("logout-refresh-csrf-token");
    await logoutAdmin();

    resolveRefresh(
      createJsonResponse({
        csrfToken: "new-csrf-token",
        ok: true,
        refreshCsrfToken: "new-refresh-csrf-token",
        session: {
          expiresAt: "2026-06-17T09:00:00Z",
          id: "session-2"
        }
      })
    );

    await expect(refreshPromise).rejects.toMatchObject({
      code: "admin_logout_in_progress"
    } satisfies Partial<AdminApiClientError>);
    expect(getAdminCsrfToken()).toBeUndefined();
    expect(
      getAdminRefreshCsrfToken({ includeCookieFallback: false })
    ).toBeUndefined();
  });

  it("future mutating requests include X-CSRF-Token from the csrf store", async () => {
    setAdminCsrfToken("test-csrf-token");
    setAdminRefreshCsrfToken("test-refresh-csrf-token");
    const fetchMock = vi.fn(async () => createJsonResponse({ ok: true }));
    vi.stubGlobal("fetch", fetchMock);

    await adminApiRequest("/v1/admin/content", {
      body: JSON.stringify({ title: "Draft" }),
      method: "POST"
    });
    const [, init] = getFetchCall(fetchMock);

    expect(init?.credentials).toBe("include");
    expect(getHeader(init, "X-CSRF-Token")).toBe("test-csrf-token");
    expect(getHeader(init, "X-Refresh-CSRF-Token")).toBeNull();
  });

  it("refresh feature flag disabled leaves existing behavior unchanged", async () => {
    setAdminRefreshCsrfToken("test-refresh-csrf-token");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    await expect(refreshAdminSession()).rejects.toMatchObject({
      code: "admin_refresh_disabled"
    } satisfies Partial<AdminApiClientError>);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("refreshAdminSession sends only the refresh csrf proof and stores rotated csrf state", async () => {
    process.env.NEXT_PUBLIC_ADMIN_CENTRAL_AUTH_REFRESH_ENABLED = "true";
    setAdminCsrfToken("old-csrf-token");
    setAdminRefreshCsrfToken("old-refresh-csrf-token");
    const fetchMock = vi.fn(async () =>
      createJsonResponse({
        csrfToken: "new-csrf-token",
        ok: true,
        refreshCsrfToken: "new-refresh-csrf-token",
        session: {
          expiresAt: "2026-06-17T09:00:00Z",
          id: "session-2"
        }
      })
    );
    vi.stubGlobal("fetch", fetchMock);

    const response = await refreshAdminSession();
    const [url, init] = getFetchCall(fetchMock);

    expect(url).toBe("https://admin-api.test/v1/admin/auth/refresh");
    expect(init?.method).toBe("POST");
    expect(init?.credentials).toBe("include");
    expect(init?.body).toBeUndefined();
    expect(getHeader(init, "X-CSRF-Token")).toBeNull();
    expect(getHeader(init, "X-Refresh-CSRF-Token")).toBe(
      "old-refresh-csrf-token"
    );
    expect(getHeader(init, "Authorization")).toBeNull();
    expect(response.session).toEqual({
      expiresAt: "2026-06-17T09:00:00Z",
      id: "session-2"
    });
    expect(getAdminCsrfToken()).toBe("new-csrf-token");
    expect(
      getAdminRefreshCsrfToken({ includeCookieFallback: false })
    ).toBe("new-refresh-csrf-token");
  });

  it("refreshAdminSession rejects unsafe refresh response fields", async () => {
    process.env.NEXT_PUBLIC_ADMIN_CENTRAL_AUTH_REFRESH_ENABLED = "true";
    setAdminRefreshCsrfToken("test-refresh-csrf-token");
    const rawAccessKey = ["access", "Token"].join("");
    const rawRefreshKey = ["refresh", "Handle"].join("");
    const fetchMock = vi.fn(async () =>
      createJsonResponse({
        [rawAccessKey]: "must-not-enter-state",
        csrfToken: "new-csrf-token",
        ok: true,
        refreshCsrfToken: "new-refresh-csrf-token",
        [rawRefreshKey]: "must-not-enter-state",
        session: {
          expiresAt: "2026-06-17T09:00:00Z",
          id: "session-2"
        }
      })
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(refreshAdminSession()).rejects.toMatchObject({
      code: "unsafe_refresh_response"
    } satisfies Partial<AdminApiClientError>);
  });

  it("GET read requests can refresh once and retry once when explicitly opted in", async () => {
    process.env.NEXT_PUBLIC_ADMIN_CENTRAL_AUTH_REFRESH_ENABLED = "true";
    setAdminRefreshCsrfToken("retry-refresh-csrf-token");
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(createJsonResponse({ error: {} }, { status: 401 }))
      .mockResolvedValueOnce(
        createJsonResponse({
          csrfToken: "new-csrf-token",
          ok: true,
          refreshCsrfToken: "new-refresh-csrf-token",
          session: {
            expiresAt: "2026-06-17T09:00:00Z",
            id: "session-2"
          }
        })
      )
      .mockResolvedValueOnce(createJsonResponse({ ok: true }));
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      adminApiRequestWithRefresh("/v1/admin/content")
    ).resolves.toEqual({ ok: true });

    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(getFetchCall(fetchMock, 0)[0]).toBe(
      "https://admin-api.test/v1/admin/content"
    );
    expect(getFetchCall(fetchMock, 1)[0]).toBe(
      "https://admin-api.test/v1/admin/auth/refresh"
    );
    expect(getFetchCall(fetchMock, 2)[0]).toBe(
      "https://admin-api.test/v1/admin/content"
    );
  });

  it("mutation 401 does not blindly replay after refresh policy opt-in", async () => {
    process.env.NEXT_PUBLIC_ADMIN_CENTRAL_AUTH_REFRESH_ENABLED = "true";
    setAdminCsrfToken("test-csrf-token");
    setAdminRefreshCsrfToken("test-refresh-csrf-token");
    const fetchMock = vi.fn(async () =>
      createJsonResponse({ error: {} }, { status: 401 })
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      adminApiRequestWithRefresh("/v1/admin/content", {
        body: JSON.stringify({ title: "Draft" }),
        method: "POST"
      })
    ).rejects.toMatchObject({ status: 401 });

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("refresh 401 clears csrf and refresh csrf state", async () => {
    process.env.NEXT_PUBLIC_ADMIN_CENTRAL_AUTH_REFRESH_ENABLED = "true";
    setAdminCsrfToken("old-csrf-token");
    setAdminRefreshCsrfToken("old-refresh-csrf-token");
    const fetchMock = vi.fn(async () =>
      createJsonResponse({ error: {} }, { status: 401 })
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(refreshAdminSession()).rejects.toMatchObject({ status: 401 });
    expect(getAdminCsrfToken()).toBeUndefined();
    expect(
      getAdminRefreshCsrfToken({ includeCookieFallback: false })
    ).toBeUndefined();
  });

  it("refresh 409 preserves csrf state for a later /me reconcile", async () => {
    process.env.NEXT_PUBLIC_ADMIN_CENTRAL_AUTH_REFRESH_ENABLED = "true";
    setAdminCsrfToken("old-csrf-token");
    setAdminRefreshCsrfToken("old-refresh-csrf-token");
    const fetchMock = vi.fn(async () =>
      createJsonResponse(
        { error: { code: "session_stale", message: "Session stale." } },
        { status: 409 }
      )
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(refreshAdminSession()).rejects.toMatchObject({ status: 409 });
    expect(getAdminCsrfToken()).toBe("old-csrf-token");
    expect(
      getAdminRefreshCsrfToken({ includeCookieFallback: false })
    ).toBe("old-refresh-csrf-token");
  });

  it("parses safe API error shape without leaking submitted values", async () => {
    const fetchMock = vi.fn(async () =>
      createJsonResponse(
        {
          error: {
            code: "invalid_credentials",
            message: "Sign in failed safely."
          }
        },
        { status: 401 }
      )
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      loginAdmin({
        email: "admin@example.com",
        password: "fake-password"
      })
    ).rejects.toMatchObject({
      code: "invalid_credentials",
      message: "Sign in failed safely.",
      status: 401
    } satisfies Partial<AdminApiClientError>);
  });

  it("does not expose raw session token fields from auth responses", async () => {
    const rawSessionKey = `session${"Token"}`;
    const rawAccessKey = `access${"Token"}`;
    const rawRefreshKey = ["refresh", "Handle"].join("");
    const rawClaimsKey = ["raw", "Claims"].join("");
    const fetchMock = vi.fn(async () =>
      createJsonResponse({
        csrfToken: "test-csrf-token",
        session: {
          [rawAccessKey]: "should-not-leak",
          [rawClaimsKey]: "should-not-leak",
          [rawRefreshKey]: "should-not-leak",
          [rawSessionKey]: "should-not-leak",
          id: "session-1"
        },
        user: { email: "admin@example.com", id: "admin-1" }
      })
    );
    vi.stubGlobal("fetch", fetchMock);

    const snapshot = await loginAdmin({
      email: "admin@example.com",
      password: "fake-password"
    });

    expect(snapshot.session).toEqual({ id: "session-1" });
    expect(JSON.stringify(snapshot)).not.toContain("should-not-leak");
  });
});
