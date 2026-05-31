import { AdminShell } from "@/components/layout/admin-shell";
import { AdminAuthGuard } from "@/lib/auth/admin-auth-guard";

export default function AdminLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AdminAuthGuard>
      <AdminShell>{children}</AdminShell>
    </AdminAuthGuard>
  );
}
