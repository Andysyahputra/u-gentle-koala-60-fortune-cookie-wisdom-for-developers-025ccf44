// Fortune Cookie Wisdom for Developers
// Writes one original fortune-cookie line for a software developer
// to /output/entry.txt (UTF-8, 1-120 characters, not only whitespace).

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const FORTUNE =
  "The bug you cannot find is the feature you did not document.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 120
// characters, not only white space. Refuse to write a line that
// would fail it, so a bad edit can never ship silently.
function checkGate(line: string): void {
  if (line.length < 1 || line.length > 120) {
    throw new Error(`fortune is ${line.length} chars, gate allows 1-120`);
  }
  if (line.trim().length === 0) {
    throw new Error("fortune must not be only white space");
  }
}

function main(): void {
  checkGate(FORTUNE);
  const outPath = "/output/entry.txt";
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, FORTUNE, "utf8");
  console.log(`wrote ${FORTUNE.length} chars to ${outPath}: ${FORTUNE}`);
}

main();
