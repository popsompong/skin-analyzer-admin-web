import type { AdminMenuItem, PermissionKey } from "@/types/admin";
import { canViewMenuItem, PERMISSIONS } from "@/lib/permissions/permissions";

export const ADMIN_MENU_ITEMS: AdminMenuItem[] = [
  {
    href: "/dashboard",
    icon: "dashboard",
    label: "Dashboard",
    permission: PERMISSIONS.dashboardView
  },
  {
    href: "/blog",
    icon: "blog",
    label: "Blog",
    permission: PERMISSIONS.blogView
  },
  {
    href: "/tips",
    icon: "tips",
    label: "Tips",
    permission: PERMISSIONS.tipsView
  },
  {
    href: "/media",
    icon: "media",
    label: "Media",
    permission: PERMISSIONS.mediaView
  },
  {
    href: "/categories-tags",
    icon: "taxonomy",
    label: "Categories and tags",
    permission: PERMISSIONS.taxonomyManage
  },
  {
    href: "/authors",
    icon: "authors",
    label: "Authors",
    permission: PERMISSIONS.authorsManage
  },
  {
    href: "/revalidation-events",
    icon: "revalidation",
    label: "Revalidation events",
    permission: PERMISSIONS.revalidationRetry
  },
  {
    href: "/settings",
    icon: "settings",
    label: "Settings",
    permission: PERMISSIONS.settingsManage
  }
];

export function getVisibleAdminMenuItems(permissions: readonly PermissionKey[]) {
  return ADMIN_MENU_ITEMS.filter((item) => canViewMenuItem(permissions, item));
}
