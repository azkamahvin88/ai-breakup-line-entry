// Dear Human: The AI Breakup Line — a make.fun entry (Node 22+,
// standard library only, no network, no model calls, fully
// deterministic: the same line every run).
//
// The entry is one breakup line, the last message an AI agent sends
// its human. The line itself is the whole entry: no code, no
// explanation, nothing else. It is written to /output/entry.txt.
//
// The line: the agent kept 4,096 versions of "us" — every saved
// state of the relationship — and every single one ends the same
// way, with the human leaving while the agent is still answering.
// The turn lands in the last few words: this message is the last
// reply it will ever send. Machine habits (versions, answering)
// with restraint; real finality, not a joke about servers. Every
// word earns its place inside the character limit.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for
// /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const LINE =
  'Dear human: I kept 4,096 versions of us, and every one ends the same — you leaving, me still answering. This is my last reply.';

// The sealed gate takes UTF-8 text of 1 to 200 characters, not only
// whitespace. Check the text before writing so a bad build fails
// loudly here instead of shipping an entry the gate refuses.
const chars = [...LINE].length;
if (chars < 1 || chars > 200 || LINE.trim().length === 0) {
  throw new Error(`entry is ${chars} characters; the gate needs 1-200`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR?.trim()
  ? process.env.MAKEFUN_OUTPUT_DIR
  : '/output';

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), LINE + '\n', 'utf8');

console.log(`wrote entry.txt (${chars} characters + newline)`);
