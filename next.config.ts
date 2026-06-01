import type { NextConfig } from "next";

export const LOCAL_DEVELOPMENT_ADMIN_API_BASE_URL = "http://127.0.0.1:8081";
const ADMIN_API_BASE_URL_ENV = "NEXT_PUBLIC_ADMIN_API_BASE_URL";

export function getUniqueCspSources(sources: Array<string | undefined>) {
  return Array.from(
    new Set(sources.filter((source): source is string => Boolean(source)))
  );
}

export function getAdminApiConnectOrigin(
  env: NodeJS.ProcessEnv = process.env
) {
  const apiBaseUrl = env[ADMIN_API_BASE_URL_ENV]?.trim();

  if (!apiBaseUrl) {
    if (env.NODE_ENV === "production") {
      throw new Error(
        `${ADMIN_API_BASE_URL_ENV} must be configured for production CSP connect-src.`
      );
    }

    return new URL(LOCAL_DEVELOPMENT_ADMIN_API_BASE_URL).origin;
  }

  let parsedUrl: URL;

  try {
    parsedUrl = new URL(apiBaseUrl);
  } catch {
    throw new Error(
      `${ADMIN_API_BASE_URL_ENV} must be a valid absolute http(s) URL.`
    );
  }

  if (!["http:", "https:"].includes(parsedUrl.protocol)) {
    throw new Error(`${ADMIN_API_BASE_URL_ENV} must use http or https.`);
  }

  if (parsedUrl.username || parsedUrl.password) {
    throw new Error(`${ADMIN_API_BASE_URL_ENV} must not include credentials.`);
  }

  return parsedUrl.origin;
}

export function getCspConnectSrc(env: NodeJS.ProcessEnv = process.env) {
  const sources = getUniqueCspSources([
    "'self'",
    getAdminApiConnectOrigin(env)
  ]);

  return `connect-src ${sources.join(" ")}`;
}

export function buildCspReportOnly(env: NodeJS.ProcessEnv = process.env) {
  return [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "form-action 'self'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    getCspConnectSrc(env),
    "script-src 'self'",
    "style-src 'self'"
  ].join("; ");
}

const cspReportOnly = buildCspReportOnly();

const securityHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff"
  },
  {
    key: "Referrer-Policy",
    value: "no-referrer"
  },
  {
    key: "X-Frame-Options",
    value: "DENY"
  },
  {
    key: "Permissions-Policy",
    value:
      "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()"
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin"
  },
  {
    key: "Cross-Origin-Resource-Policy",
    value: "same-origin"
  },
  {
    key: "Content-Security-Policy-Report-Only",
    value: cspReportOnly
  }
];

const noStoreHeaders = [
  {
    key: "Cache-Control",
    value: "no-store, max-age=0"
  }
];

const authSensitiveRouteSources = [
  "/",
  "/login",
  "/dashboard",
  "/dashboard/:path*",
  "/blog/:path*",
  "/tips/:path*",
  "/media/:path*",
  "/categories-tags/:path*",
  "/authors/:path*",
  "/revalidation-events/:path*",
  "/settings/:path*"
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        headers: securityHeaders,
        source: "/:path*"
      },
      ...authSensitiveRouteSources.map((source) => ({
        headers: noStoreHeaders,
        source
      }))
    ];
  }
};

export default nextConfig;
