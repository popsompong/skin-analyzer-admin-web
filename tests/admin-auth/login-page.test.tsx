import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AdminApiClientError } from "@/lib/api/client";
import { getAdminMe, loginAdmin } from "@/lib/api/auth";
import {
  setAdminCsrfToken,
  setAdminRefreshCsrfToken
} from "@/lib/auth/csrf-token-store";
import LoginPage from "@/app/login/page";

const routerReplaceMock = vi.hoisted(() => vi.fn());
const routerRefreshMock = vi.hoisted(() => vi.fn());

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: routerRefreshMock,
    replace: routerReplaceMock
  })
}));

vi.mock("@/lib/api/auth", () => ({
  getAdminMe: vi.fn(),
  loginAdmin: vi.fn()
}));

vi.mock("@/lib/auth/csrf-token-store", () => ({
  setAdminCsrfToken: vi.fn(),
  setAdminRefreshCsrfToken: vi.fn()
}));

describe("LoginPage auth behavior", () => {
  beforeEach(() => {
    routerReplaceMock.mockReset();
    routerRefreshMock.mockReset();
    vi.mocked(getAdminMe).mockReset();
    vi.mocked(loginAdmin).mockReset();
    vi.mocked(setAdminCsrfToken).mockReset();
    vi.mocked(setAdminRefreshCsrfToken).mockReset();
    vi.mocked(getAdminMe).mockRejectedValue(
      new AdminApiClientError("Unauthorized", 401)
    );
  });

  it("renders email, password, and sign-in controls", async () => {
    render(<LoginPage />);

    expect(await screen.findByRole("button", { name: "Sign in" })).toBeEnabled();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Remember me")).toBeInTheDocument();
  });

  it("shows field validation errors on empty submit", async () => {
    const user = userEvent.setup();

    render(<LoginPage />);

    await user.click(await screen.findByRole("button", { name: "Sign in" }));

    expect(await screen.findByText("Email is required.")).toBeInTheDocument();
    expect(screen.getByText("Password is required.")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toHaveAttribute(
      "aria-invalid",
      "true"
    );
    expect(screen.getByLabelText("Password")).toHaveAttribute(
      "aria-invalid",
      "true"
    );
    expect(loginAdmin).not.toHaveBeenCalled();
  });

  it("shows a field validation error for invalid email", async () => {
    const user = userEvent.setup();

    render(<LoginPage />);

    await user.type(await screen.findByLabelText("Email"), "not-an-email");
    await user.type(screen.getByLabelText("Password"), "test-password");
    await user.click(screen.getByRole("button", { name: "Sign in" }));

    expect(
      await screen.findByText("Enter a valid email address.")
    ).toBeInTheDocument();
    expect(loginAdmin).not.toHaveBeenCalled();
  });

  it("submits credentials, stores csrfToken, and redirects to dashboard on success", async () => {
    const user = userEvent.setup();
    vi.mocked(loginAdmin).mockResolvedValue({
      csrfToken: "test-csrf-token",
      permissions: ["dashboard.view"],
      refreshCsrfToken: "test-refresh-csrf-token",
      roles: [],
      session: { id: "session-1" },
      user: {
        displayName: "Admin User",
        email: "admin@example.com",
        id: "admin-1"
      }
    });

    render(<LoginPage />);

    await user.type(
      await screen.findByLabelText("Email"),
      "  admin@example.com  "
    );
    await user.type(screen.getByLabelText("Password"), "test-password");
    await user.click(screen.getByRole("button", { name: "Sign in" }));

    await waitFor(() => {
      expect(loginAdmin).toHaveBeenCalledWith({
        email: "admin@example.com",
        password: "test-password"
      });
    });
    expect(setAdminCsrfToken).toHaveBeenCalledWith("test-csrf-token");
    expect(setAdminRefreshCsrfToken).toHaveBeenCalledWith(
      "test-refresh-csrf-token"
    );
    expect(routerReplaceMock).toHaveBeenCalledWith("/dashboard");
    expect(routerRefreshMock).toHaveBeenCalled();
  });

  it("waits for the final authenticated login snapshot before navigating", async () => {
    const user = userEvent.setup();
    let resolveLogin: (
      snapshot: Awaited<ReturnType<typeof loginAdmin>>
    ) => void = () => undefined;
    vi.mocked(loginAdmin).mockReturnValue(
      new Promise((resolve) => {
        resolveLogin = resolve;
      })
    );

    render(<LoginPage />);

    await user.type(await screen.findByLabelText("Email"), "admin@example.com");
    await user.type(screen.getByLabelText("Password"), "test-password");
    await user.click(screen.getByRole("button", { name: "Sign in" }));

    await waitFor(() => {
      expect(loginAdmin).toHaveBeenCalledWith({
        email: "admin@example.com",
        password: "test-password"
      });
    });
    expect(routerReplaceMock).not.toHaveBeenCalledWith("/dashboard");

    resolveLogin({
      csrfToken: "test-csrf-token",
      permissions: ["dashboard.view"],
      refreshCsrfToken: "test-refresh-csrf-token",
      roles: [],
      session: { id: "session-1" },
      user: {
        displayName: "Admin User",
        email: "admin@example.com",
        id: "admin-1"
      }
    });

    await waitFor(() => {
      expect(routerReplaceMock).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("shows a safe login error message on failed login", async () => {
    const user = userEvent.setup();
    vi.mocked(loginAdmin).mockRejectedValue(
      new AdminApiClientError("Backend detail should stay hidden.", 401)
    );

    render(<LoginPage />);

    await user.type(await screen.findByLabelText("Email"), "admin@example.com");
    await user.type(screen.getByLabelText("Password"), "test-password");
    await user.click(screen.getByRole("button", { name: "Sign in" }));

    expect(
      await screen.findByText("Email or password is incorrect.")
    ).toBeInTheDocument();
    expect(screen.queryByText("Backend detail should stay hidden.")).toBeNull();
    expect(routerReplaceMock).not.toHaveBeenCalledWith("/dashboard");
  });

  it("does not show backend-unavailable copy for 401 service_unavailable conflict", async () => {
    const user = userEvent.setup();
    vi.mocked(loginAdmin).mockRejectedValue(
      new AdminApiClientError(
        "backend detail should stay hidden",
        401,
        "service_unavailable"
      )
    );

    render(<LoginPage />);

    await user.type(await screen.findByLabelText("Email"), "admin@example.com");
    await user.type(screen.getByLabelText("Password"), "test-password");
    await user.click(screen.getByRole("button", { name: "Sign in" }));

    expect(
      await screen.findByText("Email or password is incorrect.")
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Unable to reach the Admin Backend. Try again later.")
    ).toBeNull();
    expect(screen.queryByText("backend detail should stay hidden")).toBeNull();
    expect(routerReplaceMock).not.toHaveBeenCalledWith("/dashboard");
  });

  it("does not show invalid-credentials copy for terminal session_ended after login", async () => {
    const user = userEvent.setup();
    vi.mocked(loginAdmin).mockRejectedValue(
      new AdminApiClientError("session ended", 401, "session_ended")
    );

    render(<LoginPage />);

    await user.type(await screen.findByLabelText("Email"), "admin@example.com");
    await user.type(screen.getByLabelText("Password"), "test-password");
    await user.click(screen.getByRole("button", { name: "Sign in" }));

    expect(
      await screen.findByText("Your session ended. Please sign in again.")
    ).toBeInTheDocument();
    expect(screen.queryByText("Email or password is incorrect.")).toBeNull();
    expect(routerReplaceMock).not.toHaveBeenCalledWith("/dashboard");
  });

  it("shows safe unavailable copy for 503 session_ended conflict without terminal copy", async () => {
    const user = userEvent.setup();
    vi.mocked(loginAdmin).mockRejectedValue(
      new AdminApiClientError("session ended", 503, "session_ended")
    );

    render(<LoginPage />);

    await user.type(await screen.findByLabelText("Email"), "admin@example.com");
    await user.type(screen.getByLabelText("Password"), "test-password");
    await user.click(screen.getByRole("button", { name: "Sign in" }));

    expect(
      await screen.findByText(
        "Unable to reach the Admin Backend. Try again later."
      )
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Your session ended. Please sign in again.")
    ).toBeNull();
    expect(screen.queryByText("session ended")).toBeNull();
    expect(routerReplaceMock).not.toHaveBeenCalledWith("/dashboard");
  });

  it("shows safe unavailable copy and does not navigate when login bootstrap /me is unavailable", async () => {
    const user = userEvent.setup();
    vi.mocked(loginAdmin).mockRejectedValue(
      new AdminApiClientError(
        "service unavailable",
        503,
        "service_unavailable"
      )
    );

    render(<LoginPage />);

    await user.type(await screen.findByLabelText("Email"), "admin@example.com");
    await user.type(screen.getByLabelText("Password"), "test-password");
    await user.click(screen.getByRole("button", { name: "Sign in" }));

    expect(
      await screen.findByText(
        "Unable to reach the Admin Backend. Try again later."
      )
    ).toBeInTheDocument();
    expect(screen.queryByText("service unavailable")).toBeNull();
    expect(routerReplaceMock).not.toHaveBeenCalledWith("/dashboard");
  });

  it("existing-session session_ended enables the login form without exposing backend detail", async () => {
    vi.mocked(getAdminMe).mockRejectedValue(
      new AdminApiClientError("session ended", 401, "session_ended")
    );

    render(<LoginPage />);

    expect(await screen.findByRole("button", { name: "Sign in" })).toBeEnabled();
    expect(screen.queryByText("session ended")).toBeNull();
    expect(routerReplaceMock).not.toHaveBeenCalledWith("/dashboard");
    expect(loginAdmin).not.toHaveBeenCalled();
  });

  it("does not write submitted password or tokens to console methods", async () => {
    const logMethod = "log";
    const errorMethod = "error";
    const logSpy = vi.spyOn(console, logMethod).mockImplementation(() => {});
    const errorSpy = vi
      .spyOn(console, errorMethod)
      .mockImplementation(() => {});
    const user = userEvent.setup();
    vi.mocked(loginAdmin).mockResolvedValue({
      csrfToken: "test-csrf-token",
      permissions: [],
      refreshCsrfToken: "test-refresh-csrf-token",
      roles: [],
      session: { id: "session-1" },
      user: {
        displayName: "Admin User",
        email: "admin@example.com",
        id: "admin-1"
      }
    });

    render(<LoginPage />);

    await user.type(await screen.findByLabelText("Email"), "admin@example.com");
    await user.type(screen.getByLabelText("Password"), "test-password");
    await user.click(screen.getByRole("button", { name: "Sign in" }));

    await waitFor(() => {
      expect(routerReplaceMock).toHaveBeenCalledWith("/dashboard");
    });
    expect(logSpy).not.toHaveBeenCalled();
    expect(errorSpy).not.toHaveBeenCalled();
  });
});
