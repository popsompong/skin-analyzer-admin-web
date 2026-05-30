import {
  FileText,
  Image,
  LayoutDashboard,
  Lightbulb,
  RefreshCcw,
  Settings,
  Tags,
  UserPen
} from "lucide-react";
import { NavItem } from "@/components/layout/nav-item";
import { Separator } from "@/components/ui/separator";
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

  return (
    <aside className="hidden w-64 shrink-0 border-r border-(--border) bg-(--surface) md:flex md:flex-col">
      <div className="px-5 py-5">
        <div className="text-sm font-semibold uppercase tracking-normal text-(--text-secondary)">
          Skin Analyzer
        </div>
        <div className="mt-1 text-lg font-semibold">Admin Web</div>
      </div>
      <Separator />
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {menuItems.map((item) => {
          const Icon = icons[item.icon];

          return (
            <NavItem
              href={item.href}
              icon={<Icon className="h-4 w-4" />}
              key={item.href}
              label={item.label}
            />
          );
        })}
      </nav>
      <div className="border-t border-(--border) px-5 py-4 text-xs leading-5 text-(--text-secondary)">
        Permission visibility is a scaffold placeholder. Backend guards remain
        the source of truth.
      </div>
    </aside>
  );
}
