export const adminContentEndpoints = {
  blog: "/v1/admin/content/blog",
  tips: "/v1/admin/content/tips"
} as const;

export type ContentPostType = "blog" | "tips";

export type ContentDraftPlaceholder = {
  id: string;
  type: ContentPostType;
  title: string;
  status: "draft" | "published" | "archived";
};
