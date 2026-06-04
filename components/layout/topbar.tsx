"use client";

import {
  Bell,
  ChevronDown,
  CircleHelp,
  Command,
  FileText,
  Image,
  LayoutDashboard,
  Lightbulb,
  LogOut,
  RefreshCcw,
  Search,
  Settings,
  SlidersHorizontal,
  UserCircle,
  X,
  type LucideIcon
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent
} from "react";
import { MobileSidebarDrawer } from "@/components/layout/sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/format/class-names";

type TopbarPanel = "command" | "notifications" | "profile";

type CommandItem = {
  description: string;
  icon: LucideIcon;
  label: string;
  scope: string;
};

const commandItems: CommandItem[] = [
  {
    description: "Open the protected admin overview.",
    icon: LayoutDashboard,
    label: "Dashboard",
    scope: "/dashboard"
  },
  {
    description: "Review editorial posts and drafts.",
    icon: FileText,
    label: "Blog",
    scope: "/blog"
  },
  {
    description: "Inspect short-form guidance content.",
    icon: Lightbulb,
    label: "Tips",
    scope: "/tips"
  },
  {
    description: "Check uploaded visual assets.",
    icon: Image,
    label: "Media",
    scope: "/media"
  },
  {
    description: "Review public cache and publish events.",
    icon: RefreshCcw,
    label: "Revalidation Events",
    scope: "/revalidation-events"
  },
  {
    description: "Open admin workspace configuration.",
    icon: Settings,
    label: "Settings",
    scope: "/settings"
  }
];

const notificationItems = [
  {
    detail: "Blog and Tips publish queue has 3 static preview items.",
    label: "Revalidation queued",
    meta: "2m ago",
    tone: "info"
  },
  {
    detail: "Media assets are waiting for alt text and usage context review.",
    label: "Media review",
    meta: "18m ago",
    tone: "warning"
  },
  {
    detail: "Skin guidance draft moved to editorial QA placeholder state.",
    label: "Content draft status",
    meta: "1h ago",
    tone: "success"
  }
] as const;

const profileItems = [
  { icon: UserCircle, label: "Profile", meta: "Account overview" },
  { icon: SlidersHorizontal, label: "Settings", meta: "Workspace preferences" },
  { icon: LogOut, label: "Sign out", meta: "Deferred action" }
] as const;

