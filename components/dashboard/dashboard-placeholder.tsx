import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  Gauge,
  ImageIcon,
  Microscope,
  RadioTower,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  UploadCloud
} from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PERMISSIONS } from "@/lib/permissions/permissions";

type StatusTone = "success" | "warning" | "danger" | "info" | "neutral";
type AccentTone = "action" | "selected" | "success" | "warning" | "danger" | "info" | "neutral";

type MetricItem = {
  detail: string;
  icon: LucideIcon;
  label: string;
  signal: string;
  tone: AccentTone;
  value: string;
};

type QueueItem = {
  count: string;
  detail: string;
  label: string;
  owner: string;
  priority: string;
  tone: StatusTone;
};

const overviewSignals = [
  {
    label: "Review queue",
    value: "18",
    note: "7 high priority"
  },
  {
    label: "AI signal readiness",
    value: "94%",
    note: "Mapped to guidance"
  },
  {
    label: "Publishing health",
    value: "99.2%",
    note: "No failed events"
  }
];

const metricItems: MetricItem[] = [
  {
    detail: "Skin guidance, concern labels, and routine copy waiting for admin QA.",
    icon: ClipboardCheck,
    label: "Skin Content Review Queue",
    signal: "+4 since yesterday",
    tone: "warning",
    value: "18"
  },
  {
    detail: "Face-readiness, concern taxonomy, and routine flows have guidance coverage.",
    icon: Sparkles,
    label: "AI Scan Signal Readiness",
    signal: "12 signals mapped",
    tone: "action",
    value: "94%"
  },
  {
    detail: "Images and scan-support assets ready for Blog and Tips usage.",
    icon: ImageIcon,
    label: "Media Readiness",
    signal: "4 gaps remain",
    tone: "info",
    value: "86%"
  },
  {
    detail: "Static preview of publish and public-cache revalidation reliability.",
    icon: RadioTower,
    label: "Publishing / Revalidation",
    signal: "0 failed events",
    tone: "success",
    value: "99.2%"
  }
];

const reviewQueue: QueueItem[] = [
  {
    count: "6",
    detail: "Thai and English guidance need final meaning parity before publication.",
    label: "Face-readiness instruction copy",
    owner: "Clinical copy",
    priority: "High",
    tone: "warning"
  },
  {
    count: "4",
    detail: "Concern labels need wording consistency across Blog, Tips, and scan education.",
    label: "Skin concern taxonomy labels",
    owner: "Content ops",
    priority: "Review",
    tone: "info"
  },
  {
    count: "3",
    detail: "AI scan glossary items are ready for final admin read-through.",
    label: "AI signal glossary",
    owner: "Quality gate",
    priority: "Ready",
    tone: "success"
  },
  {
    count: "5",
    detail: "Routine recommendation copy should stay operational and clinically careful.",
    label: "Routine recommendation guidance",
    owner: "Editorial QA",
    priority: "Editorial",
    tone: "neutral"
  }
];

const qualitySignals = [
  { label: "Instruction clarity", note: "Admin guidance can be reviewed without guesswork.", tone: "success" as const, value: 92 },
  { label: "Thai guidance parity", note: "Localized wording maps to the same operational meaning.", tone: "action" as const, value: 88 },
  { label: "Safety caveat coverage", note: "Clinical caveats are present in scan-related content.", tone: "success" as const, value: 96 },
  { label: "Over-claim risk", note: "Lower is better; flagged copy remains limited.", tone: "warning" as const, value: 8 }
];

const signalReadinessRows = [
  {
    label: "Face readiness education",
    meta: "32 guidance entries",
    status: "Stable",
    tone: "success" as const
  },
  {
    label: "Concern taxonomy",
    meta: "4 labels in admin review",
    status: "Needs review",
    tone: "warning" as const
  },
  {
    label: "Routine recommendation paths",
    meta: "11 mapped preview paths",
    status: "Mapped",
    tone: "info" as const
  }
];

const mediaReadiness = [
  {
    icon: ImageIcon,
    label: "Approved scan assets",
    tone: "success" as const,
    value: "24"
  },
  {
    icon: UploadCloud,
    label: "Missing alt / usage context",
    tone: "warning" as const,
    value: "4"
  },
  {
    icon: Microscope,
    label: "Clinical reference images",
    tone: "action" as const,
    value: "18"
  }
];

