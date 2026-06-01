#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "../..");
const scanRoots = ["app", "components", "lib", "types", "tests", "test", "scripts"];
const allowedExtensions = new Set([
  ".js",
  ".jsx",
  ".mjs",
  ".ts",
  ".tsx"
]);
const ignoredDirectories = new Set([
  ".git",
  ".next",
  "coverage",
  "node_modules",
  "out",
  "playwright-report",
  "test-results"
]);

const blockedTerms = [
  {
    label: "raw HTML rendering prop",
    term: ["dangerously", "SetInner", "HTML"].join("")
  },
  {
    label: "direct HTML assignment",
    term: [".", "inner", "HTML"].join("")
  },
  {
    label: "direct HTML assignment",
    term: [".", "outer", "HTML"].join("")
  },
  {
    label: "direct HTML insertion",
    term: ["insert", "Adjacent", "HTML"].join("")
  },
  {
    label: "untrusted HTML parser",
    term: ["DOM", "Parser"].join("")
  },
  {
    label: "dynamic code evaluation",
    term: ["eval", "("].join("")
  },
  {
    label: "dynamic code construction",
    term: ["new ", "Function"].join("")
  },
  {
    label: "dynamic code construction",
    term: ["Function", "("].join("")
  },
  {
    label: "browser local token storage",
    term: ["local", "Storage"].join("")
  },
  {
    label: "raw session token identifier",
    term: ["session", "Token"].join("")
  },
  {
    label: "raw access token identifier",
    term: ["access", "Token"].join("")
  },
  {
    label: "JWT identifier",
    term: ["j", "w", "t"].join("")
  },
  {
    label: "next auth dependency",
    term: ["next", "-", "auth"].join("")
  },
  {
    label: "sensitive console logging",
    term: ["console", ".", "log", "("].join("")
  },
  {
    label: "sensitive console logging",
    term: ["console", ".", "error", "("].join("")
  }
];

function writeLine(message) {
  process.stdout.write(`${message}\n`);
}

function getExtension(filePath) {
  const match = filePath.match(/\.[^.]+$/);

  return match?.[0] ?? "";
}

function walkFiles(root) {
  const entries = readdirSync(root, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(root, entry.name);

    if (entry.isDirectory()) {
      if (!ignoredDirectories.has(entry.name)) {
        files.push(...walkFiles(fullPath));
      }

      continue;
    }

    if (entry.isFile() && allowedExtensions.has(getExtension(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

function getLineNumber(content, index) {
  return content.slice(0, index).split("\n").length;
}

const violations = [];
const files = scanRoots
  .map((root) => join(repoRoot, root))
  .filter((root) => existsSync(root) && statSync(root).isDirectory())
  .flatMap(walkFiles);

for (const filePath of files) {
  const relativePath = relative(repoRoot, filePath);

  if (relativePath === "scripts/security/check-frontend-security.mjs") {
    continue;
  }

  const content = readFileSync(filePath, "utf8");

  for (const blocked of blockedTerms) {
    const matchIndex = content.indexOf(blocked.term);

    if (matchIndex >= 0) {
      violations.push({
        file: relativePath,
        label: blocked.label,
        line: getLineNumber(content, matchIndex)
      });
    }
  }
}

if (violations.length > 0) {
  writeLine("Frontend security static checks failed:");

  for (const violation of violations) {
    writeLine(`${violation.file}:${violation.line} ${violation.label}`);
  }

  process.exit(1);
}

writeLine("Frontend security static checks passed.");
