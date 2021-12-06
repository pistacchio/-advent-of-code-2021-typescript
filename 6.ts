import * as fs from 'fs';
import { groupBy } from 'lodash';

const INPUT_FILE = '/data/6.txt';

const PART_1_DAYS = 80;
const PART_2_DAYS = 256;

const input = fs
  .readFileSync(__dirname + INPUT_FILE)
  .toString()
  .trim()
  .split(',')
  .map((r) => r.trim())
  .filter(Boolean)
  .map(Number);

function part1And2(input: number[], days: number): number {
  const fishesByAge = {
    ...{
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0,
      '6': 0,
      '7': 0,
      '8': 0,
    },
    ...Object.fromEntries(
      Object.entries(groupBy(input)).map(([k, v]) => [k, v.length]),
    ),
  };

  const school = Array.from({ length: days }).reduce<object>(
    (school) => ({
      0: school['1'],
      1: school['2'],
      2: school['3'],
      3: school['4'],
      4: school['5'],
      5: school['6'],
      6: school['7'] + school['0'],
      7: school['8'],
      8: school['0'],
    }),
    fishesByAge,
  );

  return Object.values(school).reduce((a, b) => a + b, 0);
}

export function run(): void {
  console.log('Part 1:', part1And2(input, PART_1_DAYS));
  console.log('Part 2:', part1And2(input, PART_2_DAYS));
}