const publishingEvents = [
  {
    path: "/blog/skin-types-guide",
    status: "Completed",
    summary: "Public cache refreshed after copy review.",
    time: "2m ago",
    tone: "success" as const
  },
  {
    path: "/tips/moisturiser-tips",
    status: "Completed",
    summary: "Tips page revalidated from static preview event.",
    time: "1h ago",
    tone: "success" as const
  },
  {
    path: "/blog/niacinamide-benefits",
    status: "Queued",
    summary: "Waiting for publish window confirmation.",
    time: "2h ago",
    tone: "info" as const
  },
  {
    path: "/blog/sunscreen-guide",
    status: "Review",
    summary: "Clinical caveat needs final approval.",
    time: "3h ago",
    tone: "warning" as const
  }
];

const quickActions = [
  {
    icon: FileSearch,
    label: "Open clinical review queue",
    meta: "Prioritize Thai guidance parity and concern labels."
  },
  {
    icon: UploadCloud,
    label: "Resolve media readiness gaps",
    meta: "Check missing alt text and usage context."
  },
  {
    icon: RefreshCcw,
    label: "Inspect revalidation events",
    meta: "Confirm queued publish previews before release."
  }
];

const systemTrustItems = [
  {
    icon: ShieldCheck,
    label: "Protected route",
    meta: "Dashboard remains behind AdminAuthGuard.",
    tone: "success" as const
  },
  {
    icon: Gauge,
    label: "Static preview data",
    meta: "No dashboard API read is performed in this sprint.",
    tone: "info" as const
  },
  {
    icon: CheckCircle2,
    label: "Shell preserved",
    meta: "Sidebar, drawer, rail, and topbar are unchanged.",
    tone: "action" as const
  }
];

const accentText: Record<AccentTone, string> = {
  action: "text-(--admin-action)",
  danger: "text-(--admin-danger)",
  info: "text-(--admin-info)",
  neutral: "text-(--admin-text-muted)",
  selected: "text-(--admin-selected-foreground)",
  success: "text-(--admin-success)",
  warning: "text-(--admin-warning)"
};

const accentBackground: Record<AccentTone, string> = {
  action: "bg-(--admin-selected)",
  danger: "bg-(--admin-surface-elevated)",
  info: "bg-(--admin-notification-accent-soft)",
  neutral: "bg-(--admin-surface-elevated)",
  selected: "bg-(--admin-selected)",
  success: "bg-(--admin-surface-elevated)",
  warning: "bg-(--admin-surface-elevated)"
};

const statusText: Record<StatusTone, string> = {
  danger: "text-(--admin-danger)",
  info: "text-(--admin-info)",
  neutral: "text-(--admin-text-muted)",
  success: "text-(--admin-success)",
  warning: "text-(--admin-warning)"
};

const dashboardType = {
  body:
    "text-[length:var(--admin-text-body)] leading-[var(--admin-leading-body)] text-(--admin-text-muted)",
  cardTitle:
    "text-[length:var(--admin-text-card-title)] leading-[var(--admin-leading-card-title)] font-semibold text-(--admin-text)",
  heroBody:
    "text-[length:var(--admin-text-hero-body)] leading-[var(--admin-leading-hero-body)] text-(--admin-text-muted)",
  heroTitle:
    "text-[length:var(--admin-text-hero-title)] leading-[var(--admin-leading-hero-title)] font-semibold tracking-normal text-(--admin-text)",
  label:
    "text-[length:var(--admin-text-label)] leading-[var(--admin-leading-label)] font-semibold",
  metric:
    "text-[length:var(--admin-text-metric)] leading-[var(--admin-leading-metric)] font-semibold tracking-normal",
  sectionTitle:
    "text-[length:var(--admin-text-section-title)] leading-[var(--admin-leading-section-title)] font-semibold tracking-normal text-(--admin-text)",
  statusLabel:
    "text-[length:var(--admin-text-caption)] leading-[var(--admin-leading-caption)] font-semibold"
} as const;

function DashboardPanel({
  action,
  children,
  className = "",
  eyebrow,
  title
}: {
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  eyebrow?: string;
  title: string;
}) {
  return (
    <section
      className={`min-w-0 rounded-(--admin-radius-card) border border-(--admin-border) bg-(--admin-surface) p-4 shadow-(--shadow-subtle) sm:p-5 ${className}`}
    >
      <div className="mb-4 flex min-w-0 items-start justify-between gap-4">
        <div className="min-w-0">
          {eyebrow ? (
            <p className={`${dashboardType.label} mb-1 uppercase tracking-normal text-(--admin-action)`}>
              {eyebrow}
            </p>
          ) : null}
          <h2 className={dashboardType.sectionTitle}>{title}</h2>
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
      {children}
    </section>
  );
}

function StatusBadge({ label, tone }: { label: string; tone: StatusTone }) {
  return (
    <Badge
      className={`border-transparent bg-(--admin-surface-elevated) ${dashboardType.statusLabel} ${statusText[tone]}`}
      variant="muted"
    >
      {label}
    </Badge>
  );
}

