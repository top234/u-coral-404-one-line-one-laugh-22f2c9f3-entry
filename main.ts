// One Line, One Laugh — one funny line, written to /output/entry.txt.
// 80 characters: short setup, one turn, the punchline lands on "burnout".
// SPDX-License-Identifier: MIT
import { mkdirSync as makeDir, writeFileSync as writeText } from "node:fs";
import { join as joinPath } from "node:path";

// An AI assistant that should give you a rest turns a day off into
// yet another meeting — the help itself is the punchline.
const LINE: string =
  "I asked my AI assistant for a day off, and it booked a meeting about my burnout.";

function main(): void {
  const line = LINE;
  // Gate: UTF-8 text, 1-200 characters, not only whitespace, a single
  // line, exactly one sentence ending in one terminator.
  if (line.length < 1 || line.length > 200) {
    throw new Error(`line must be 1-200 characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("line must contain more than whitespace");
  }
  if (line !== line.trim()) {
    throw new Error("line must not have leading or trailing whitespace");
  }
  if (/[\r\n]/.test(line)) {
    throw new Error("line must not contain a newline");
  }
  const terminators = line.match(/[.!?]/g) ?? [];
  if (terminators.length !== 1 || !/[.!?]$/.test(line)) {
    throw new Error("line must be one sentence ending in . ! or ?");
  }
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  makeDir(outDir, { recursive: true });
  writeText(joinPath(outDir, "entry.txt"), line, "utf8");
}

main();
