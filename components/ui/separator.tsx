import { cn } from "@/lib/format/class-names";

type SeparatorProps = {
  className?: string;
  orientation?: "horizontal" | "vertical";
};

export function Separator({
  className,
  orientation = "horizontal"
}: SeparatorProps) {
  return (
    <div
      aria-orientation={orientation}
      className={cn(
        "shrink-0 bg-(--border)",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className
      )}
      role="separator"
    />
  );
}