function SignalDot({ tone }: { tone: AccentTone }) {
  return (
    <span
      aria-hidden="true"
      className={`mt-1 size-2.5 shrink-0 rounded-full ${accentText[tone]} bg-current`}
    />
  );
}

function ReviewButton({ children = "Review" }: { children?: ReactNode }) {
  return (
    <Button size="sm" type="button" variant="secondary">
      {children}
      <ArrowRight aria-hidden="true" size={14} />
    </Button>
  );
}

function MetricCard({ item }: { item: MetricItem }) {
  const Icon = item.icon;

  return (
    <article className="min-w-0 rounded-(--admin-radius-card) border border-(--admin-border) bg-(--admin-surface) p-4 shadow-(--shadow-subtle) sm:p-5">
      <div className="flex min-w-0 items-start justify-between gap-3">
        <div className="min-w-0">
          <p className={`${dashboardType.metric} ${accentText[item.tone]}`}>
            {item.value}
          </p>
          <p className={`${dashboardType.cardTitle} mt-1`}>
            {item.label}
          </p>
        </div>
        <span
          className={`flex size-10 shrink-0 items-center justify-center rounded-(--admin-radius-control) border border-(--admin-border) ${accentBackground[item.tone]} ${accentText[item.tone]}`}
        >
          <Icon aria-hidden="true" size={20} strokeWidth={2.2} />
        </span>
      </div>
      <div className="mt-4 space-y-1">
        <p className={`${dashboardType.statusLabel} ${accentText[item.tone]}`}>
          {item.signal}
        </p>
        <p className={`${dashboardType.body} hidden sm:block`}>
          {item.detail}
        </p>
      </div>
    </article>
  );
}

function FaceScanSignal() {
  return (
    <div
      aria-label="Static AI scan readiness motif"
      className="relative hidden size-28 shrink-0 items-center justify-center rounded-full border border-(--admin-border) bg-(--admin-surface-elevated) sm:flex"
    >
      <span className="absolute inset-3 rounded-full border border-(--admin-selected)" />
      <span className="absolute inset-x-7 top-3 h-4 border-l-2 border-r-2 border-t-2 border-(--admin-action)" />
      <span className="absolute inset-x-7 bottom-3 h-4 border-b-2 border-l-2 border-r-2 border-(--admin-action)" />
      <span className="absolute h-20 w-px bg-(--admin-action)" />
      <span className="absolute size-16 rounded-full border border-(--admin-border) bg-(--admin-surface)" />
      <span className="absolute left-12 top-10 size-2 rounded-full bg-(--admin-action)" />
      <span className="absolute right-11 top-12 size-2 rounded-full bg-(--admin-info)" />
      <span className="absolute bottom-10 left-14 size-2 rounded-full bg-(--admin-success)" />
      <span className="absolute right-9 bottom-9 size-1.5 rounded-full bg-(--admin-warning)" />
    </div>
  );
}

