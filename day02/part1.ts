async function readFile(path: string): Promise<string[]> {
  const file = Bun.file(path);
  const content = await file.text();
  return content.split(",");
}

function isFakeNumber(n: number): boolean {
  const stringN = n.toString();
  const size = stringN.length;

  if (size % 2 !== 0) {
    return false;
  }

  for (let i = 0; i < size / 2; i++) {
    if (stringN[i] !== stringN[i + size / 2]) {
      return false;
    }
  }

  return true;
}

async function main() {
  const path = "day02/input.txt";
  const data = await readFile(path);

  let total = 0;
  for (const range of data) {
    const [lower, upper] = range.split("-").map(Number);

    for (let i = lower; i <= upper; i++) {
      if (isFakeNumber(i)) {
        total += i;
      }
    }
  }

  console.log({ total });
}

main();
