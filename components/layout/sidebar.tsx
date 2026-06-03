"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  FileText,
  Image,
  LayoutDashboard,
  Lightbulb,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  RefreshCcw,
  Settings,
  Tags,
  X,
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
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
  const [collapsed, setCollapsed] = useState(false);
  const CollapseIcon = collapsed ? PanelLeftOpen : PanelLeftClose;
  const collapseLabel = collapsed ? "Expand sidebar" : "Collapse sidebar";

  return (
    <TooltipProvider delayDuration={120}>
      <aside
        className={cn(
          "sticky top-0 hidden h-screen shrink-0 border-r border-(--admin-sidebar-border) text-(--admin-sidebar-text) transition-[width] duration-150 ease-out lg:flex lg:flex-col",
          collapsed
            ? "w-[72px] bg-(--admin-sidebar-rail)"
            : "w-62 bg-(--admin-sidebar)"
        )}
        data-state={collapsed ? "collapsed" : "expanded"}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              aria-expanded={!collapsed}
              aria-label={collapseLabel}
              className={cn(
                "absolute top-5 -right-3 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-(--admin-sidebar-border) text-(--admin-sidebar-muted) shadow-(--shadow-subtle) transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--admin-sidebar-focus-ring) focus-visible:ring-offset-2 ring-offset-(--admin-sidebar)",
                collapsed
                  ? "bg-(--admin-sidebar-rail)"
                  : "bg-(--admin-sidebar)",
                "hover:bg-(--admin-sidebar-hover) hover:text-(--admin-sidebar-hover-foreground)"
              )}
              onClick={() => setCollapsed((current) => !current)}
              type="button"
            >
              <CollapseIcon aria-hidden="true" className="h-4 w-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={8}>
            {collapseLabel}
          </TooltipContent>
        </Tooltip>

        <SidebarBrand collapsed={collapsed} />
        <Separator className="bg-(--admin-sidebar-border)" />

        <SidebarMenuContent collapsed={collapsed} />

        <Separator className="bg-(--admin-sidebar-border)" />
        <SidebarUserBlock collapsed={collapsed} />
      </aside>
    </TooltipProvider>
  );
}

export function MobileSidebarDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <style>
        {`[data-slot="sheet-overlay"]:has(+ [data-admin-mobile-sidebar-drawer="true"]) { background: var(--admin-sidebar-drawer-backdrop); }`}
      </style>
      <SheetTrigger asChild>
        <button
          aria-label="Open admin navigation"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-(--admin-radius-control) text-(--admin-text-muted) transition-colors hover:bg-(--admin-surface-elevated) hover:text-(--admin-text) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--admin-command-focus) focus-visible:ring-offset-2 ring-offset-(--admin-topbar) lg:hidden"
          type="button"
        >
          <Menu aria-hidden="true" className="h-5 w-5" />
        </button>
      </SheetTrigger>
      <SheetContent
        className="w-[min(17.5rem,calc(100vw-1.5rem))] max-w-[17.5rem] gap-0 border-(--admin-sidebar-border) bg-(--admin-sidebar-drawer) p-0 text-(--admin-sidebar-text) shadow-(--admin-shadow-card) sm:max-w-[17.5rem]"
        data-admin-mobile-sidebar-drawer="true"
        showCloseButton={false}
        side="left"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Admin navigation</SheetTitle>
          <SheetDescription>
            Skin Analyzer Admin Web navigation menu.
          </SheetDescription>
        </SheetHeader>

        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex shrink-0 items-center justify-between gap-3 px-5 py-5">
            <div className="flex min-w-0 items-center gap-3">
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
            <SheetClose asChild>
              <button
                aria-label="Close admin navigation"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-(--admin-radius-control) text-(--admin-sidebar-muted) transition-colors hover:bg-(--admin-sidebar-hover) hover:text-(--admin-sidebar-hover-foreground) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--admin-sidebar-focus-ring) focus-visible:ring-offset-2 ring-offset-(--admin-sidebar-drawer)"
                type="button"
              >
                <X aria-hidden="true" className="h-4 w-4" />
              </button>
            </SheetClose>
          </div>
          <Separator className="bg-(--admin-sidebar-border)" />
          <SidebarMenuContent
            onNavigate={() => setOpen(false)}
            surface="drawer"
          />
          <Separator className="bg-(--admin-sidebar-border)" />
          <SidebarUserBlock />
        </div>
      </SheetContent>
    </Sheet>
  );
}

