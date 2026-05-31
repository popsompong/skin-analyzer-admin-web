import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  CalendarDays,
  CheckCircle2,
  FileText,
  ImageIcon,
  Lightbulb,
  Plus,
  RefreshCcw,
  ShieldCheck,
  UploadCloud
} from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PERMISSIONS } from "@/lib/permissions/permissions";

type StatusTone = "success" | "warning" | "danger" | "info" | "muted";
type AccentTone = "primary" | "cyan" | "violet" | "success" | "warning" | "danger";

type KpiItem = {
  label: string;
  value: string;
  change: string;
  comparison: string;
  icon: LucideIcon;
  tone: AccentTone;
};

const kpiItems: KpiItem[] = [
  {
    label: "Total Posts",
    value: "128",
    change: "+12.5%",
    comparison: "vs last 7 days",
    icon: FileText,
    tone: "primary"
  },
  {
    label: "Total Tips",
    value: "85",
    change: "+8.2%",
    comparison: "vs last 7 days",
    icon: Lightbulb,
    tone: "success"
  },
  {
    label: "Published",
    value: "96",
    change: "+11.3%",
    comparison: "vs last 7 days",
    icon: CheckCircle2,
    tone: "cyan"
  },
  {
    label: "Media Files",
    value: "342",
    change: "+4.7%",
    comparison: "vs last 7 days",
    icon: ImageIcon,
    tone: "violet"
  },
  {
    label: "Revalidations",
    value: "24",
    change: "-7.5%",
    comparison: "vs last 7 days",
    icon: RefreshCcw,
    tone: "danger"
  }
];

const recentPosts = [
  {
    title: "ทำความเข้าใจสภาพผิว 6 ประเภท",
    status: "Published",
    tone: "success" as const,
    author: "Sompong C.",
    updated: "May 30, 2026"
  },
  {
    title: "How to Build a Skincare Routine",
    status: "Published",
    tone: "success" as const,
    author: "Jane Smith",
    updated: "May 29, 2026"
  },
  {
    title: "Ingredient Spotlight: Niacinamide",
    status: "Draft",
    tone: "muted" as const,
    author: "Sompong C.",
    updated: "May 28, 2026"
  },
  {
    title: "เทคนิคเลือกกันแดดให้เหมาะกับผิว",
    status: "Review",
    tone: "warning" as const,
    author: "Anna Lee",
    updated: "May 27, 2026"
  },
  {
    title: "Skin Barrier คืออะไร? ทำไมสำคัญ",
    status: "Published",
    tone: "success" as const,
    author: "Sompong C.",
    updated: "May 26, 2026"
  }
];

const contentTypes = [
  { label: "Blog Posts", value: "128", share: "47%", tone: "primary" as const },
  { label: "Tips", value: "85", share: "31%", tone: "cyan" as const },
  { label: "Media", value: "342", share: "22%", tone: "violet" as const }
];

const quickActions = [
  { label: "New Blog Post", icon: Plus },
  { label: "New Tip", icon: Plus },
  { label: "Upload Media", icon: UploadCloud },
  { label: "View Revalidation Events", icon: ShieldCheck }
];

const revalidationStatus = [
  { label: "Pending", value: "2", tone: "warning" as const },
  { label: "Completed", value: "14", tone: "success" as const },
  { label: "Failed", value: "0", tone: "danger" as const }
];

const revalidationEvents = [
  {
    path: "/blog/skin-types-guide",
    status: "Completed",
    tone: "success" as const,
    time: "2m ago"
  },
  {
    path: "/tips/moisturiser-tips",
    status: "Completed",
    tone: "success" as const,
    time: "1h ago"
  },
  {
    path: "/blog/niacinamide-benefits",
    status: "Completed",
    tone: "success" as const,
    time: "2h ago"
  },
  {
    path: "/blog/sunscreen-guide",
    status: "In Progress",
    tone: "warning" as const,
    time: "3h ago"
  }
];

const accentText: Record<AccentTone, string> = {
  primary: "text-(--admin-primary)",
  cyan: "text-(--admin-accent-cyan)",
  violet: "text-(--admin-accent-violet)",
  success: "text-(--admin-success)",
  warning: "text-(--admin-warning)",
  danger: "text-(--admin-danger)"
};

