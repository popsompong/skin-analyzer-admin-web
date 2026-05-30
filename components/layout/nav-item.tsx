"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/format/class-names";

type NavItemProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
};

export function NavItem({ href, icon, label }: NavItemProps) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      className={cn(
        "flex min-h-10 items-center gap-3 rounded-(--radius) px-3 py-2 text-sm font-medium text-(--text-secondary)",
        "hover:bg-(--surface-muted) hover:text-(--text-primary)",
        active &&
          "bg-(--brand-muted) text-(--brand) hover:bg-(--brand-muted) hover:text-(--brand)"
      )}
      href={href}
    >
      {icon}
      <span className="truncate">{label}</span>
    </Link>
  );
}
