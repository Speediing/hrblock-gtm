#!/usr/bin/env node
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const skipDirs = new Set([".git", ".next", "node_modules", "out"]);
const roots = ["src", "tests", "README.md"];
const hits = [];

function walk(directory) {
  for (const entry of readdirSync(directory)) {
    const absolute = join(directory, entry);
    const rel = relative(root, absolute);
    if (skipDirs.has(entry)) {
      continue;
    }
    const stats = statSync(absolute);
    if (stats.isDirectory()) {
      walk(absolute);
      continue;
    }
    if (!/\.(tsx?|jsx?|mjs|css|md)$/.test(entry)) {
      continue;
    }
    const text = readFileSync(absolute, "utf8");
    if (text.includes("\u2014")) {
      hits.push(rel);
    }
  }
}

for (const start of roots) {
  const absolute = join(root, start);
  try {
    const stats = statSync(absolute);
    if (stats.isDirectory()) {
      walk(absolute);
    } else if (readFileSync(absolute, "utf8").includes("\u2014")) {
      hits.push(start);
    }
  } catch {
    // optional path
  }
}

if (hits.length > 0) {
  console.error("Em-dash scan failed:");
  for (const hit of hits) {
    console.error(`  ${hit}`);
  }
  process.exit(1);
}

console.log("Em-dash scan passed.");