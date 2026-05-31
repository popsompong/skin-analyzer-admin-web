import { Eye, LifeBuoy, LockKeyhole, Mail, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";

function LoginScanMark() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto flex size-36 items-center justify-center sm:size-44"
    >
      <div className="absolute inset-1 rounded-full border border-(--admin-sidebar-border) opacity-70" />
      <div className="absolute inset-8 rounded-full border border-(--admin-primary) opacity-35" />
      <svg
        className="relative size-full"
        fill="none"
        role="img"
        viewBox="0 0 176 176"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M37 54V35a8 8 0 0 1 8-8h19M112 27h19a8 8 0 0 1 8 8v19M139 112v19a8 8 0 0 1-8 8h-19M64 139H45a8 8 0 0 1-8-8v-19"
          stroke="var(--admin-accent-cyan)"
          strokeLinecap="round"
          strokeWidth="7"
        />
        <path
          d="M88 32c-25.5 0-43.5 22-43.5 55.5C44.5 122.5 62 146 88 146s43.5-23.5 43.5-58.5C131.5 54 113.5 32 88 32Z"
          fill="var(--admin-sidebar)"
          stroke="var(--admin-sidebar-text)"
          strokeOpacity=".72"
          strokeWidth="2"
        />
        <path
          d="M88 32c-25.5 0-43.5 22-43.5 55.5C44.5 122.5 62 146 88 146V32Z"
          fill="var(--admin-sidebar-text)"
          fillOpacity=".22"
        />
        <path
          d="M88 32c25.5 0 43.5 22 43.5 55.5C131.5 122.5 114 146 88 146V32Z"
          fill="var(--admin-primary)"
          fillOpacity=".22"
        />
        <path
          d="M88 28v122"
          stroke="var(--admin-accent-cyan)"
          strokeLinecap="round"
          strokeWidth="2.8"
        />
        <path
          d="M60 82c6-5.5 15.5-5.5 21.5 0M95 82c6-5.5 15.5-5.5 21.5 0M78 114c6.2 4.8 14.5 4.8 20.7 0"
          stroke="var(--admin-sidebar-text)"
          strokeLinecap="round"
          strokeOpacity=".9"
          strokeWidth="3.2"
        />
        <path
          d="M103 57l18 15-10 20 17 17M101 89l20-17M111 92l17 17M98 112l13-20"
          stroke="var(--admin-primary-soft)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity=".74"
          strokeWidth="2.2"
        />
        <circle cx="121" cy="72" fill="var(--admin-accent-cyan)" r="4" />
        <circle cx="111" cy="92" fill="var(--admin-accent-cyan)" r="3.4" />
        <circle cx="128" cy="109" fill="var(--admin-accent-cyan)" r="3.8" />
        <circle cx="98" cy="112" fill="var(--admin-primary-soft)" r="3.2" />
        <circle
          cx="66"
          cy="101"
          r="6.4"
          stroke="var(--admin-primary-soft)"
          strokeOpacity=".8"
          strokeWidth="2.2"
        />
      </svg>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-(--admin-bg) px-4 py-6 text-(--admin-text) sm:px-6 lg:px-8">
      <section className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-md items-center justify-center">
        <div className="w-full overflow-hidden rounded-(--admin-radius-card) border border-(--admin-sidebar-border) bg-(--admin-sidebar) p-4 shadow-(--admin-shadow-card) sm:p-5">
          <div className="rounded-(--admin-radius-card) border border-(--admin-sidebar-border) bg-(--admin-sidebar-elevated) px-5 pb-5 pt-6 text-(--admin-sidebar-text) sm:px-6 sm:pb-6">
            <div className="text-center">
              <LoginScanMark />
              <div className="mt-2 space-y-1">
                <h1 className="text-3xl font-semibold tracking-normal text-(--admin-sidebar-text)">
                  Skin Analyzer
                </h1>
                <p className="text-xl font-medium text-(--admin-sidebar-text)">
                  Admin Web
                </p>
              </div>
              <div className="mt-7 space-y-2">
                <p className="text-2xl font-semibold tracking-normal">
                  Welcome back
                </p>
                <p className="text-sm font-medium text-(--admin-sidebar-muted)">
                  Please sign in to your account
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-(--admin-radius-card) border border-(--admin-sidebar-border) bg-(--admin-sidebar-elevated) p-4 shadow-(--admin-shadow-card) sm:p-5">
              <form className="space-y-4" aria-label="Visual-only admin sign in">
                <label className="block text-sm font-semibold text-(--admin-sidebar-text)">
                  Email
                  <span className="relative mt-2 block">
                    <input
                      className="h-11 w-full rounded-(--admin-radius-control) border border-(--admin-sidebar-border) bg-(--admin-sidebar) px-4 pr-11 text-sm font-medium text-(--admin-sidebar-text) outline-none ring-offset-(--admin-sidebar) placeholder:text-(--admin-sidebar-muted) focus-visible:ring-2 focus-visible:ring-(--admin-focus-ring)"
                      readOnly
                      type="email"
                      value="you@example.com"
                    />
                    <Mail
                      aria-hidden="true"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-(--admin-sidebar-muted)"
                      size={18}
                    />
                  </span>
                </label>

                <label className="block text-sm font-semibold text-(--admin-sidebar-text)">
                  Password
                  <span className="relative mt-2 block">
                    <input
                      className="h-11 w-full rounded-(--admin-radius-control) border border-(--admin-sidebar-border) bg-(--admin-sidebar) px-4 pr-11 text-sm font-medium text-(--admin-sidebar-text) outline-none ring-offset-(--admin-sidebar) placeholder:text-(--admin-sidebar-muted) focus-visible:ring-2 focus-visible:ring-(--admin-focus-ring)"
                      readOnly
                      type="password"
                      value="admin-ui"
                    />
                    <Eye
                      aria-hidden="true"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-(--admin-sidebar-muted)"
                      size={18}
                    />
                  </span>
                </label>

                <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
                  <span className="flex shrink-0 items-center gap-2 whitespace-nowrap font-medium text-(--admin-sidebar-text)">
                    <span className="size-4 rounded border border-(--admin-sidebar-border) bg-(--admin-sidebar)" />
                    Remember me
                  </span>
                  <span className="shrink-0 font-semibold text-(--admin-accent-cyan) underline underline-offset-4">
                    Forgot password?
                  </span>
                </div>

                <Button
                  className="h-11 w-full rounded-(--admin-radius-control) bg-(--admin-primary) text-(--admin-sidebar-text) hover:bg-(--admin-primary-hover)"
                  type="button"
                >
                  Sign in
                </Button>
              </form>

              <div className="mt-5 flex items-center justify-center gap-1.5 text-center text-sm font-medium text-(--admin-sidebar-muted)">
                <LifeBuoy aria-hidden="true" size={15} />
                <span>Need help? Contact</span>
                <span className="font-semibold text-(--admin-accent-cyan) underline underline-offset-4">
                  support
                </span>
              </div>
            </div>

            <div className="mt-5 hidden gap-2 text-xs font-medium text-(--admin-sidebar-muted) sm:grid sm:grid-cols-2">
              <div className="flex items-center gap-2 rounded-(--admin-radius-control) border border-(--admin-sidebar-border) bg-(--admin-sidebar) px-3 py-2">
                <ShieldCheck
                  aria-hidden="true"
                  className="text-(--admin-accent-cyan)"
                  size={16}
                />
                Private admin access
              </div>
              <div className="flex items-center gap-2 rounded-(--admin-radius-control) border border-(--admin-sidebar-border) bg-(--admin-sidebar) px-3 py-2">
                <LockKeyhole
                  aria-hidden="true"
                  className="text-(--admin-accent-cyan)"
                  size={16}
                />
                Auth wiring deferred
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
