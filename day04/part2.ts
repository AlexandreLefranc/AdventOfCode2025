import { readFile } from "../utils/readFile";

type GridValue = "." | "@";

type Position = {
  x: number;
  y: number;
};

function isGridValue(value: string): value is GridValue {
  if (value !== "." && value !== "@") {
    return false;
  }
  return true;
}

class Grid {
  private grid: GridValue[][] = [];
  public readonly width: number = 0;
  public readonly height: number = 0;

  constructor(inputGrid: string[]) {
    this.grid = [];

    for (const line of inputGrid) {
      const gridLine: GridValue[] = [];
      for (const char of line) {
        if (!isGridValue(char)) {
          throw new Error(`Unexpected grid value: ${char}`);
        }
        gridLine.push(char);
      }
      this.width = gridLine.length;
      this.grid.push(gridLine);
    }

    this.height = this.grid.length;
  }

  getValue(pos: Position): GridValue {
    if (
      pos.x < 0 ||
      pos.y < 0 ||
      pos.x > this.width - 1 ||
      pos.y > this.height - 1
    ) {
      return ".";
    }

    return this.grid[pos.y][pos.x];
  }

  private setValue(pos: Position, value: GridValue): void {
    this.grid[pos.y][pos.x] = value;
  }

  getAdjacentValues(pos: Position): GridValue[] {
    const adjancentValues: GridValue[] = [];
    for (let col = pos.x - 1; col <= pos.x + 1; col++) {
      for (let row = pos.y - 1; row <= pos.y + 1; row++) {
        if (col === pos.x && row === pos.y) {
          continue;
        }
        const value = this.getValue({ x: col, y: row });
        adjancentValues.push(value);
      }
    }
    return adjancentValues;
  }

  removeRoll(pos: Position): void {
    const value = this.getValue(pos);
    if (value === "@") {
      this.setValue(pos, ".");
    }
  }

  print() {
    console.info("#################");
    console.info("### Roll Grid ###");
    console.info("#################");

    console.info("-".repeat(this.width + 4));
    for (const line of this.grid) {
      console.info("|", line.join(""), "|");
    }
    console.info("-".repeat(this.width + 4));
  }
}

function removeRolls(grid: Grid): number {
  const toRemove: Position[] = [];

  for (let row = 0; row < grid.height; row++) {
    for (let col = 0; col < grid.width; col++) {
      const pos = { x: col, y: row };
      const currentValue = grid.getValue(pos);

      if (currentValue === "@") {
        const adjacentValues = grid.getAdjacentValues(pos);
        const countRolls = adjacentValues.filter((x) => x === "@").length;

        if (countRolls < 4) {
          toRemove.push(pos);
        }
      }
    }
  }

  for (const position of toRemove) {
    grid.removeRoll(position);
  }

  return toRemove.length;
}

async function main() {
  const path = "day04/input_example.txt";
  const fileContent = await readFile(path);

  const grid = new Grid(fileContent);
  grid.print();

  let total = 0;

  let removedCount = 0;
  do {
    removedCount = removeRolls(grid);
    total += removedCount;
    grid.print();
  } while (removedCount > 0);

  console.log({ total });
}

main();