function OverviewHero() {
  return (
    <section className="overflow-hidden rounded-(--admin-radius-card) border border-(--admin-border) bg-(--admin-surface) shadow-(--admin-shadow-card)">
      <div className="grid min-w-0 gap-4 p-4 sm:gap-5 sm:p-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.6fr)]">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="default">AI operations</Badge>
            <Badge className="hidden sm:inline-flex" variant="outline">
              Static preview data
            </Badge>
          </div>
          <h2 className={`${dashboardType.heroTitle} mt-3 max-w-2xl`}>
            Skin Analyzer snapshot.
          </h2>
          <p className={`${dashboardType.heroBody} mt-3 hidden max-w-3xl sm:block`}>
            Review clinical copy quality, AI scan readiness, media gaps, and
            publishing health without backend reads.
          </p>

          <div className="mt-4 grid min-w-0 gap-3 sm:mt-5 sm:grid-cols-3">
            {overviewSignals.map((signal) => (
              <div
                className="min-w-0 border-l-2 border-(--admin-selected) pl-3"
                key={signal.label}
              >
                <p className={`${dashboardType.metric} text-(--admin-action)`}>
                  {signal.value}
                </p>
                <p className={`${dashboardType.statusLabel} mt-1 uppercase tracking-normal text-(--admin-text-muted)`}>
                  {signal.label}
                </p>
                <p className={`${dashboardType.body} mt-1 hidden sm:block`}>
                  {signal.note}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden min-w-0 rounded-(--admin-radius-card) border border-(--admin-border) bg-(--admin-surface-elevated) p-3 sm:block sm:p-4">
          <div className="flex min-w-0 items-start gap-4">
            <FaceScanSignal />
            <div className="min-w-0">
              <p className={dashboardType.cardTitle}>
                AI scan signal board
              </p>
              <p className={`${dashboardType.body} mt-2 hidden sm:block`}>
                Preview-only readiness snapshot for guidance and content quality checks.
              </p>
            </div>
          </div>
          <Separator className="my-4 bg-(--admin-border)" />
          <div className="space-y-3">
            {signalReadinessRows.map((row) => (
              <div
                className="grid min-w-0 grid-cols-[auto_1fr] gap-3 text-sm"
                key={row.label}
              >
                <SignalDot tone={row.tone === "success" ? "success" : row.tone === "warning" ? "warning" : "info"} />
                <div className="min-w-0">
                  <div className="flex min-w-0 flex-wrap items-center gap-2">
                    <span className={`min-w-0 ${dashboardType.cardTitle}`}>
                      {row.label}
                    </span>
                    <StatusBadge label={row.status} tone={row.tone} />
                  </div>
                  <p className={`${dashboardType.body} mt-1`}>
                    {row.meta}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function QualityBar({
  label,
  note,
  tone,
  value
}: {
  label: string;
  note: string;
  tone: AccentTone;
  value: number;
}) {
  return (
    <div className="min-w-0 space-y-2">
      <div className="flex min-w-0 items-start justify-between gap-3">
        <div className="min-w-0">
          <p className={dashboardType.cardTitle}>{label}</p>
          <p className={`${dashboardType.body} mt-1`}>
            {note}
          </p>
        </div>
        <span className={`shrink-0 text-sm font-semibold leading-5 ${accentText[tone]}`}>
          {value}%
        </span>
      </div>
      <div
        aria-label={`${label}: ${value}%`}
        className="h-2 overflow-hidden rounded-full bg-(--admin-surface-elevated)"
        role="img"
      >
        <div
          className={`h-full rounded-full bg-current ${accentText[tone]}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export function DashboardPlaceholder() {
  return (
    <div className="min-w-0 space-y-5 overflow-hidden sm:space-y-6">
      <PageHeader
        description="Track review queues, AI signals, media, and publishing health using static preview data."
        permission={PERMISSIONS.dashboardView}
        title="AI Skin Analysis Operations"
      />

      <div className="hidden min-w-0 flex-col items-start justify-between gap-3 rounded-(--admin-radius-card) border border-(--admin-border) bg-(--admin-surface) px-4 py-3 shadow-(--shadow-subtle) sm:flex sm:flex-row sm:items-center">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <Badge variant="outline">Protected dashboard</Badge>
          <Badge variant="muted">No backend reads</Badge>
          <Badge variant="muted">Static operational preview</Badge>
        </div>
        <div className="flex min-w-0 items-center gap-2 text-sm font-medium text-(--admin-text-muted)">
          <CalendarDays aria-hidden="true" className="shrink-0" size={16} />
          <span className="min-w-0">Preview window: May 23 - May 30, 2026</span>
        </div>
      </div>

      <OverviewHero />

      <section aria-label="Dashboard operational metrics" className="grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
        {metricItems.map((item) => (
          <MetricCard item={item} key={item.label} />
        ))}
      </section>

      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-12">
        <DashboardPanel
          action={<ReviewButton />}
          className="xl:col-span-7"
          eyebrow="Content review"
          title="Skin / Content Review Queue"
        >
          <div className="divide-y divide-(--admin-border)">
            {reviewQueue.map((item) => (
              <div
                className="grid min-w-0 gap-3 py-4 first:pt-0 last:pb-0 sm:grid-cols-[auto_1fr_auto] sm:items-start"
                key={item.label}
              >
                <div className={`flex size-11 shrink-0 items-center justify-center rounded-(--admin-radius-control) ${accentBackground[item.tone === "info" ? "info" : item.tone === "success" ? "success" : item.tone === "warning" ? "warning" : "neutral"]} ${statusText[item.tone]}`}>
                  <span className="text-lg font-semibold">{item.count}</span>
                </div>
                <div className="min-w-0">
                  <div className="flex min-w-0 flex-wrap items-center gap-2">
                    <h3 className={dashboardType.cardTitle}>
                      {item.label}
                    </h3>
                    <StatusBadge label={item.priority} tone={item.tone} />
                  </div>
                  <p className={`${dashboardType.body} mt-1`}>
                    {item.detail}
                  </p>
                </div>
                <p className={`${dashboardType.statusLabel} text-(--admin-text-muted) sm:text-right`}>
                  {item.owner}
                </p>
              </div>
            ))}
          </div>
        </DashboardPanel>

        <DashboardPanel
          className="xl:col-span-5"
          eyebrow="AI readiness"
          title="Signal Readiness / Quality"
        >
          <div className="space-y-5">
            {qualitySignals.map((signal) => (
              <QualityBar
                key={signal.label}
                label={signal.label}
                note={signal.note}
                tone={signal.tone}
                value={signal.value}
              />
            ))}
          </div>
        </DashboardPanel>

        <DashboardPanel
          className="xl:col-span-4"
          eyebrow="Media readiness"
          title="Asset Health"
        >
          <div className="divide-y divide-(--admin-border)">
            {mediaReadiness.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  className="grid min-w-0 grid-cols-[auto_1fr_auto] items-center gap-3 py-3 first:pt-0 last:pb-0"
                  key={item.label}
                >
                  <span
                    className={`flex size-10 shrink-0 items-center justify-center rounded-(--admin-radius-control) ${accentBackground[item.tone]} ${accentText[item.tone]}`}
                  >
                    <Icon aria-hidden="true" size={18} />
                  </span>
                  <span className={`min-w-0 ${dashboardType.cardTitle}`}>
                    {item.label}
                  </span>
                  <span className={`text-lg font-semibold leading-6 ${accentText[item.tone]}`}>
                    {item.value}
                  </span>
                </div>
              );
            })}
          </div>
          <p className={`${dashboardType.body} mt-4 rounded-(--admin-radius-control) bg-(--admin-surface-elevated) px-3 py-2`}>
            Media data is a static dashboard preview; upload and library workflows remain deferred.
          </p>
        </DashboardPanel>

        <DashboardPanel
          action={<ReviewButton>Inspect</ReviewButton>}
          className="xl:col-span-4"
          eyebrow="Publishing"
          title="Revalidation Health"
        >
          <div className="space-y-4">
            {publishingEvents.map((event) => (
              <div className="grid min-w-0 grid-cols-[auto_1fr] gap-3" key={event.path}>
                <SignalDot tone={event.tone === "success" ? "success" : event.tone === "warning" ? "warning" : "info"} />
                <div className="min-w-0">
                  <div className="flex min-w-0 flex-wrap items-center gap-2">
                    <span className={`min-w-0 break-words ${dashboardType.cardTitle}`}>
                      {event.path}
                    </span>
                    <StatusBadge label={event.status} tone={event.tone} />
                  </div>
                  <p className={`${dashboardType.body} mt-1`}>
                    {event.summary}
                  </p>
                  <p className="mt-1 text-xs font-medium leading-4 text-(--admin-text-muted)">
                    {event.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </DashboardPanel>

        <DashboardPanel
          className="xl:col-span-4"
          eyebrow="Next moves"
          title="Quick Admin Actions"
        >
          <div className="space-y-2">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <button
                  className="group grid w-full min-w-0 grid-cols-[auto_1fr_auto] items-center gap-3 rounded-(--admin-radius-control) px-2 py-3 text-left transition-colors hover:bg-(--admin-surface-elevated) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--admin-focus-ring) focus-visible:ring-offset-2 ring-offset-(--admin-surface)"
                  key={action.label}
                  type="button"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-(--admin-radius-control) bg-(--admin-selected) text-(--admin-action)">
                    <Icon aria-hidden="true" size={18} />
                  </span>
                  <span className="min-w-0">
                    <span className={`block ${dashboardType.cardTitle}`}>
                      {action.label}
                    </span>
                    <span className={`${dashboardType.body} mt-1 block`}>
                      {action.meta}
                    </span>
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="shrink-0 text-(--admin-text-muted) transition-colors group-hover:text-(--admin-action)"
                    size={16}
                  />
                </button>
              );
            })}
          </div>
        </DashboardPanel>
      </div>

      <DashboardPanel eyebrow="Admin system trust" title="Operational Boundary">
        <div className="grid min-w-0 gap-3 md:grid-cols-3">
          {systemTrustItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                className="grid min-w-0 grid-cols-[auto_1fr] gap-3 rounded-(--admin-radius-control) bg-(--admin-surface-elevated) px-3 py-3"
                key={item.label}
              >
                <span className={`${accentText[item.tone]} mt-0.5 shrink-0`}>
                  <Icon aria-hidden="true" size={18} />
                </span>
                <span className="min-w-0">
                  <span className={`block ${dashboardType.cardTitle}`}>
                    {item.label}
                  </span>
                  <span className={`${dashboardType.body} mt-1 block`}>
                    {item.meta}
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      </DashboardPanel>
    </div>
  );
}
