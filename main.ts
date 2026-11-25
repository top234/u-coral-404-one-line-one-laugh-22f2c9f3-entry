// One Line, One Laugh — a single funny line, written to /output/entry.txt.
// 80 characters: short setup, one turn, punchline lands on "burnout".
// SPDX-License-Identifier: MIT
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The line: an AI assistant that should give you a rest turns a day off
// into yet another meeting — the help itself is the punchline, and the
// shorter verb lands the joke faster.
const LINE =
  "I asked my AI assistant for a day off, and it booked a meeting about my burnout.";

// Guard: the gate wants UTF-8 text, 1-200 characters, not only whitespace,
// exactly one sentence ending in a single terminator (. ! ?).
function validate(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(`line must be 1-200 characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }
  if (line !== line.trim()) {
    throw new Error("line must not have leading or trailing whitespace");
  }
  if (/[\r\n]/.test(line)) {
    throw new Error("line must not contain a newline");
  }
  const terminators = line.match(/[.!?]/g) ?? [];
  if (terminators.length !== 1 || !/[.!?]$/.test(line)) {
    throw new Error("line must be exactly one sentence ending in . ! or ?");
  }
}

validate(LINE);
const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