export function Topbar() {
  const [activePanel, setActivePanel] = useState<TopbarPanel | null>(null);
  const [commandQuery, setCommandQuery] = useState("");
  const [activeCommandIndex, setActiveCommandIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const commandInputRef = useRef<HTMLInputElement>(null);

  const commandOpen = activePanel === "command";
  const notificationsOpen = activePanel === "notifications";
  const profileOpen = activePanel === "profile";

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActivePanel(null);
      }
    }

    function handlePointerDown(event: PointerEvent) {
      if (
        activePanel !== "command" &&
        rootRef.current &&
        event.target instanceof Node &&
        !rootRef.current.contains(event.target)
      ) {
        setActivePanel(null);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [activePanel]);

  useEffect(() => {
    if (commandOpen) {
      commandInputRef.current?.focus();
    }
  }, [commandOpen]);

  function togglePanel(panel: TopbarPanel) {
    setActivePanel((current) => (current === panel ? null : panel));
  }

  function openCommand() {
    setActiveCommandIndex(0);
    setActivePanel("command");
  }

  function handleCommandKeyDown(
    event: ReactKeyboardEvent<HTMLInputElement | HTMLDivElement>
  ) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveCommandIndex((current) => (current + 1) % commandItems.length);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveCommandIndex(
        (current) => (current - 1 + commandItems.length) % commandItems.length
      );
    }

    if (event.key === "Home") {
      event.preventDefault();
      setActiveCommandIndex(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      setActiveCommandIndex(commandItems.length - 1);
    }

    if (event.key === "Escape") {
      setActivePanel(null);
    }
  }

  return (
    <>
      <header
        className="sticky top-0 z-30 border-b border-(--admin-topbar-border) bg-(--admin-topbar)"
        ref={rootRef}
      >
        <div className="flex min-h-19 items-center justify-between gap-2 px-4 sm:gap-3 sm:px-6 lg:px-8">
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-4">
            <MobileSidebarDrawer />

            <Button
              aria-controls="admin-topbar-command"
              aria-expanded={commandOpen}
              aria-haspopup="dialog"
              className={cn(
                "hidden h-11 w-full max-w-md justify-start gap-3 border-(--admin-topbar-border) bg-(--admin-dropdown) px-3 text-(--admin-text-muted) shadow-(--shadow-subtle) transition-[background-color,border-color,color,box-shadow,transform] duration-[var(--admin-motion-fast)] ease-[var(--admin-motion-ease)] ring-offset-(--admin-topbar) hover:bg-(--admin-dropdown-highlight) hover:text-(--admin-dropdown-highlight-foreground) focus-visible:ring-(--admin-command-focus) active:scale-[0.99] motion-reduce:transition-none motion-reduce:transform-none md:flex",
                commandOpen &&
                  "border-(--admin-command-focus) bg-(--admin-dropdown-highlight) text-(--admin-dropdown-highlight-foreground)"
              )}
              onClick={openCommand}
              type="button"
              variant="secondary"
            >
              <Search aria-hidden="true" className="h-5 w-5 shrink-0" />
              <span className="min-w-0 flex-1 truncate text-left text-sm font-medium">
                Search content, pages, tags...
              </span>
              <span className="flex shrink-0 items-center gap-1 rounded-lg border border-(--admin-topbar-border) bg-(--admin-surface-elevated) px-2 py-1 text-xs font-semibold text-(--admin-text-muted)">
                <Command aria-hidden="true" className="h-3.5 w-3.5" />
                K
              </span>
            </Button>
          </div>

          <div className="relative flex shrink-0 items-center gap-1.5 sm:gap-2">
            <Button
              aria-controls="admin-topbar-command"
              aria-expanded={commandOpen}
              aria-haspopup="dialog"
              aria-label="Open command search"
              className={cn(
                "transition-[background-color,color,box-shadow,transform] duration-[var(--admin-motion-fast)] ease-[var(--admin-motion-ease)] ring-offset-(--admin-topbar) focus-visible:ring-(--admin-command-focus) active:scale-95 motion-reduce:transition-none motion-reduce:transform-none md:hidden",
                commandOpen &&
                  "bg-(--admin-dropdown-highlight) text-(--admin-dropdown-highlight-foreground)"
              )}
              onClick={openCommand}
              size="icon"
              type="button"
              variant="ghost"
            >
              <Search aria-hidden="true" className="h-5 w-5" />
            </Button>

            <Button
              aria-controls="admin-topbar-notifications"
              aria-expanded={notificationsOpen}
              aria-haspopup="menu"
              aria-label="Notifications"
              className={cn(
                "relative transition-[background-color,color,box-shadow,transform] duration-[var(--admin-motion-fast)] ease-[var(--admin-motion-ease)] ring-offset-(--admin-topbar) focus-visible:ring-(--admin-command-focus) active:scale-95 motion-reduce:transition-none motion-reduce:transform-none",
                notificationsOpen &&
                  "bg-(--admin-dropdown-highlight) text-(--admin-dropdown-highlight-foreground)"
              )}
              onClick={() => togglePanel("notifications")}
              size="icon"
              type="button"
              variant="ghost"
            >
              <Bell aria-hidden="true" className="h-5 w-5" />
              <span className="absolute right-2 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-(--admin-notification-accent) px-1 text-[10px] font-semibold leading-none text-(--admin-action-foreground)">
                3
              </span>
            </Button>

            <Button
              aria-label="Help"
              className="hidden transition-[background-color,color,box-shadow,transform] duration-[var(--admin-motion-fast)] ease-[var(--admin-motion-ease)] ring-offset-(--admin-topbar) focus-visible:ring-(--admin-command-focus) active:scale-95 motion-reduce:transition-none motion-reduce:transform-none xl:inline-flex"
              size="icon"
              type="button"
              variant="ghost"
            >
              <CircleHelp aria-hidden="true" className="h-5 w-5" />
            </Button>

            <Button
              aria-controls="admin-topbar-profile"
              aria-expanded={profileOpen}
              aria-haspopup="menu"
              aria-label="Profile menu for Sompong C."
              className={cn(
                "h-10 gap-2 rounded-(--admin-radius-control) px-1.5 transition-[background-color,color,box-shadow,transform] duration-[var(--admin-motion-fast)] ease-[var(--admin-motion-ease)] ring-offset-(--admin-topbar) focus-visible:ring-(--admin-command-focus) active:scale-[0.98] motion-reduce:transition-none motion-reduce:transform-none sm:px-2",
                profileOpen &&
                  "bg-(--admin-dropdown-highlight) text-(--admin-dropdown-highlight-foreground)"
              )}
              onClick={() => togglePanel("profile")}
              type="button"
              variant="ghost"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-(--admin-topbar-border) bg-(--admin-primary-soft) text-xs font-semibold text-(--admin-primary)">
                SC
              </span>
              <span className="hidden min-w-0 items-center gap-2 sm:flex">
                <span className="max-w-32 truncate text-sm font-semibold text-(--admin-text)">
                  Sompong C.
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "h-4 w-4 shrink-0 text-(--admin-text-muted) transition-transform duration-[var(--admin-motion-fast)] ease-[var(--admin-motion-ease)] motion-reduce:transition-none motion-reduce:transform-none",
                    profileOpen && "rotate-180"
                  )}
                />
              </span>
            </Button>

            {notificationsOpen ? <NotificationsDropdown /> : null}
            {profileOpen ? <ProfileDropdown /> : null}
          </div>
        </div>
      </header>

      {commandOpen ? (
        <CommandPanel
          activeIndex={activeCommandIndex}
          inputRef={commandInputRef}
          onActiveIndexChange={setActiveCommandIndex}
          onClose={() => setActivePanel(null)}
          onKeyDown={handleCommandKeyDown}
          query={commandQuery}
          setQuery={setCommandQuery}
        />
      ) : null}
    </>
  );
}

