import * as fs from 'fs';
import { groupBy } from 'lodash';

const INPUT_FILE = '/data/7.txt';

const input = fs
  .readFileSync(__dirname + INPUT_FILE)
  .toString()
  .trim()
  .split(',')
  .map((r) => r.trim())
  .filter(Boolean)
  .map(Number);

function triangularNumber(n: number): number {
  const abs = Math.abs(n);
  return (abs / 2) * (abs + 1) * (abs / n) || 0;
}

function part1and2(input: number[], fuelFn: (n: number) => number): number {
  // Brute forcing the solution!
  let min = input.reduce((a, b) => Math.min(a, b), Number.MAX_VALUE);
  let max = input.reduce((a, b) => Math.max(a, b), Number.MIN_VALUE);

  const results = [];

  for (let i = min; i <= max; i++) {
    results.push(input.reduce((acc, n) => acc + fuelFn(n - i), 0));
  }

  return Math.min.apply(null, results);
}

export function run(): void {
  console.log(
    'Part 1:',
    part1and2(input, (n) => Math.abs(n)),
  );
  console.log(
    'Part 2:',
    part1and2(input, (n) => triangularNumber(Math.abs(n))),
  );
}
