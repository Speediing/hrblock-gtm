#!/usr/bin/env node
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const skipDirs = new Set([
  ".git",
  ".next",
  "node_modules",
  "out",
]);
const skipFiles = new Set([
  "package-lock.json",
  "scripts/scan-residue.mjs",
]);

const patterns = [
  /datadog/i,
  /seagate/i,
  /grokbot/i,
  /the agents that work while your reps sell/i,
  /sales outbound/i,
  /deal desk coordinator/i,
  /account research specialist/i,
  /renewal desk operator/i,
  /prospecting plan builder/i,
  /watercolor-(?:pad|room|deal|attach|orbit)\.(?:png|webp)/i,
  /#f5f1e8/i,
  /#20231f/i,
  /#6ebe49/i,
  /#3d6b28/i,
  /#fbf9f4/i,
  /#d8d3c8/i,
  /#632ca6/i,
  /#4c1d82/i,
  /#168c80/i,
  /#0a1119/i,
  /#101824/i,
];

const hits = [];

function shouldSkip(relativePath) {
  return skipFiles.has(relativePath) || relativePath.endsWith(".svg");
}

function walk(directory) {
  for (const entry of readdirSync(directory)) {
    const absolute = join(directory, entry);
    const rel = relative(root, absolute);
    if (skipDirs.has(entry) || rel.split("/").some((part) => skipDirs.has(part))) {
      continue;
    }
    const stats = statSync(absolute);
    if (stats.isDirectory()) {
      walk(absolute);
      continue;
    }
    if (shouldSkip(rel)) {
      continue;
    }
    const text = readFileSync(absolute, "utf8");
    for (const pattern of patterns) {
      if (pattern.test(text)) {
        hits.push(`${rel} matches ${pattern}`);
      }
    }
  }
}

walk(root);

if (hits.length > 0) {
  console.error("Residue scan failed:");
  for (const hit of hits) {
    console.error(`  ${hit}`);
  }
  process.exit(1);
}

console.log("Residue scan passed.");