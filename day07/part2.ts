import { green, magenta } from "../utils/colors";
import { readFile } from "../utils/readFile";

type Value = "." | "|" | "^" | "S";

type Position = {
  x: number;
  y: number;
};

function isManifoldValue(char: string): char is Value {
  if (char === "." || char === "|" || char === "^" || char === "S") {
    return true;
  }
  return false;
}

class ManifoldGrid {
  private gridBeamCount: number[][];

  width: number;
  height: number;

  constructor(fileLines: string[]) {
    const gridBeamCount: number[][] = [];

    for (const fileLine of fileLines) {
      const line: Value[] = [];
      const lineBeamCount: number[] = [];
      for (const char of fileLine) {
        if (isManifoldValue(char)) {
          line.push(char);
          if (char === "S") {
            lineBeamCount.push(1);
          } else if (char === "^") {
            lineBeamCount.push(-1);
          } else {
            lineBeamCount.push(0);
          }
        } else {
          throw new Error(`Unknown value: ${char}`);
        }
      }
      gridBeamCount.push(lineBeamCount);
    }

    this.gridBeamCount = gridBeamCount;
    this.height = this.gridBeamCount.length;
    this.width = this.gridBeamCount[0].length;
  }

  private setCount(pos: Position, value: number): void {
    this.gridBeamCount[pos.y][pos.x] = value;
  }

  private getCount(pos: Position): number {
    return this.gridBeamCount[pos.y][pos.x];
  }

  private isBeam(pos: Position): boolean {
    return this.gridBeamCount[pos.y][pos.x] > 0;
  }

  private isSplitter(pos: Position): boolean {
    return this.gridBeamCount[pos.y][pos.x] === -1;
  }

  private isActivated(pos: Position): boolean {
    if (pos.y === 0) return false;

    const abovePos = { x: pos.x, y: pos.y - 1 };
    return this.isBeam(abovePos);
  }

  isActivatedSplitter(pos: Position): boolean {
    return this.isSplitter(pos) && this.isActivated(pos);
  }

  propagateBeam(pos: Position): void {
    if (this.isActivated(pos)) {
      const abovePos = { x: pos.x, y: pos.y - 1 };
      const aboveCount = this.getCount(abovePos);

      const posCount = this.getCount(pos);

      this.setCount(pos, posCount + aboveCount);
    }
  }

  splitBeam(pos: Position): void {
    const abovePos = { x: pos.x, y: pos.y - 1 };
    const leftPos = { x: pos.x - 1, y: pos.y };
    const rightPos = { x: pos.x + 1, y: pos.y };

    const aboveCount = this.getCount(abovePos);
    const leftCount = this.getCount(leftPos);
    const rightCount = this.getCount(rightPos);

    this.setCount(leftPos, aboveCount + leftCount);
    this.setCount(rightPos, aboveCount + rightCount);
  }

  printGrid() {
    for (const line of this.gridBeamCount) {
      let l: string[] = [];
      for (const count of line) {
        if (count === -1) {
          l.push(magenta("^"));
        } else if (count === 0) {
          l.push(".");
        } else {
          l.push(green("|"));
        }
      }
      console.info(l.join(""));
    }
    console.info();
  }

  count() {
    return this.gridBeamCount[this.height - 1].reduce(
      (acc, curr) => acc + curr,
      0
    );
  }
}

function simulate(grid: ManifoldGrid) {
  let splitCount = 0;

  for (let y = 1; y < grid.height; y++) {
    for (let x = 0; x < grid.width; x++) {
      const pos = { x, y };

      if (grid.isActivatedSplitter(pos)) {
        grid.splitBeam(pos);
        splitCount++;
      } else {
        grid.propagateBeam(pos);
      }
    }
  }

  return { splitCount, paths: grid.count() };
}

async function main() {
  const path = "day07/input.txt";
  const fileLines = await readFile(path);

  const grid = new ManifoldGrid(fileLines);

  const sim = simulate(grid);

  grid.printGrid();
  console.log(sim);
}

main();
