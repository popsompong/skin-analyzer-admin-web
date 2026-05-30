export const adminMediaEndpoints = {
  detail: (id: string) => `/v1/admin/media/${id}`,
  list: "/v1/admin/media",
  upload: "/v1/admin/media/upload"
} as const;

export type MediaAssetPlaceholder = {
  id: string;
  fileName: string;
  mimeType: string;
};
