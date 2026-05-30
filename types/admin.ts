export type PermissionKey =
  | "dashboard.view"
  | "blog.post.view"
  | "blog.post.create"
  | "blog.post.update"
  | "blog.post.publish"
  | "blog.post.archive"
  | "tips.post.view"
  | "tips.post.create"
  | "tips.post.update"
  | "tips.post.publish"
  | "tips.post.archive"
  | "media.view"
  | "media.upload"
  | "taxonomy.manage"
  | "authors.manage"
  | "revalidation.retry"
  | "settings.manage";

export type AdminMenuIcon =
  | "authors"
  | "blog"
  | "dashboard"
  | "media"
  | "revalidation"
  | "settings"
  | "taxonomy"
  | "tips";

export type AdminRole = {
  id: string;
  name: string;
  permissions: PermissionKey[];
};

export type AdminUser = {
  id: string;
  email: string;
  displayName: string;
  roles: AdminRole[];
  permissions: PermissionKey[];
};

export type AdminSession = {
  user: AdminUser;
  loadedFrom: "/v1/admin/auth/me";
};

export type AdminMenuItem = {
  href: string;
  icon: AdminMenuIcon;
  label: string;
  permission: PermissionKey;
};
