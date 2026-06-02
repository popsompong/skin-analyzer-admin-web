"use client";

import {
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject
} from "react";
import {
  Bell,
  BookOpenText,
  CheckCircle2,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  CircleAlert,
  FileText,
  FolderOpen,
  Image,
  LayoutDashboard,
  Lightbulb,
  LogOut,
  Menu,
  RefreshCcw,
  Search,
  Settings,
  ShieldCheck,
  Tags,
  UserPen,
  UsersRound,
  X,
  type LucideIcon
} from "lucide-react";

export type FluxSkyMockupState =
  | "default"
  | "hover-blog"
  | "focus-tips"
  | "collapsed"
  | "command-open"
  | "notifications-open"
  | "profile-open"
  | "drawer-open";

type AdminFluxSkyGoldenMockupProps = {
  initialState: FluxSkyMockupState;
};

type NavItem = {
  icon: LucideIcon;
  key: string;
  label: string;
};

const navGroups: Array<{ items: NavItem[]; label?: string }> = [
  {
    items: [{ icon: LayoutDashboard, key: "dashboard", label: "Dashboard" }]
  },
  {
    label: "CONTENT",
    items: [
      { icon: FileText, key: "blog", label: "Blog" },
      { icon: Lightbulb, key: "tips", label: "Tips" },
      { icon: Image, key: "media", label: "Media" },
      { icon: Tags, key: "categories-tags", label: "Categories & Tags" },
      { icon: UserPen, key: "authors", label: "Authors" }
    ]
  },
  {
    label: "OPERATIONS",
    items: [
      {
        icon: RefreshCcw,
        key: "revalidation-events",
        label: "Revalidation Events"
      }
    ]
  },
  {
    label: "SETTINGS",
    items: [{ icon: Settings, key: "settings", label: "Settings" }]
  }
];

const commandItems = [
  { icon: LayoutDashboard, label: "Dashboard", meta: "AI Skin Analysis overview" },
  { icon: FileText, label: "Blog", meta: "Content review queue" },
  { icon: Lightbulb, label: "Tips", meta: "Clinical copy quality" },
  { icon: Image, label: "Media", meta: "Media readiness gaps" },
  { icon: RefreshCcw, label: "Revalidation Events", meta: "Publishing health" }
];

const notificationItems = [
  {
    icon: CheckCircle2,
    label: "Content review ready",
    meta: "3 AI Skin Analysis drafts passed copy QA",
    time: "2 min ago",
    unread: true
  },
  {
    icon: CircleAlert,
    label: "Media readiness gap",
    meta: "4 assets need alt text before publish",
    time: "18 min ago",
    unread: true
  },
  {
    icon: RefreshCcw,
    label: "Revalidation queued",
    meta: "/tips/barrier-repair waiting for cache refresh",
    time: "1 hour ago",
    unread: false
  }
];

const kpis = [
  { label: "Review queue", value: "18", detail: "content items", tone: "warning" },
  { label: "Clinical copy quality", value: "92%", detail: "ready score", tone: "success" },
  { label: "Media readiness", value: "86%", detail: "assets complete", tone: "sky" },
  { label: "Publishing health", value: "99.2%", detail: "revalidation success", tone: "success" }
];

const reviewRows = [
  {
    label: "Skin type guidance copy",
    meta: "Thai and English instructions need clinical parity.",
    status: "High",
    tone: "warning"
  },
  {
    label: "Routine recommendation flow",
    meta: "AI Skin Analysis wording is ready for final review.",
    status: "Ready",
    tone: "success"
  },
  {
    label: "Media usage context",
    meta: "Content operations need missing asset labels.",
    status: "Review",
    tone: "sky"
  }
];

