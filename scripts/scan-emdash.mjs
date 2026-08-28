import { readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const quoteData = resolve(root, "src/data/quotes.ts");
const roots = ["README.md", "src/app", "src/components", "src/data"];
const extensions = new Set([".css", ".md", ".ts", ".tsx"]);

function filesAt(path) {
  const stat = statSync(path);
  if (stat.isFile()) return [path];
  return readdirSync(path, { withFileTypes: true }).flatMap((entry) =>
    filesAt(join(path, entry.name)),
  );
}

const failures = roots
  .flatMap((path) => filesAt(resolve(root, path)))
  .filter((file) => file !== quoteData && extensions.has(extname(file)))
  .filter((file) => readFileSync(file, "utf8").includes("\u2014"))
  .map((file) => relative(root, file));

if (failures.length) {
  console.error(`Em dash found in:\n${failures.join("\n")}`);
  process.exit(1);
}

console.log("No em dash found in authored customer-facing files.");
