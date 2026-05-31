import { beforeEach, describe, expect, it, vi } from "vitest";
import { getAdminMe, loginAdmin, logoutAdmin } from "@/lib/api/auth";
import {
  AdminApiClientError,
  adminApiRequest
} from "@/lib/api/client";
import {
  clearAdminCsrfToken,
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
    clearAdminCsrfToken();
    window.sessionStorage.clear();
  });

  it("loginAdmin posts to the login endpoint with credentials included and no csrf requirement", async () => {
    const fetchMock = vi.fn(async () =>
      createJsonResponse(
        {
          csrfToken: "test-csrf-token",
          permissions: ["dashboard.view"],
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
    expect(snapshot.user?.email).toBe("admin@example.com");
    expect(snapshot.permissions).toEqual(["dashboard.view"]);
  });

  it("getAdminMe gets the current session endpoint with credentials included and no csrf header on GET", async () => {
    setAdminCsrfToken("test-csrf-token");
    const fetchMock = vi.fn(async () =>
      createJsonResponse({
        permissions: ["dashboard.view"],
        roles: [],
        session: { id: "session-1" },
        user: { email: "admin@example.com", id: "admin-1" }
      })
    );
    vi.stubGlobal("fetch", fetchMock);

    await getAdminMe();
    const [url, init] = getFetchCall(fetchMock);

    expect(url).toBe("https://admin-api.test/v1/admin/auth/me");
    expect(init?.method).toBe("GET");
    expect(init?.credentials).toBe("include");
    expect(getHeader(init, "X-CSRF-Token")).toBeNull();
  });

  it("logoutAdmin posts to the logout endpoint with credentials included and no csrf requirement", async () => {
    setAdminCsrfToken("test-csrf-token");
    const fetchMock = vi.fn(async () => createEmptyResponse());
    vi.stubGlobal("fetch", fetchMock);

    await logoutAdmin();
    const [url, init] = getFetchCall(fetchMock);

    expect(url).toBe("https://admin-api.test/v1/admin/auth/logout");
    expect(init?.method).toBe("POST");
    expect(init?.credentials).toBe("include");
    expect(getHeader(init, "X-CSRF-Token")).toBeNull();
  });

  it("future mutating requests include X-CSRF-Token from the csrf store", async () => {
    setAdminCsrfToken("test-csrf-token");
    const fetchMock = vi.fn(async () => createJsonResponse({ ok: true }));
    vi.stubGlobal("fetch", fetchMock);

    await adminApiRequest("/v1/admin/content", {
      body: JSON.stringify({ title: "Draft" }),
      method: "POST"
    });
    const [, init] = getFetchCall(fetchMock);

    expect(init?.credentials).toBe("include");
    expect(getHeader(init, "X-CSRF-Token")).toBe("test-csrf-token");
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
    const fetchMock = vi.fn(async () =>
      createJsonResponse({
        csrfToken: "test-csrf-token",
        session: {
          [rawAccessKey]: "should-not-leak",
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
