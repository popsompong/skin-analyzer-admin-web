export const adminTaxonomyEndpoints = {
  authors: "/v1/admin/authors",
  categories: "/v1/admin/categories",
  tags: "/v1/admin/tags"
} as const;

export type TaxonomyItemPlaceholder = {
  id: string;
  label: string;
};
