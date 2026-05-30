import type { AdminMenuItem, PermissionKey } from "@/types/admin";

export const PERMISSIONS = {
  authorsManage: "authors.manage",
  blogArchive: "blog.post.archive",
  blogCreate: "blog.post.create",
  blogPublish: "blog.post.publish",
  blogUpdate: "blog.post.update",
  blogView: "blog.post.view",
  dashboardView: "dashboard.view",
  mediaUpload: "media.upload",
  mediaView: "media.view",
  revalidationRetry: "revalidation.retry",
  settingsManage: "settings.manage",
  taxonomyManage: "taxonomy.manage",
  tipsArchive: "tips.post.archive",
  tipsCreate: "tips.post.create",
  tipsPublish: "tips.post.publish",
  tipsUpdate: "tips.post.update",
  tipsView: "tips.post.view"
} as const satisfies Record<string, PermissionKey>;

export const SCAFFOLD_VISIBLE_PERMISSIONS: PermissionKey[] = [
  PERMISSIONS.dashboardView,
  PERMISSIONS.blogView,
  PERMISSIONS.tipsView,
  PERMISSIONS.mediaView,
  PERMISSIONS.taxonomyManage,
  PERMISSIONS.authorsManage,
  PERMISSIONS.revalidationRetry,
  PERMISSIONS.settingsManage
];

export function hasPermission(
  permissions: readonly PermissionKey[],
  permission: PermissionKey
) {
  return permissions.includes(permission);
}

export function canViewMenuItem(
  permissions: readonly PermissionKey[],
  item: AdminMenuItem
) {
  return hasPermission(permissions, item.permission);
}
