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
  Layers3,
  Microscope,
  RadioTower,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  WandSparkles
} from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PERMISSIONS } from "@/lib/permissions/permissions";

type StatusTone = "success" | "warning" | "danger" | "info" | "muted";
type AccentTone =
  | "primary"
  | "cyan"
  | "violet"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "muted";

type KpiItem = {
  comparison: string;
  icon: LucideIcon;
  label: string;
  signal: string;
  tone: AccentTone;
  value: string;
};

const kpiItems: KpiItem[] = [
  {
    comparison: "7 high-priority items waiting for admin review",
    icon: ClipboardCheck,
    label: "Skin Insight Review Queue",
    signal: "+4 since yesterday",
    tone: "warning",
    value: "18"
  },
  {
    comparison: "Face, concern, and routine labels aligned",
    icon: Sparkles,
    label: "AI Scan Signal Coverage",
    signal: "94% mapped",
    tone: "cyan",
    value: "94%"
  },
  {
    comparison: "Blog and Tips items ready for publish QA",
    icon: Layers3,
    label: "Content Studio Pipeline",
    signal: "12 ready",
    tone: "primary",
    value: "37"
  },
  {
    comparison: "Public cache health over the last 24 hours",
    icon: RadioTower,
    label: "Publishing & Revalidation Health",
    signal: "0 failed",
    tone: "success",
    value: "99.2%"
  }
];

const commandSignals = [
  { label: "AI readiness", value: "94%", tone: "cyan" as const },
  { label: "Review queue", value: "18", tone: "warning" as const },
  { label: "Publish health", value: "99.2%", tone: "success" as const }
];

const insightQueue = [
  {
    detail: "Thai and English instructions need clinical copy parity.",
    label: "Skin type guidance copy",
    priority: "High",
    tone: "warning" as const,
    value: "6"
  },
  {
    detail: "Concern labels need consistency before public publishing.",
    label: "Concern taxonomy labels",
    priority: "Review",
    tone: "info" as const,
    value: "4"
  },
  {
    detail: "Face-scan language and AI caveats are ready for final read.",
    label: "AI scan glossary",
    priority: "Ready",
    tone: "success" as const,
    value: "3"
  },
  {
    detail: "Routine CTA wording should stay operational, not marketing-heavy.",
    label: "Routine recommendation copy",
    priority: "Editorial",
    tone: "muted" as const,
    value: "5"
  }
];

const qualitySignals = [
  { label: "Instruction clarity", value: 92, tone: "success" as const },
  { label: "Thai guidance parity", value: 88, tone: "cyan" as const },
  { label: "Safety caveat coverage", value: 96, tone: "success" as const },
  { label: "Over-claim risk", value: 8, tone: "warning" as const }
];

const scanSignalRows = [
  {
    label: "Face readiness education",
    status: "Stable",
    tone: "success" as const,
    value: "32 guides"
  },
  {
    label: "Skin concern taxonomy",
    status: "Needs review",
    tone: "warning" as const,
    value: "4 labels"
  },
  {
    label: "Routine recommendation flow",
    status: "Mapped",
    tone: "info" as const,
    value: "11 paths"
  }
];

const contentPipeline = [
  {
    label: "Clinical Content Quality",
    meta: "Drafts with scan-language caveats",
    tone: "success" as const,
    value: "21"
  },
  {
    label: "Content Studio Pipeline",
    meta: "Blog and Tips awaiting publish window",
    tone: "primary" as const,
    value: "12"
  },
  {
    label: "Media / Asset Health",
    meta: "Assets missing alt or usage context",
    tone: "warning" as const,
    value: "4"
  }
];

const revalidationEvents = [
  {
    path: "/blog/skin-types-guide",
    status: "Completed",
    time: "2m ago",
    tone: "success" as const
  },
  {
    path: "/tips/moisturiser-tips",
    status: "Completed",
    time: "1h ago",
    tone: "success" as const
  },
  {
    path: "/blog/niacinamide-benefits",
    status: "Queued",
    time: "2h ago",
    tone: "info" as const
  },
  {
    path: "/blog/sunscreen-guide",
    status: "Review",
    time: "3h ago",
    tone: "warning" as const
  }
];

const quickActions = [
  { icon: FileSearch, label: "Open review queue", meta: "Prioritize skin guidance" },
  { icon: UploadCloud, label: "Check media health", meta: "Resolve asset gaps" },
  { icon: RefreshCcw, label: "Inspect revalidation", meta: "Verify publishing flow" }
];

