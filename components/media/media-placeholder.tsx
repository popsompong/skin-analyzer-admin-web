import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { PERMISSIONS } from "@/lib/permissions/permissions";

export function MediaPlaceholder() {
  return (
    <PlaceholderPage
      deferred={["upload UI", "media grid", "asset detail", "usage hints"]}
      description="Placeholder for future media library and upload workflow."
      permission={PERMISSIONS.mediaView}
      scaffoldState="Media shell only. No upload or list endpoint is called."
      title="Media"
    />
  );
}
