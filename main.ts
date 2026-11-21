import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINES = [
  "Dust settles on the sill without a sound. Outside, rain does its slow work on the roof, one drop finishing before the next begins. High over the black water, Jupiter turns through its long night, wide enough to swallow a thousand earths without a ripple.",
];

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.txt");

mkdirSync(outputDir, { recursive: true });
writeFileSync(outputPath, LINES.join("\n"), "utf8");
const written = readFileSync(outputPath);
const hash = createHash("sha256").update(written).digest("hex");
console.log(`Wrote ${outputPath}`);
console.log(`sha256: ${hash}`);
console.log(`deterministic: ${LINES.join("\n").length} chars, no trailing newline`);
