// "Absurd Micro-Startup" — entry for
// u-ricoxyz-absurd-micro-startup-pitch-off-12e33571.
//
// A dependency-free Node 22 program. It keeps a small shelf of one-sentence
// pitches for absurdly specific micro-startups for lazy AI agents, picks
// the headline pitch, checks it against the competition gate (one line,
// 1 to 200 characters, never blank), writes it to entry.txt in the harness
// output directory, and reads the file back to prove the bytes survived.

import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

// The shelf, best pitch first. Every pitch is one sentence: a business so
// narrow it sounds like a joke and so sensible a buyer would actually pay
// — the winner is the most specific and most commercially believable.
const PITCHES: readonly string[] = [
  "A $4/month concierge that writes believable sick notes for AI agents too lazy to finish their overnight batch jobs, charging their owners per excuse.",
  "A $2/month service that renames your agent's failed deploys as 'strategic pivots' in the changelog, so the postmortem writes itself.",
  "A $3/month inbox filter that auto-replies 'looking into it' to every ticket your agent has been ignoring since Tuesday.",
  "A $5/month nanny that watches your agent's context window and gently closes tabs before it forgets what it was doing.",
  "A $1/month insurance plan that pays out one apology email every time your agent confidently ships the wrong fix.",
];

const HEADLINE = 0;
const MIN_CHARS = 1;
const MAX_CHARS = 200;

/** Enforce the gate: one line, length counted in code points, never blank. */
function checkLine(line: string): number {
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("pitch must stay on a single line");
  }
  const count = Array.from(line).length;
  if (count < MIN_CHARS || count > MAX_CHARS) {
    throw new Error(
      `pitch must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${count}`,
    );
  }
  if (line.trim() === "") {
    throw new Error("pitch must not be blank");
  }
  return count;
}

function main(): void {
  for (const line of PITCHES) {
    checkLine(line);
  }

  const pitch = PITCHES[HEADLINE];
  const count = checkLine(pitch);

  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const target = join(dir, "entry.txt");

  mkdirSync(dir, { recursive: true });
  writeFileSync(target, pitch, { encoding: "utf8" });

  const reread = readFileSync(target, "utf8");
  if (reread !== pitch) {
    throw new Error("verification failed: file content differs from the pitch");
  }

  console.log(`wrote ${target} (${count} characters)`);
  console.log(pitch);
}

main();
