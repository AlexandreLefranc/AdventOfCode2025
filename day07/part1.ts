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
  private grid: Value[][];
  width: number;
  height: number;

  constructor(fileLines: string[]) {
    const grid: Value[][] = [];

    for (const fileLine of fileLines) {
      const line: Value[] = [];
      for (const char of fileLine) {
        if (isManifoldValue(char)) {
          line.push(char);
        } else {
          throw new Error(`Unknown value: ${char}`);
        }
      }
      grid.push(line);
    }

    this.grid = grid;
    this.height = this.grid.length;
    this.width = this.grid[0].length;
  }

  getValue(pos: Position): Value {
    return this.grid[pos.y][pos.x];
  }

  private setValue(pos: Position, value: Value): void {
    this.grid[pos.y][pos.x] = value;
  }

  private isStart(pos: Position): boolean {
    if (this.grid[pos.y][pos.x] === "S") {
      return true;
    }
    return false;
  }

  private isBeam(pos: Position): boolean {
    if (this.grid[pos.y][pos.x] === "|") {
      return true;
    }
    return false;
  }

  private isSplitter(pos: Position): boolean {
    if (this.grid[pos.y][pos.x] === "^") {
      return true;
    }
    return false;
  }

  private isActivated(pos: Position): boolean {
    if (pos.y === 0) return false;

    const abovePos = { x: pos.x, y: pos.y - 1 };
    if (this.isBeam(abovePos) || this.isStart(abovePos)) {
      return true;
    }
    return false;
  }

  private isEmpty(pos: Position): boolean {
    if (this.grid[pos.y][pos.x] === ".") {
      return true;
    }
    return false;
  }

  isActivatedSplitter(pos: Position): boolean {
    if (this.isSplitter(pos) && this.isActivated(pos)) {
      return true;
    }
    return false;
  }

  propagateBeam(pos: Position): void {
    if (this.isEmpty(pos) && this.isActivated(pos)) {
      this.setValue(pos, "|");
    }
  }

  splitBeam(pos: Position): void {
    const leftPos = { x: pos.x - 1, y: pos.y };
    const rightPos = { x: pos.x + 1, y: pos.y };
    this.setValue(leftPos, "|");
    this.setValue(rightPos, "|");
  }

  print() {
    for (const line of this.grid) {
      const l = line
        .map((value) => {
          if (value === "^") {
            return magenta(value);
          }
          if (value === "|") {
            return green(value);
          }
          return value;
        })
        .join("");

      console.info(l);
    }
    console.info();
  }
}

function processPosition(pos: Position, grid: ManifoldGrid) {
  if (grid.isActivatedSplitter(pos)) {
    grid.splitBeam(pos);
    return 1;
  } else {
    grid.propagateBeam(pos);
    return 0;
  }
}

async function main() {
  const path = "day07/input.txt";
  const fileLines = await readFile(path);

  const grid = new ManifoldGrid(fileLines);
  grid.print();

  let count = 0;
  for (let y = 1; y < grid.height; y++) {
    for (let x = 0; x < grid.width; x++) {
      const pos = { x, y };
      count += processPosition(pos, grid);
    }

    grid.print();
  }

  console.log({ count });
}

main();
