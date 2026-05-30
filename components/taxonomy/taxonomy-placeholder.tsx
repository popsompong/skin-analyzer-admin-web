import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { PERMISSIONS } from "@/lib/permissions/permissions";

export function TaxonomyPlaceholder() {
  return (
    <PlaceholderPage
      deferred={["category forms", "tag forms", "validation", "archive controls"]}
      description="Placeholder for future categories and tags management."
      permission={PERMISSIONS.taxonomyManage}
      scaffoldState="Taxonomy shell only. No management endpoint is called."
      title="Categories and tags"
    />
  );
}
