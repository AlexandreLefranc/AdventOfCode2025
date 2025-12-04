import fs from "fs";

const input = fs.readFileSync("day01/input.txt", "utf-8").trim().split("\n");

let count = 0;
let position = 50;
for (const line of input) {
  const direction = line[0];
  let steps = parseInt(line.slice(1), 10);

  const previousPosition = position;
  const previousHundreds = Math.floor(previousPosition / 100);

  while (steps > 100) {
    steps -= 100;
    count++;
  }

  if (direction === "R") {
    position += steps;
  } else if (direction === "L") {
    position -= steps;
  }

  const currentHundreds = Math.floor(position / 100);

  const wasOnZero = previousPosition % 100 === 0;
  const isOnZero = position % 100 === 0;
  const hasChangedHundreds = previousHundreds !== currentHundreds;

  if (isOnZero || (hasChangedHundreds && !wasOnZero)) {
    count++;
  }
}

console.log(count);
