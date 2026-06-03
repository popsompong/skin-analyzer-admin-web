import {
  Bell,
  ChevronDown,
  CircleHelp,
  Command,
  Search
} from "lucide-react";
import { MobileSidebarDrawer } from "@/components/layout/sidebar";

export function Topbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-(--admin-border) bg-(--admin-surface)">
      <div className="flex min-h-19 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <MobileSidebarDrawer />

          <div className="hidden h-11 w-full max-w-sm items-center gap-3 rounded-(--admin-radius-control) border border-(--admin-border) bg-(--admin-surface) px-3 text-(--admin-text-muted) shadow-(--shadow-subtle) md:flex">
            <Search className="h-5 w-5 shrink-0" />
            <span className="min-w-0 flex-1 truncate text-sm font-medium">
              Search content, pages, tags...
            </span>
            <span className="flex shrink-0 items-center gap-1 rounded-lg border border-(--admin-border) bg-(--admin-surface-elevated) px-2 py-1 text-xs font-semibold text-(--admin-text-muted)">
              <Command className="h-3.5 w-3.5" />
              K
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <button
            aria-label="Notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-(--admin-text-muted) transition-colors hover:bg-(--admin-surface-elevated) hover:text-(--admin-text)"
            type="button"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-(--admin-danger) px-1 text-[10px] font-semibold leading-none text-(--admin-surface)">
              0
            </span>
          </button>

          <button
            aria-label="Help"
            className="hidden h-10 w-10 items-center justify-center rounded-full text-(--admin-text-muted) transition-colors hover:bg-(--admin-surface-elevated) hover:text-(--admin-text) sm:flex"
            type="button"
          >
            <CircleHelp className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-(--admin-border) bg-(--admin-primary-soft) text-sm font-semibold text-(--admin-primary)">
              SC
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <span className="max-w-32 truncate text-sm font-semibold text-(--admin-text)">
                Sompong C.
              </span>
              <ChevronDown className="h-4 w-4 text-(--admin-text-muted)" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
