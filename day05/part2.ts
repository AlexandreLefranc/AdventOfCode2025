import { readFile } from "../utils/readFile";

function parseLines(lines: string[]) {
  const blankLineIndex = lines.findIndex((v) => v === "");

  return {
    freshRanges: lines.slice(0, blankLineIndex),
    ingredientIds: lines.slice(blankLineIndex + 1),
  };
}

function getStart(range: string): bigint {
  const [start] = range.split("-").map((v) => BigInt(v));
  return start;
}

function getEnd(range: string): bigint {
  const [_, end] = range.split("-").map((v) => BigInt(v));
  return end;
}

function sortRanges(freshRanges: string[]): string[] {
  const sortedRanges = freshRanges.toSorted((a, b) => {
    const aStart = getStart(a);
    const bStart = getStart(b);
    if (aStart < bStart) {
      return -1;
    } else if (aStart > bStart) {
      return 1;
    } else {
      return 0;
    }
  });

  return sortedRanges;
}

function mergeOverlap(ranges: string[]) {
  let n = ranges.length;

  const sorted = sortRanges(ranges);
  let res = [];

  // Checking for all possible overlaps
  for (let i = 0; i < n; i++) {
    let start = getStart(sorted[i]);
    let end = getEnd(sorted[i]);

    // Skipping already merged intervals
    if (res.length > 0 && getEnd(res[res.length - 1]) >= end) {
      continue;
    }

    // Find the end of the merged range
    for (let j = i + 1; j < n; j++) {
      if (getStart(sorted[j]) <= end) {
        if (end > getEnd(sorted[j])) {
          end = end;
        } else {
          end = getEnd(sorted[j]);
        }
      }
    }
    res.push(`${start.toString()}-${end.toString()}`);
  }
  return res;
}

async function main() {
  const lines = await readFile("day05/input.txt");

  const { freshRanges } = parseLines(lines);

  const mergedRanges = mergeOverlap(freshRanges);

  let total = 0n;
  for (const range of mergedRanges) {
    total = total + (getEnd(range) - getStart(range)) + 1n;
  }

  console.log({ total: total });
}

main();
