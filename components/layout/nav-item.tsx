"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/format/class-names";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";

type NavItemProps = {
  badge?: string;
  collapsed?: boolean;
  href: string;
  icon: React.ReactNode;
  label: string;
};

export function NavItem({
  badge,
  collapsed = false,
  href,
  icon,
  label
}: NavItemProps) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);
  const accessibleLabel = badge ? `${label}, badge ${badge}` : label;
  const tooltipLabel = badge ? `${label} (${badge})` : label;

  const link = (
    <Link
      aria-label={collapsed ? accessibleLabel : undefined}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative flex min-h-11 items-center gap-3 overflow-hidden rounded-(--admin-radius-control) border border-transparent px-3 py-2.5 text-sm font-semibold text-(--admin-sidebar-muted) transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--admin-sidebar-focus-ring) focus-visible:ring-offset-2 ring-offset-(--admin-sidebar)",
        "hover:border-(--admin-sidebar-border) hover:bg-(--admin-sidebar-hover) hover:text-(--admin-sidebar-hover-foreground)",
        active &&
          "border-(--admin-sidebar-active) bg-(--admin-sidebar-active) text-(--admin-sidebar-active-foreground) hover:border-(--admin-sidebar-active) hover:bg-(--admin-sidebar-active) hover:text-(--admin-sidebar-active-foreground)",
        collapsed && "justify-center gap-0 px-0"
      )}
      href={href}
    >
      {active ? (
        <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-(--admin-sidebar-active-accent)" />
      ) : null}
      <span className="shrink-0">{icon}</span>
      <span className={cn("min-w-0 flex-1 truncate", collapsed && "sr-only")}>
        {label}
      </span>
      {badge ? (
        collapsed ? (
          <span
            aria-hidden="true"
            className="absolute top-1.5 right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-(--admin-sidebar-badge) px-1 text-[10px] font-semibold leading-none text-(--admin-sidebar-badge-foreground)"
          >
            {badge}
          </span>
        ) : (
          <Badge className="ml-auto h-5 min-w-5 shrink-0 justify-center border-transparent bg-(--admin-sidebar-badge) px-1.5 text-[11px] font-semibold leading-none text-(--admin-sidebar-badge-foreground)">
            {badge}
          </Badge>
        )
      ) : null}
    </Link>
  );

  if (!collapsed) {
    return link;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{link}</TooltipTrigger>
      <TooltipContent side="right" sideOffset={8}>
        {tooltipLabel}
      </TooltipContent>
    </Tooltip>
  );
}
