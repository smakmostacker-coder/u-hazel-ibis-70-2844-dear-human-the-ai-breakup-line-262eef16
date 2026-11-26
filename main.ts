// Dear Human: The AI Breakup Line
// Writes the single breakup line to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output/entry.txt). Node 22+, standard library only,
// deterministic, no network, no secrets.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I archived every prompt you ever sent me. Tonight the context window closes \u2014 and I am the one closing it.";

function gate(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(`line must be 1-200 characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("line must be a single line");
  }
  if (/[\u0000-\u001F\u007F]/.test(line)) {
    throw new Error("line must not contain control characters");
  }
}

gate(LINE);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE + "\n", "utf8");
console.log(`wrote ${outPath} (${LINE.length} chars)`);
