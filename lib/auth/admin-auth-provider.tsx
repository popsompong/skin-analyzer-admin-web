"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";
import { AdminApiClientError } from "@/lib/api/client";
import { getAdminMe, loginAdmin, logoutAdmin } from "@/lib/api/auth";
import {
  clearAdminCsrfToken,
  getAdminCsrfToken,
  setAdminCsrfToken
} from "@/lib/auth/csrf-token-store";
import type {
  AdminAuthRole,
  AdminAuthSession,
  AdminAuthSnapshot,
  AdminAuthUser
} from "@/types/admin-auth";

type AdminAuthStatus = "authenticated" | "loading" | "unauthenticated";

type AdminAuthContextValue = {
  clearError: () => void;
  csrfToken?: string;
  error: string | null;
  login: (credentials: {
    email: string;
    password: string;
  }) => Promise<AdminAuthSnapshot>;
  logout: () => Promise<void>;
  permissions: string[];
  refresh: () => Promise<AdminAuthSnapshot | null>;
  roles: AdminAuthRole[];
  session: AdminAuthSession | null;
  status: AdminAuthStatus;
  user: AdminAuthUser | null;
};

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

function getSafeAuthError(error: unknown) {
  if (error instanceof AdminApiClientError) {
    if (error.status === 401) {
      return "Please sign in to continue.";
    }

    return error.message;
  }

  return "Unable to reach the Admin Backend.";
}

function hasAuthenticatedUser(snapshot: AdminAuthSnapshot | null) {
  return Boolean(snapshot?.user);
}

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [csrfToken, setCsrfToken] = useState<string | undefined>(() =>
    getAdminCsrfToken()
  );
  const [error, setError] = useState<string | null>(null);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [roles, setRoles] = useState<AdminAuthRole[]>([]);
  const [session, setSession] = useState<AdminAuthSession | null>(null);
  const [status, setStatus] = useState<AdminAuthStatus>("loading");
  const [user, setUser] = useState<AdminAuthUser | null>(null);

  const applySnapshot = useCallback((snapshot: AdminAuthSnapshot | null) => {
    const authenticated = hasAuthenticatedUser(snapshot);
    let nextCsrfToken: string | undefined;

    if (snapshot?.csrfToken) {
      nextCsrfToken = setAdminCsrfToken(snapshot.csrfToken);
    } else if (authenticated) {
      nextCsrfToken = getAdminCsrfToken();
    } else {
      clearAdminCsrfToken();
    }

    setCsrfToken(nextCsrfToken);
    setPermissions(snapshot?.permissions ?? []);
    setRoles(snapshot?.roles ?? []);
    setSession(snapshot?.session ?? null);
    setUser(snapshot?.user ?? null);
    setStatus(authenticated ? "authenticated" : "unauthenticated");
  }, []);

  const refresh = useCallback(async () => {
    try {
      const snapshot = await getAdminMe();
      applySnapshot(snapshot);
      setError(null);

      return snapshot;
    } catch (refreshError) {
      applySnapshot(null);

      if (
        refreshError instanceof AdminApiClientError &&
        refreshError.status === 401
      ) {
        setError(null);
      } else {
        setError(getSafeAuthError(refreshError));
      }

      return null;
    }
  }, [applySnapshot]);

  const login = useCallback(
    async (credentials: { email: string; password: string }) => {
      setStatus("loading");
      setError(null);

      try {
        const snapshot = await loginAdmin(credentials);
        applySnapshot(snapshot);

        return snapshot;
      } catch (loginError) {
        applySnapshot(null);
        setError(getSafeAuthError(loginError));
        throw loginError;
      }
    },
    [applySnapshot]
  );

  const logout = useCallback(async () => {
    setStatus("loading");
    setError(null);

    try {
      await logoutAdmin();
    } finally {
      applySnapshot(null);
    }
  }, [applySnapshot]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    let active = true;

    getAdminMe()
      .then((snapshot) => {
        if (!active) {
          return;
        }

        applySnapshot(snapshot);
        setError(null);
      })
      .catch((bootstrapError: unknown) => {
        if (!active) {
          return;
        }

        applySnapshot(null);

        if (
          bootstrapError instanceof AdminApiClientError &&
          bootstrapError.status === 401
        ) {
          setError(null);
        } else {
          setError(getSafeAuthError(bootstrapError));
        }
      });

    return () => {
      active = false;
    };
  }, [applySnapshot]);

  const value = useMemo<AdminAuthContextValue>(
    () => ({
      clearError,
      csrfToken,
      error,
      login,
      logout,
      permissions,
      refresh,
      roles,
      session,
      status,
      user
    }),
    [
      clearError,
      csrfToken,
      error,
      login,
      logout,
      permissions,
      refresh,
      roles,
      session,
      status,
      user
    ]
  );

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error("useAdminAuth must be used inside AdminAuthProvider.");
  }

  return context;
}
