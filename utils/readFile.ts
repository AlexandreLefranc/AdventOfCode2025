export async function readFile(filePath: string): Promise<string[]> {
  const file = Bun.file(filePath);
  const content = await file.text();
  return content.trim().split("\n");
}
