import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { PERMISSIONS } from "@/lib/permissions/permissions";

export function AuthorsPlaceholder() {
  return (
    <PlaceholderPage
      deferred={["author forms", "avatar/media selection", "status controls"]}
      description="Placeholder for future author profile management."
      permission={PERMISSIONS.authorsManage}
      scaffoldState="Authors shell only. No author endpoint is called."
      title="Authors"
    />
  );
}
