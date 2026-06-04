"use client";

import type { MouseEvent } from "react";
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
  onNavigate?: () => void;
  surface?: "sidebar" | "drawer";
  visualCollapsed?: boolean;
};

const navTooltipContentClassName =
  "rounded-(--admin-radius-control) border border-(--admin-sidebar-border) !bg-(--admin-dropdown) px-3 py-2 text-xs font-semibold leading-4 !text-(--admin-selected-foreground) shadow-(--admin-shadow-card) [&_polygon]:!fill-(--admin-dropdown) [&_svg]:!bg-(--admin-dropdown) [&_svg]:!fill-(--admin-dropdown)";

export function NavItem({
  badge,
  collapsed = false,
  href,
  icon,
  label,
  onNavigate,
  surface = "sidebar",
  visualCollapsed = collapsed
}: NavItemProps) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);
  const accessibleLabel = badge ? `${label}, badge ${badge}` : label;
  const tooltipLabel = badge ? `${label} (${badge})` : label;
  const ringOffsetClass =
    surface === "drawer"
      ? "ring-offset-(--admin-sidebar-drawer)"
      : "ring-offset-(--admin-sidebar)";

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      return;
    }

    onNavigate?.();
  }

  const link = (
    <Link
      aria-label={visualCollapsed ? accessibleLabel : undefined}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group/nav-item relative grid min-h-10 grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center overflow-hidden rounded-(--admin-radius-control) border border-transparent py-2 pr-3 text-sm font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-(--admin-motion-fast) ease-(--admin-motion-ease) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--admin-sidebar-focus-ring) focus-visible:ring-offset-2 active:scale-[0.985] motion-reduce:transition-none motion-reduce:transform-none",
        ringOffsetClass,
        active
          ? "border-(--admin-sidebar-active) bg-(--admin-sidebar-active) text-(--admin-sidebar-active-foreground)! hover:border-(--admin-sidebar-active) hover:bg-(--admin-sidebar-active) hover:text-(--admin-sidebar-active-foreground)!"
          : "hover:border-(--admin-sidebar-border) hover:bg-(--admin-sidebar-hover)",
        collapsed && "w-11 pr-0"
      )}
      href={href}
      onClick={handleClick}
    >
      {active ? (
        <span className="absolute left-0 top-2 bottom-2 w-0.5 rounded-r-full bg-(--admin-sidebar-active-accent)" />
      ) : null}
      <span
        className={cn(
          "flex w-10 shrink-0 items-center justify-center transition-[color,transform] duration-(--admin-motion-fast) ease-(--admin-motion-ease) motion-reduce:transition-none motion-reduce:transform-none",
          active
            ? "text-(--admin-sidebar-active-foreground)"
            : "text-(--admin-sidebar-muted) group-hover/nav-item:text-(--admin-sidebar-hover-foreground)"
        )}
      >
        {icon}
      </span>
      <span
        aria-hidden={visualCollapsed ? true : undefined}
        className={cn(
          "min-w-0 overflow-hidden whitespace-nowrap transition-[max-width,opacity,transform,color] duration-(--admin-motion-sidebar-toggle) ease-(--admin-motion-ease-emphasized) motion-reduce:transition-none motion-reduce:transform-none",
          active
            ? "text-(--admin-sidebar-active-foreground)"
            : "text-(--admin-sidebar-muted) group-hover/nav-item:text-(--admin-sidebar-hover-foreground)",
          visualCollapsed
            ? "max-w-0 translate-x-1 opacity-0"
            : "max-w-40 translate-x-0 opacity-100"
        )}
      >
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
          <Badge
            aria-hidden={visualCollapsed ? true : undefined}
            className={cn(
              "h-5 min-w-5 shrink-0 justify-self-end overflow-hidden border-transparent bg-(--admin-sidebar-badge) text-[11px] font-semibold leading-none text-(--admin-sidebar-badge-foreground) transition-[max-width,opacity,transform,padding] duration-(--admin-motion-sidebar-toggle) ease-(--admin-motion-ease-emphasized) motion-reduce:transition-none motion-reduce:transform-none",
              visualCollapsed
                ? "max-w-0 translate-x-1 px-0 opacity-0"
                : "max-w-16 translate-x-0 px-1.5 opacity-100"
            )}
          >
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
      <TooltipContent
        className={navTooltipContentClassName}
        side="right"
        sideOffset={8}
      >
        {tooltipLabel}
      </TooltipContent>
    </Tooltip>
  );
}