function NotificationsDropdown() {
  return (
    <div
      aria-label="Notifications"
      className="admin-motion-dropdown-in absolute right-0 top-12 z-40 w-[min(calc(100vw-2rem),22rem)] overflow-hidden rounded-(--admin-radius-card) border border-(--admin-topbar-border) bg-(--admin-dropdown) text-(--admin-text) shadow-(--admin-shadow-card)"
      id="admin-topbar-notifications"
      role="menu"
    >
      <div className="flex items-start justify-between gap-3 px-4 py-4">
        <div>
          <div className="text-sm font-semibold">Notifications</div>
          <div className="mt-1 text-xs font-medium text-(--admin-text-muted)">
            Revalidation and content review
          </div>
        </div>
        <Badge className="bg-(--admin-notification-accent-soft) text-(--admin-dropdown-highlight-foreground)">
          3 new
        </Badge>
      </div>
      <Separator className="bg-(--admin-topbar-border)" />
      <div className="max-h-[21rem] overflow-y-auto p-2">
        {notificationItems.map((item) => (
          <button
            className="grid w-full grid-cols-[auto_1fr] gap-3 rounded-(--admin-radius-control) px-3 py-3 text-left transition-[background-color,color,box-shadow,transform] duration-[var(--admin-motion-fast)] ease-[var(--admin-motion-ease)] hover:bg-(--admin-dropdown-highlight) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--admin-command-focus) focus-visible:ring-offset-2 active:scale-[0.99] motion-reduce:transition-none motion-reduce:transform-none ring-offset-(--admin-dropdown)"
            key={item.label}
            role="menuitem"
            type="button"
          >
            <span
              className={cn(
                "mt-1 h-2.5 w-2.5 rounded-full",
                item.tone === "warning" && "bg-(--admin-warning)",
                item.tone === "success" && "bg-(--admin-success)",
                item.tone === "info" && "bg-(--admin-notification-accent)"
              )}
            />
            <span className="min-w-0">
              <span className="flex items-start justify-between gap-3">
                <span className="text-sm font-semibold text-(--admin-text)">
                  {item.label}
                </span>
                <span className="shrink-0 text-xs font-medium text-(--admin-text-muted)">
                  {item.meta}
                </span>
              </span>
              <span className="mt-1 block text-xs leading-5 text-(--admin-text-muted)">
                {item.detail}
              </span>
            </span>
          </button>
        ))}
      </div>
      <Separator className="bg-(--admin-topbar-border)" />
      <div className="px-4 py-3 text-xs font-semibold text-(--admin-primary)">
        Revalidation Events
      </div>
    </div>
  );
}

