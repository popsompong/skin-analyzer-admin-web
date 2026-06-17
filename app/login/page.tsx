"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { AdminApiClientError } from "@/lib/api/client";
import { getAdminMe, loginAdmin } from "@/lib/api/auth";
import {
  setAdminCsrfToken,
  setAdminRefreshCsrfToken
} from "@/lib/auth/csrf-token-store";
import {
  loginFormDefaultValues,
  loginFormSchema,
  type LoginFormValues
} from "@/lib/forms/login-form-schema";

function getLoginErrorMessage(error: unknown) {
  if (error instanceof AdminApiClientError) {
    if (error.status === 401) {
      return "Email or password is incorrect.";
    }

    return error.message;
  }

  return "Unable to reach the Admin Backend. Try again later.";
}

function LoginScanMark() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto flex size-18 items-center justify-center sm:size-24"
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
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register
  } = useForm<LoginFormValues>({
    defaultValues: loginFormDefaultValues,
    resolver: zodResolver(loginFormSchema)
  });

  useEffect(() => {
    let active = true;

    async function checkExistingSession() {
      try {
        const snapshot = await getAdminMe();

        if (active && snapshot.user) {
          setAdminCsrfToken(snapshot.csrfToken);
          setAdminRefreshCsrfToken(snapshot.refreshCsrfToken);
          router.replace("/dashboard");
          return;
        }

        if (active) {
          setIsCheckingSession(false);
        }
      } catch {
        if (active) {
          setIsCheckingSession(false);
        }
      }
    }

    void checkExistingSession();

    return () => {
      active = false;
    };
  }, [router]);

  const onSubmit = handleSubmit(async (values) => {
    setError(null);

    try {
      const snapshot = await loginAdmin({
        email: values.email,
        password: values.password
      });

      if (!snapshot.user) {
        setError("Sign in completed without a valid admin profile.");
        return;
      }

      setAdminCsrfToken(snapshot.csrfToken);
      setAdminRefreshCsrfToken(snapshot.refreshCsrfToken);
      router.replace("/dashboard");
      router.refresh();
    } catch (loginError) {
      setError(getLoginErrorMessage(loginError));
    }
  });

  const busy = isCheckingSession || isSubmitting;
  const emailError = errors.email?.message;
  const hasFieldErrors = Boolean(emailError || errors.password?.message);
  const passwordError = errors.password?.message;

  return (
    <main className="min-h-dvh bg-(--admin-bg) px-4 py-4 text-(--admin-text) sm:px-6 sm:py-6 lg:px-8">
      <section className="mx-auto flex min-h-[calc(100dvh-2rem)] w-full max-w-[400px] items-center justify-center sm:min-h-[calc(100dvh-3rem)]">
        <div className="w-full rounded-(--admin-radius-card) border border-(--admin-border) bg-(--admin-surface) px-5 py-6 shadow-(--admin-shadow-card) sm:px-7 sm:py-8 max-[360px]:px-4 max-[360px]:py-5">
          <div className="text-center">
            <LoginScanMark />
            <div className="mt-3 space-y-1.5 sm:mt-4 sm:space-y-2">
              <p className="text-xs font-semibold uppercase tracking-normal text-(--admin-selected-foreground)">
                ADMIN WEB
              </p>
              <h1 className="text-xl font-semibold tracking-normal text-(--admin-text) sm:text-2xl">
                Skin Analyzer
              </h1>
              <p className="text-xs font-medium text-(--admin-text-muted) sm:text-sm">
                Please sign in to your admin account
              </p>
            </div>
          </div>

          <div className="mt-5 sm:mt-7">
            <form
              aria-label="Admin sign in"
              className={hasFieldErrors ? "space-y-3" : "space-y-3 sm:space-y-4"}
              noValidate
              onSubmit={onSubmit}
            >
              <label className="block text-sm font-semibold text-(--admin-text)">
                Email
                <span className="relative mt-2 block">
                  <input
                    {...register("email")}
                    aria-describedby={emailError ? "login-email-error" : undefined}
                    aria-invalid={emailError ? "true" : "false"}
                    autoComplete="email"
                    className="h-11 w-full rounded-(--admin-radius-control) border border-(--admin-border) bg-(--admin-surface) px-4 text-sm font-medium text-(--admin-text) outline-none ring-offset-(--admin-surface) placeholder:text-(--admin-text-muted) focus-visible:ring-2 focus-visible:ring-(--admin-focus-ring)"
                    disabled={busy}
                    placeholder="you@example.com"
                    type="email"
                  />
                </span>
              </label>
              {emailError ? (
                <span
                  className="-mt-2 block text-xs font-semibold text-(--admin-danger)"
                  id="login-email-error"
                >
                  {emailError}
                </span>
              ) : null}

              <label className="block text-sm font-semibold text-(--admin-text)">
                Password
                <span className="relative mt-2 block">
                  <input
                    {...register("password")}
                    aria-describedby={
                      passwordError ? "login-password-error" : undefined
                    }
                    aria-invalid={passwordError ? "true" : "false"}
                    autoComplete="current-password"
                    className="h-11 w-full rounded-(--admin-radius-control) border border-(--admin-border) bg-(--admin-surface) px-4 pr-11 text-sm font-medium text-(--admin-text) outline-none ring-offset-(--admin-surface) placeholder:text-(--admin-text-muted) focus-visible:ring-2 focus-visible:ring-(--admin-focus-ring)"
                    disabled={busy}
                    placeholder="Enter password"
                    type={showPassword ? "text" : "password"}
                  />
                  <button
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                    className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-(--admin-radius-control) text-(--admin-text-muted) outline-none transition-colors duration-(--admin-motion-fast) hover:bg-(--admin-surface-elevated) hover:text-(--admin-text) focus-visible:ring-2 focus-visible:ring-(--admin-focus-ring) focus-visible:ring-offset-2 focus-visible:ring-offset-(--admin-surface) disabled:opacity-60"
                    disabled={busy}
                    onClick={() => setShowPassword((value) => !value)}
                    type="button"
                  >
                    {showPassword ? (
                      <EyeOff aria-hidden="true" size={17} />
                    ) : (
                      <Eye aria-hidden="true" size={17} />
                    )}
                  </button>
                </span>
              </label>
              {passwordError ? (
                <span
                  className="-mt-2 block text-xs font-semibold text-(--admin-danger)"
                  id="login-password-error"
                >
                  {passwordError}
                </span>
              ) : null}

              <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
                <label className="flex shrink-0 items-center gap-2 font-medium text-(--admin-text)">
                  <input
                    checked={rememberMe}
                    className="size-4 rounded border border-(--admin-border) bg-(--admin-surface) accent-(--admin-primary)"
                    disabled={busy}
                    onChange={(event) => setRememberMe(event.target.checked)}
                    type="checkbox"
                  />
                  Remember me
                </label>
                <button
                  className="shrink-0 font-semibold text-(--admin-selected-foreground) underline underline-offset-4 disabled:opacity-60"
                  disabled={busy}
                  type="button"
                >
                  Forgot password?
                </button>
              </div>

              {error ? (
                <div
                  className="rounded-(--admin-radius-control) border border-(--admin-danger) bg-(--admin-surface-elevated) px-3 py-2 text-sm font-medium text-(--admin-text)"
                  role="alert"
                >
                  {error}
                </div>
              ) : null}

              <Button
                aria-busy={busy}
                className="h-11 w-full rounded-(--admin-radius-control) bg-(--admin-primary) text-(--admin-action-foreground) hover:bg-(--admin-primary-hover)"
                disabled={busy}
                type="submit"
              >
                {busy ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="size-4 animate-spin rounded-full border-2 border-(--admin-action-foreground) border-t-transparent"
                    />
                    {isCheckingSession ? "Checking session" : "Signing in"}
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
