import { Badge } from "@/components/ui/badge";

type PageHeaderProps = {
  title: string;
  description: string;
  permission?: string;
};

export function PageHeader({ title, description, permission }: PageHeaderProps) {
  return (
    <header className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
      <div className="max-w-3xl">
        <h1 className="text-2xl font-semibold tracking-normal">{title}</h1>
        <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
          {description}
        </p>
      </div>
      {permission ? <Badge variant="outline">{permission}</Badge> : null}
    </header>
  );
}