function SidebarBrand({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <div className={cn("shrink-0 py-5", collapsed ? "px-3" : "px-5")}>
      <div
        className={cn(
          "flex items-center",
          collapsed ? "justify-center" : "gap-3"
        )}
      >
        <BrandMark />
        <div className={cn("min-w-0", collapsed && "sr-only")}>
          <div className="truncate text-base font-semibold tracking-normal">
            Skin Analyzer
          </div>
          <div className="mt-0.5 text-sm font-medium text-(--admin-sidebar-muted)">
            Admin Web
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarUserBlock({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <div className={cn("shrink-0", collapsed ? "p-3" : "p-4")}>
      <div
        aria-label="Sompong C., Super Admin"
        className={cn(
          "flex items-center rounded-(--admin-radius-control) bg-(--admin-sidebar-elevated)",
          collapsed ? "justify-center p-2" : "gap-3 px-3 py-3"
        )}
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-(--admin-sidebar-border) bg-(--admin-sidebar)">
          <span className="text-xs font-semibold text-(--admin-sidebar-text)">
            SC
          </span>
        </div>
        <div className={cn("min-w-0 flex-1", collapsed && "sr-only")}>
          <div className="truncate text-sm font-semibold">Sompong C.</div>
          <div className="mt-0.5 truncate text-xs text-(--admin-sidebar-muted)">
            Super Admin
          </div>
        </div>
      </div>
    </div>
  );
}

type SidebarSurface = "sidebar" | "drawer";

type SidebarMenuContentProps = {
  collapsed?: boolean;
  onNavigate?: () => void;
  surface?: SidebarSurface;
};

function SidebarMenuContent({
  collapsed = false,
  onNavigate,
  surface = "sidebar"
}: SidebarMenuContentProps) {
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
    <nav
      aria-label={
        surface === "drawer" ? "Admin mobile navigation" : "Admin navigation"
      }
      className={cn(
        "min-h-0 flex-1 overflow-y-auto py-4",
        collapsed ? "px-3" : "px-4"
      )}
    >
      {dashboardItem ? (
        <SidebarNavItem
          collapsed={collapsed}
          iconClassName="h-5 w-5"
          item={dashboardItem}
          onNavigate={onNavigate}
          surface={surface}
        />
      ) : null}

      <SidebarSection
        collapsed={collapsed}
        items={contentItems}
        label="CONTENT"
        onNavigate={onNavigate}
        surface={surface}
      />
      <SidebarSection
        collapsed={collapsed}
        items={operationItems}
        label="OPERATIONS"
        onNavigate={onNavigate}
        surface={surface}
      />
      <SidebarSection
        collapsed={collapsed}
        items={settingsItems}
        label="SETTINGS"
        onNavigate={onNavigate}
        surface={surface}
      />
    </nav>
  );
}

type SidebarSectionProps = {
  collapsed: boolean;
  items: ReturnType<typeof getVisibleAdminMenuItems>;
  label: string;
  onNavigate?: () => void;
  surface?: SidebarSurface;
};

function SidebarSection({
  collapsed,
  items,
  label,
  onNavigate,
  surface = "sidebar"
}: SidebarSectionProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  const hasActiveItem = items.some((item) => isMenuItemActive(pathname, item.href));
  const ringOffsetClass =
    surface === "drawer"
      ? "ring-offset-(--admin-sidebar-drawer)"
      : "ring-offset-(--admin-sidebar)";

  if (items.length === 0) {
    return null;
  }

  if (collapsed) {
    return (
      <div aria-label={label} className="mt-3 space-y-1.5" role="group">
        <div
          aria-hidden="true"
          className="mx-auto h-px w-8 bg-(--admin-sidebar-border)"
        />
        {items.map((item) => (
          <SidebarNavItem
            collapsed
            item={item}
            key={item.href}
            onNavigate={onNavigate}
            surface={surface}
          />
        ))}
      </div>
    );
  }

  return (
    <Collapsible className="mt-5" onOpenChange={setOpen} open={open}>
      <CollapsibleTrigger
        className={cn(
          "group relative flex min-h-9 w-full items-center gap-2 rounded-(--admin-radius-control) border border-transparent px-3 text-left text-xs font-semibold tracking-normal text-(--admin-sidebar-muted) transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--admin-sidebar-focus-ring) focus-visible:ring-offset-2",
          ringOffsetClass,
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
          <SidebarNavItem
            item={item}
            key={item.href}
            onNavigate={onNavigate}
            surface={surface}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

type SidebarNavItemProps = {
  collapsed?: boolean;
  iconClassName?: string;
  item: ReturnType<typeof getVisibleAdminMenuItems>[number];
  onNavigate?: () => void;
  surface?: SidebarSurface;
};

function SidebarNavItem({
  collapsed = false,
  iconClassName = "h-5 w-5",
  item,
  onNavigate,
  surface = "sidebar"
}: SidebarNavItemProps) {
  const Icon = icons[item.icon];

  return (
    <NavItem
      collapsed={collapsed}
      href={item.href}
      icon={<Icon className={iconClassName} />}
      label={item.label}
      badge={item.href === "/revalidation-events" ? "0" : undefined}
      onNavigate={onNavigate}
      surface={surface}
    />
  );
}

function isMenuItemActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}
