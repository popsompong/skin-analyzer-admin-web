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
    <section>
      <PageHeader
        description={description}
        permission={permission}
        title={title}
      />
      <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-subtle)]">
        <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-sm font-semibold">Scaffold state</div>
            <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">
              {scaffoldState}
            </p>
          </div>
          <Badge variant="muted">No API call</Badge>
        </div>
        <Separator />
        <div className="p-5">
          <div className="text-sm font-semibold">Intentionally deferred</div>
          <ul className="mt-3 grid gap-2 text-sm text-[var(--text-secondary)] sm:grid-cols-2">
            {deferred.map((item) => (
              <li className="rounded-[var(--radius)] bg-[var(--surface-muted)] px-3 py-2" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
