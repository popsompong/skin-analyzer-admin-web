import { describe, expect, it } from "vitest";
import nextConfig, {
  buildCspReportOnly,
  getAdminApiConnectOrigin,
  getCspConnectSrc,
  getUniqueCspSources,
  LOCAL_DEVELOPMENT_ADMIN_API_BASE_URL
} from "@/next.config";

function getHeaderMap(
  headers: Array<{
    key: string;
    value: string;
  }>
) {
  return new Map(headers.map((header) => [header.key, header.value]));
}

describe("Admin Web security headers", () => {
  it("adds baseline browser security headers to all routes", async () => {
    expect(nextConfig.headers).toBeDefined();

    const routes = await nextConfig.headers!();
    const globalRoute = routes.find((route) => route.source === "/:path*");

    expect(globalRoute).toBeDefined();

    const headers = getHeaderMap(globalRoute!.headers);

    expect(headers.get("X-Content-Type-Options")).toBe("nosniff");
    expect(headers.get("Referrer-Policy")).toBe("no-referrer");
    expect(headers.get("X-Frame-Options")).toBe("DENY");
    expect(headers.get("Permissions-Policy")).toContain("camera=()");
    expect(headers.get("Cross-Origin-Opener-Policy")).toBe("same-origin");
    expect(headers.get("Cross-Origin-Resource-Policy")).toBe("same-origin");
  });

  it("uses report-only CSP until nonce or hash enforcement is scoped", async () => {
    const routes = await nextConfig.headers!();
    const globalRoute = routes.find((route) => route.source === "/:path*");
    const headers = getHeaderMap(globalRoute!.headers);
    const csp = headers.get("Content-Security-Policy-Report-Only");

    expect(headers.get("Content-Security-Policy")).toBeUndefined();
    expect(headers.get("Strict-Transport-Security")).toBeUndefined();
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("connect-src 'self'");
  });

  it("derives CSP connect-src from the Admin API base URL origin", () => {
    const csp = buildCspReportOnly({
      NEXT_PUBLIC_ADMIN_API_BASE_URL:
        "https://admin-api.example.com/v1/admin?trace=false",
      NODE_ENV: "production"
    });

    expect(csp).toContain("connect-src 'self' https://admin-api.example.com");
    expect(csp).not.toContain("/v1/admin");
    expect(csp).not.toContain("trace=false");
  });

  it("deduplicates CSP source values", () => {
    expect(
      getUniqueCspSources([
        "'self'",
        "https://admin-api.example.com",
        "https://admin-api.example.com"
      ])
    ).toEqual(["'self'", "https://admin-api.example.com"]);
  });

  it("uses the local Admin Backend fallback outside production only", () => {
    expect(
      getCspConnectSrc({
        NODE_ENV: "development"
      })
    ).toBe(
      `connect-src 'self' ${new URL(LOCAL_DEVELOPMENT_ADMIN_API_BASE_URL).origin}`
    );

    expect(() =>
      getAdminApiConnectOrigin({
        NODE_ENV: "production"
      })
    ).toThrow("NEXT_PUBLIC_ADMIN_API_BASE_URL must be configured");
  });

  it("rejects invalid or credential-bearing Admin API base URLs", () => {
    expect(() =>
      getAdminApiConnectOrigin({
        NEXT_PUBLIC_ADMIN_API_BASE_URL: "not-a-url",
        NODE_ENV: "production"
      })
    ).toThrow("valid absolute http(s) URL");

    expect(() =>
      getAdminApiConnectOrigin({
        NEXT_PUBLIC_ADMIN_API_BASE_URL: "ftp://admin-api.example.com",
        NODE_ENV: "production"
      })
    ).toThrow("must use http or https");

    expect(() =>
      getAdminApiConnectOrigin({
        NEXT_PUBLIC_ADMIN_API_BASE_URL:
          "https://user:password@admin-api.example.com",
        NODE_ENV: "production"
      })
    ).toThrow("must not include credentials");
  });

  it("marks auth-sensitive pages as no-store without changing static asset routes", async () => {
    const routes = await nextConfig.headers!();
    const loginRoute = routes.find((route) => route.source === "/login");
    const dashboardRoute = routes.find((route) => route.source === "/dashboard");
    const staticRoute = routes.find((route) =>
      route.source.includes("_next/static")
    );

    expect(getHeaderMap(loginRoute!.headers).get("Cache-Control")).toBe(
      "no-store, max-age=0"
    );
    expect(getHeaderMap(dashboardRoute!.headers).get("Cache-Control")).toBe(
      "no-store, max-age=0"
    );
    expect(staticRoute).toBeUndefined();
  });
});
