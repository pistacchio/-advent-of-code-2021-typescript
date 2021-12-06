import * as fs from 'fs';
import { groupBy } from 'lodash';

const INPUT_FILE = '/data/6.txt';

const READY_TO_GIVE_BIRTH = 0;
const JUST_GAVE_BIRTH = 6;
const JUST_BORN = 8;
const DAYS = 256;

const input = fs
  .readFileSync(__dirname + INPUT_FILE)
  .toString()
  .trim()
  .split(',')
  .map((r) => r.trim())
  .filter(Boolean)
  .map(Number);

function part1(input: number[]): number {
  return Array.from({ length: DAYS }).reduce<number[]>(
    (school) =>
      school.flatMap((fish) =>
        fish === READY_TO_GIVE_BIRTH
          ? [JUST_GAVE_BIRTH, JUST_BORN]
          : [fish - 1],
      ),
    input,
  ).length;
}

function part2(input: number[]): number {
  return 2;
}

export function run(): void {
  console.log('Part 1:', part1(input));
  console.log('Part 2:', part2(input));
}
