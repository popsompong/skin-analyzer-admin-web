import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { PERMISSIONS } from "@/lib/permissions/permissions";

export function DashboardPlaceholder() {
  return (
    <PlaceholderPage
      deferred={[
        "analytics widgets",
        "content metrics",
        "revalidation health",
        "quick actions"
      ]}
      description="Admin overview route shell for future operational summaries."
      permission={PERMISSIONS.dashboardView}
      scaffoldState="Protected dashboard placeholder with no backend reads."
      title="Dashboard"
    />
  );
}