const assetHealthItems = [
  { icon: ImageIcon, label: "Media", tone: "primary" as const },
  { icon: Microscope, label: "Clinical", tone: "cyan" as const },
  { icon: WandSparkles, label: "AI copy", tone: "primary" as const }
];

const accentText: Record<AccentTone, string> = {
  cyan: "text-(--admin-accent-cyan)",
  danger: "text-(--admin-danger)",
  info: "text-(--admin-info)",
  muted: "text-(--admin-text-muted)",
  primary: "text-(--admin-primary)",
  success: "text-(--admin-success)",
  violet: "text-(--admin-accent-violet)",
  warning: "text-(--admin-warning)"
};

const accentBg: Record<AccentTone, string> = {
  cyan: "bg-(--admin-primary-soft)",
  danger: "bg-(--admin-surface-elevated)",
  info: "bg-(--admin-primary-soft)",
  muted: "bg-(--admin-surface-elevated)",
  primary: "bg-(--admin-primary-soft)",
  success: "bg-(--admin-surface-elevated)",
  violet: "bg-(--admin-surface-elevated)",
  warning: "bg-(--admin-surface-elevated)"
};

const statusText: Record<StatusTone, string> = {
  danger: "text-(--admin-danger)",
  info: "text-(--admin-info)",
  muted: "text-(--admin-text-muted)",
  success: "text-(--admin-success)",
  warning: "text-(--admin-warning)"
};

