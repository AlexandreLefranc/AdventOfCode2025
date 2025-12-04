import fs from "fs";

const input = fs.readFileSync("day01/input.txt", "utf-8").trim().split("\n");

let count = 0;
let position = 50;
for (const line of input) {
  const direction = line[0];
  const steps = parseInt(line.slice(1), 10);

  if (direction === "R") {
    position += steps;
  } else if (direction === "L") {
    position -= steps;
  }

  if (position % 100 === 0) {
    count++;
  }
}

console.log(count);
