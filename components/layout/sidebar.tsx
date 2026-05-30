import {
  ChevronDown,
  FileText,
  Image,
  LayoutDashboard,
  Lightbulb,
  RefreshCcw,
  Settings,
  Tags,
  UserPen
} from "lucide-react";
import { BrandMark } from "@/components/layout/brand-mark";
import { NavItem } from "@/components/layout/nav-item";
import { getVisibleAdminMenuItems } from "@/lib/permissions/menu";
import { SCAFFOLD_VISIBLE_PERMISSIONS } from "@/lib/permissions/permissions";
import type { AdminMenuIcon } from "@/types/admin";

const icons: Record<AdminMenuIcon, React.ComponentType<{ className?: string }>> = {
  authors: UserPen,
  blog: FileText,
  dashboard: LayoutDashboard,
  media: Image,
  revalidation: RefreshCcw,
  settings: Settings,
  taxonomy: Tags,
  tips: Lightbulb
};

export function Sidebar() {
  const menuItems = getVisibleAdminMenuItems(SCAFFOLD_VISIBLE_PERMISSIONS);
  const dashboardItem = menuItems.find((item) => item.href === "/dashboard");
  const contentItems = menuItems.filter((item) =>
    ["/blog", "/tips", "/media", "/categories-tags", "/authors"].includes(
      item.href
    )
  );
  const operationItems = menuItems.filter(
    (item) => item.href === "/revalidation-events"
  );
  const settingsItems = menuItems.filter((item) => item.href === "/settings");

  return (
    <aside className="hidden min-h-screen w-[248px] shrink-0 border-r border-(--admin-sidebar-border) bg-(--admin-sidebar) text-(--admin-sidebar-text) md:flex md:flex-col">
      <div className="border-b border-(--admin-sidebar-border) px-5 py-5">
        <div className="flex items-center gap-3">
          <BrandMark />
          <div className="min-w-0">
            <div className="truncate text-base font-semibold tracking-normal">
              Skin Analyzer
            </div>
            <div className="mt-0.5 text-sm font-medium text-(--admin-sidebar-muted)">
              Admin Web
            </div>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-4">
        {dashboardItem ? (
          <SidebarNavItem item={dashboardItem} iconClassName="h-5 w-5" />
        ) : null}

        <SidebarSection items={contentItems} label="CONTENT" />
        <SidebarSection items={operationItems} label="OPERATIONS" />
        <SidebarSection items={settingsItems} label="SETTINGS" />
      </nav>

      <div className="border-t border-(--admin-sidebar-border) p-4">
        <div className="flex items-center gap-3 rounded-(--admin-radius-control) bg-(--admin-sidebar-elevated) px-3 py-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-(--admin-sidebar-border) bg-(--admin-sidebar)">
            <span className="text-xs font-semibold text-(--admin-sidebar-text)">
              SC
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold">Sompong C.</div>
            <div className="mt-0.5 truncate text-xs text-(--admin-sidebar-muted)">
              Super Admin
            </div>
          </div>
          <ChevronDown className="h-4 w-4 shrink-0 text-(--admin-sidebar-muted)" />
        </div>
      </div>
    </aside>
  );
}

type SidebarSectionProps = {
  items: ReturnType<typeof getVisibleAdminMenuItems>;
  label: string;
};

function SidebarSection({ items, label }: SidebarSectionProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="mt-5">
      <div className="px-3 text-xs font-semibold tracking-normal text-(--admin-sidebar-muted)">
        {label}
      </div>
      <div className="mt-3 space-y-1.5">
        {items.map((item) => (
          <SidebarNavItem item={item} key={item.href} />
        ))}
      </div>
    </div>
  );
}

type SidebarNavItemProps = {
  iconClassName?: string;
  item: ReturnType<typeof getVisibleAdminMenuItems>[number];
};

function SidebarNavItem({ iconClassName = "h-5 w-5", item }: SidebarNavItemProps) {
  const Icon = icons[item.icon];

  return (
    <NavItem
      href={item.href}
      icon={<Icon className={iconClassName} />}
      label={item.label}
    />
  );
}
