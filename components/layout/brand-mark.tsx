import { cn } from "@/lib/format/class-names";

type BrandMarkProps = {
  className?: string;
};

export function BrandMark({ className }: BrandMarkProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-(--admin-radius-control) border border-(--admin-sidebar-border) bg-(--admin-sidebar-elevated)",
        className
      )}
    >
      <svg
        className="h-11 w-11"
        fill="none"
        role="img"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13 22v-6a3 3 0 0 1 3-3h6M42 13h6a3 3 0 0 1 3 3v6M51 42v6a3 3 0 0 1-3 3h-6M22 51h-6a3 3 0 0 1-3-3v-6"
          stroke="var(--admin-accent-cyan)"
          strokeLinecap="round"
          strokeWidth="4"
        />
        <path
          d="M32 14c-9.2 0-15.5 7.6-15.5 18.2C16.5 43.1 22.8 50 32 50s15.5-6.9 15.5-17.8C47.5 21.6 41.2 14 32 14Z"
          fill="var(--admin-sidebar)"
          stroke="var(--admin-sidebar-text)"
          strokeOpacity=".74"
          strokeWidth="1.6"
        />
        <path
          d="M32 14c-9.2 0-15.5 7.6-15.5 18.2C16.5 43.1 22.8 50 32 50V14Z"
          fill="var(--admin-sidebar-text)"
          fillOpacity=".16"
        />
        <path
          d="M32 14c9.2 0 15.5 7.6 15.5 18.2C47.5 43.1 41.2 50 32 50V14Z"
          fill="var(--admin-primary)"
          fillOpacity=".24"
        />
        <path
          d="M32 15v34"
          stroke="var(--admin-accent-cyan)"
          strokeLinecap="round"
          strokeOpacity=".85"
          strokeWidth="1.7"
        />
        <path
          d="M22.5 29.4c1.8-1.5 4.6-1.5 6.3 0M35.4 29.4c1.7-1.5 4.6-1.5 6.2 0M28.5 39.6c2.1 1.5 5 1.5 7.1 0"
          stroke="var(--admin-sidebar-text)"
          strokeLinecap="round"
          strokeOpacity=".9"
          strokeWidth="1.8"
        />
        <path
          d="M38 23.5 43 28l-3 7 5 4.5M36.5 32.5l6.5-4.5M40 35l5 4.5"
          stroke="var(--admin-primary-soft)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity=".72"
          strokeWidth="1.2"
        />
        <circle cx="41.5" cy="27.7" fill="var(--admin-accent-cyan)" r="1.7" />
        <circle cx="39.2" cy="35.2" fill="var(--admin-accent-cyan)" r="1.5" />
        <circle cx="45.2" cy="39.4" fill="var(--admin-accent-cyan)" r="1.6" />
        <circle cx="36.5" cy="32.4" fill="var(--admin-primary-soft)" r="1.3" />
        <circle
          cx="24"
          cy="35"
          r="2.4"
          stroke="var(--admin-primary-soft)"
          strokeOpacity=".8"
          strokeWidth="1.3"
        />
      </svg>
    </div>
  );
}