function DashboardCard({
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
      className={`h-fit min-w-0 rounded-(--admin-radius-card) border border-(--admin-border) bg-(--admin-surface) p-5 shadow-(--admin-shadow-card) ${className}`}
    >
      <div className="mb-5 flex items-start justify-between gap-3">
        <div className="min-w-0">
          {eyebrow ? (
            <div className="mb-1 text-xs font-semibold uppercase tracking-normal text-(--admin-primary)">
              {eyebrow}
            </div>
          ) : null}
          <h2 className="text-base font-semibold tracking-normal text-(--admin-text)">
            {title}
          </h2>
        </div>
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

  return (
    <article className="min-w-0 rounded-(--admin-radius-card) border border-(--admin-border) bg-(--admin-surface) p-4 shadow-(--admin-shadow-card)">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold leading-5 text-(--admin-text-muted)">
            {item.label}
          </p>
          <p className={`mt-3 text-3xl font-semibold tracking-normal ${accentText[item.tone]}`}>
            {item.value}
          </p>
        </div>
        <span
          className={`flex size-10 shrink-0 items-center justify-center rounded-(--admin-radius-control) border border-(--admin-border) ${accentBg[item.tone]} ${accentText[item.tone]}`}
        >
          <Icon aria-hidden="true" size={20} strokeWidth={2.2} />
        </span>
      </div>
      <div className="mt-5 space-y-1 text-xs font-semibold">
        <div className={accentText[item.tone]}>{item.signal}</div>
        <div className="leading-5 text-(--admin-text-muted)">{item.comparison}</div>
      </div>
    </article>
  );
}

function ScanMotif() {
  return (
    <div
      aria-hidden="true"
      className="relative flex size-32 shrink-0 items-center justify-center rounded-full border border-(--admin-border) bg-(--admin-surface)"
    >
      <div className="absolute inset-4 rounded-full border border-(--admin-primary-soft)" />
      <div className="absolute inset-x-8 top-3 h-5 border-l-2 border-r-2 border-t-2 border-(--admin-accent-cyan)" />
      <div className="absolute inset-x-8 bottom-3 h-5 border-b-2 border-l-2 border-r-2 border-(--admin-accent-cyan)" />
      <div className="absolute h-24 w-px bg-(--admin-accent-cyan)" />
      <div className="absolute size-20 rounded-full border border-(--admin-border) bg-(--admin-surface-elevated)" />
      <div className="absolute left-14 top-11 size-2 rounded-full bg-(--admin-primary)" />
      <div className="absolute right-12 top-13 size-2 rounded-full bg-(--admin-accent-cyan)" />
      <div className="absolute bottom-12 left-17 size-2 rounded-full bg-(--admin-accent-violet)" />
      <div className="absolute right-10 bottom-10 size-1.5 rounded-full bg-(--admin-success)" />
    </div>
  );
}

function QualityBar({
  label,
  tone,
  value
}: {
  label: string;
  tone: AccentTone;
  value: number;
}) {
  const barWidth = `${value}%`;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3 text-sm font-semibold">
        <span className="min-w-0 text-(--admin-text)">{label}</span>
        <span className={accentText[tone]}>{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-(--admin-surface-elevated)">
        <div
          className={`h-full rounded-full bg-current ${accentText[tone]}`}
          style={{ width: barWidth }}
        />
      </div>
    </div>
  );
}

function CommandCenterHero() {
  return (
    <section className="relative overflow-hidden rounded-(--admin-radius-card) border border-(--admin-border) bg-(--admin-surface) p-4 shadow-(--admin-shadow-card) sm:p-5 lg:p-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(circle at 78% 18%, color-mix(in srgb, var(--admin-accent-cyan) 16%, transparent), transparent 34%), radial-gradient(circle at 0% 0%, color-mix(in srgb, var(--admin-primary) 10%, transparent), transparent 30%)"
        }}
      />
      <div className="relative grid gap-6 lg:grid-cols-[1.35fr_0.65fr] lg:items-center">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="default">AI operations</Badge>
            <Badge variant="outline">Preview data</Badge>
          </div>
          <h2 className="mt-4 max-w-3xl text-2xl font-semibold tracking-normal text-(--admin-text) sm:text-3xl">
            AI Skin Analysis Control Center
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-(--admin-text-muted)">
            Track skin insight review, AI scan readiness, clinical content
            quality, media health, and publishing status from one admin
            workspace.
          </p>
          <div className="mt-5 grid gap-3 sm:mt-6 sm:grid-cols-3">
            {commandSignals.map((signal) => (
              <div
                className="min-w-0 border-l-2 border-(--admin-border) pl-3"
                key={signal.label}
              >
                <div className={`text-xl font-semibold ${accentText[signal.tone]}`}>
                  {signal.value}
                </div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-normal text-(--admin-text-muted)">
                  {signal.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden min-w-0 flex-col gap-5 sm:flex sm:flex-row sm:items-center lg:flex-col lg:items-start">
          <ScanMotif />
          <div className="min-w-0 space-y-3">
            <div className="text-sm font-semibold text-(--admin-text)">
              AI Scan Signals
            </div>
            <div className="space-y-2">
              {scanSignalRows.map((row) => (
                <div
                  className="grid min-w-0 grid-cols-[auto_1fr_auto] items-center gap-3 text-sm"
                  key={row.label}
                >
                  <Dot tone={row.tone} />
                  <span className="min-w-0 truncate font-medium text-(--admin-text)">
                    {row.label}
                  </span>
                  <StatusBadge label={row.status} tone={row.tone} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ViewAllButton() {
  return (
    <Button size="sm" type="button" variant="secondary">
      Review
      <ArrowRight aria-hidden="true" size={14} />
    </Button>
  );
}

export function DashboardPlaceholder() {
  return (
    <div className="min-w-0 space-y-6 overflow-hidden">
      <PageHeader
        description="Monitor review queues, AI scan signals, clinical content quality, media readiness, and publishing health for the Skin Analyzer admin workspace."
        permission={PERMISSIONS.dashboardView}
        title="AI Skin Analysis Operations"
      />

      <div className="flex min-w-0 flex-col items-start justify-between gap-3 rounded-(--admin-radius-card) border border-(--admin-border) bg-(--admin-surface) px-4 py-3 shadow-(--admin-shadow-card) sm:flex-row sm:items-center">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <Badge variant="outline">Protected workspace</Badge>
          <Badge variant="muted">Operations preview</Badge>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-(--admin-text-muted)">
          <CalendarDays aria-hidden="true" size={16} />
          May 23 - May 30, 2026
        </div>
      </div>

      <CommandCenterHero />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpiItems.map((item) => (
          <KpiCard item={item} key={item.label} />
        ))}
      </div>

      <div className="grid items-start gap-5 xl:grid-cols-12">
        <DashboardCard
          action={<ViewAllButton />}
          className="xl:col-span-7"
          eyebrow="Clinical review"
          title="Skin Insight Review Queue"
        >
          <div className="space-y-3">
            {insightQueue.map((item) => (
              <div
                className="grid gap-3 rounded-(--admin-radius-control) border border-(--admin-border) bg-(--admin-surface) px-3 py-3 sm:grid-cols-[auto_1fr_auto] sm:items-center"
                key={item.label}
              >
                <div className="flex size-10 items-center justify-center rounded-(--admin-radius-control) bg-(--admin-surface-elevated)">
                  <Dot tone={item.tone} />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="font-semibold text-(--admin-text)">
                      {item.label}
                    </div>
                    <StatusBadge label={item.priority} tone={item.tone} />
                  </div>
                  <p className="mt-1 text-sm leading-5 text-(--admin-text-muted)">
                    {item.detail}
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <div className={`text-2xl font-semibold ${accentText[item.tone]}`}>
                    {item.value}
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-normal text-(--admin-text-muted)">
                    items
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard
          className="xl:col-span-5"
          eyebrow="Quality gate"
          title="Clinical Content Quality"
        >
          <div className="space-y-5">
            {qualitySignals.map((signal) => (
              <QualityBar
                key={signal.label}
                label={signal.label}
                tone={signal.tone}
                value={signal.value}
              />
            ))}
          </div>
        </DashboardCard>

        <DashboardCard
          className="xl:col-span-4"
          eyebrow="Pipeline"
          title="Content Studio Pipeline"
        >
          <div className="space-y-3">
            {contentPipeline.map((item) => (
              <div
                className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-(--admin-radius-control) border border-(--admin-border) px-3 py-3"
                key={item.label}
              >
                <Dot tone={item.tone} />
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-(--admin-text)">
                    {item.label}
                  </div>
                  <div className="mt-1 truncate text-xs font-medium text-(--admin-text-muted)">
                    {item.meta}
                  </div>
                </div>
                <div className={`text-lg font-semibold ${accentText[item.tone]}`}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard
          className="xl:col-span-4"
          eyebrow="Assets"
          title="Media / Asset Health"
        >
          <div className="grid grid-cols-3 gap-3">
            {assetHealthItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  className="flex aspect-square min-w-0 flex-col items-center justify-center rounded-(--admin-radius-control) border border-(--admin-border) bg-(--admin-surface-elevated) text-center"
                  key={item.label}
                >
                  <Icon
                    aria-hidden="true"
                    className={accentText[item.tone]}
                    size={22}
                  />
                  <span className="mt-2 px-2 text-xs font-semibold leading-4 text-(--admin-text-muted)">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="font-semibold text-(--admin-text)">
                Approved scan assets
              </span>
              <span className="font-semibold text-(--admin-success)">24</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="font-semibold text-(--admin-text-muted)">
                Missing alt / usage context
              </span>
              <span className="font-semibold text-(--admin-warning)">4</span>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard
          action={<ViewAllButton />}
          className="xl:col-span-4"
          eyebrow="Publishing"
          title="Publishing & Revalidation Health"
        >
          <div className="space-y-3">
            {revalidationEvents.map((event) => (
              <div
                className="grid min-w-0 gap-2 rounded-(--admin-radius-control) border border-transparent px-2 py-2 text-sm sm:grid-cols-[1fr_auto_auto] sm:items-center xl:grid-cols-1"
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

      <DashboardCard eyebrow="Admin system" title="Admin System Health">
        <div className="grid gap-3 md:grid-cols-3">
          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <button
                className="flex min-w-0 items-center gap-3 rounded-(--admin-radius-control) border border-(--admin-border) bg-(--admin-surface) px-4 py-3 text-left transition-colors hover:bg-(--admin-surface-elevated)"
                key={action.label}
                type="button"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-(--admin-radius-control) bg-(--admin-primary-soft) text-(--admin-primary)">
                  <Icon aria-hidden="true" size={18} />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-(--admin-text)">
                    {action.label}
                  </span>
                  <span className="mt-1 block truncate text-xs font-medium text-(--admin-text-muted)">
                    {action.meta}
                  </span>
                </span>
                <ArrowRight
                  aria-hidden="true"
                  className="ml-auto shrink-0 text-(--admin-text-muted)"
                  size={16}
                />
              </button>
            );
          })}
          <div className="grid min-w-0 gap-2 rounded-(--admin-radius-control) border border-(--admin-border) bg-(--admin-surface-elevated) px-4 py-3 text-sm md:col-span-3 lg:grid-cols-3">
            <div className="flex items-center gap-2 font-semibold text-(--admin-success)">
              <CheckCircle2 aria-hidden="true" size={16} />
              Session protected
            </div>
            <div className="flex items-center gap-2 font-semibold text-(--admin-info)">
              <Gauge aria-hidden="true" size={16} />
              Preview metrics
            </div>
            <div className="flex items-center gap-2 font-semibold text-(--admin-primary)">
              <ShieldCheck aria-hidden="true" size={16} />
              Operational snapshot
            </div>
          </div>
        </div>
      </DashboardCard>
    </div>
  );
}