function cx(...classes: Array<false | null | string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function AdminFluxSkyGoldenMockup({
  initialState
}: AdminFluxSkyGoldenMockupProps) {
  const [collapsed, setCollapsed] = useState(initialState === "collapsed");
  const [drawerOpen, setDrawerOpen] = useState(initialState === "drawer-open");
  const [commandOpen, setCommandOpen] = useState(
    initialState === "command-open"
  );
  const [notificationsOpen, setNotificationsOpen] = useState(
    initialState === "notifications-open"
  );
  const [profileOpen, setProfileOpen] = useState(
    initialState === "profile-open"
  );
  const tipsRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (initialState === "focus-tips") {
      tipsRef.current?.focus();
    }
  }, [initialState]);

  const forcedHoverKey = initialState === "hover-blog" ? "blog" : undefined;
  const forcedFocusKey = initialState === "focus-tips" ? "tips" : undefined;

  const sidebar = useMemo(
    () => (
      <ConceptSidebar
        collapsed={collapsed}
        forcedFocusKey={forcedFocusKey}
        forcedHoverKey={forcedHoverKey}
        onCollapseToggle={() => setCollapsed((value) => !value)}
        tipsRef={tipsRef}
      />
    ),
    [collapsed, forcedFocusKey, forcedHoverKey]
  );

  return (
    <div className="min-h-screen bg-zinc-50 text-slate-950">
      <div className="flex min-h-screen">
        <div className="hidden lg:block">{sidebar}</div>
        <div className="flex min-w-0 flex-1 flex-col">
          <ConceptTopbar
            commandOpen={commandOpen}
            notificationsOpen={notificationsOpen}
            onCommandToggle={() => {
              setCommandOpen((value) => !value);
              setNotificationsOpen(false);
              setProfileOpen(false);
            }}
            onDrawerOpen={() => setDrawerOpen(true)}
            onNotificationsToggle={() => {
              setNotificationsOpen((value) => !value);
              setCommandOpen(false);
              setProfileOpen(false);
            }}
            onProfileToggle={() => {
              setProfileOpen((value) => !value);
              setCommandOpen(false);
              setNotificationsOpen(false);
            }}
            profileOpen={profileOpen}
          />
          <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-6">
            <DashboardPreview />
          </main>
        </div>
      </div>

      {drawerOpen ? (
        <div className="fixed inset-0 z-40 lg:hidden" data-mockup-state="drawer-open">
          <button
            aria-label="Close admin navigation backdrop"
            className="absolute inset-0 bg-slate-950/45"
            onClick={() => setDrawerOpen(false)}
            type="button"
          />
          <div className="absolute inset-y-0 left-0 w-65">
            <ConceptSidebar
              collapsed={false}
              forcedFocusKey={forcedFocusKey}
              forcedHoverKey={forcedHoverKey}
              isDrawer
              onCloseDrawer={() => setDrawerOpen(false)}
              tipsRef={tipsRef}
            />
          </div>
        </div>
      ) : null}

      {commandOpen ? <CommandOverlay onClose={() => setCommandOpen(false)} /> : null}
    </div>
  );
}

