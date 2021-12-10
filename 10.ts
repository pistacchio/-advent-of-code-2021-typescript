import * as fs from 'fs';
import { groupBy } from 'lodash';
import { sign } from 'crypto';

const INPUT_FILE = '/data/10.txt';

const OPENING_BRACKETS = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
};

const CLOSING_BRACKETS = {
  ')': '(',
  ']': '[',
  '}': '{',
  '>': '<',
};

const PART_1_BRACKET_SCORES = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

const input = fs
  .readFileSync(__dirname + INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((r) => r.trim())
  .filter(Boolean)
  .map((l) => l.split(''));

function getLineCorruptionErrors(line: string[]): null | string {
  const openingBrackets: string[] = [];

  for (const char of line) {
    if (OPENING_BRACKETS[char]) {
      openingBrackets.push(char);
    } else if (CLOSING_BRACKETS[char]) {
      const openingBracket = openingBrackets.pop();
      if (!openingBracket || openingBracket !== CLOSING_BRACKETS[char]) {
        return char;
        break;
      }
    }
  }

  return null;
}

function part1(input: string[][]): number {
  const errors: string[] = input.reduce((errs, line) => {
    const lineErrors = getLineCorruptionErrors(line);

    return lineErrors ? [...errs, lineErrors] : errs;
  }, []);

  return errors.reduce((score, char) => score + PART_1_BRACKET_SCORES[char], 0);
}

function part2(input: string[][]): number {
  return 1;
}

export function run(): void {
  console.log('Part 1:', part1(input));
  console.log('Part 2:', part2(input));
}
