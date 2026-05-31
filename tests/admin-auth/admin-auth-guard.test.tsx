import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AdminApiClientError } from "@/lib/api/client";
import { getAdminMe, logoutAdmin } from "@/lib/api/auth";
import { AdminAuthGuard } from "@/lib/auth/admin-auth-guard";
import { clearAdminCsrfToken } from "@/lib/auth/csrf-token-store";

const routerReplaceMock = vi.hoisted(() => vi.fn());

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: routerReplaceMock
  })
}));

vi.mock("@/lib/api/auth", () => ({
  getAdminMe: vi.fn(),
  loginAdmin: vi.fn(),
  logoutAdmin: vi.fn()
}));

describe("AdminAuthGuard", () => {
  beforeEach(() => {
    clearAdminCsrfToken();
    window.sessionStorage.clear();
    routerReplaceMock.mockReset();
    vi.mocked(getAdminMe).mockReset();
    vi.mocked(logoutAdmin).mockReset();
  });

  it("renders the loading state while checking auth", () => {
    vi.mocked(getAdminMe).mockReturnValue(new Promise(() => undefined));

    render(
      <AdminAuthGuard>
        <div>Protected admin content</div>
      </AdminAuthGuard>
    );

    expect(screen.getByText("Checking admin session...")).toBeInTheDocument();
    expect(screen.queryByText("Protected admin content")).toBeNull();
  });

  it("redirects unauthenticated users to /login without exposing children", async () => {
    vi.mocked(getAdminMe).mockRejectedValue(
      new AdminApiClientError("Unauthorized", 401)
    );

    render(
      <AdminAuthGuard>
        <div>Protected admin content</div>
      </AdminAuthGuard>
    );

    await waitFor(() => {
      expect(routerReplaceMock).toHaveBeenCalledWith("/login");
    });
    expect(screen.queryByText("Protected admin content")).toBeNull();
  });

  it("renders children for authenticated users", async () => {
    vi.mocked(getAdminMe).mockResolvedValue({
      permissions: ["dashboard.view"],
      roles: [],
      session: { id: "session-1" },
      user: {
        displayName: "Admin User",
        email: "admin@example.com",
        id: "admin-1"
      }
    });

    render(
      <AdminAuthGuard>
        <div>Protected admin content</div>
      </AdminAuthGuard>
    );

    expect(await screen.findByText("Protected admin content")).toBeInTheDocument();
    expect(routerReplaceMock).not.toHaveBeenCalledWith("/login");
  });
});