function ProfileDropdown() {
  return (
    <div
      aria-label="Profile menu"
      className="admin-motion-dropdown-in absolute right-0 top-12 z-40 w-[min(calc(100vw-2rem),20rem)] overflow-hidden rounded-(--admin-radius-card) border border-(--admin-topbar-border) bg-(--admin-dropdown) text-(--admin-text) shadow-(--admin-shadow-card)"
      id="admin-topbar-profile"
      role="menu"
    >
      <div className="flex items-center gap-3 px-4 py-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-(--admin-topbar-border) bg-(--admin-primary-soft) text-sm font-semibold text-(--admin-primary)">
          SC
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold">Sompong C.</div>
          <div className="mt-1 truncate text-xs font-medium text-(--admin-text-muted)">
            Super Admin
          </div>
        </div>
      </div>
      <Separator className="bg-(--admin-topbar-border)" />
      <div className="p-2">
        {profileItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              className="grid w-full grid-cols-[auto_1fr] items-center gap-3 rounded-(--admin-radius-control) px-3 py-3 text-left transition-[background-color,color,box-shadow,transform] duration-[var(--admin-motion-fast)] ease-[var(--admin-motion-ease)] hover:bg-(--admin-dropdown-highlight) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--admin-command-focus) focus-visible:ring-offset-2 active:scale-[0.99] motion-reduce:transition-none motion-reduce:transform-none ring-offset-(--admin-dropdown)"
              key={item.label}
              role="menuitem"
              type="button"
            >
              <Icon
                aria-hidden="true"
                className="h-4 w-4 text-(--admin-text-muted)"
              />
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold text-(--admin-text)">
                  {item.label}
                </span>
                <span className="mt-0.5 block truncate text-xs font-medium text-(--admin-text-muted)">
                  {item.meta}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CommandPanel({
  activeIndex,
  inputRef,
  onActiveIndexChange,
  onClose,
  onKeyDown,
  query,
  setQuery
}: {
  activeIndex: number;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onActiveIndexChange: (index: number) => void;
  onClose: () => void;
  onKeyDown: (event: ReactKeyboardEvent<HTMLInputElement | HTMLDivElement>) => void;
  query: string;
  setQuery: (value: string) => void;
}) {
  return (
    <div className="fixed inset-0 z-40 flex items-start justify-center px-4 py-20 sm:py-24">
      <button
        aria-label="Close command search backdrop"
        className="admin-motion-backdrop-in absolute inset-0 bg-(--admin-sidebar-drawer-backdrop)"
        onClick={onClose}
        type="button"
      />
      <div
        aria-label="Command search"
        className="admin-motion-panel-in relative w-[min(calc(100vw-2rem),42rem)] overflow-hidden rounded-(--admin-radius-card) border border-(--admin-topbar-border) bg-(--admin-dropdown) text-(--admin-text) shadow-(--admin-shadow-card)"
        id="admin-topbar-command"
        onKeyDown={onKeyDown}
        role="dialog"
      >
        <div className="flex items-center gap-3 px-4 py-4">
          <Search
            aria-hidden="true"
            className="h-5 w-5 shrink-0 text-(--admin-text-muted)"
          />
          <input
            aria-activedescendant={`admin-command-item-${activeIndex}`}
            aria-label="Search admin commands"
            aria-autocomplete="list"
            aria-controls="admin-command-list"
            aria-expanded="true"
            className="min-w-0 flex-1 bg-transparent text-sm font-medium text-(--admin-text) outline-none placeholder:text-(--admin-text-muted) focus-visible:outline-none"
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Type a command or search..."
            ref={inputRef}
            role="combobox"
            type="search"
            value={query}
          />
          <Button
            aria-label="Close command search"
            className="transition-[background-color,color,box-shadow,transform] duration-[var(--admin-motion-fast)] ease-[var(--admin-motion-ease)] ring-offset-(--admin-dropdown) focus-visible:ring-(--admin-command-focus) active:scale-95 motion-reduce:transition-none motion-reduce:transform-none"
            onClick={onClose}
            size="icon"
            type="button"
            variant="ghost"
          >
            <X aria-hidden="true" className="h-4 w-4" />
          </Button>
        </div>
        <Separator className="bg-(--admin-topbar-border)" />
        <div
          className="max-h-[min(28rem,calc(100vh-13rem))] overflow-y-auto p-2"
          id="admin-command-list"
          role="listbox"
        >
          {commandItems.map((item, index) => {
            const Icon = item.icon;
            const selected = index === activeIndex;

            return (
              <button
                aria-selected={selected}
                className={cn(
                  "grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 rounded-(--admin-radius-control) px-3 py-3 text-left transition-[background-color,border-color,color,box-shadow,transform] duration-[var(--admin-motion-fast)] ease-[var(--admin-motion-ease)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--admin-command-focus) focus-visible:ring-offset-2 active:scale-[0.99] motion-reduce:transition-none motion-reduce:transform-none ring-offset-(--admin-dropdown)",
                  selected
                    ? "bg-(--admin-command-highlight) text-(--admin-command-highlight-foreground)"
                    : "text-(--admin-text) hover:bg-(--admin-dropdown-highlight) hover:text-(--admin-dropdown-highlight-foreground)"
                )}
                id={`admin-command-item-${index}`}
                key={item.label}
                onFocus={() => onActiveIndexChange(index)}
                role="option"
                type="button"
              >
                <span
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-(--admin-radius-control) border transition-[background-color,border-color,color] duration-[var(--admin-motion-fast)] ease-[var(--admin-motion-ease)] motion-reduce:transition-none",
                    selected
                      ? "border-(--admin-command-highlight-foreground)"
                      : "border-(--admin-topbar-border) bg-(--admin-surface-elevated) text-(--admin-primary)"
                  )}
                >
                  <Icon aria-hidden="true" className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold">
                    {item.label}
                  </span>
                  <span
                    className={cn(
                      "mt-1 block truncate text-xs font-medium",
                      selected
                        ? "text-(--admin-command-highlight-foreground)"
                        : "text-(--admin-text-muted)"
                    )}
                  >
                    {item.description}
                  </span>
                </span>
                <span
                  className={cn(
                    "hidden rounded-full border px-2 py-1 text-xs font-semibold sm:inline-flex",
                    selected
                      ? "border-(--admin-command-highlight-foreground)"
                      : "border-(--admin-topbar-border) text-(--admin-text-muted)"
                  )}
                >
                  {item.scope}
                </span>
              </button>
            );
          })}
        </div>
        <Separator className="bg-(--admin-topbar-border)" />
        <div className="flex flex-wrap items-center gap-2 px-4 py-3 text-xs font-medium text-(--admin-text-muted)">
          <Badge variant="outline">Admin actions</Badge>
          <span>Dashboard, content, media, revalidation, and settings.</span>
        </div>
      </div>
    </div>
  );
}
