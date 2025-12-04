async function readFile(path: string): Promise<string[]> {
  const file = Bun.file(path);
  const content = await file.text();
  return content.split(",");
}

function isFakeNumber(n: number): boolean {
  const stringN = n.toString();
  const size = stringN.length;

  for (let sequence_size = 1; sequence_size < size; sequence_size++) {
    if (size % sequence_size === 0) {
      const sequence = stringN.slice(0, sequence_size);
      if (sequence.repeat(size / sequence_size) === stringN) {
        return true;
      }
    }
  }
  return false;
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
