import { ContentPlaceholder } from "@/components/content/content-placeholder";
import { PERMISSIONS } from "@/lib/permissions/permissions";

type BlogPlaceholderProps = {
  mode: "list" | "create" | "edit";
};

const copy = {
  create: {
    title: "New blog draft",
    permission: PERMISSIONS.blogCreate,
    scaffoldState: "Draft creation shell only. No editor blocks or save action.",
    description: "Placeholder for future Blog draft creation workflow."
  },
  edit: {
    title: "Edit blog post",
    permission: PERMISSIONS.blogUpdate,
    scaffoldState: "Edit shell only. No post fetch, versioning, or publish action.",
    description: "Placeholder for future Blog edit workflow."
  },
  list: {
    title: "Blog",
    permission: PERMISSIONS.blogView,
    scaffoldState: "List shell only. No table data or filters are wired.",
    description: "Placeholder for future Blog post management."
  }
};

export function BlogPlaceholder({ mode }: BlogPlaceholderProps) {
  const selected = copy[mode];

  return (
    <ContentPlaceholder
      deferred={[
        "real content list",
        "controlled editor",
        "preview token",
        "publish/archive actions"
      ]}
      {...selected}
    />
  );
}
