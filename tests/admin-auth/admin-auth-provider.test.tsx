import { act, render, screen, waitFor } from "@testing-library/react";
import { useEffect } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AdminApiClientError } from "@/lib/api/client";
import {
  getAdminMeWithRefresh,
  loginAdmin,
  logoutAdmin
} from "@/lib/api/auth";
import {
  AdminAuthProvider,
  useAdminAuth
} from "@/lib/auth/admin-auth-provider";
import {
  clearAdminRefreshCsrfToken,
  clearAdminCsrfToken,
  getAdminCsrfToken,
  getAdminRefreshCsrfToken,
  setAdminRefreshCsrfToken,
  setAdminCsrfToken
} from "@/lib/auth/csrf-token-store";
import type { AdminAuthSnapshot } from "@/types/admin-auth";

vi.mock("@/lib/api/auth", () => ({
  getAdminMeWithRefresh: vi.fn(),
  loginAdmin: vi.fn(),
  logoutAdmin: vi.fn()
}));

type AdminAuthValueForTest = ReturnType<typeof useAdminAuth>;

const authenticatedSnapshot: AdminAuthSnapshot = {
  csrfToken: "test-csrf-token",
  permissions: ["dashboard.view"],
  refreshCsrfToken: "test-refresh-csrf-token",
  roles: [{ key: "admin", name: "Admin", permissions: ["dashboard.view"] }],
  session: { id: "session-1" },
  user: {
    displayName: "Admin User",
    email: "admin@example.com",
    id: "admin-1"
  }
};

let latestAuth: AdminAuthValueForTest | null = null;

function getLatestAuth() {
  if (!latestAuth) {
    throw new Error("Admin auth context was not captured.");
  }

  return latestAuth;
}

function AuthCapture() {
  const auth = useAdminAuth();

  useEffect(() => {
    latestAuth = auth;
  }, [auth]);

  return (
    <div>
      <span data-testid="status">{auth.status}</span>
      <span data-testid="csrf">{auth.csrfToken ?? "none"}</span>
      <span data-testid="email">{auth.user?.email ?? "none"}</span>
    </div>
  );
}

function renderProvider() {
  latestAuth = null;

  return render(
    <AdminAuthProvider>
      <AuthCapture />
    </AdminAuthProvider>
  );
}

async function waitForAuth() {
  await waitFor(() => {
    expect(latestAuth).not.toBeNull();
  });

  return getLatestAuth();
}

describe("AdminAuthProvider", () => {
  beforeEach(() => {
    clearAdminCsrfToken();
    clearAdminRefreshCsrfToken();
    window.sessionStorage.clear();
    vi.mocked(getAdminMeWithRefresh).mockReset();
    vi.mocked(loginAdmin).mockReset();
    vi.mocked(logoutAdmin).mockReset();
  });

  it("login sets auth state and stores csrfToken safely", async () => {
    vi.mocked(getAdminMeWithRefresh).mockReturnValue(
      new Promise(() => undefined)
    );
    vi.mocked(loginAdmin).mockResolvedValue(authenticatedSnapshot);

    renderProvider();
    const auth = await waitForAuth();

    await act(async () => {
      await auth.login({
        email: "admin@example.com",
        password: "fake-password"
      });
    });

    expect(screen.getByTestId("status")).toHaveTextContent("authenticated");
    expect(screen.getByTestId("csrf")).toHaveTextContent("test-csrf-token");
    expect(screen.getByTestId("email")).toHaveTextContent("admin@example.com");
    expect(getAdminCsrfToken()).toBe("test-csrf-token");
    expect(
      getAdminRefreshCsrfToken({ includeCookieFallback: false })
    ).toBe("test-refresh-csrf-token");
    expect(getLatestAuth().permissions).toEqual(["dashboard.view"]);
    expect(getLatestAuth().session).toEqual({ id: "session-1" });
  });

  it("bootstrap preserves an existing csrfToken when /auth/me lacks one", async () => {
    setAdminCsrfToken("test-csrf-token");
    vi.mocked(getAdminMeWithRefresh).mockResolvedValue({
      ...authenticatedSnapshot,
      csrfToken: undefined
    });

    renderProvider();

    await waitFor(() => {
      expect(screen.getByTestId("status")).toHaveTextContent("authenticated");
    });
    expect(screen.getByTestId("csrf")).toHaveTextContent("test-csrf-token");
    expect(getAdminCsrfToken()).toBe("test-csrf-token");
  });

  it("unauthenticated bootstrap clears csrfToken", async () => {
    setAdminCsrfToken("test-csrf-token");
    setAdminRefreshCsrfToken("test-refresh-csrf-token");
    vi.mocked(getAdminMeWithRefresh).mockRejectedValue(
      new AdminApiClientError("Unauthorized", 401)
    );

    renderProvider();

    await waitFor(() => {
      expect(screen.getByTestId("status")).toHaveTextContent(
        "unauthenticated"
      );
    });
    expect(screen.getByTestId("csrf")).toHaveTextContent("none");
    expect(getAdminCsrfToken()).toBeUndefined();
    expect(
      getAdminRefreshCsrfToken({ includeCookieFallback: false })
    ).toBeUndefined();
  });

  it("logout clears csrfToken and auth state", async () => {
    vi.mocked(getAdminMeWithRefresh).mockResolvedValue(authenticatedSnapshot);
    vi.mocked(logoutAdmin).mockResolvedValue();

    renderProvider();

    await waitFor(() => {
      expect(screen.getByTestId("status")).toHaveTextContent("authenticated");
    });

    await act(async () => {
      await getLatestAuth().logout();
    });

    expect(screen.getByTestId("status")).toHaveTextContent("unauthenticated");
    expect(screen.getByTestId("csrf")).toHaveTextContent("none");
    expect(getLatestAuth().user).toBeNull();
    expect(getLatestAuth().session).toBeNull();
    expect(getAdminCsrfToken()).toBeUndefined();
    expect(
      getAdminRefreshCsrfToken({ includeCookieFallback: false })
    ).toBeUndefined();
  });
});
