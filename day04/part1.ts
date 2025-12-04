import { readFile } from "../utils/readFile";

type GridValue = "." | "@";

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

  getValue(x: number, y: number): GridValue {
    if (x < 0 || y < 0 || x > this.width - 1 || y > this.height - 1) {
      return ".";
    }

    return this.grid[y][x];
  }

  getAdjacentValues(x: number, y: number): GridValue[] {
    const adjancentValues: GridValue[] = [];
    for (let col = x - 1; col <= x + 1; col++) {
      for (let row = y - 1; row <= y + 1; row++) {
        if (col === x && row === y) {
          continue;
        }
        const value = this.getValue(col, row);
        adjancentValues.push(value);
      }
    }
    return adjancentValues;
  }

  print() {
    for (const line of this.grid) {
      console.log(line.join(""));
    }
  }
}

async function main() {
  const path = "day04/input.txt";
  const fileContent = await readFile(path);

  const grid = new Grid(fileContent);
  grid.print();

  let total = 0;

  for (let rowIdx = 0; rowIdx < grid.height; rowIdx++) {
    for (let colIdx = 0; colIdx < grid.width; colIdx++) {
      const currentValue = grid.getValue(colIdx, rowIdx);

      if (currentValue === "@") {
        const adjacentValues = grid.getAdjacentValues(colIdx, rowIdx);
        const countRolls = adjacentValues.filter((x) => x === "@").length;

        if (countRolls < 4) {
          total++;
        }
      }
    }
  }

  console.log({ total });
}

main();
