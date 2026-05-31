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

export type AdminAuthSession = Record<string, unknown>;

export type AdminAuthSnapshot = {
  csrfToken?: string;
  permissions: string[];
  roles: AdminAuthRole[];
  session: AdminAuthSession | null;
  user: AdminAuthUser | null;
};
