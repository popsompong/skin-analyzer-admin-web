export const adminRevalidationEndpoints = {
  detail: (id: string) => `/v1/admin/revalidation-events/${id}`,
  list: "/v1/admin/revalidation-events",
  retry: (id: string) => `/v1/admin/revalidation-events/${id}/retry`
} as const;

export type RevalidationEventPlaceholder = {
  id: string;
  status: "pending" | "success" | "failed";
};
