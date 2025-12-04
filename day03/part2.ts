async function readFile(path: string): Promise<string[]> {
  const file = Bun.file(path);
  const content = await file.text();
  return content.split("\n").filter((line) => line.length > 0);
}

function findBankArrangement(bank: string, arrangementSize: number): string[] {
  const results = Array(arrangementSize).fill("1");

  outerLoop: for (let i = 0; i < bank.length; i++) {
    const value = bank[i];

    for (let j = arrangementSize; j > 0; j--) {
      const currentValue = results[arrangementSize - j];
      if (value > currentValue && i < bank.length - j + 1) {
        results[arrangementSize - j] = value;
        results.fill("1", arrangementSize - j + 1);
        continue outerLoop;
      }
    }
  }

  return results;
}

async function main() {
  const path = "day03/input.txt";
  const banks = await readFile(path);

  let total = 0;
  for (let i = 0; i < banks.length; i++) {
    const bankArrangement = findBankArrangement(banks[i], 12);
    total += Number(bankArrangement.join(""));
  }

  console.log(`Total: ${total}`);
}

main();
