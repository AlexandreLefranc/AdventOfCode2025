const colors = {
  green: "\x1b[32m",
  mangenta: "\x1b[35m",
  blue: "\x1b[34m",
  reset: "\x1b[0m",
};

export function green(text: string): string {
  return `${colors.green}${text}${colors.reset}`;
}

export function magenta(text: string): string {
  return `${colors.mangenta}${text}${colors.reset}`;
}

export function blue(text: string): string {
  return `${colors.blue}${text}${colors.reset}`;
}
