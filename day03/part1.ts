async function readFile(path: string): Promise<string[]> {
  const file = Bun.file(path);
  const content = await file.text();
  return content.split("\n").filter((line) => line.length > 0);
}

function findBankArrangement(bank: string): string[] {
  let first = "1";
  let second = "1";

  for (let i = 0; i < bank.length; i++) {
    const value = bank[i];
    if (value > first && i < bank.length - 1) {
      first = value;
      second = "1";
      continue;
    }

    if (value > second) {
      second = value;
    }
  }

  return [first, second];
}

async function main() {
  const path = "day03/input.txt";
  const banks = await readFile(path);

  let total = 0;
  for (let i = 0; i < banks.length; i++) {
    const bankArrangement = findBankArrangement(banks[i]);
    total += Number(bankArrangement.join(""));
  }

  console.log(`Total: ${total}`);
}

main();
