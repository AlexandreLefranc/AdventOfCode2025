import { NumericString } from "../utils/NumericString";
import { readFile } from "../utils/readFile";

function parseLines(lines: string[]) {
  const blankLineIndex = lines.findIndex((v) => v === "");

  return {
    freshRanges: lines.slice(0, blankLineIndex),
    ingredientIds: lines.slice(blankLineIndex + 1),
  };
}

function isFresh(idString: string, freshRanges: string[]) {
  const id = new NumericString(idString);

  for (const range of freshRanges) {
    const [start, end] = range.split("-").map((v) => new NumericString(v));

    if (id.gte(start) && id.lte(end)) {
      return true;
    }
  }

  return false;
}

async function main() {
  const lines = await readFile("day05/input.txt");

  const { freshRanges, ingredientIds } = parseLines(lines);

  let freshCount = 0;
  for (let i = 0; i < ingredientIds.length; i++) {
    if (isFresh(ingredientIds[i], freshRanges)) {
      freshCount++;
    }
  }

  console.log({ freshCount });
}

main();
