"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  AdminAuthProvider,
  useAdminAuth
} from "@/lib/auth/admin-auth-provider";

function AdminAuthGate({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { status } = useAdminAuth();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [router, status]);

  if (status === "authenticated") {
    return children;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-(--admin-bg) px-4 text-(--admin-text)">
      <div className="rounded-(--admin-radius-card) border border-(--admin-border) bg-(--admin-surface) px-5 py-4 text-sm font-medium text-(--admin-text-muted) shadow-(--admin-shadow-card)">
        Checking admin session...
      </div>
    </main>
  );
}

export function AdminAuthGuard({ children }: { children: ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminAuthGate>{children}</AdminAuthGate>
    </AdminAuthProvider>
  );
}
