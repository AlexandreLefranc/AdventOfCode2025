import fs from "fs";

function read(f: string): string[] {
  return fs.readFileSync(f).toString().trim().split("\n");
}

function main() {
  const lines = read("day06/input_example.txt");

  const split = [];
  for (const l of lines) {
    const arrLines = l.trim().split(/\s+/);
    split.push(arrLines);
  }

  const nLines = lines.length;
  const nCols = split[0].length;

  let total = 0;
  for (let i = 0; i < nCols; i++) {
    const operator = split[nLines - 1][i];

    const operands = [];
    for (let j = 0; j < nLines - 1; j++) {
      operands.push(Number(split[j][i]));
    }

    console.log({ operator, operands });

    if (operator === "+") {
      total += operands.reduce((acc, curr) => acc + curr, 0);
    } else if (operator === "*") {
      total += operands.reduce((acc, curr) => acc * curr, 1);
    }
  }

  console.log(total);
}

main();
