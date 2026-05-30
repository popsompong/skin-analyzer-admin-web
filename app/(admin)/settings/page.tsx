import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { PERMISSIONS } from "@/lib/permissions/permissions";

export default function SettingsPage() {
  return (
    <PlaceholderPage
      deferred={[
        "theme preferences",
        "admin preferences",
        "safe operational settings"
      ]}
      description="Placeholder for future Admin Web settings."
      permission={PERMISSIONS.settingsManage}
      scaffoldState="Settings shell only. No settings endpoint is called."
      title="Settings"
    />
  );
}
