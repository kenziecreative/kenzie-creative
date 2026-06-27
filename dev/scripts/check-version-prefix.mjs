#!/usr/bin/env node
// check-version-prefix.mjs
//
// Lints that every plugin's version is consistent across every place it
// appears. The marketplace card does not currently surface the `version`
// field — users see only the description — so each plugin's version is carried
// as a `v<X.Y.Z> — ` prefix in BOTH descriptions (plugin.json AND the catalog
// entry in .claude-plugin/marketplace.json). The browse cards render the
// CATALOG description, not plugin.json's, so a prefix only in plugin.json never
// shows where people actually look.
//
// Beyond those two descriptions, the version is also mirrored by hand in two
// human-facing indexes at the repo root, and this script now guards those too:
//   - README.md "Plugins at a glance" table (the Version column)
//   - AGENTS.md "Plugins (current versions)" list (the (X.Y.Z) after each name)
// A plugin missing from either index is also a failure — that catches the
// "forgot to register the new plugin" case the /new-plugin scaffold protects
// against. The single source of truth is plugin.json `version`; everything else
// must agree with it.
//
// See AGENTS.md → "Release & versioning" for the release loop and why this
// exists. This is a temporary UI workaround — when the marketplace card
// surfaces the version natively, strip the prefixes and delete this step.
//
// Run from the marketplace root:
//   node dev/scripts/check-version-prefix.mjs
//
// Exits 0 if every plugin and catalog entry matches, 1 otherwise.
// No dependencies — Node 18+.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "..", "..");

const candidates = readdirSync(repoRoot, { withFileTypes: true })
  .filter((e) => e.isDirectory() && !e.name.startsWith("."))
  .map((e) => e.name);

const plugins = candidates
  .map((name) => ({
    name,
    manifestPath: resolve(repoRoot, name, ".claude-plugin", "plugin.json"),
  }))
  .filter((p) => {
    try {
      return statSync(p.manifestPath).isFile();
    } catch {
      return false;
    }
  });

if (plugins.length === 0) {
  console.error("No plugins found under", repoRoot);
  process.exit(1);
}

const VERSION_PREFIX = /^v(\d+\.\d+\.\d+) — /;
let failures = 0;

for (const p of plugins) {
  let manifest;
  try {
    manifest = JSON.parse(readFileSync(p.manifestPath, "utf8"));
  } catch (e) {
    console.error(`FAIL  ${p.name}  could not parse plugin.json: ${e.message}`);
    failures += 1;
    continue;
  }
  const version = manifest.version;
  const description = manifest.description ?? "";
  const match = description.match(VERSION_PREFIX);

  if (!version) {
    console.error(`FAIL  ${p.name}  plugin.json has no version field`);
    failures += 1;
    continue;
  }
  if (!match) {
    console.error(
      `FAIL  ${p.name}  description does not start with 'v<X.Y.Z> — ' (version is ${version})`
    );
    failures += 1;
    continue;
  }
  if (match[1] !== version) {
    console.error(
      `FAIL  ${p.name}  description prefix v${match[1]} ≠ version field ${version}`
    );
    failures += 1;
    continue;
  }
  console.log(`OK    ${p.name}  v${version}`);
}

// --- catalog check: marketplace.json entry descriptions ---

const catalogPath = resolve(repoRoot, ".claude-plugin", "marketplace.json");
let catalog;
try {
  catalog = JSON.parse(readFileSync(catalogPath, "utf8"));
} catch (e) {
  console.error(`FAIL  marketplace.json  could not parse: ${e.message}`);
  process.exit(1);
}

const versionByName = new Map();
for (const p of plugins) {
  try {
    versionByName.set(
      p.name,
      JSON.parse(readFileSync(p.manifestPath, "utf8")).version
    );
  } catch {
    /* already reported above */
  }
}

for (const entry of catalog.plugins ?? []) {
  const version = versionByName.get(entry.name);
  if (!version) {
    console.error(
      `FAIL  catalog:${entry.name}  no plugin dir/manifest found for this entry`
    );
    failures += 1;
    continue;
  }
  const match = (entry.description ?? "").match(VERSION_PREFIX);
  if (!match) {
    console.error(
      `FAIL  catalog:${entry.name}  marketplace.json description missing 'v<X.Y.Z> — ' (plugin version is ${version})`
    );
    failures += 1;
    continue;
  }
  if (match[1] !== version) {
    console.error(
      `FAIL  catalog:${entry.name}  marketplace.json prefix v${match[1]} ≠ plugin version ${version}`
    );
    failures += 1;
    continue;
  }
  console.log(`OK    catalog:${entry.name}  v${version}`);
}

// --- root index checks: README table + AGENTS.md list ---
//
// Both mirror each plugin's version in a human-edited index. We assert the
// listed version matches plugin.json, and that no known plugin is absent.

function checkRootMirror({ label, file, rowRegex, nameGroup, versionGroup, missingHint }) {
  const path = resolve(repoRoot, file);
  let text;
  try {
    text = readFileSync(path, "utf8");
  } catch (e) {
    console.error(`FAIL  ${label}  could not read ${file}: ${e.message}`);
    failures += 1;
    return;
  }
  const found = new Set();
  for (const line of text.split("\n")) {
    const m = line.match(rowRegex);
    if (!m) continue;
    const name = m[nameGroup];
    if (!versionByName.has(name)) continue; // not a known plugin row
    const listed = m[versionGroup];
    const expected = versionByName.get(name);
    found.add(name);
    if (listed !== expected) {
      console.error(
        `FAIL  ${label}:${name}  ${file} lists v${listed} ≠ plugin version ${expected}`
      );
      failures += 1;
    } else {
      console.log(`OK    ${label}:${name}  v${listed}`);
    }
  }
  for (const name of versionByName.keys()) {
    if (!found.has(name)) {
      console.error(`FAIL  ${label}:${name}  not listed in ${missingHint}`);
      failures += 1;
    }
  }
}

// README row:  | Display Name | X.Y.Z | … | [guide](./<dir>/README.md) |
checkRootMirror({
  label: "readme",
  file: "README.md",
  rowRegex: /^\|[^|]*\|\s*(\d+\.\d+\.\d+)\s*\|.*\]\(\.\/([\w-]+)\/README\.md\)/,
  nameGroup: 2,
  versionGroup: 1,
  missingHint: "README.md 'Plugins at a glance' table",
});

// AGENTS row:  - **<dir>** (X.Y.Z) — …
checkRootMirror({
  label: "agents",
  file: "AGENTS.md",
  rowRegex: /^- \*\*([\w-]+)\*\* \((\d+\.\d+\.\d+)\)/,
  nameGroup: 1,
  versionGroup: 2,
  missingHint: "AGENTS.md 'Plugins (current versions)' list",
});

if (failures > 0) {
  console.error(`\n${failures} check(s) failed.`);
  process.exit(1);
}
console.log(
  `\nAll ${plugins.length} plugin(s) agree across plugin.json, the catalog, the README table, and the AGENTS list.`
);
