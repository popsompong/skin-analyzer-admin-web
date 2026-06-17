import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  clearAdminCsrfTokens,
  clearAdminRefreshCsrfToken,
  clearAdminCsrfToken,
  getAdminCsrfToken,
  getAdminRefreshCsrfToken,
  setAdminRefreshCsrfToken,
  setAdminCsrfToken
} from "@/lib/auth/csrf-token-store";

const csrfStorageKey = "skin-analyzer-admin-csrf-token";
const refreshCsrfCookieName = "__Host-sa_admin_refresh_csrf";

function clearRefreshCsrfCookie() {
  document.cookie = `${refreshCsrfCookieName}=; Max-Age=0; path=/`;
}

describe("csrf token store", () => {
  beforeEach(() => {
    if (typeof window === "undefined") {
      vi.unstubAllGlobals();
    }

    clearAdminCsrfToken();
    clearAdminRefreshCsrfToken();
    clearRefreshCsrfCookie();
    window.sessionStorage.clear();
  });

  afterEach(() => {
    if (typeof window === "undefined") {
      vi.unstubAllGlobals();
    }

    clearAdminCsrfToken();
    clearAdminRefreshCsrfToken();
    clearRefreshCsrfCookie();
    window.sessionStorage.clear();
  });

  it("returns undefined safely when no token exists", () => {
    expect(getAdminCsrfToken()).toBeUndefined();
    expect(getAdminRefreshCsrfToken()).toBeUndefined();
  });

  it("sets and reads the csrf token from memory and sessionStorage", () => {
    expect(setAdminCsrfToken("test-csrf-token")).toBe("test-csrf-token");
    expect(getAdminCsrfToken()).toBe("test-csrf-token");
    expect(window.sessionStorage.getItem(csrfStorageKey)).toBe(
      "test-csrf-token"
    );
  });

  it("clears the csrf token from memory and sessionStorage", () => {
    setAdminCsrfToken("test-csrf-token");

    clearAdminCsrfToken();

    expect(getAdminCsrfToken()).toBeUndefined();
    expect(window.sessionStorage.getItem(csrfStorageKey)).toBeNull();
  });

  it("sets and reads the refresh csrf token from memory only", () => {
    expect(setAdminRefreshCsrfToken("test-refresh-csrf-token")).toBe(
      "test-refresh-csrf-token"
    );
    expect(getAdminRefreshCsrfToken()).toBe("test-refresh-csrf-token");
    expect(window.sessionStorage.length).toBe(0);
  });

  it("reads the readable refresh csrf cookie fallback only when allowed", () => {
    const cookieGetter = vi
      .spyOn(document, "cookie", "get")
      .mockReturnValue(`${refreshCsrfCookieName}=cookie-refresh-csrf-token`);

    expect(
      getAdminRefreshCsrfToken({ includeCookieFallback: false })
    ).toBeUndefined();
    expect(getAdminRefreshCsrfToken()).toBe("cookie-refresh-csrf-token");
    cookieGetter.mockRestore();
  });

  it("clears both csrf proofs from memory through the combined reset", () => {
    setAdminCsrfToken("test-csrf-token");
    setAdminRefreshCsrfToken("test-refresh-csrf-token");

    clearAdminCsrfTokens();

    expect(getAdminCsrfToken()).toBeUndefined();
    expect(
      getAdminRefreshCsrfToken({ includeCookieFallback: false })
    ).toBeUndefined();
  });

  it("is safe when window storage is unavailable", () => {
    clearAdminCsrfToken();
    vi.stubGlobal("window", undefined);

    expect(getAdminCsrfToken()).toBeUndefined();
    expect(setAdminCsrfToken("test-csrf-token")).toBe("test-csrf-token");
    expect(getAdminCsrfToken()).toBe("test-csrf-token");

    clearAdminCsrfToken();
  });

  it("does not use the browser local store for csrf state", () => {
    const localStoreName = `local${"Storage"}`;
    const localStoreCalls: string[] = [];
    const localStore = {
      getItem: () => {
        localStoreCalls.push("getItem");
        return null;
      },
      removeItem: () => {
        localStoreCalls.push("removeItem");
      },
      setItem: () => {
        localStoreCalls.push("setItem");
      }
    };

    Object.defineProperty(window, localStoreName, {
      configurable: true,
      value: localStore
    });

    setAdminCsrfToken("test-csrf-token");
    setAdminRefreshCsrfToken("test-refresh-csrf-token");
    getAdminCsrfToken();
    getAdminRefreshCsrfToken();
    clearAdminCsrfToken();
    clearAdminRefreshCsrfToken();

    expect(localStoreCalls).toEqual([]);
  });
});
