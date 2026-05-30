import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-(--background) px-4 py-8 text-(--text-primary)">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md flex-col justify-center">
        <div className="rounded-(--radius) border border-(--border) bg-(--surface) p-6 shadow-(--shadow-subtle)">
          <div className="mb-6 space-y-2">
            <Badge variant="outline">Scaffold placeholder</Badge>
            <h1 className="text-2xl font-semibold">Admin sign in</h1>
            <p className="text-sm leading-6 text-(--text-secondary)">
              Login UI shell only. Real authentication, cookies, and CSRF wiring
              belong in a separate scoped task.
            </p>
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-medium">
              Email
              <input
                className="mt-2 w-full rounded-(--radius) border border-(--border) bg-(--surface-muted) px-3 py-2 text-sm text-(--text-secondary)"
                disabled
                placeholder="Not wired in scaffold"
              />
            </label>
            <label className="block text-sm font-medium">
              Password
              <input
                className="mt-2 w-full rounded-(--radius) border border-(--border) bg-(--surface-muted) px-3 py-2 text-sm text-(--text-secondary)"
                disabled
                placeholder="Not wired in scaffold"
                type="password"
              />
            </label>
            <Button className="w-full" disabled>
              Sign in is deferred
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
