import { Badge } from "@/components/ui/badge";

type PageHeaderProps = {
  title: string;
  description: string;
  permission?: string;
};

export function PageHeader({ title, description, permission }: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div className="max-w-3xl">
        <div className="mb-2 text-xs font-semibold uppercase tracking-normal text-(--admin-primary)">
          Admin content studio
        </div>
        <h1 className="text-3xl font-semibold tracking-normal text-(--admin-text)">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-(--admin-text-muted)">
          {description}
        </p>
      </div>
      {permission ? (
        <div className="flex shrink-0 items-center">
          <Badge variant="outline">{permission}</Badge>
        </div>
      ) : null}
    </header>
  );
}
