import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type PlaceholderPageProps = {
  title: string;
  description: string;
  permission?: string;
  scaffoldState: string;
  deferred: string[];
};

export function PlaceholderPage({
  title,
  description,
  permission,
  scaffoldState,
  deferred
}: PlaceholderPageProps) {
  return (
    <section className="space-y-6">
      <PageHeader
        description={description}
        permission={permission}
        title={title}
      />
      <div className="overflow-hidden rounded-(--admin-radius-card) border border-(--admin-border) bg-(--admin-surface) shadow-(--admin-shadow-card)">
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between sm:p-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-sm font-semibold text-(--admin-text)">
              <span className="h-2 w-2 rounded-full bg-(--admin-accent-cyan)" />
              Scaffold state
            </div>
            <p className="mt-2 text-sm leading-6 text-(--admin-text-muted)">
              {scaffoldState}
            </p>
          </div>
          <Badge variant="muted">No API call</Badge>
        </div>
        <Separator />
        <div className="bg-(--admin-surface-elevated) p-5 sm:p-6">
          <div className="text-sm font-semibold text-(--admin-text)">
            Intentionally deferred
          </div>
          <ul className="mt-4 grid gap-3 text-sm text-(--admin-text-muted) sm:grid-cols-2">
            {deferred.map((item) => (
              <li
                className="rounded-(--admin-radius-control) border border-(--admin-border) bg-(--admin-surface) px-3.5 py-3"
                key={item}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
