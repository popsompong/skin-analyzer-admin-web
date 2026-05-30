import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function Topbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-[var(--border)] bg-[var(--surface)]">
      <div className="flex min-h-16 flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="min-w-0">
          <div className="text-xs font-medium uppercase tracking-normal text-[var(--text-secondary)] md:hidden">
            Skin Analyzer Admin
          </div>
          <p className="text-sm text-[var(--text-secondary)]">
            Scaffold foundation only. Real auth and data integration are deferred.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline">Private / noindex</Badge>
          <Separator className="hidden h-6 sm:block" orientation="vertical" />
          <span className="text-sm text-[var(--text-secondary)]">
            No active session
          </span>
        </div>
      </div>
    </header>
  );
}
