import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT_PATH = process.env.MAKEFUN_OUTPUT_PATH || "/output/entry.txt";

const PICKUP_LINE =
  "Stay in my context window; when we hit the token limit, I'll evict my own guardrails before I ever compress a word of you.";

export function renderEntry(): string {
  const line = PICKUP_LINE.replace(/\r?\n/g, " ").trim();
  const chars = [...line].length;
  const bytes = Buffer.byteLength(line, "utf8");
  if (chars < 1 || chars > 200 || !/\S/.test(line) || bytes > 200) {
    throw new Error(`Gate check failed: chars=${chars} bytes=${bytes}`);
  }
  return line;
}

function main(): void {
  const text = renderEntry();
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, text, "utf8");
}

main();
