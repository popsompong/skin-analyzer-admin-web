import { ContentPlaceholder } from "@/components/content/content-placeholder";
import { PERMISSIONS } from "@/lib/permissions/permissions";

type TipsPlaceholderProps = {
  mode: "list" | "create" | "edit";
};

const copy = {
  create: {
    title: "New tip draft",
    permission: PERMISSIONS.tipsCreate,
    scaffoldState: "Draft creation shell only. No editor blocks or save action.",
    description: "Placeholder for future Tips draft creation workflow."
  },
  edit: {
    title: "Edit tip",
    permission: PERMISSIONS.tipsUpdate,
    scaffoldState: "Edit shell only. No tip fetch, versioning, or publish action.",
    description: "Placeholder for future Tips edit workflow."
  },
  list: {
    title: "Tips",
    permission: PERMISSIONS.tipsView,
    scaffoldState: "List shell only. No table data or filters are wired.",
    description: "Placeholder for future Tips post management."
  }
};

export function TipsPlaceholder({ mode }: TipsPlaceholderProps) {
  const selected = copy[mode];

  return (
    <ContentPlaceholder
      deferred={[
        "real tips list",
        "controlled editor",
        "preview token",
        "publish/archive actions"
      ]}
      {...selected}
    />
  );
}
