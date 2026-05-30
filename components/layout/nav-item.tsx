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
        "flex min-h-10 items-center gap-3 rounded-[var(--radius)] px-3 py-2 text-sm font-medium text-[var(--text-secondary)]",
        "hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]",
        active &&
          "bg-[var(--brand-muted)] text-[var(--brand)] hover:bg-[var(--brand-muted)] hover:text-[var(--brand)]"
      )}
      href={href}
    >
      {icon}
      <span className="truncate">{label}</span>
    </Link>
  );
}
