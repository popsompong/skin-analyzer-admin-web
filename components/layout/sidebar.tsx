"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { getVisibleAdminMenuItems } from "@/lib/permissions/menu";
import { SCAFFOLD_VISIBLE_PERMISSIONS } from "@/lib/permissions/permissions";
import { cn } from "@/lib/format/class-names";
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
    <aside className="sticky top-0 hidden h-screen w-62 shrink-0 border-r border-(--admin-sidebar-border) bg-(--admin-sidebar) text-(--admin-sidebar-text) md:flex md:flex-col">
      <div className="shrink-0 px-5 py-5">
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
      <Separator className="bg-(--admin-sidebar-border)" />

      <nav
        aria-label="Admin navigation"
        className="min-h-0 flex-1 overflow-y-auto px-4 py-4"
      >
        {dashboardItem ? (
          <SidebarNavItem item={dashboardItem} iconClassName="h-5 w-5" />
        ) : null}

        <SidebarSection items={contentItems} label="CONTENT" />
        <SidebarSection items={operationItems} label="OPERATIONS" />
        <SidebarSection items={settingsItems} label="SETTINGS" />
      </nav>

      <Separator className="bg-(--admin-sidebar-border)" />
      <div className="shrink-0 p-4">
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
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  const hasActiveItem = items.some((item) => isMenuItemActive(pathname, item.href));

  if (items.length === 0) {
    return null;
  }

  return (
    <Collapsible className="mt-5" onOpenChange={setOpen} open={open}>
      <CollapsibleTrigger
        className={cn(
          "group relative flex min-h-9 w-full items-center gap-2 rounded-(--admin-radius-control) border border-transparent px-3 text-left text-xs font-semibold tracking-normal text-(--admin-sidebar-muted) transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--admin-sidebar-focus-ring) focus-visible:ring-offset-2 ring-offset-(--admin-sidebar)",
          "hover:border-(--admin-sidebar-border) hover:bg-(--admin-sidebar-hover) hover:text-(--admin-sidebar-hover-foreground)",
          hasActiveItem &&
            !open &&
            "border-(--admin-sidebar-active) bg-(--admin-sidebar-active) text-(--admin-sidebar-active-foreground)"
        )}
        type="button"
      >
        {hasActiveItem && !open ? (
          <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-(--admin-sidebar-active-accent)" />
        ) : null}
        <span className="min-w-0 flex-1 truncate">{label}</span>
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-150",
            open ? "rotate-180" : "rotate-0"
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-3 space-y-1.5">
        {items.map((item) => (
          <SidebarNavItem item={item} key={item.href} />
        ))}
      </CollapsibleContent>
    </Collapsible>
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
      badge={item.href === "/revalidation-events" ? "0" : undefined}
    />
  );
}

function isMenuItemActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}
