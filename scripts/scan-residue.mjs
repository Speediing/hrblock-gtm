import { readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const scriptPath = resolve(import.meta.filename);
const lockPath = resolve(root, "package-lock.json");
const roots = [
  "src",
  "public",
  "scripts",
  "README.md",
  "package.json",
  ".env.example",
  "next.config.ts",
  "postcss.config.mjs",
  "tsconfig.json",
  "eslint.config.mjs",
];
const textExtensions = new Set([
  "",
  ".css",
  ".html",
  ".js",
  ".json",
  ".md",
  ".mjs",
  ".svg",
  ".ts",
  ".tsx",
  ".wgsl",
]);
const patterns = [
  { label: "prior customer name", regex: /datadog/i },
  { label: "prior customer domain", regex: /datadoghq\.(?:com|dev)/i },
  { label: "prior purple token", regex: /#(?:632ca6|4c1d82)/i },
  {
    label: "prior customer brand asset",
    regex: /public\/brand\/(?:dd_|watercolor-)/i,
  },
  {
    label: "prior customer demo media",
    regex: /(?:private|public)\/media\/krista-clips/i,
  },
  {
    label: "prior customer page art",
    regex: /public\/media\/where-cursor-fits/i,
  },
];

function filesAt(path) {
  const stat = statSync(path);
  if (stat.isFile()) return [path];
  return readdirSync(path, { withFileTypes: true }).flatMap((entry) =>
    filesAt(join(path, entry.name)),
  );
}

const files = roots.flatMap((path) => filesAt(resolve(root, path)));
const failures = [];

for (const file of files) {
  if (file === scriptPath || file === lockPath) continue;
  const name = relative(root, file);
  const pathText = name.replaceAll("\\", "/");
  const content = textExtensions.has(extname(file))
    ? readFileSync(file, "utf8")
    : "";

  for (const pattern of patterns) {
    if (pattern.regex.test(pathText) || pattern.regex.test(content)) {
      failures.push(`${name}: ${pattern.label}`);
    }
    pattern.regex.lastIndex = 0;
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("No prior customer residue found.");
