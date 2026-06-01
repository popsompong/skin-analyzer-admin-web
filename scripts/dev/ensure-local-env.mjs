#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const DEFAULT_ADMIN_API_BASE_URL = "http://127.0.0.1:8081";
const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "../..");
const envLocalPath = join(repoRoot, ".env.local");
const envLocalExamplePath = join(repoRoot, ".env.local.example");
const apiBaseUrlLine = `NEXT_PUBLIC_ADMIN_API_BASE_URL=${DEFAULT_ADMIN_API_BASE_URL}`;

function writeLine(message) {
  process.stdout.write(`${message}\n`);
}

function ensureTrailingNewline(value) {
  return value.endsWith("\n") ? value : `${value}\n`;
}

function hasAdminApiBaseUrl(content) {
  return /^NEXT_PUBLIC_ADMIN_API_BASE_URL\s*=.+$/m.test(content);
}

function getAdminApiBaseUrl(content) {
  const match = content.match(/^NEXT_PUBLIC_ADMIN_API_BASE_URL\s*=\s*(.+)\s*$/m);

  return match?.[1]?.trim() || DEFAULT_ADMIN_API_BASE_URL;
}

if (!existsSync(envLocalPath)) {
  const source = existsSync(envLocalExamplePath)
    ? readFileSync(envLocalExamplePath, "utf8")
    : `${apiBaseUrlLine}\n`;

  writeFileSync(envLocalPath, ensureTrailingNewline(source), {
    encoding: "utf8",
    mode: 0o600
  });
  writeLine(`Created .env.local with ${apiBaseUrlLine}`);
} else {
  const current = readFileSync(envLocalPath, "utf8");

  if (hasAdminApiBaseUrl(current)) {
    writeLine(
      `Found NEXT_PUBLIC_ADMIN_API_BASE_URL=${getAdminApiBaseUrl(current)} in .env.local`
    );
  } else {
    const separator = current.endsWith("\n") || current.length === 0 ? "" : "\n";

    writeFileSync(envLocalPath, `${current}${separator}${apiBaseUrlLine}\n`, {
      encoding: "utf8",
      mode: 0o600
    });
    writeLine(`Added ${apiBaseUrlLine} to .env.local`);
  }
}

writeLine("Use Admin Web at http://127.0.0.1:3000 for local backend CORS.");
writeLine("Start local Admin Backend separately: make dev-up, then make dev-auth-smoke.");
writeLine("Admin Web env stores only public local defaults. Keep sensitive auth values outside this repo.");
