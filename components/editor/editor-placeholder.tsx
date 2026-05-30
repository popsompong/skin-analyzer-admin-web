import { Badge } from "@/components/ui/badge";

export function EditorPlaceholder() {
  return (
    <div className="rounded-(--radius) border border-dashed border-(--border) bg-(--surface) p-4">
      <Badge variant="outline">Editor deferred</Badge>
      <p className="mt-3 text-sm leading-6 text-(--text-secondary)">
        Future controlled block editor surface. No free canvas, drag/drop, custom
        CSS, or arbitrary JavaScript is included in Scaffold v1.
      </p>
    </div>
  );
}
