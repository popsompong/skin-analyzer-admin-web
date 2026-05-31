import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  clearAdminCsrfToken,
  getAdminCsrfToken,
  setAdminCsrfToken
} from "@/lib/auth/csrf-token-store";

const csrfStorageKey = "skin-analyzer-admin-csrf-token";

describe("csrf token store", () => {
  beforeEach(() => {
    if (typeof window === "undefined") {
      vi.unstubAllGlobals();
    }

    clearAdminCsrfToken();
    window.sessionStorage.clear();
  });

  afterEach(() => {
    if (typeof window === "undefined") {
      vi.unstubAllGlobals();
    }

    clearAdminCsrfToken();
    window.sessionStorage.clear();
  });

  it("returns undefined safely when no token exists", () => {
    expect(getAdminCsrfToken()).toBeUndefined();
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
    getAdminCsrfToken();
    clearAdminCsrfToken();

    expect(localStoreCalls).toEqual([]);
  });
});
