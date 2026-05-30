import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { PERMISSIONS } from "@/lib/permissions/permissions";

export function RevalidationPlaceholder() {
  return (
    <PlaceholderPage
      deferred={["event table", "event detail", "retry action", "failure detail"]}
      description="Placeholder for future public revalidation event inspection."
      permission={PERMISSIONS.revalidationRetry}
      scaffoldState="Revalidation shell only. No event endpoint is called."
      title="Revalidation events"
    />
  );
}
