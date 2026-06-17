export type AdminAuthUser = {
  displayName: string;
  email: string;
  id: string;
  status?: string;
};

export type AdminAuthRole = {
  id?: string;
  key?: string;
  name: string;
  permissions: string[];
};

export type AdminAuthSession = Record<string, unknown> & {
  expiresAt?: string;
  id?: string;
};

export type AdminMeResponse = {
  csrfToken: string;
  permissions: string[];
  refreshCsrfToken?: string;
  roles: AdminAuthRole[];
  session: {
    expiresAt: string;
    id: string;
  };
  user: AdminAuthUser;
};

export type AdminRefreshResponse = {
  csrfToken: string;
  ok: true;
  refreshCsrfToken: string;
  session: {
    expiresAt: string;
    id: string;
  };
};

export type AdminLogoutResponse =
  | {
      ok?: true;
      status?: "ok";
    }
  | undefined;

export type AdminAuthSnapshot = {
  csrfToken?: string;
  permissions: string[];
  refreshCsrfToken?: string;
  roles: AdminAuthRole[];
  session: AdminAuthSession | null;
  user: AdminAuthUser | null;
};