function ConceptSidebar({
  collapsed,
  forcedFocusKey,
  forcedHoverKey,
  isDrawer = false,
  onCloseDrawer,
  onCollapseToggle,
  tipsRef
}: {
  collapsed: boolean;
  forcedFocusKey?: string;
  forcedHoverKey?: string;
  isDrawer?: boolean;
  onCloseDrawer?: () => void;
  onCollapseToggle?: () => void;
  tipsRef: RefObject<HTMLAnchorElement | null>;
}) {
  return (
    <aside
      className={cx(
        "flex h-screen shrink-0 flex-col border-r border-slate-200 bg-zinc-50 text-slate-800",
        collapsed ? "w-17" : "w-65",
        isDrawer && "shadow-2xl shadow-slate-950/20"
      )}
    >
      <div
        className={cx(
          "flex h-16 items-center border-b border-slate-200",
          collapsed ? "justify-center px-2" : "justify-between px-4"
        )}
      >
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sky-600 text-white shadow-sm shadow-sky-600/20">
            <ShieldCheck aria-hidden="true" className="size-4" />
          </div>
          {!collapsed ? (
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-sky-700">
                Skin Analyzer
              </div>
              <div className="truncate text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                Admin Web
              </div>
            </div>
          ) : null}
        </div>

        {isDrawer ? (
          <button
            aria-label="Close sidebar"
            className="flex size-8 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            onClick={onCloseDrawer}
            type="button"
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        ) : null}
      </div>

      <nav
        aria-label="Golden mockup navigation"
        className={cx("min-h-0 flex-1 overflow-y-auto py-4", collapsed ? "px-2" : "px-3")}
      >
        {navGroups.map((group, groupIndex) => (
          <div className={groupIndex === 0 ? "" : "mt-5"} key={group.label ?? "root"}>
            {group.label && !collapsed ? (
              <div className="mb-2 flex h-7 items-center justify-between px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                <span>{group.label}</span>
                <ChevronDown aria-hidden="true" className="size-3.5" />
              </div>
            ) : null}
            <div className="space-y-1">
              {group.items.map((item) => (
                <SidebarNavItem
                  collapsed={collapsed}
                  forcedFocus={forcedFocusKey === item.key}
                  forcedHover={forcedHoverKey === item.key}
                  item={item}
                  key={item.key}
                  ref={item.key === "tips" ? tipsRef : undefined}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-slate-200 p-3">
        <div
          className={cx(
            "flex items-center rounded-2xl transition-colors hover:bg-slate-100",
            collapsed ? "justify-center p-1.5" : "gap-3 px-2 py-2"
          )}
        >
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sky-600 text-xs font-semibold text-white">
            SC
          </div>
          {!collapsed ? (
            <>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold text-slate-900">
                  Sompong C.
                </div>
                <div className="truncate text-xs text-slate-500">Super Admin</div>
              </div>
              <LogOut aria-hidden="true" className="size-4 shrink-0 text-slate-400" />
            </>
          ) : null}
        </div>
      </div>

      {!isDrawer && onCollapseToggle ? (
        <button
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="absolute top-20 z-10 hidden size-6 translate-x-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 lg:flex"
          onClick={onCollapseToggle}
          style={{ left: collapsed ? 56 : 248 }}
          type="button"
        >
          {collapsed ? (
            <ChevronsRight aria-hidden="true" className="size-3.5" />
          ) : (
            <ChevronsLeft aria-hidden="true" className="size-3.5" />
          )}
        </button>
      ) : null}
    </aside>
  );
}

const SidebarNavItem = forwardRef<HTMLAnchorElement, {
  collapsed: boolean;
  forcedFocus: boolean;
  forcedHover: boolean;
  item: NavItem;
}>(function SidebarNavItem({
  collapsed,
  forcedFocus,
  forcedHover,
  item
}, ref) {
  const Icon = item.icon;
  const active = item.key === "dashboard";

  return (
    <a
      aria-current={active ? "page" : undefined}
      className={cx(
        "group relative flex h-9 items-center gap-3 rounded-[1.125rem] text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50",
        collapsed ? "justify-center px-0" : "px-3",
        active
          ? "bg-sky-50 text-sky-700"
          : "text-slate-500 hover:bg-slate-100 hover:text-slate-900",
        forcedHover && !active && "bg-slate-100 text-slate-900",
        forcedFocus && "ring-2 ring-sky-500 ring-offset-2 ring-offset-zinc-50"
      )}
      href="#"
      ref={ref}
    >
      {active ? (
        <span className="absolute bottom-2 left-0 top-2 w-0.5 rounded-r-full bg-sky-500" />
      ) : null}
      <Icon
        aria-hidden="true"
        className={cx(
          "size-4 shrink-0",
          active ? "text-sky-600" : "text-slate-400 group-hover:text-slate-700",
          forcedHover && !active && "text-slate-700"
        )}
      />
      {!collapsed ? <span className="truncate">{item.label}</span> : null}
      {!collapsed && item.key === "revalidation-events" ? (
        <span className="ml-auto rounded-full bg-sky-600 px-1.5 py-0.5 text-[10px] font-semibold text-white">
          3
        </span>
      ) : null}
    </a>
  );
});

SidebarNavItem.displayName = "SidebarNavItem";

function ConceptTopbar({
  commandOpen,
  notificationsOpen,
  onCommandToggle,
  onDrawerOpen,
  onNotificationsToggle,
  onProfileToggle,
  profileOpen
}: {
  commandOpen: boolean;
  notificationsOpen: boolean;
  onCommandToggle: () => void;
  onDrawerOpen: () => void;
  onNotificationsToggle: () => void;
  onProfileToggle: () => void;
  profileOpen: boolean;
}) {
  return (
    <header className="sticky top-0 z-30 h-16 border-b border-slate-200 bg-white">
      <div className="flex h-full items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <button
            aria-label="Open menu"
            className="flex size-8 shrink-0 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 lg:hidden"
            onClick={onDrawerOpen}
            type="button"
          >
            <Menu aria-hidden="true" className="size-4" />
          </button>

          <button
            aria-expanded={commandOpen}
            className="hidden h-9 w-72 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 px-3 text-left text-sm text-slate-400 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 sm:flex"
            onClick={onCommandToggle}
            type="button"
          >
            <Search aria-hidden="true" className="size-4 shrink-0 text-slate-400" />
            <span className="min-w-0 flex-1 truncate">Search content, media, revalidation...</span>
          </button>
        </div>

        <div className="relative flex shrink-0 items-center gap-2">
          <button
            className="hidden h-8 items-center rounded-full bg-sky-600 px-3 text-xs font-semibold text-white shadow-sm shadow-sky-600/20 transition-colors hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 sm:inline-flex"
            type="button"
          >
            New Blog
          </button>
          <button
            aria-expanded={notificationsOpen}
            aria-label="Notifications"
            className={cx(
              "relative flex size-8 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500",
              notificationsOpen && "bg-sky-50 text-sky-700"
            )}
            onClick={onNotificationsToggle}
            type="button"
          >
            <Bell aria-hidden="true" className="size-4" />
            <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-sky-500 ring-2 ring-white" />
          </button>
          <button
            aria-expanded={profileOpen}
            aria-label="User menu"
            className="flex size-8 items-center justify-center rounded-full bg-sky-600 text-xs font-semibold text-white transition-colors hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
            onClick={onProfileToggle}
            type="button"
          >
            SC
          </button>

          {notificationsOpen ? <NotificationsDropdown /> : null}
          {profileOpen ? <ProfileDropdown /> : null}
        </div>
      </div>
    </header>
  );
}

function NotificationsDropdown() {
  return (
    <div className="absolute right-10 top-11 z-40 w-79 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-950/10">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <div className="text-sm font-semibold text-slate-950">Notifications</div>
        <span className="rounded-full bg-sky-100 px-2 py-0.5 text-xs font-semibold text-sky-700">
          3
        </span>
      </div>
      <div className="divide-y divide-slate-100">
        {notificationItems.map((item) => (
          <DropdownRow key={item.label}>
            <div className="flex items-start gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sky-600">
                <item.icon aria-hidden="true" className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <div className="truncate text-sm font-semibold text-slate-900">
                    {item.label}
                  </div>
                  {item.unread ? (
                    <span className="size-1.5 rounded-full bg-sky-500" />
                  ) : null}
                </div>
                <div className="mt-0.5 line-clamp-1 text-xs text-slate-500">
                  {item.meta}
                </div>
                <div className="mt-1 text-[11px] font-medium text-slate-400">
                  {item.time}
                </div>
              </div>
            </div>
          </DropdownRow>
        ))}
      </div>
      <button
        className="w-full border-t border-slate-200 px-4 py-3 text-center text-xs font-semibold text-sky-700 transition-colors hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-500"
        type="button"
      >
        View revalidation events
      </button>
    </div>
  );
}

function ProfileDropdown() {
  return (
    <div className="absolute right-0 top-11 z-40 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-950/10">
      <div className="border-b border-slate-200 px-4 py-3">
        <div className="text-sm font-semibold text-slate-950">Sompong C.</div>
        <div className="mt-0.5 text-xs text-slate-500">Super Admin</div>
      </div>
      <div className="py-1">
        <DropdownButton icon={Settings} label="Settings" />
        <DropdownButton icon={Bell} label="Notifications" pill="3" />
      </div>
      <div className="border-t border-slate-200 py-1">
        <DropdownButton icon={LogOut} label="Log out" />
      </div>
    </div>
  );
}

function DropdownRow({
  children
}: {
  children: ReactNode;
}) {
  return (
    <button
      className="block w-full bg-sky-50/60 px-4 py-3 text-left transition-colors hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-500"
      type="button"
    >
      {children}
    </button>
  );
}

function DropdownButton({
  icon: Icon,
  label,
  pill
}: {
  icon: LucideIcon;
  label: string;
  pill?: string;
}) {
  return (
    <button
      className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-slate-700 transition-colors hover:bg-sky-50 hover:text-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-500"
      type="button"
    >
      <Icon aria-hidden="true" className="size-4 text-slate-400" />
      <span className="min-w-0 flex-1">{label}</span>
      {pill ? (
        <span className="rounded-full bg-sky-100 px-1.5 py-0.5 text-[10px] font-semibold text-sky-700">
          {pill}
        </span>
      ) : null}
    </button>
  );
}

function CommandOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/45 px-4 pt-[22vh]">
      <button
        aria-label="Close command search backdrop"
        className="absolute inset-0"
        onClick={onClose}
        type="button"
      />
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-950/20">
        <div className="flex h-12 items-center gap-3 border-b border-slate-200 px-4">
          <Search aria-hidden="true" className="size-4 shrink-0 text-slate-400" />
          <input
            autoFocus
            className="min-w-0 flex-1 border-0 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
            placeholder="Type a command or search..."
          />
          <button
            aria-label="Close command search"
            className="flex size-7 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            onClick={onClose}
            type="button"
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        </div>
        <div className="px-2 py-2">
          <div className="px-2 pb-1 text-xs font-medium text-slate-500">Pages</div>
          {commandItems.map((item, index) => (
            <button
              className={cx(
                "flex h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500",
                index === 0
                  ? "bg-sky-600 text-white"
                  : "text-slate-700 hover:bg-sky-50 hover:text-sky-700"
              )}
              key={item.label}
              type="button"
            >
              <item.icon
                aria-hidden="true"
                className={cx("size-4 shrink-0", index === 0 ? "text-white" : "text-slate-400")}
              />
              <span className="min-w-0 flex-1 truncate">{item.label}</span>
              <span
                className={cx(
                  "hidden truncate text-xs sm:inline",
                  index === 0 ? "text-sky-100" : "text-slate-400"
                )}
              >
                {item.meta}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function DashboardPreview() {
  return (
    <div className="mx-auto flex w-full max-w-282 flex-col gap-5">
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm shadow-slate-950/5">
        <div className="grid gap-5 p-5 lg:grid-cols-[1.25fr_0.75fr] lg:p-6">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <StatusPill tone="sky">AI Skin Analysis</StatusPill>
              <StatusPill tone="neutral">Content operations</StatusPill>
            </div>
            <h1 className="mt-4 max-w-2xl text-2xl font-semibold tracking-normal text-slate-950 sm:text-3xl">
              Skin analysis content operations
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
              Monitor content review, media readiness, clinical copy quality,
              and publishing/revalidation health for Skin Analyzer admin work.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <SignalRow label="Clinical copy quality" value="92%" />
            <SignalRow label="Media readiness" value="86%" />
            <SignalRow label="Publishing health" value="99.2%" />
          </div>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((item) => (
          <KpiCard item={item} key={item.label} />
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-sky-700">
                Content review
              </div>
              <h2 className="mt-1 text-base font-semibold text-slate-950">
                Review queue
              </h2>
            </div>
            <button className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-sky-50 hover:text-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500">
              Review
            </button>
          </div>
          <div className="mt-4 space-y-3">
            {reviewRows.map((row) => (
              <div
                className="grid gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-3 sm:grid-cols-[auto_1fr_auto] sm:items-center"
                key={row.label}
              >
                <div className="flex size-10 items-center justify-center rounded-2xl bg-slate-50 text-sky-600">
                  <BookOpenText aria-hidden="true" className="size-4" />
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-slate-950">
                    {row.label}
                  </div>
                  <div className="mt-1 line-clamp-1 text-xs text-slate-500">
                    {row.meta}
                  </div>
                </div>
                <StatusPill tone={row.tone}>{row.status}</StatusPill>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
          <div className="text-xs font-semibold uppercase tracking-widest text-sky-700">
            Publishing
          </div>
          <h2 className="mt-1 text-base font-semibold text-slate-950">
            Revalidation events
          </h2>
          <div className="mt-4 space-y-3">
            <EventRow icon={RefreshCcw} label="/blog/skin-types-guide" status="Completed" />
            <EventRow icon={FolderOpen} label="/tips/barrier-repair" status="Queued" />
            <EventRow icon={UsersRound} label="Authors profile sync" status="Review" />
          </div>
        </section>
      </div>
    </div>
  );
}

function KpiCard({
  item
}: {
  item: { detail: string; label: string; tone: string; value: string };
}) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-950/5">
      <div className="text-sm font-semibold text-slate-500">{item.label}</div>
      <div
        className={cx(
          "mt-3 text-3xl font-semibold tracking-normal",
          item.tone === "sky" ? "text-sky-700" : "text-slate-950"
        )}
      >
        {item.value}
      </div>
      <div className="mt-2 text-xs font-medium text-slate-400">{item.detail}</div>
    </article>
  );
}

function SignalRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
      <div className="text-xl font-semibold text-sky-700">{value}</div>
      <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-slate-400">
        {label}
      </div>
    </div>
  );
}

function StatusPill({
  children,
  tone
}: {
  children: ReactNode;
  tone: string;
}) {
  return (
    <span
      className={cx(
        "inline-flex w-fit items-center rounded-full px-2.5 py-1 text-xs font-semibold",
        tone === "sky" && "bg-sky-50 text-sky-700",
        tone === "success" && "bg-emerald-50 text-emerald-700",
        tone === "warning" && "bg-amber-50 text-amber-700",
        tone === "neutral" && "bg-slate-100 text-slate-600"
      )}
    >
      {children}
    </span>
  );
}

function EventRow({
  icon: Icon,
  label,
  status
}: {
  icon: LucideIcon;
  label: string;
  status: string;
}) {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl border border-slate-200 px-3 py-3">
      <div className="flex size-9 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
        <Icon aria-hidden="true" className="size-4" />
      </div>
      <div className="min-w-0 truncate text-sm font-semibold text-slate-800">
        {label}
      </div>
      <span className="text-xs font-semibold text-slate-500">{status}</span>
    </div>
  );
}
