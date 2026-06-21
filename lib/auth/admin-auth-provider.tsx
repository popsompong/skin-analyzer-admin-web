"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode
} from "react";
import {
  AdminApiClientError,
  isAdminServiceUnavailableError,
  isAdminSessionEndedError
} from "@/lib/api/client";
import {
  getAdminMeWithRefresh,
  loginAdmin,
  logoutAdmin
} from "@/lib/api/auth";
import {
  clearAdminCsrfTokens,
  getAdminCsrfToken,
  setAdminCsrfToken,
  setAdminRefreshCsrfToken
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
  if (isAdminSessionEndedError(error)) {
    return "Your session ended. Please sign in again.";
  }

  if (error instanceof AdminApiClientError) {
    if (isAdminServiceUnavailableError(error)) {
      return "Unable to reach the Admin Backend.";
    }

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
  const authGenerationRef = useRef(0);
  const loggingOutRef = useRef(false);

  const advanceAuthGeneration = useCallback(() => {
    authGenerationRef.current += 1;

    return authGenerationRef.current;
  }, []);

  const canApplyAuthResult = useCallback((generation: number) => {
    return !loggingOutRef.current && generation === authGenerationRef.current;
  }, []);

  const applySnapshot = useCallback((snapshot: AdminAuthSnapshot | null) => {
    const authenticated = hasAuthenticatedUser(snapshot);
    let nextCsrfToken: string | undefined;

    if (snapshot?.csrfToken) {
      nextCsrfToken = setAdminCsrfToken(snapshot.csrfToken);
    } else if (authenticated) {
      nextCsrfToken = getAdminCsrfToken();
    } else {
      clearAdminCsrfTokens();
    }

    if (snapshot?.refreshCsrfToken) {
      setAdminRefreshCsrfToken(snapshot.refreshCsrfToken);
    } else if (!authenticated) {
      clearAdminCsrfTokens();
    }

    setCsrfToken(nextCsrfToken);
    setPermissions(snapshot?.permissions ?? []);
    setRoles(snapshot?.roles ?? []);
    setSession(snapshot?.session ?? null);
    setUser(snapshot?.user ?? null);
    setStatus(authenticated ? "authenticated" : "unauthenticated");
  }, []);

  const refresh = useCallback(async () => {
    if (loggingOutRef.current) {
      applySnapshot(null);
      return null;
    }

    const requestGeneration = authGenerationRef.current;

    try {
      const snapshot = await getAdminMeWithRefresh();

      if (!canApplyAuthResult(requestGeneration)) {
        return null;
      }

      applySnapshot(snapshot);
      setError(null);

      return snapshot;
    } catch (refreshError) {
      if (!canApplyAuthResult(requestGeneration)) {
        return null;
      }

      if (isAdminServiceUnavailableError(refreshError)) {
        setError(getSafeAuthError(refreshError));
        return null;
      }

      applySnapshot(null);

      if (
        isAdminSessionEndedError(refreshError) ||
        (refreshError instanceof AdminApiClientError &&
          refreshError.status === 401)
      ) {
        setError(null);
      } else {
        setError(getSafeAuthError(refreshError));
      }

      return null;
    }
  }, [applySnapshot, canApplyAuthResult]);

  const login = useCallback(
    async (credentials: { email: string; password: string }) => {
      const requestGeneration = advanceAuthGeneration();
      loggingOutRef.current = false;
      setStatus("loading");
      setError(null);

      try {
        const snapshot = await loginAdmin(credentials);

        if (!canApplyAuthResult(requestGeneration)) {
          return snapshot;
        }

        applySnapshot(snapshot);

        return snapshot;
      } catch (loginError) {
        if (!canApplyAuthResult(requestGeneration)) {
          throw loginError;
        }

        applySnapshot(null);
        setError(getSafeAuthError(loginError));
        throw loginError;
      }
    },
    [advanceAuthGeneration, applySnapshot, canApplyAuthResult]
  );

  const logout = useCallback(async () => {
    advanceAuthGeneration();
    loggingOutRef.current = true;
    setStatus("loading");
    setError(null);

    try {
      await logoutAdmin();
    } finally {
      applySnapshot(null);
      loggingOutRef.current = false;
    }
  }, [advanceAuthGeneration, applySnapshot]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    let active = true;
    const requestGeneration = authGenerationRef.current;

    getAdminMeWithRefresh()
      .then((snapshot) => {
        if (!active || !canApplyAuthResult(requestGeneration)) {
          return;
        }

        applySnapshot(snapshot);
        setError(null);
      })
      .catch((bootstrapError: unknown) => {
        if (!active || !canApplyAuthResult(requestGeneration)) {
          return;
        }

        if (isAdminServiceUnavailableError(bootstrapError)) {
          setStatus("unauthenticated");
          setError(getSafeAuthError(bootstrapError));
          return;
        }

        applySnapshot(null);

        if (
          isAdminSessionEndedError(bootstrapError) ||
          (bootstrapError instanceof AdminApiClientError &&
            bootstrapError.status === 401)
        ) {
          setError(null);
        } else {
          setError(getSafeAuthError(bootstrapError));
        }
      });

    return () => {
      active = false;
    };
  }, [applySnapshot, canApplyAuthResult]);

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