const accentBg: Record<AccentTone, string> = {
  primary: "bg-(--admin-primary-soft)",
  cyan: "bg-(--admin-primary-soft)",
  violet: "bg-(--admin-surface-elevated)",
  success: "bg-(--admin-surface-elevated)",
  warning: "bg-(--admin-surface-elevated)",
  danger: "bg-(--admin-surface-elevated)"
};

const statusText: Record<StatusTone, string> = {
  success: "text-(--admin-success)",
  warning: "text-(--admin-warning)",
  danger: "text-(--admin-danger)",
  info: "text-(--admin-info)",
  muted: "text-(--admin-text-muted)"
};

function DashboardCard({
  title,
  action,
  children,
  className = ""
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`h-fit min-w-0 rounded-(--admin-radius-card) border border-(--admin-border) bg-(--admin-surface) p-5 shadow-(--admin-shadow-card) ${className}`}
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold tracking-normal text-(--admin-text)">
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function StatusBadge({ label, tone }: { label: string; tone: StatusTone }) {
  return (
    <Badge
      className={`border-transparent bg-(--admin-surface-elevated) ${statusText[tone]}`}
      variant="muted"
    >
      {label}
    </Badge>
  );
}

function Dot({ tone }: { tone: AccentTone }) {
  return <span className={`size-2.5 rounded-full ${accentText[tone]} bg-current`} />;
}

function KpiCard({ item }: { item: KpiItem }) {
  const Icon = item.icon;
  const isDanger = item.tone === "danger";

  return (
    <article className="min-w-0 rounded-(--admin-radius-card) border border-(--admin-border) bg-(--admin-surface) p-4 shadow-(--admin-shadow-card)">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-(--admin-text-muted)">{item.label}</p>
          <p className={`mt-3 text-3xl font-semibold tracking-normal ${isDanger ? "text-(--admin-text)" : accentText[item.tone]}`}>
            {item.value}
          </p>
        </div>
        <span
          className={`flex size-10 items-center justify-center rounded-(--admin-radius-control) border border-(--admin-border) ${accentBg[item.tone]} ${accentText[item.tone]}`}
        >
          <Icon aria-hidden="true" size={20} strokeWidth={2.2} />
        </span>
      </div>
      <div className="mt-5 flex flex-col items-start gap-2 text-xs font-semibold sm:flex-row sm:items-center sm:justify-between">
        <span className={isDanger ? "text-(--admin-danger)" : "text-(--admin-success)"}>
          {item.change}
        </span>
        <span className="text-(--admin-text-muted)">{item.comparison}</span>
      </div>
    </article>
  );
}

function DonutChart({
  type = "content"
}: {
  type?: "content" | "revalidation";
}) {
  const background =
    type === "content"
      ? "conic-gradient(var(--admin-primary) 0deg 170deg, var(--admin-accent-cyan) 170deg 250deg, var(--admin-accent-violet) 250deg 342deg, var(--admin-warning) 342deg 360deg)"
      : "conic-gradient(var(--admin-warning) 0deg 42deg, var(--admin-border) 42deg 360deg)";

  return (
    <div
      aria-hidden="true"
      className="relative size-28 shrink-0 rounded-full"
      style={{ background }}
    >
      <div className="absolute inset-7 rounded-full bg-(--admin-surface)" />
    </div>
  );
}

function ViewAllButton() {
  return (
    <Button size="sm" type="button" variant="secondary">
      View all
    </Button>
  );
}

export function DashboardPlaceholder() {
  return (
    <div className="min-w-0 space-y-6 overflow-hidden">
      <PageHeader
        description="Static dashboard rhythm for future content and publishing summaries. No backend reads are active."
        permission={PERMISSIONS.dashboardView}
        title="Dashboard"
      />

      <div className="flex min-w-0 flex-col items-start justify-between gap-3 rounded-(--admin-radius-card) border border-(--admin-border) bg-(--admin-surface) px-4 py-3 shadow-(--admin-shadow-card) sm:flex-row sm:items-center">
        <Badge variant="outline">Visual placeholder data</Badge>
        <div className="flex items-center gap-2 text-sm font-medium text-(--admin-text-muted)">
          <CalendarDays aria-hidden="true" size={16} />
          May 23 - May 30, 2026
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {kpiItems.map((item) => (
          <KpiCard item={item} key={item.label} />
        ))}
      </div>

      <div className="grid items-start gap-5 xl:grid-cols-12">
        <DashboardCard
          action={<ViewAllButton />}
          className="xl:col-span-6"
          title="Recent Posts"
        >
          <div className="hidden grid-cols-12 gap-3 px-2 pb-3 text-xs font-semibold uppercase tracking-normal text-(--admin-text-muted) sm:grid">
            <span className="col-span-5">Title</span>
            <span className="col-span-2">Status</span>
            <span className="col-span-2">Author</span>
            <span className="col-span-3 text-right">Updated</span>
          </div>
          <div className="space-y-2">
            {recentPosts.map((post) => (
              <div
                className="grid gap-3 rounded-(--admin-radius-control) border border-transparent bg-(--admin-surface) px-2 py-3 text-sm sm:grid-cols-12 sm:items-center sm:text-xs"
                key={post.title}
              >
                <div className="min-w-0 font-semibold leading-5 text-(--admin-text) sm:col-span-5 sm:truncate">
                  {post.title}
                </div>
                <div className="min-w-0 sm:col-span-2">
                  <StatusBadge label={post.status} tone={post.tone} />
                </div>
                <div className="min-w-0 truncate text-(--admin-text) sm:col-span-2">
                  {post.author}
                </div>
                <div className="min-w-0 text-(--admin-text-muted) sm:col-span-3 sm:text-right">
                  {post.updated}
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>

        <div className="grid gap-5 md:grid-cols-2 xl:col-span-3 xl:grid-cols-1">
          <DashboardCard title="Content by Type">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center xl:flex-col xl:items-start">
              <DonutChart />
              <div className="grid w-full gap-4">
                {contentTypes.map((item) => (
                  <div
                    className="grid grid-cols-[auto_1fr_auto] items-center gap-3"
                    key={item.label}
                  >
                    <Dot tone={item.tone} />
                    <span className="text-sm font-semibold text-(--admin-text) xl:text-xs">
                      {item.label}
                    </span>
                    <span className="text-sm font-semibold text-(--admin-text) xl:text-xs">
                      {item.value}{" "}
                      <span className="text-(--admin-text-muted)">({item.share})</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </DashboardCard>

          <DashboardCard action={<ViewAllButton />} title="Revalidation Status">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center xl:flex-col xl:items-start">
              <DonutChart type="revalidation" />
              <div className="grid w-full gap-4">
                {revalidationStatus.map((item) => (
                  <div
                    className="grid grid-cols-[auto_1fr_auto] items-center gap-3"
                    key={item.label}
                  >
                    <Dot tone={item.tone} />
                    <span className="text-sm font-semibold text-(--admin-text)">
                      {item.label}
                    </span>
                    <span className="text-sm font-semibold text-(--admin-text)">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </DashboardCard>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:col-span-3 xl:grid-cols-1">
          <DashboardCard title="Quick Actions">
            <div className="space-y-3">
              {quickActions.map((action) => {
                const Icon = action.icon;

                return (
                  <button
                    className="flex w-full items-center gap-3 rounded-(--admin-radius-control) border border-(--admin-border) bg-(--admin-surface) px-4 py-3 text-left text-sm font-semibold text-(--admin-text) transition-colors hover:bg-(--admin-surface-elevated)"
                    key={action.label}
                    type="button"
                  >
                    <Icon
                      aria-hidden="true"
                      className="text-(--admin-text-muted)"
                      size={18}
                    />
                    <span>{action.label}</span>
                  </button>
                );
              })}
            </div>
          </DashboardCard>

          <DashboardCard action={<ViewAllButton />} title="Latest Revalidation Events">
            <div className="space-y-2">
              {revalidationEvents.map((event) => (
                <div
                  className="grid gap-2 rounded-(--admin-radius-control) border border-transparent px-2 py-2 text-sm sm:grid-cols-[1fr_auto_auto] sm:items-center xl:grid-cols-1"
                  key={event.path}
                >
                  <span className="min-w-0 truncate font-semibold text-(--admin-text)">
                    {event.path}
                  </span>
                  <StatusBadge label={event.status} tone={event.tone} />
                  <span className="text-(--admin-text-muted) sm:text-right xl:text-left">
                    {event.time}
                  </span>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}
